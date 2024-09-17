import { auth } from "@/auth"

import prisma from '@/lib/prisma';
import { redirect } from "next/navigation";
import { ClientTable } from "./clientTable";

export default async function ClientPage() {
const session = await auth() 
        const userId = session?.user?.id
        
      if (!userId) {
    redirect('/'); 
  }
  

  const clients = await prisma.client.findMany({
    where: {
      userId,
    },
    include: {
      project:true,
      activity:true
    }
  })


  return (
    <main id='clientsPage' className="h-screen p-4 flex-col   flex  ">
      
      
        {/* <ClientRows clients = {clients} /> */}
        <ClientTable clients={clients} />
        {/* <DataTable clients={clients} columns={columnsClients} /> */}
        {/* <OptimisticComponent clients={clients} session={session} /> */}
      
      
     
    </main>
  )
}

