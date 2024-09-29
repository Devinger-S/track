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

    // Get the current date and calculate start and end of today
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

    // Fetch activities from the database
    const dailyActivities = await prisma.activity.findMany({
      where: {
        userId,
        OR: [
          {
            startAt: { equals: startOfToday },
          },
          {
            endAt: { lte: endOfToday },
          },
        ],
      },
      include: {
        client: true,
        project: true,
      },
      orderBy: {
        startAt: 'desc',
      },
    });

    // Return activities in JSON format
    return NextResponse.json(dailyActivities, { status: 200 });
  } catch (error) {
    console.error('Error fetching activities:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
