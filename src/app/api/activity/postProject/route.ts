
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const {  userId,name } = data;

    if (!userId) {
      return NextResponse.json({ error: "Failed to create new Project, no user Id" }, { status: 400 });
    }
          const newProject = await prisma.project.create({
            data: {
              userId,
              name,
            },
          });
       
    return NextResponse.json({ success: true, newProject: newProject });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json({ error: "An error occurred while creating a new project" }, { status: 500 });
  }
}
