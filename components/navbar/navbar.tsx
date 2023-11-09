import Image from "next/image";

interface NavbarProps {}

const Navbar = () => {
  return (
<nav className="sticky w-full h-50 flex items-center justify-between px-10 bg-zinc-200/80">
    <div>
      <Image src="/images/logo.png" width={25} height={25} alt="logo" />
      <p>Logo Text</p>
    </div>
    <div>
      NavButtons
    </div>
</nav>
  );
}
export default Navbar;