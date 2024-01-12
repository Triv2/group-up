import { currentProfile } from "@/lib/current-profile";
import { UserButton, currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { Button } from "../ui/button";

interface NavbarProps {}



const Navbar = async () => {

  const user = await currentUser() || null;
  const name= `${user?.firstName} ${user?.lastName}`;
  return (
<nav className="fixed w-full h-[50px] flex items-center justify-between px-2 z-50 bg-gradient-to-r from-orange-700/70 via-zinc-900 to-green-800/70 shadow-xl">
   
    {!user ? (
      <Link className="flex items-center justify-center gap-1" href="/">  
      <Image src="/logo.png" width={40} height={40} alt="logo" />
      <p className="font-bold text-md md:text-3xl font-sans bg-gradient-to-r from-orange-400 to-green-500 bg-clip-text text-transparent">Group-Up</p>
    </Link>
    ):(
  <Link className="flex items-center justify-center gap-1" href="/dashboard">  
      <Image src="/logo.png" width={40} height={40} alt="logo" />
      <p className="font-bold text-md md:text-3xl font-sans bg-gradient-to-r from-orange-400 to-green-500 bg-clip-text text-transparent">Group-Up</p>
    </Link>
    )}
   

{!user ? (
   <div className="flex items-center justify-center gap-2 pr-5">
    <Button variant="blend" asChild>
   <Link  href="/sign-in">
     Login
   </Link>
   </Button>
   <Button variant="blend" asChild>
   <Link   href="/sign-up">
     Join
   </Link>
   </Button>
   <UserButton afterSignOutUrl="/"/>
   <ModeToggle/>
 </div>) 
        : (
          <div>
            <div className="flex justify-between items-center w-full gap-2">
             
          
          <UserButton afterSignOutUrl="/" 
            appearance={{
              elements: {
                userButtonPopoverCard:"pointer-events-auto",
                userButtonAvatarBox: "h-6 w-6",
              }
            }}
          
          />
          
          <ModeToggle/>
          </div>
          


          
         
        
          </div>
        )} 
</nav>
  );
}
export default Navbar;