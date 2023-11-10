import Image from "next/image";
import Link from "next/link";

interface NavbarProps {}

const Navbar = () => {
  return (
<nav className="sticky w-full h-[35px] flex items-center justify-between px-10 bg-zinc-200/90 shadow-xl">
    <div className="flex items-center justify-center gap-1">
      <Image src="/logo.png" width={25} height={25} alt="logo" />
      <p>Group Up</p>
    </div>
    <div>
      <Link href="/sign-in">
        Sign In
      </Link>
      <Link href="/sign-up">
        Sign up
      </Link>
    </div>
</nav>
  );
}
export default Navbar;