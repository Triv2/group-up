import { currentProfile } from "@/lib/current-profile";
import { UserButton, currentUser, redirectToSignIn } from "@clerk/nextjs";
import { Divider } from "@nextui-org/react";
import ProfileSummary from "../profile-summary";
import { currentGroups } from "@/lib/current-groups";
import { currentCreatedGroups } from "@/lib/current-created-groups";
import { allGroups } from "@/lib/all-groups";
import SidebarController from "./sidebar-controller";
import { allMembers } from "@/lib/all-members";
import { allNoncreatedJoinedGroups } from "@/lib/all-noncreated-joined-groups";
import Image from "next/image";
import { Group, Profile } from "@prisma/client";

interface SideBarProps {
  userCreatedGroups?: Group[] | null;
  nonUserCreatedGroups: Group[] | null;
  members?:Profile[] | null;
  profile?: Profile | null;
  name: string;
}


const SideBar =  ({
  userCreatedGroups,
  nonUserCreatedGroups,
  members,
  profile,
  name
}:
SideBarProps) => {



  return (
<div className="w-[148px] bg-zinc-100 dark:bg-zinc-500 h-full px-20 shadow-md">
  
       
          {members && profile &&(
          <SidebarController 
            profile={profile} 
            joinedGroups={nonUserCreatedGroups} 
            createdGroups={userCreatedGroups} 
            members={members}/>
            )}
      
        
</div>
  );
}
export default SideBar;