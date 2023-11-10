import { currentProfile } from "@/lib/current-profile";
import { UserButton, currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

interface NavbarProps {}



const Navbar = async () => {

  const user = await currentUser() || null;
  const name= `${user?.firstName} ${user?.lastName}`;
  return (
<nav className="fixed w-full h-[35px] flex items-center justify-between px-2  bg-zinc-200 shadow-xl">
   
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
   <Link className="rounded-md px-2 py-1 flex items-center justify-center shadow-md text-xs  font-semibold hover:scale-110 hover:bg-white text-emerald-500 bg-zinc-100/80" href="/sign-in">
     Sign In
   </Link>
   <Link  className="rounded-md px-2 py-1 flex items-center justify-center shadow-md text-xs  font-semibold hover:scale-110 hover:bg-white text-emerald-500 bg-zinc-100/80" href="/sign-up">
     Sign up
   </Link>
   <UserButton afterSignOutUrl="/"/>
 </div>) 
        : (
          <div>
            <div className="flex justify-between items-center w-full gap-1 p-2">
              
            <h1 className="text-xs md:text-md font-bold">Welcome</h1> 
            <h1 className="text-xs md:text-md font-bold  bg-gradient-to-tr from-green-500 to-green-700 bg-clip-text text-transparent"> {name}!</h1>
            

          <UserButton afterSignOutUrl="/" 
            appearance={{
              elements: {
                userButtonPopoverCard:"pointer-events-auto",
              }
            }}
          
          />
          </div>
          


          
         
        
          </div>
        )} 
</nav>
  );
}
export default Navbar;