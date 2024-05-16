import { SelectClient } from "@/components/tanStackTable/SelectClient";
import { ButtonServerAction } from "@/components/ui/ButtonServerAction";
import prisma from "@/lib/prisma";
import { auth } from "auth"

export default async function Test() {
 const session = await auth()
 const userId = session?.user?.id;
console.log(session)
 

 return (
  <>
  <main className="flex flex-col gap-5">
   <SelectClient  session={session}/>
   {/* <ButtonServerAction onClick={generate}>Generate</ButtonServerAction> */}
<pre>{JSON.stringify(session,null,2)}</pre>
  </main>
  </> 
 )
}