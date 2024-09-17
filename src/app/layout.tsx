import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/utils/cn";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/toaster"
import { Metadata } from "next";
import SideBarNav from "@/components/SideBarNav";
import { Avatar } from '@/components/Avatar'
import { ThemeToggle } from "@/components/theme-toggle"
import { auth } from 'auth'
import { ButtonServerAction } from '@/components/ui/ButtonServerAction'
import { LogIn } from '@/app/actions'
import { SessionProvider } from "next-auth/react"

export const metadata: Metadata = {
  title: "Track",
  description: "Track your time",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth()

  return (
    <html lang="en" suppressHydrationWarning className=" antialiased">
      <body className={cn(' min-h-screen flex w-full flex-col   relative ',)}>
        <Providers>
          <SessionProvider session={session}>
 <section id='navbarforMobile' className='sm:hidden px-2 max-w-screen w-screen fixed h-16 flex items-center  top-0'>
            <SideBarNav />
            <span className="flex-grow" />
            <ThemeToggle />
            {session && session.user ?
              <Avatar user={session.user} />
              :
              <ButtonServerAction onClick={LogIn} >Log In</ButtonServerAction>


            }
          </section>
          <section className="hidden sm:flex"><SideBarNav /></section>
          <section id='mainContent' className='sm:ml-16 grow  mt-16 sm:mt-0'>


            {children}
          </section>

          </SessionProvider>
         

        </Providers>
        {/* <ThemeToggle className=''/> */}
        <Toaster />
      </body>
    </html>
  );
}
