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

<div className="min-h-screen h-auto flex items-center justify-center  dark:bg-zinc-950 bg-zinc-100 w-full">
 

<div className="flex flex-col items-center justify-center h-auto ">


<div className="flex flex-col items-center justify-center py-1 gap-1 w-full">
  <h1 className="font-bold text-3xl md:text-8xl font-sans bg-gradient-to-r from-orange-400 to-green-500 bg-clip-text text-transparent drop-shadow-2xl ">Group-Up</h1>
  <h1 className="font-bold text-2xl md:text-7xl font-sans bg-gradient-to-r from-orange-400 to-green-500 bg-clip-text text-transparent drop-shadow-2xl">Plan Events</h1>
  <h1 className="font-bold text-xl md:text-5xl font-sans bg-gradient-to-r from-orange-400 to-green-500 bg-clip-text text-transparent  drop-shadow-2xl">Make Friends</h1>
  <h1 className="font-bold text-lg md:text-2xl font-sans bg-gradient-to-r from-orange-400 to-green-500 bg-clip-text text-transparent  drop-shadow-2xl">Play Games & More!</h1>
</div>

<div className="flex items-center justify-center">
  <Image
    src="/herogroup.png"
    width={250}
    height={250}
    alt="heroImage"
  />
  {user ? (<NavButton
  href="/dashboard"
  text="Get Started"
  className="rounded-md flex items-center justify-center shadow-smpx-3 py-2 gap-2 bg-zinc-200 dark:shadow-white hover:scale-110 dark:hover-bg-zinc-500 dark:hover:text-emerald-300 font-semibold group group-hover:text-emerald-300 dark:hover:bg-zinc-400 bg-gradient-to-r from-orange-400 to-green-500 bg-clip-text text-transparent"
  icon={<MousePointerClick className="h-5 w-5 text-orange-500 group-hover:text-orange-300"/>}
/>):(<NavButton
  href="/sign-up"
  text="Get Started"
  className="rounded-md flex items-center justify-center shadow-sm px-3 py-2 gap-2 bg-zinc-200  dark:shadow-white hover:scale-110 dark:hover-bg-zinc-500 dark:hover:text-emerald-300 font-semibold group group-hover:text-emerald-300 dark:hover:bg-zinc-400 bg-gradient-to-r from-orange-400 to-green-500 bg-clip-text text-transparent"
  icon={<MousePointerClick className="h-5 w-5 text-orange-500 group-hover:text-orange-300"/>}
/>)}

</div>


<Divider/>
<div className="flex items-center flex-col gap-1 font-bold text-md ">
<h2>Welcome to the internets hottest new grouping application.</h2>
<h3>Align with groups that have your interests quickly.</h3>
<h4>Plan events with your friends in a public or private setting.</h4>
<h5>and much... much... more.</h5>
</div>

</div>

</div>




</div>
  );
}
export default LandingPage;