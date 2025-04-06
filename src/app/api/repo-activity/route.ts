// app/api/repo-activity/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch the total count of entries in RepoSubmission
    const totalSubmissions = await prisma.repoSubmission.count();

    // Calculate number of badges (rounded total entries divided by 16)
    const badgeCount = Math.ceil(totalSubmissions / 16);

    // Fetch the recent submissions with related GitHub user
    const submissions = await prisma.repoSubmission.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        githubUser: true,
      },
    });

    const activity = submissions
      .map((entry) => {
        const match = entry.repoUrl.match(
          /^https:\/\/github\.com\/([\w-]+)\/([\w.-]+)$/
        );
        if (!match) return null;

        const [, username, repoName] = match;

        return {
          username: entry.githubUser.username,
          action: entry.starred ? 'starred' : 'unstarred',
          repoUser: username,
          repoName,
          time: entry.createdAt,
        };
      })
      .filter(Boolean);

    return NextResponse.json({ activity, badgeCount });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Failed to fetch activity' },
      { status: 500 }
    );
  }
}
