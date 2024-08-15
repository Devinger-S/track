import { Input } from "@/components/ui/input";
import { onCreateClient } from "../actions";
import { Button } from "@/components/ui/button";
import { OptimisticComponent } from "@/components/optimisticComponent";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";


export default async function TestPage() {

        const session: any = await auth()
        console.log(`here is sesion from test `, session)
const clients = await prisma.client.findMany({
    where: {
      userId: session?.user?.id
    }
  })
  return (
    <>
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
            <Input type="text" name="id" defaultValue={session.user.id } className="hidden" />
          </div>
          <Button className='w-full sm:w-fit' type="submit">Create</Button>
        </form>
      </div>
      <OptimisticComponent clients={clients} />
    </section>
    </>
  )
}

