import { ButtonServerAction } from "@/components/ui/ButtonServerAction";
import prisma from "@/lib/prisma";
import { auth } from "auth"

export default async function Test() {
 const session = await auth()
 const userId = session?.user?.id;

 async function createProject(userId: string, name: string) {
  'use server'
  return await prisma.project.create({
     data:{userId,name,}
  });
}
const generate = async () => {
 'use server'
 // if (session?.user?.id !== undefined) {
  if (userId) {
   await createProject(userId, 'name');
 } else {
   console.error('User ID is undefined');
 }
};
 return (
  <>
  <main className="flex flex-col gap-5">
   <ButtonServerAction onClick={generate}>Generate</ButtonServerAction>
<pre>{JSON.stringify(session,null,2)}</pre>
  </main>
  </> 
 )
}