
import { NavbarMenu } from '@/components/Navbar';
import {Button} from '@nextui-org/button';
import { Navbar } from "@nextui-org/navbar";
import { auth, signIn, signOut } from 'auth';
import prisma from '@/lib/prisma';
import { faker } from '@faker-js/faker';
import { ButtonServerAction } from '@/components/ui/ButtonServerAction';
import { revalidatePath } from 'next/cache';


export default async function Home() {

 const data = await auth()
 const generateProjects = async () => {
  'use server'
 if (data) {
  await prisma.client.createMany({
    data: [
 {name:'client1',
  userId:'clutmsom000008r8uh08b2f8v',
 },
 {name:'client2',
 userId:'clutmsom000008r8uh08b2f8v',
 }
    ]
   })
   revalidatePath('/')
  }
 } 
  
  
 const clients = await prisma.client.findMany()
 // console.log('user',user)
  return (
   <>
   <main className="flex flex-col flex-grow">
    <ButtonServerAction onClick={generateProjects}>Generate</ButtonServerAction>
    {clients.map((client) => {
     return (
      <div key={client.id}>
       {`user id is : ${client.userId}`}
      </div>
     )
    })}
    

   
   </main>
   </>
  );
}
