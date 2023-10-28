import { currentProfile } from "@/lib/current-profile";
import { UserButton, currentUser, redirectToSignIn } from "@clerk/nextjs";
import { Divider } from "@nextui-org/react";
import ProfileSummary from "../profile-summary";
import { currentGroups } from "@/lib/current-groups";
import { currentCreatedGroups } from "@/lib/current-created-groups";
import { allGroups } from "@/lib/all-groups";
import SidebarController from "./sidebar-controller";
import { allMembers } from "@/lib/all-members";

interface SideBarProps {}


const SideBar = async () => {
  const user = await currentUser();
  const profileGroups= await currentGroups();
  const userCreatedGroups= await currentCreatedGroups();
  const members= await allMembers();
  const groups = await allGroups();

  if (!user) { redirectToSignIn(); return null; }

  const profile = await currentProfile();
  return (
<div className="w-[148px] bg-zinc-100/80 h-full  shadow-md">
{!profile ? (
        <h1 className=" text-md font-bold">Welcome {`${user?.firstName} ${user?.lastName}`}!</h1>) 
        : (
          <div>
            <div className="flex justify-between w-full gap-5 p-2">
          <h1 className=" text-md  font-bold">Welcome {`${user?.firstName} ${user?.lastName}`}! </h1>
          
          <UserButton afterSignOutUrl="/" />
          </div>
          <Divider />
          {members &&(
          <SidebarController 
            profile={profile} 
            joinedGroups={profileGroups} 
            createdGroups={userCreatedGroups} 
            members={members}/>
            )}


          
          
        
          </div>
        )} 
</div>
  );
}
export default SideBar;