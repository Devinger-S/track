import { auth } from "@/auth"

import { DataTable } from "@/components/tanStackTable/data-table";
import { Button } from "@/components/ui/button";
import prisma from '@/lib/prisma';
import Link from "next/link";
import { redirect } from "next/navigation";
import { columnsClients } from '@/components/tanStackTable/columsClients';
import { revalidatePath } from "next/cache";
import { Input } from "@/components/ui/input";

export default async function ClientPage(props: any) {

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
    revalidatePath('/clients')
    // redirect('/clients')
  }

  const session = await auth()
  const clients = await prisma.client.findMany({
    where: {
      userId: session?.user?.id
    }
  })

  const Blankslate = () => {
    return (
      <div className="flex flex-col items-center gap-4 p-4 rounded-lg ">
        <h2 className="text-lg font-semibold">Create a Client</h2>
        <p>
          A client represents an entity that you are doing work for. Clients often
          have many projects you do for them. Create a client to keep your work
          organized.
        </p>
        <Button asChild>
          <Link href="/clients/new">Create</Link>
        </Button>
      </div>
    )
  }


  return (
    <section className="h-screen p-4 flex-col   flex  ">
      <div className="">
        <h2 className="text-lg font-medium mb-2">Create a new client</h2>
        <form action={onCreateClient} className="flex flex-col sm:flex-row w-full items-center gap-4">
          <div className="flex w-full  place-self-start ">

            <Input
              type="text"
              name="name"
              placeholder="Client name"
              className="grow"
            />

            <Input type="color" name="color" placeholder="Color" className="w-12" />
          </div>
          <Button className='w-full sm:w-fit' type="submit">Create</Button>
        </form>
      </div>
      <DataTable
        columns={columnsClients} data={clients} />
      {clients.length > 0 ??
        <Blankslate />
      }
    </section>
  )
}
