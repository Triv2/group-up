import Navbar from "@/components/navbar/navbar";
import NavButton from "@/components/ui/nav-button";

import { currentUser } from "@clerk/nextjs";
import { Divider } from "@nextui-org/react";
import { MousePointerClick } from "lucide-react";
import Image from "next/image";

interface LandingPageProps {}

const LandingPage = async () => {
  const user= await currentUser() || null;
  return (
    <div className="h-screen w-full">

<Navbar/>

<div className="min-h-screen h-auto flex items-center justify-center  bg-zinc-900/80 w-full">
 

<div className="flex flex-col items-center justify-center h-auto ">


<div className="flex flex-col items-center justify-center gap-1 w-full shadow-xl bg-gradient-to-r from-orange-700/70 via-zinc-900 to-green-700/70 p-7 rounded-md">
  <h1 className="font-bold text-3xl md:text-8xl font-sans bg-gradient-to-r from-orange-400 to-green-500 bg-clip-text text-transparent drop-shadow-2xl ">Group-Up</h1>
  <h1 className="font-bold text-2xl md:text-7xl font-sans bg-gradient-to-r from-orange-400 to-green-500 bg-clip-text text-transparent drop-shadow-2xl">Plan Events</h1>
  <h1 className="font-bold text-xl md:text-5xl font-sans bg-gradient-to-r from-orange-400 to-green-500 bg-clip-text text-transparent  drop-shadow-2xl">Make Friends</h1>
  <h1 className="font-bold text-lg md:text-2xl font-sans bg-gradient-to-r from-orange-400 to-green-500 bg-clip-text text-transparent  drop-shadow-2xl pb-10">Play Games & More!</h1>

  
  {user ? (<NavButton
  href="/dashboard"
  text="Get Started"
  className="rounded-md shadow-sm shadow-emerald-500 flex items-center justify-center shadow-smpx-3 py-2 gap-2  
  hover:scale-110 dark:hover-bg-zinc-500 dark:hover:text-emerald-300 font-semibold group"
  icon={<MousePointerClick className="h-5 w-5 text-orange-500 group-hover:text-orange-300"/>}
/>):(<NavButton
  href="/sign-up"
  text="Get Started"
  className="rounded-md flex items-center justify-center shadow-sm px-3 py-2 gap-2 
    hover:scale-110 dark:hover-bg-zinc-500  shadow-emerald-400 dark:hover:text-emerald-300 font-semibold group"
  icon={<MousePointerClick className="h-5 w-5 text-orange-500 group-hover:text-orange-300"/>}
/>)}

</div>




</div>

</div>




</div>
  );
}
export default LandingPage;