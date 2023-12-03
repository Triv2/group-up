import Navbar from "@/components/navbar/navbar";
import { MobileSidebar } from "@/components/sidebar/mobile-sidebar";
import Sidebar from "@/components/sidebar/sidebar";
import { allGroups } from "@/lib/all-groups";
import { allMembers } from "@/lib/all-members";
import { allNoncreatedJoinedGroups } from "@/lib/all-noncreated-joined-groups";
import { currentCreatedGroups } from "@/lib/current-created-groups";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import {  MessageThread } from "@prisma/client";


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
  const friends= await db.profile.findMany({
    where: {
      id: {
        in: profile?.friendIds}
       }
    });
  const allMessageThreads:MessageThread[]= await db.messageThread.findMany({
      where:{
        id:{
          in: profile?.messageThreadIds
        }
      }
  })

  return (
    <div className="h-full">
       <Navbar/>
       <div className="md:hidden h-full mt-[2rem]  z-30 flex-col fixed inset-y-0">
       <MobileSidebar
       allFriends={friends}
       allGroups={groups}
       userCreatedGroups={userCreatedGroups}
       nonUserCreatedGroups={nonUserCreatedGroups}
       members={members}
       profile={profile}
       name={userName}
       />
       </div>
      <div className="hidden bg-zinc-200/80 mt-[3rem]  md:flex h-full w-[160px] z-30 flex-col fixed inset-y-0">
      <Sidebar
      allFriends={friends}
      allGroups={groups}
      allMessageThreads={allMessageThreads}
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