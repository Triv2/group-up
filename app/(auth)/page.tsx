import Feature from "@/components/feature";

import Navbar from "@/components/navbar/navbar";
import NavButton from "@/components/ui/nav-button";
import localFont from "next/font/local";
import { currentUser } from "@clerk/nextjs";
import { Divider } from "@nextui-org/react";
import { Combine, Contact2, MessagesSquare, MousePointerClick, Users } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LandingPageProps {}
const headingFont = localFont({
  src: "../../public/fonts/ARavager.woff2",
});

const LandingPage = async () => {
  const user = (await currentUser()) || null;
  return (
    <div className="h-full w-full">
      <Navbar />

      <div className="min-h-screen h-auto flex items-center justify-center z-10 bg-zinc-900/80 w-full">
        <div className="flex flex-col items-center justify-center z-10 h-auto w-full pt-10">
          <div className="flex flex-col items-center justify-center gap-5 w-full z-10 sm:w-[80%] px-2 sm:px-10 pb-3 rounded-md">
            <div className="flex items-center md:flex-row flex-col gap-2 z-10">
              <Image src="/mlogo.png" alt="logo" width={250} height={250} />
              <div className="flex flex-col  px-5">
                <h1
                  className={cn(
                    " text-3xl tracking-wider   md:text-6xl lg:7xl xl:text-8xl font-sans bg-gradient-to-r from-sky-500  to-slate-300 bg-clip-text text-transparent drop-shadow-2xl",
                    headingFont.className
                  )}
                >
                  Group-Up
                </h1>
                <h2 className="font-semibold text-xl md:text-2xl lg:text-3xl font-sans bg-gradient-to-r from-sky-600/80  to-slate-200/80 bg-clip-text text-transparent drop-shadow-2xl pb-5">
                  An open-source social grouping application!
                </h2>
                
              </div>
            </div>
            <div className="flex items-center flex-col z-10 justify-center gap-5">
            {user ? (
                  <NavButton
                    href="/dashboard"
                    text="Get Started for FREE"
                    className="rounded-md shadow-sm shadow-slate-500 flex items-center max-w-[200px] justify-center shadow-smpx-3 py-2 gap-2  
  hover:scale-110 dark:hover-bg-zinc-500 dark:hover:text-sky-300 font-semibold group"
                    icon={
                      <MousePointerClick className="h-5 w-5 text-sky-400 group-hover:text-sky-200" />
                    }
                  />
                ) : (
                  <NavButton
                    href="/sign-up"
                    text="Get Started"
                    className="rounded-md flex items-center max-w-[200px] justify-center shadow-sm px-3 py-2 gap-2 
    hover:scale-110 dark:hover-bg-zinc-500  shadow-slate-400 dark:hover:text-sky-300 font-semibold group"
                    icon={
                      <MousePointerClick className="h-5 w-5 text-sky-400 group-hover:text-sky-200" />
                    }
                  />
                )}
            <div className="grid md:grid-cols-2 p-5 gap-5 rounded-md ">
              <Feature
                title="Create Groups"
                icon={<Users className="h-5 w-5" />}
                description="Create unlimited groups!"
              />
              <Feature
                title="Join Groups"
                icon={<Combine className="h-5 w-5" />}
                description="Join as many groups as you would like!"
              />
              <Feature
                title="Make Friends"
                icon={<Contact2 className="h-5 w-5" />}
                description="Easily add friends!"
              />
              <Feature
                title="Communicate"
                icon={<MessagesSquare className="h-5 w-5" />}
                description="No limits on converstaions and threads!"
              />
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LandingPage;
