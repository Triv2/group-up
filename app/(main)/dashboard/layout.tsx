import Navbar from "@/components/navbar/navbar";
import { MobileSidebar } from "@/components/sidebar/mobile-sidebar";
import Sidebar from "@/components/sidebar/sidebar";
import { allGroups } from "@/lib/all-groups";
import { allMembers } from "@/lib/all-members";
import { allNoncreatedJoinedGroups } from "@/lib/all-noncreated-joined-groups";
import { currentCreatedGroups } from "@/lib/current-created-groups";
import { currentProfile } from "@/lib/current-profile";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";


const DashboardLayout = async  ({
  children
}:{
  children: React.ReactNode
}) => {

  const user = await currentUser();
  const userCreatedGroups= await currentCreatedGroups();
  const nonUserCreatedGroups= await allNoncreatedJoinedGroups();
  const members= await allMembers();
  if (!user) { redirectToSignIn(); return null; }
  const profile = await currentProfile();
  const userName= `${user?.firstName} ${user?.lastName}`;
  const groups= await allGroups();

  return (
    <div className="h-full">
       <Navbar/>
       <div className="md:hidden h-full mt-[1rem]  z-30 flex-col fixed inset-y-0">
       <MobileSidebar
       userCreatedGroups={userCreatedGroups}
       nonUserCreatedGroups={nonUserCreatedGroups}
       members={members}
       profile={profile}
       name={userName}
       />
       </div>
      <div className="hidden bg-zinc-200/80 mt-[50px]  md:flex h-full w-[160px] z-30 flex-col fixed inset-y-0">
      <Sidebar
      allGroups={groups}
      userCreatedGroups={userCreatedGroups}
      nonUserCreatedGroups={nonUserCreatedGroups}
      members={members}
      profile={profile}
      name={userName}
     />
       
      </div>
      <main className=" h-full">
      {children}
      </main>
    </div>
  );
}
export default DashboardLayout;