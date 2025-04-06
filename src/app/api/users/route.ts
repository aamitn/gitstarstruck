import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const user = await prisma.gitHubUser.create({
    data: {
      username: body.username,
      email: body.email,
      token: body.token,
    },
  });

  return NextResponse.json(user);
}
