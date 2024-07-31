
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


export default async function NewActivity({ activity, clients, projects }: NewActivityProps) {
  const session = await auth()
  // async function upsertActivity(data: FormData) {
  //   'use server'
  //   try {
  //     const userId = data.get('userId') as string
  //     const client = data.get('client') as string
  //     const project = data.get('project') as string
  //     console.log(data)
  //     if (session && session.user && session.user.id) {
  //       await prisma.activity.create({
  //         data: {
  //           userId: session.user.id,
  //           startAt: new Date(),
  //           updatedAt: new Date(),
  //           name: data.get('name') as string
  //         }
  //       })
  //       revalidatePath('/track')
  //     }
  //   } catch (error) {
  //     console.error('Error in upsertActivity:', error);
  //   }
  // }

  async function stopActivity(data: FormData) {
    'use server'
    const client = data.get('client') as string
    const project = data.get('project') as string
    const activity = await prisma.activity.update({
      where: {
        id: data.get('id') as string
      },
      data: {
        endAt: new Date(),
      }
    })
    revalidatePath('/track')

  }
  return (
    <div id='NewActivity_wrapper' className='backdrop-blur-xl  w-full p-2 md:pr-16 drop-shadow-md  '>

      <h2 className=" mb-2 hidden text-lg   md:p-2 font-medium ">What are you working on?</h2>
      <form >

        <div id='input wrapper' className="flex flex-col md:flex-row  items-center gap-4 ">
          <Input placeholder='Name your activity' required type='string' name="name" autoFocus autoComplete="name your activity" defaultValue={activity?.name || ''} />
          <Input type="hidden" name="userId" defaultValue={session?.user?.id || ''} />
          <Input type="hidden" name="id" defaultValue={activity?.id || undefined} />

          <ul className=" flex justify-between gap-4 w-full" id="buttons-wrapper">
            <Select value='client' name="client">
              <SelectTrigger className=" flex items-center justify-around min-w-16 max-w-24   md:py-4">
                <Building2 size={32} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>ClientLabel</SelectLabel>
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
              <SelectTrigger className="  flex items-center min-w-16 max-w-24 justify-around  py-4">
                <FolderOpenDot size={32} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {/* <SelectLabel>Project</SelectLabel> */}

                  <SelectItem value="none">None</SelectItem>
                  <Separator />
                  {/* <InputForm for='client' session={session} /> */}
                  <Separator />
                  {projects.map((project) => (
                    project.name &&
                    <SelectItem value={project.id} key={project.id}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <span className='grow-1 min-w-16 flex justify-center items-center'>
              {activity && <ActivityDuration startAt={activity.startAt.toString()} />}

            </span>
            {activity ? <Button variant='destructive'><Pause /></Button> : <Button><Play /></Button>}

          </ul>
        </div>
      </form>
    </div>
  )
}
