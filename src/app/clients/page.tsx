import { auth } from "@/auth"
import { Button } from "@/components/ui/button";
import prisma from '@/lib/prisma';
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ClientPage(props:any) {
 const session = await auth()
 const clients = await prisma.client.findMany({
		where: {
			userId: session?.user?.id
		}
	})
 if (clients.length > 0) {
		redirect(`/clients/${clients[0].id}`)
	}
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
  <section className="min-h-screen  max-w-lg flex  m-auto">
  {clients.length > 0 ? 
  <pre>{JSON.stringify(clients,null,2)}</pre>
  :
  <Blankslate />

  }
  </section>
 )
}