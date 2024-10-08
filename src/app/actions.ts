'use server'
import prisma from "@/lib/prisma"
import { Client } from "@prisma/client";
import { auth, signIn, signOut } from "auth"

import { revalidatePath } from "next/cache"
import { json } from "stream/consumers";



  export async function onDailyActivities () {

 const session = await auth();
  const userId = session?.user?.id;
  const now = new Date();

  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  const endOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23,
    59,
    59
  );

  const dailyActivities = await prisma.activity.findMany({
    where: {
      userId,

      OR: [
        {
          startAt: {
            equals: startOfToday,
          },
        },
        {
          endAt: {
            lte: endOfToday,
          },
        },
      ],
    },
    include: {
      client: true, // Include the related Client if exists
      project: true, // Include the related Project if exists
    },
    orderBy: {
      startAt: "desc",
    },
  });
  console.log(`this is from onDailyActivities, ${dailyActivities}`)
  return dailyActivities

  }

   export async function onCreateClient(data: FormData) {
        
        try {
          await prisma.client.create({
            data: {
              userId: data.get("userId") as string,
              name: data.get("name") as string,
              color: data.get("color") as string,
            },
          });
        }catch (error) {
          console.log(`something went wrong `,error)
        } finally {
        revalidatePath("/track");

        }
      }
export async function LogOut() {
  await signOut()
}

export async function LogIn() {
  await signIn()
}
// export async function createProject(userId: string, name: string) {
//   'use server'
//   return await prisma.project.create({
//     data: { userId, name, }
//   });
// }

export async function deleteClient(id:string) {
  await prisma?.client.delete({
    where : {
      id:id,
    }
  })
  revalidatePath('/clients')
}

export async function deleteActivity(id: string) {
  await prisma?.activity.delete({
    where: {
      id: id,
    },

  })
  revalidatePath('/track')
}
export async function createClient({userId, name}:Client) {
  await prisma.client.create({
    data: {
      userId, name
    }
  })
}

  export async function currentActivity() {
    const current = await prisma.activity.findFirst({
      where: {
        endAt:null,
      }
    })
    return current
  }


export async function stopActivity(data: FormData) {
      const project = data.get('project') as string
      const client = data.get('client') as string
      console.log(`stop ${JSON.stringify(data)}`)
     
      const activity = await prisma.activity.update({
        where: {
          id: data.get('id') as string
        },
        data: {
          endAt: new Date(),
          projectId: project === '' ? null : project, // Ensure projectId is set properly
          clientId: client === '' ? null : client, // Ensure projectId is set properly

        }
      })
      revalidatePath('/track')
    }

    
    export async function upsertActivity(data: FormData) {
      const name = data.get('name') as string
      const userId = data.get('userId') as string
      try {
        if (userId) {
          await prisma.activity.create({
            data: {
              userId,
              startAt: new Date(),
              updatedAt: new Date(),
              name,
            }
          })
          revalidatePath('/track')
        }
      } catch (error) {
        console.error('Error in upsertActivity:', error);
      }
    }
export async function onCreateProject(userId:string,name:string) {
      await prisma.project.create({
        data: {
          userId,
          name,
        }
      })
      revalidatePath('/track')
    }