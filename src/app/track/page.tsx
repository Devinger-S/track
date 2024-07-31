import { auth } from 'auth';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { DailyActivitiesprops, NewActivityProps } from '@/types/types';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from '@/components/ui/select';
import { Building2, FolderOpenDot, Pause, Play } from 'lucide-react';
import ActivityDuration from '@/components/tanStackTable/duration';
import { DataTable } from '@/components/tanStackTable/data-table';
import { columns } from '@/components/tanStackTable/columnsTrack';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';


export default async function Track() {

  const NewActivity = ({ activity, clients, projects }: NewActivityProps) => {
    async function upsertActivity(data: FormData) {
      'use server'
      try {
        const session = await auth()
        if (session && session.user && session.user.id) {
          await prisma.activity.create({
            data: {
              userId: session.user.id,
              startAt: new Date(),
              updatedAt: new Date(),
              name: data.get('name') as string
            }
          })
          revalidatePath('/track')
        }
      } catch (error) {
        console.error('Error in upsertActivity:', error);
      }
    }

    async function stopActivity(data: FormData) {
      'use server'
      const project = data.get('project') as string
      const client = data.get('client') as string
      console.log(`this is client ${client}`)
      console.log(`this is project ${project}`)
      const activity = await prisma.activity.update({
        where: {
          id: data.get('id') as string
        },
        data: {
          endAt: new Date(),
          projectId: project === 'null' ? null : project, // Ensure projectId is set properly
          clientId: client === 'null' ? null : client, // Ensure projectId is set properly

        }
      })
      revalidatePath('/track')
    }

    async function onCreateClient(data: FormData) {
      'use server'
      const { user }: any = await auth()
      await prisma.client.create({
        data: {
          userId: user.id,
          name: data.get('name') as string,
          color: data.get('color') as string
        }
      })
      revalidatePath('/track')
    }
    async function onCreateProject(data: FormData) {
      'use server'
      const { user }: any = await auth()
      await prisma.project.create({
        data: {
          userId: user.id,
          name: data.get('name') as string,
        }
      })
      revalidatePath('/track')
    }
    return (

      <div id='NewActivity_wrapper' className='sticky backdrop-blur-xl  w-full px-2 md:pr-16 drop-shadow-md  '>

        <h2 className=" mb-2 text-lg md:p-2 hidden sm:block font-medium ">What are you working on?</h2>
        <form action={activity ? stopActivity : upsertActivity}>

          <div id='input wrapper' className="flex flex-col md:flex-row  items-center  ">
            <Input placeholder='Name your activity' required type='string' name="name" autoFocus autoComplete="name your activity" defaultValue={activity?.name || ''} />
            <Input type="hidden" name="userId" defaultValue={session?.user?.id || ''} />
            <Input type="hidden" name="id" defaultValue={activity?.id || undefined} />

            <ul className=" flex flex-col sm:flex-row   justify-between gap-4 w-full" id="buttons-wrapper">
              <li id='select-wrapper' className='flex gap-2  justify-center'>
                <Select name="client">
                  <SelectTrigger className=" flex items-center justify-around w-fit min-w-16 max-w-24   md:py-4">
                    <Building2 size={32} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <form action={onCreateClient}>
                        <Input placeholder='Add a client' name="name" type="text" />
                      </form>
                      <SelectItem value='null'>None</SelectItem>
                      {clients.map((client) => (

                        <SelectItem value={client.id} key={client.id}>
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <Select name="project">
                  <SelectTrigger className="  w-fit flex items-center min-w-16 max-w-24 justify-around  py-4">
                    <FolderOpenDot size={32} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <form action={onCreateProject}>
                        <Input placeholder='add a project' name="name" type="text" />
                      </form>
                      <Separator />
                      <SelectItem value="null">None</SelectItem>
                      {projects.map((project) => (
                        project.name &&
                        <SelectItem value={project.id} key={project.id}>
                          {project.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {activity ? <Button variant='destructive'><Pause /></Button > : <Button className='w-fit bg-blue-500  ' ><Play /></Button>}
              </li>
              <li id='second child' className='flex gap-4'>
                <span className='grow font-bold font-sans  min-w-16 flex justify-center items-center'>
                  {activity && <ActivityDuration startAt={activity.startAt.toString()} />}
                  {!activity && '00:00:00'}

                </span>
              </li>
            </ul>
          </div>
        </form>
      </div>
    )
  }

  const DailyActivity = ({ activity, clients, projects }: DailyActivitiesprops) => {
    // console.log(`hello from daily activities ${JSON.stringify(activity, null, 2)}`)
    return (
      <>
        <div className="flex flex-col overflow-y-auto ">
          <h2 className=' hidden text-lg sm:block font-medium mb-2 md:p-2 '>Here is what you`ve done today</h2>
          {/* <div className='grow'> */}
          <DataTable
            clients={clients}
            projects={projects}
            columns={columns} data={activity} />

          {/* </div> */}
        </div>
      </>
    )

  }

  const session = await auth()


  const currentActivity = await prisma.activity.findFirst({
    where: {
      endAt: null,
    }
  })
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

  const users = await prisma.user.findMany({
    where: {
      id: session?.user?.id,
    },
    include: {
      activity: true,
      client: true,
      project: true,
    }
  })
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
      client: true,   // Include the related Client if exists
      project: true,  // Include the related Project if exists
    },
    orderBy: {
      startAt: 'desc'
    }
  })

  return (
    <main id='TrackPage' className="  flex h-screen  flex-col  relative   space-y-4 overflow-hidden">
      <NewActivity activity={currentActivity} clients={clients} projects={projects} />
      {/* <div className="  flex grow   " id="activity-wrapper"> */}
      <DailyActivity clients={clients} projects={projects} activity={dailyActivities} />


      {/* </div> */}

    </main>
  )
}
