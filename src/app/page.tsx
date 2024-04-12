
import { NavbarMenu } from '@/components/Navbar';
import {Button} from '@nextui-org/button';
import { Navbar } from "@nextui-org/navbar";
import { auth, signIn, signOut } from 'auth';


export default async function Home() {
 // const session = await auth()
 // console.log('session from server comp',session)
  return (
   <>
   <main className="flex flex-col flex-grow">
    {/* <section id="navbar_wrapper" className="relative ">
     <NavbarNextUI 
     // session={session}
     /> */}
{/* {(session&&session.user) ? (<>
<form action={async () => {
 'use server' 
 await signOut()
} }><Button type='submit'>SignOut</Button></form>
</>) : (<>

<form action={async () => {
 'use server' 
 await signIn()
} }><Button type='submit'>SignIn</Button></form>
</>)} */}
   
    {/* </section> */}
   </main>
   </>
  );
}
