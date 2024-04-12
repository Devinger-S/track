'use client'
import React from "react";
import {Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link, Button, Avatar} from "@nextui-org/react";
import {AcmeLogo} from "@/components/ui/AcmeLogo";
// import { signIn, signOut } from "auth";
import { useSession } from "next-auth/react";
import { SignOut } from "./ui/SignOutButton";
import { SignInButton } from "./ui/SignInButton";
import Image from "next/image";

export default function NavbarNextUI({session}:any) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const menuItems = [
    "Tracker",
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "Log Out",
  ];
  
console.log(session)
  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">Tracker</p>
        </NavbarBrand>
      </NavbarContent>
      
         
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
       <NavbarItem>

       </NavbarItem>
        
        <NavbarItem>
         {session && session.user ?
         (<div className="flex gap-3">
         <SignOut />
         <Avatar showFallback isBordered color="success" 
         name={session?.user?.name ?? undefined } 
         src={session?.user?.image ?? undefined}
         />
        
         </div>)
         :
         (<>

         <div className="flex gap-3">
         <SignInButton />
         {/* <button onClick={() => signIn()}>out</button> */}
         <Avatar showFallback isBordered color="success" 
         name={session?.user?.name ?? undefined } 
         src={session?.user?.image ?? undefined}
         />

         </div>
         </>
         )}
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
