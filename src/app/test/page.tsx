import { Input } from "@/components/ui/input";
import { onCreateClient } from "../actions";
import { Button } from "@/components/ui/button";
import { OptimisticComponent } from "@/components/optimisticComponent";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";


export default async function TestPage() {

        const session: any = await auth()
const clients = await prisma.client.findMany({
    where: {
      userId: session?.user?.id
    }
  })
  return (
    <>
 <section className="h-screen p-4 flex-col   flex  ">
      
        <h2 className="text-lg font-medium mb-2">Create a new client</h2>
        
      
      <OptimisticComponent clients={clients}  session={session}/>
    </section>
    </>
  )
}

