'use server'
import prisma from "@/lib/prisma"
import { signIn, signOut } from "auth"

import { revalidatePath } from "next/cache"

   export async function onCreateClient(data: FormData) {
        "use server";
        await prisma.client.create({
          data: {
            userId: data.get("id") as string,
            name: data.get("name") as string,
            color: data.get("color") as string,
          },
        });
        revalidatePath("/track");
      }
export async function LogOut() {
  await signOut()
}

export async function LogIn() {
  await signIn()
}
export async function createProject(userId: string, name: string) {
  'use server'
  return await prisma.project.create({
    data: { userId, name, }
  });
}

export async function deleteActivity(id: string) {
  await prisma?.activity.delete({
    where: {
      id: id,
    },

  })
  revalidatePath('/track')
}
export async function createClient(userId: string, name: string) {
  await prisma.client.create({
    data: {
      userId, name
    }
  })
}


// export async function updateActivity(data: FormData) {
//  console.log('data server action', data)
//  await prisma?.activity.update({
//      where: {
//          id: data.get('id') as string,
//      },
//      data: {
//          name: data.get('name') as string,
//          startAt: data.get('startAt') as string,
//          endAt: data.get('endAt') as string,
//      }
//  })
//  revalidatePath('/track')
// }
// export async function deleteActivity(id: string) {
//  await prisma?.activity.delete({
//      where: {
//          id: id,
//      },

//  })
//  revalidatePath('/track')
// }
// const generateProjects = async () => {

// if (data) {
//  await prisma.client.createMany({
//    data: [
// {name:'client1',
//  userId:'clutmsom000008r8uh08b2f8v',
// },
// {name:'client2',
// userId:'clutmsom000008r8uh08b2f8v',
// }
//    ]
//   })
//   revalidatePath('/')
//  }
// } 
