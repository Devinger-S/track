

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

    
    const current = await prisma.activity.findFirst({
      where: {
        endAt:null,
      }
    })

    return NextResponse.json(current, { status: 200 });
  } catch (error) {
    console.error('Error fetching current activity:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

