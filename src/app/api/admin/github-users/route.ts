import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const users = await prisma.gitHubUser.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { username, email, token } = body;

  if (!username || !email || !token) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  try {
    const user = await prisma.gitHubUser.create({
      data: { username, email, token },
    });

    return NextResponse.json(user);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
  }
}
