import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

type PageParams = Promise<{ id: string }>;

export async function DELETE(
  _req: NextRequest,
  { params }: { params: PageParams }
) {
  const fetchedParams = await params;
  try {
    const user = await prisma.gitHubUser.delete({
      where: { id: parseInt(fetchedParams.id) },
    });
    return NextResponse.json({ success: true, user });
  } catch (err) {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: PageParams }
) {
  const fetchedParams = await params;
  const body = await req.json();
  const { username, email, token } = body;

  try {
    const updated = await prisma.gitHubUser.update({
      where: { id: parseInt(fetchedParams.id) },
      data: { username, email, token },
    });
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}
