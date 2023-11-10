import Navbar from "@/components/navbar/navbar";
import NavButton from "@/components/ui/nav-button";
import { Divider } from "@nextui-org/react";
import { MousePointerClick } from "lucide-react";
import Image from "next/image";

interface LandingPageProps {}

const LandingPage = () => {
  return (
    <div className="h-screen w-full">

<Navbar/>

<div className="min-h-screen h-auto flex items-center justify-center py-4 dark:bg-zinc-950 bg-zinc-100 w-full">
 

<div className="flex flex-col items-center justify-center h-auto pt-10 pb-10">


<div className="flex flex-col items-center justify-center py-1 gap-1 w-full">
  <h1 className="font-bold text-3xl md:text-6xl font-sans bg-gradient-to-r from-orange-400 to-green-500 bg-clip-text text-transparent drop-shadow-2xl">Group-Up</h1>
  <h1 className="font-bold text-2xl md:text-5xl font-sans bg-gradient-to-r from-orange-400 to-green-500 bg-clip-text text-transparent drop-shadow-2xl">Plan Events</h1>
  <h1 className="font-bold text-xl md:text-4xl font-sans bg-gradient-to-r from-orange-400 to-green-500 bg-clip-text text-transparent  drop-shadow-2xl">Make Friends</h1>
  <h1 className="font-bold text-lg md:text-xl font-sans bg-gradient-to-r from-orange-400 to-green-500 bg-clip-text text-transparent  drop-shadow-2xl">Play Games & More!</h1>
</div>

<div className="flex items-center justify-center">
  <Image
    src="/herogroup.png"
    width={250}
    height={250}
    alt="heroImage"
  />
  <NavButton
  href="/sign-up"
  text="Get Started"
  className="rounded-md flex items-center justify-center shadow-md px-3 py-2 gap-2 bg-zinc-200  hover:scale-110 dark:hover-bg-zinc-500 dark:hover:text-emerald-300 font-semibold group group-hover:text-emerald-300 dark:hover:bg-zinc-400 bg-gradient-to-r from-orange-400 to-green-500 bg-clip-text text-transparent"
  icon={<MousePointerClick className="h-5 w-5 text-orange-500 group-hover:text-orange-300"/>}
/>
</div>


<Divider/>
<div className="flex items-center flex-col gap-1 ">
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