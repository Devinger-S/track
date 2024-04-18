
import Navbar from '@/components/navbar'

export default async function Home() {

 // console.log('user',user)
  return (
   <>
   <main className="flex flex-col flex-grow">
    <Navbar />
    <p>this is the home page and should be left for the description of the app and unprotected</p>
   
   </main>
   </>
  );
}
