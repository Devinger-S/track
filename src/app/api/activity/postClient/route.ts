
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const {  userId,name , color} = data;

    if (!userId) {
      return NextResponse.json({ error: "Failed to create new Client, no user Id" }, { status: 400 });
    }
          const newClient = await prisma.client.create({
            data: {
              userId,
              name,
              color:color && ''
            },
          });
       
    return NextResponse.json({ success: true, newClient: newClient });
  } catch (error) {
    console.error("Error upserting activity:", error);
    return NextResponse.json({ error: "An error occurred while creating a new client" }, { status: 500 });
  }
}
