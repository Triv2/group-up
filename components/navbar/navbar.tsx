import { currentProfile } from "@/lib/current-profile";
import { UserButton, currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

interface NavbarProps {}



const Navbar = async () => {

  const user = await currentUser() || null;
  const name= ""
  return (
<nav className="fixed w-full h-[35px] flex items-center justify-between px-10 bg-zinc-200/90 shadow-xl">
    <div className="flex items-center justify-center gap-1">
      <Image src="/logo.png" width={30} height={30} alt="logo" />
      <p className="font-bold text-lg font-sans bg-gradient-to-r from-orange-400 to-green-500 bg-clip-text text-transparent">Group-Up</p>
    </div>

    {!user &&(
    <div className="flex items-center justify-center gap-1">
      <Link className="rounded-md px-2 py-1 flex items-center justify-center shadow-md text-xs  font-semibold hover:scale-110 hover:bg-white text-emerald-500 bg-zinc-100/80" href="/sign-in">
        Sign In
      </Link>
      <Link  className="rounded-md px-2 py-1 flex items-center justify-center shadow-md text-xs  font-semibold hover:scale-110 hover:bg-white text-emerald-500 bg-zinc-100/80" href="/sign-up">
        Sign up
      </Link>
      <UserButton afterSignOutUrl="/"/>
    </div>
    )}

{!user ? (
  <div className="flex items-center justify-center flex-col">
        <h1 className=" text-md font-bold">Welcome</h1> <h1 className="text-md font-bold  bg-gradient-to-tr from-green-400 to-green-500 bg-clip-text text-transparent"> {name}!</h1>
        
        </div>) 
        : (
          <div>
            <div className="flex justify-between items-center w-full gap-5 p-2">
              <div>
            <h1 className=" text-md font-bold">Welcome</h1> 
            <h1 className="text-md font-bold  bg-gradient-to-tr from-green-500 to-green-700 bg-clip-text text-transparent"> {name}!</h1>
            </div>

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