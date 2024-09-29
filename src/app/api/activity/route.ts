import { prisma } from "@/lib/prisma"; // Ensure you're importing prisma properly
import { NextResponse } from "next/server"; // Use Next.js's NextResponse for consistency

export async function POST(request: Request) {
  try {
    // Parse the incoming JSON data
    const data = await request.json();
    
    // Extract required fields from the data (assuming this is sent correctly)
    const { id, client, project } = data;

    // Log for debugging purposes
    console.log(`Stopping activity with data: ${JSON.stringify(data)}`);

    // Validate that the id is provided
    if (!id) {
      return NextResponse.json({ error: "Activity ID is required" }, { status: 400 });
    }

    // Update the activity, setting the `endAt` timestamp and updating client/project associations
    const activity = await prisma.activity.update({
      where: {
        id: id as string, // Type assertion since it's expected to be a string
      },
      data: {
        endAt: new Date(), // Stop the activity by setting the end time
        projectId: project === '' ? null : project, // If project is empty string, set to null
        clientId: client === '' ? null : client,   // Same for clientId
      },
    });

    // Return a successful response
    return NextResponse.json({ success: true, activity });
  } catch (error) {
    console.error("Error stopping activity:", error);
    return NextResponse.json({ error: "An error occurred while stopping the activity" }, { status: 500 });
  }
}
