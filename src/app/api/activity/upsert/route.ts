import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
  try {
    // Parse the incoming JSON data
    const data = await request.json();
    
    // Extract relevant fields (activity name, project, client, userId, id)
    const { id, activity_name, client, project, userId } = data;

    // Log for debugging
    console.log(`Upsert activity with data: ${JSON.stringify(data)}`);

    // Validate that required fields are provided
    if (!activity_name || !userId) {
      return NextResponse.json({ error: "Activity name and user ID are required" }, { status: 400 });
    }

    // Use Prisma's upsert method to create or update activity
    const upsertedActivity = await prisma.activity.upsert({
      where: { id: id || "" }, // If id is provided, search for that activity
      update: {
        name: activity_name,
        clientId: client === 'none' ? null : client,
        projectId: project === 'none' ? null : project,
        updatedAt: new Date(),
      },
      create: {
        name: activity_name,
        userId: userId,
        clientId: client === 'none' ? null : client,
        projectId: project === 'none' ? null : project,
        startAt: new Date(), // New activity starts now
        updatedAt: new Date(),
      },
    });

    

    // Return the created/updated activity
    return NextResponse.json({ success: true, activity: upsertedActivity });
  } catch (error) {
    console.error("Error upserting activity:", error);
    return NextResponse.json({ error: "An error occurred while creating/updating the activity" }, { status: 500 });
  }
}
