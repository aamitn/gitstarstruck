import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const modifyStarForUser = async (
  token: string,
  owner: string,
  repo: string,
  action: 'star' | 'unstar'
) => {
  const method = action === 'star' ? 'PUT' : 'DELETE';

  const res = await fetch(
    `https://api.github.com/user/starred/${owner}/${repo}`,
    {
      method,
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github+json',
      },
    }
  );

  return res.ok;
};

export async function POST(req: NextRequest) {
  try {
    const { repoUrl, action } = await req.json();

    if (!repoUrl || !action || !['star', 'unstar'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid request: repoUrl and valid action required' },
        { status: 400 }
      );
    }

    const match = repoUrl.match(/^https:\/\/github\.com\/([\w-]+)\/([\w.-]+)$/);
    if (!match) {
      return NextResponse.json(
        { error: 'Invalid GitHub URL' },
        { status: 400 }
      );
    }

    const [_, owner, repo] = match;

    const githubUsers = await prisma.gitHubUser.findMany();

    if (githubUsers.length === 0) {
      return NextResponse.json(
        { error: 'No GitHub users found to perform the action' },
        { status: 404 }
      );
    }

    const results = await Promise.allSettled(
      githubUsers.map((user) =>
        modifyStarForUser(user.token, owner, repo, action)
      )
    );

    const successes: number[] = [];
    const failures: number[] = [];

    results.forEach((result, index) => {
      if (result.status === 'fulfilled' && result.value) {
        successes.push(githubUsers[index].id);
      } else {
        failures.push(githubUsers[index].id);
      }
    });

    // Record submissions
    await Promise.all(
      successes.map((userId) =>
        prisma.repoSubmission.create({
          data: {
            repoUrl,
            userId,
            starred: action === 'star',
          },
        })
      )
    );

    return NextResponse.json({
      message: `${action === 'star' ? 'Starring' : 'Unstarring'} complete. Successes: ${successes.length}, Failures: ${failures.length}`,
    });
  } catch (error) {
    console.error('Submit error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
