import {Button} from '@nextui-org/button';
import { auth} from 'auth';
import prisma from '@/lib/prisma';
import { faker } from '@faker-js/faker';
import { ButtonServerAction } from '@/components/ui/ButtonServerAction';
import { revalidatePath } from 'next/cache';
import { DailyActivitiesprops, NewActivityProps } from '@/types/types';
import { Session } from 'next-auth';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from '@/components/ui/select';
import { Building2, FolderOpenDot, Pause, Play } from 'lucide-react';
import ActivityDuration from '@/components/tanStackTable/duration';
import { cn } from '@/utils/cn';
import { DataTable } from '@/components/tanStackTable/data-table';
import { columns } from '@/components/tanStackTable/columns';
import { connect } from 'http2';

export default async function Track() {
 const NewActivity = ({ activity, clients, projects }: NewActivityProps) => {

  async function upsertActivity(data: FormData) {
   'use server'
   try {
    const session = await auth()
    const userId = data.get('userId') as string
    const client = data.get('client') as string
    const project = data.get('project') as string
    console.log(data)
    if (session && session.user && session.user.id ) {
     
      await prisma.activity.create({data:{
       userId:session.user.id,
       startAt:new Date(),
       updatedAt:new Date(),
       name: data.get('name') as string

      } 
     })
    revalidatePath('/track')
   } 
   } catch (error) {
    console.error('Error in upsertActivity:', error);
   }
  
 
  }
  async function deleteACtivity(currentActivity:any) {
   'use server'
   await prisma.activity.delete({
    where:{id:currentActivity.id}
   })
  }

 
  async function stopActivity(data: FormData) {
   'use server'
   const client = data.get('client') as string
   const project = data.get('project') as string
   const activity = await prisma.activity.update({
    where: {
     id:data.get('id') as string
    },
    data: {
     endAt: new Date(),
    }
   })
   revalidatePath('/track')
 
  }
  return (
   <div id='NewActivity_wrapper' className='sticky backdrop-blur-xl  w-full px-2 md:pr-16 drop-shadow-md py-2 '>
 
    <h2 className=" mb-2 text-lg font-medium ">What are you working on?</h2>
    <form action={activity ? stopActivity : upsertActivity}>
 
     <div id='input wrapper' className="flex flex-col md:flex-row  items-center gap-4 ">
      <Input placeholder='Name your activity' required type='string' name="name" autoFocus autoComplete="name your activity" defaultValue={activity?.name || ''} />
      <Input type="hidden" name="userId" defaultValue={session?.user?.id || ''} />
      <Input type="hidden" name="id" defaultValue={activity?.id || undefined} />
 
      <ul className=" flex justify-around w-full" id="buttons-wrapper">
           <Select value='client' name="client">
        <SelectTrigger className="w-[50px]">
         <Building2  />
        </SelectTrigger>
        <SelectContent>
         <SelectGroup>
          <SelectLabel>Client</SelectLabel>
          <SelectItem value="none">None</SelectItem>
          {clients.map((client) => (
 
           <SelectItem value={client.id} key={client.id}>
            {client.name}
           </SelectItem>
          ))}
         </SelectGroup>
        </SelectContent>
       </Select>
 
       <Select name="project">
        <SelectTrigger className="w-[50px]">
         <FolderOpenDot size={32} />
        </SelectTrigger>
        <SelectContent>
         <SelectGroup>
          <SelectLabel>Project</SelectLabel>
          <SelectItem value="none">None</SelectItem>
          {projects.map((project) => (
           project.name &&
           <SelectItem value={project.id} key={project.id}>
            {project.name}
           </SelectItem>
          ))}
         </SelectGroup>
        </SelectContent>
       </Select>
 
       {activity &&
        <ActivityDuration startAt={activity.startAt.toString()} />
       }
       <Button
        className={cn('', activity ? 'bg-red-700' : 'bg-blue-900')}
        type="submit">{activity ? <Pause /> : <Play />} </Button>
      </ul>
    </div>
    </form>
   </div>
  )
 }

 const DailyActivity = ({ activities, clients, projects }: DailyActivitiesprops) => {
  return (
   <>
    <div className=" grow flex flex-col">
     <h2 className=' text-lg font-medium mb-2'>Here is what you`ve done today</h2>
     <DataTable clients={clients} projects={projects} columns={columns} data={activities} />
    </div>
   </>
  )
 
 }

 const session = await auth()
 

 const currentActivity = await prisma.activity.findFirst({
		where: {
			// tenantId: user?.tenant?.id,
			// userId: session?.user?.id,
			endAt: null,
		}
	})
 console.log('curentACtivity*******************************',currentActivity)
 const clients = await prisma.client.findMany({
		where: {
			userId: session?.user?.id
		}
	})

 const projects = await prisma.project.findMany({
		where: {
			userId: session?.user?.id
		}
	})

 const now = new Date()

 const startOfToday = new Date(
		now.getFullYear(),
		now.getMonth(),
		now.getDate()
	)

 const endOfToday = new Date(
		now.getFullYear(),
		now.getMonth(),
		now.getDate(),
		23,
		59,
		59
	)

 const dailyActivities = await prisma.activity.findMany({
		where: {
			userId: session?.user?.id,
			// userId: user?.id,
			OR: [{
				startAt: {
					equals: startOfToday,
				}
			}, {
				endAt: {
					lte: endOfToday
				}
			}],
		},
		include: {
			Client: true,   // Include the related Client if exists
			Project: true,  // Include the related Project if exists
		},
		orderBy: {
			startAt: 'desc'
		}
	})
 

 return (
  <main id='TrackPage'className="  flex  flex-col h-full border-red-700 relative   space-y-10">
  <NewActivity activity={currentActivity} clients={clients} projects={projects} />
  <div className="  flex grow   " id="activity-wrapper">
   <DailyActivity clients={clients} projects={projects} activities={dailyActivities} />

  </div>

 </main> 
 )
}
