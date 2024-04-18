'use client'
import React from "react";
import {Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link, Button, Avatar} from "@nextui-org/react";
import {AcmeLogo} from "@/components/ui/svg/AcmeLogo";
import { SignOut } from "./ui/SignOutButton";
import { SignInButton } from "./ui/SignInButton";

export default function NavbarNextUI({session}:any) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const menuItems = [
    "Track",
    "Profile",
    "Dashboard",
    "Analytics",
  ];
  
  return (
    <Navbar
     id="navabar"
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
         {session && session.user &&
         (<div className="md:visible flex gap-3">
         <Avatar showFallback isBordered color="success" 
         name={session?.user?.name ?? undefined } 
         src={session?.user?.image ?? undefined}
         />
         </div>)
         }
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 0 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              href={`/${item}`.toLowerCase()}
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarItem>
         {session && session.user ?
         (<div className="md:visible flex gap-3">
         <SignOut />
         <Avatar showFallback isBordered color="success" 
         name={session?.user?.name ?? undefined } 
         src={session?.user?.image ?? undefined}
         />
         </div>)
         :

         (<>
         <SignInButton />
         </>

         )}
        </NavbarItem>
      </NavbarMenu>
    </Navbar>
  );
}
