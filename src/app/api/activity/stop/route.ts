import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; 

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { id, project, client } = data;

    if (!id) {
      return NextResponse.json({ error: 'Activity ID is required' }, { status: 400 });
    }

    const updatedActivity = await prisma.activity.update({
      where: { id },
      data: {
        endAt: new Date(), // Mark the activity as stopped
        projectId: project === 'null' ? null : project,
        clientId: client === 'null' ? null : client,
      },
    });
    

    return NextResponse.json(updatedActivity);
  } catch (error) {
    console.error('Error stopping activity:', error);
    return NextResponse.json({ error: 'Error stopping activity' }, { status: 500 });
  }
}
