import Link from 'next/link'
import { Avatar } from '@/components/Avatar'
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu } from 'lucide-react'
import NavBarMenu from './NavbarMenu'
import { auth } from 'auth'
import { ButtonServerAction } from './ui/ButtonServerAction'
import { LogIn } from '@/app/actions'
import { AcmeLogo } from './ui/svg/AcmeLogo'
import { Separator } from './ui/separator'

const links = [
	{ href: '/track', label: 'Track' },
	{ href: '/analytics', label: 'Analytics' },
		{ href: '/bilings', label: 'Bilings' },
	// { href: '/clients', label: 'Clients' },
	// { href: '/projects', label: 'Projects' }
]

const Navbar = async () => {
 const session = await auth()

	return (
		<>
			<section id='navbar' className=" backdrop-blur-lg z-10     p-2 sticky  inset-0">
				<div className=" flex items-center ">

					<NavBarMenu>
     <Link  className="  " href="/">
						<Menu className='md:hidden ' />
     {/* <AcmeLogo /> */}
     </Link>

					</NavBarMenu>

     

					<Link href="/track" className=" hidden md:relative  rounded hover:bg-slate-100">
						<span className="font-semibold">Time Tracker</span>
      {/* <AcmeLogo /> */}
					</Link>
					<nav className=''>
						<ul className="hidden md:flex items-center gap-4">
							{links.map(({ href, label }) => (
								<li key={href}>
									<Link
										className="px-2 py-1 focus:bg-slate-100 text-blue-500 rounded hover:bg-slate-100 hover:text-blue-600"
										href={href}
									>
										{label}
									</Link>
								</li>
							))}
						</ul>
					</nav>
					<span className="flex-grow" />
					<ThemeToggle />
					{session && session.user ?
						<Avatar user={session.user} /> 
      : 
      <ButtonServerAction onClick={LogIn} >Log In</ButtonServerAction>


					}

				</div>
    <Separator />

			</section>
		</>
	)
}

export default Navbar