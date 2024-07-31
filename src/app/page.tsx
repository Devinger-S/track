import { LogOut } from '@/app/actions'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ButtonServerAction } from '@/components/ui/ButtonServerAction'
import { LogIn } from '@/app/actions'
import { auth } from "@/auth"

export default async function Home() {

  const session = await auth()
  return (
    <>
      <main className="flex justify-start items-center h-screen flex-col flex-grow">
        <Card className="shadow-lg ">
          <CardHeader>
            <CardTitle>Welcome to Tracker</CardTitle>
            <CardDescription>
              Effortlessly Track Your Time, Manage Projects, and Invoice Clients
            </CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className='text-xl font-semibold '>
              Freelance Tracker is the ultimate tool for freelancers to streamline their workflow:
            </h3>
            <ol className='list-decimal list-inside space-y-2 '>
              <li>
                <span className='font-medium'>Track Time:</span> Accurately log the hours you spend on each activity.
              </li>
              <li>
                <span className='font-medium'>Manage Clients and Projects:</span> Easily create and organize your clients and projects.
              </li>
              <li>
                <span className='font-medium'>Analytics:</span> Gain insights with monthly summaries of all your activities.
              </li>
              <li>
                <span className='font-medium'>Billing Made Simple:</span> Generate and send detailed invoices to your clients.
              </li>
            </ol>
          </CardContent>
          <CardFooter className="flex justify-between">
            {session && session.user && <ButtonServerAction variant="destructive" onClick={LogOut}>Log Out</ButtonServerAction>}
            {!session?.user && <ButtonServerAction onClick={LogIn}>Log In</ButtonServerAction>}
          </CardFooter>
        </Card>
      </main>
    </>
  );
}
