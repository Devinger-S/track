'use server'

import prisma from '@/lib/prisma';

import { revalidatePath } from "next/cache"


export async function updataClientName(data: FormData) {
  console.log('data server action', data)
  await prisma?.client.update({
    where: {
      id: data.get('id') as string,
    },
    data: {
      name: data.get('name') as string,
    }
  })
  revalidatePath('/clients')
}

export async function updateActivity(data: FormData) {
  console.log('data server action', data)
  await prisma?.activity.update({
    where: {
      id: data.get('id') as string,
    },
    data: {
      name: data.get('name') as string,
      startAt: data.get('startAt') as string,
      endAt: data.get('endAt') as string,
    }
  })
  revalidatePath('/track')
}
export async function deleteActivity(id: string) {
  await prisma?.activity.delete({
    where: {
      id: id,
    },

  })
  revalidatePath('/track')
}

export async function deleteClient(id: string) {
  await prisma?.client.delete({
    where: {
      id: id,
    },

  })
  revalidatePath('/clients')
}

export async function updateActivityName(data: FormData) {
  console.log('data server action', data)
  await prisma?.activity.update({
    where: {
      id: data.get('activityId') as string,
    },
    data: {
      name: data.get('activityName') as string,
      // startAt: data.get('startAt') as string,
      // endAt: data.get('endAt') as string,
    }
  })
  revalidatePath('/track')
}
