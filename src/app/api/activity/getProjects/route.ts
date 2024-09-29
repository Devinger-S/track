
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; 
import { auth } from '@/auth'; 

export async function GET() {
    try {

    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const projects = await prisma.project.findMany({
      where: {
        userId,
      },
    });
    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
