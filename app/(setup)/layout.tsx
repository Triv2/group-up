import { MobileSidebar } from "@/components/sidebar/mobile-sidebar";
import SideBar from "@/components/sidebar/sidebar";



const SetupLayout = async ({
  children
}:{
  children: React.ReactNode
}) => {
  return (
    <div className="h-full">
    <div className="hidden md:flex h-full w-[148px] z-30 flex-col fixed inset-y-0">
     <SideBar/>
    </div>
    {/* <div className="h-full flex items-center justify-center p-4">
    <MobileSidebar/>
    </div> */}
    <main className=" h-full">
      
    {children}
    </main>
  </div>
  );
}
export default SetupLayout;