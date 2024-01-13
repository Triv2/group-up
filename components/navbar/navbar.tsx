import { UserButton, currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { Button } from "../ui/button";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";

const headingFont = localFont({
  src: "../../public/fonts/ARavager.woff2",
});

const Navbar = async () => {
  const user = (await currentUser()) || null;

  return (
    <nav className="fixed w-full h-[50px] flex items-center justify-between px-2 z-50 bg-gradient-to-b from-zinc-700 to-slate-800 shadow-xl ">
      {!user ? (
        <Link className="flex items-center justify-center gap-1" href="/">
          <Image src="/mlogo.png" width={40} height={40} alt="logo" />
          <p
            className={cn(
              "font-bold text-md md:text-3xl font-sans bg-gradient-to-r from-sky-400 to-slate-300 bg-clip-text text-transparent",
              headingFont.className
            )}
          >
            Group-Up
          </p>
        </Link>
      ) : (
        <Link
          className="flex items-center justify-center gap-1"
          href="/dashboard"
        >
          <Image src="/mlogo.png" width={40} height={40} alt="logo" />
          <p
            className={cn(
              "font-bold text-md md:text-3xl font-sans bg-gradient-to-r from-sky-500  to-slate-300 bg-clip-text text-transparent",
              headingFont.className
            )}
          >
            Group-Up
          </p>
        </Link>
      )}

      {!user ? (
        <div className="flex items-center justify-center gap-2 pr-5">
          <Button variant="blend" asChild>
            <Link href="/sign-in">Login</Link>
          </Button>
          <Button variant="blend" asChild>
            <Link href="/sign-up">Join</Link>
          </Button>
          <UserButton afterSignOutUrl="/" />
          <ModeToggle />
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center w-full gap-2">
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  userButtonPopoverCard: "pointer-events-auto",
                  userButtonAvatarBox: "h-6 w-6",
                },
              }}
            />

            <ModeToggle />
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
