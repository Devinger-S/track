import { Home, Users2, LineChart, PanelLeft, Timer } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import Link from "next/link";
import { Avatar } from '@/components/Avatar'
import { auth } from "@/auth";
import { ButtonServerAction } from './ui/ButtonServerAction'
import { LogIn } from '@/app/actions'

export default async function SideBarNav() {

  const session = await auth()

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 py-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Home</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Home</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/track"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Timer className="h-5 w-5" />
                  <span className="sr-only">Tracker</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Tracker</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/clients"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Users2 className="h-5 w-5" />
                  <span className="sr-only">Clients</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Clients</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <LineChart className="h-5 w-5" />
                  <span className="sr-only">Analytics</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Analytics</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <>
                  {session && session.user ?
                    <Avatar user={session.user} />
                    :
                    <ButtonServerAction onClick={LogIn} >?</ButtonServerAction>
                  }
                </>
              </TooltipTrigger>
              <TooltipContent side="right">avatar</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
      <Sheet >
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className=" pl-0 pt-12  sm:max-w-xs bg-muted ">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/"
              className="flex items-center gap-4 px-2.5 "
            >
              <Home className="h-5 w-5" />
              Home
            </Link>
            <Link
              href="/track"
              className="flex items-center gap-4 px-2.5 "
            >
              <Timer className="h-5 w-5" />
              Track
            </Link>
            <Link
              href="/clients"
              className="flex items-center gap-4 px-2.5 "
            >
              <Users2 className="h-5 w-5" />
              Clients
            </Link>
            <Link
              href="/analytics"
              className="flex items-center gap-4 px-2.5 "
            >
              <LineChart className="h-5 w-5" />
              Analytics

            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </>
  )
}
