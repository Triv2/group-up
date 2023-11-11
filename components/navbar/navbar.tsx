import { currentProfile } from "@/lib/current-profile";
import { UserButton, currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

interface NavbarProps {}



const Navbar = async () => {

  const user = await currentUser() || null;
  const name= `${user?.firstName} ${user?.lastName}`;
  return (
<nav className="fixed w-full h-[35px] flex items-center justify-between px-2 z-50 bg-zinc-200 dark:bg-zinc-700 shadow-xl">
   
    {!user ? (
      <Link className="flex items-center justify-center gap-1" href="/">  
      <Image src="/logo.png" width={30} height={30} alt="logo" />
      <p className="font-bold text-md md:text-lg font-sans bg-gradient-to-r from-orange-400 to-green-500 bg-clip-text text-transparent">Group-Up</p>
    </Link>
    ):(
  <Link className="flex items-center justify-center gap-1" href="/dashboard">  
      <Image src="/logo.png" width={30} height={30} alt="logo" />
      <p className="font-bold text-md md:text-lg font-sans bg-gradient-to-r from-orange-400 to-green-500 bg-clip-text text-transparent">Group-Up</p>
    </Link>
    )}
   

{!user ? (
   <div className="flex items-center justify-center gap-1">
   <Link className="rounded-md px-2 py-1 flex items-center justify-center shadow-md text-xs  font-semibold hover:scale-110 hover:bg-white dark:bg-zinc-500 dark:hover:text-emerald-300/80 dark:hover:bg-zinc-400 text-emerald-600 hover:text-emerald-400 dark:text-emerald-400 bg-zinc-100/80" href="/sign-in">
     Login
   </Link>
   <Link  className="rounded-md px-2 py-1 flex items-center justify-center shadow-md text-xs  font-semibold hover:scale-110 hover:bg-white dark:bg-zinc-500 dark:hover:text-emerald-300/80 dark:hover:bg-zinc-400 text-emerald-600 hover:text-emerald-400 dark:text-emerald-400 bg-zinc-100/80" href="/sign-up">
     Join
   </Link>
   <UserButton afterSignOutUrl="/"/>
   <ModeToggle/>
 </div>) 
        : (
          <div>
            <div className="flex justify-between items-center w-full gap-2 p-2">
              
            <h1 className="text-xs md:text-md font-bold hidden sm:block">Welcome</h1> 
            <h1 className="text-xs md:text-md font-bold  bg-gradient-to-tr from-green-500 to-green-700 bg-clip-text text-transparent"> {name}!</h1>
            
          
          <UserButton afterSignOutUrl="/" 
            appearance={{
              elements: {
                userButtonPopoverCard:"pointer-events-auto",
                userButtonAvatarBox: "h-4 w-5",
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