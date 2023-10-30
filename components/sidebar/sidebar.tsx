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
<div className="w-[148px] bg-zinc-200/80 h-full  shadow-md">
  <div className="flex items-center justify-cetner px-1 py-1 ">
    <Image src="/logo.png" height={45} width={45} alt="logo"/>
    <p className="font-bold text-lg font-sans bg-gradient-to-r from-orange-400 to-green-500 bg-clip-text text-transparent">Group-Up</p>
  </div>
  <Divider/>

{!profile ? (
  <div className="flex items-center justify-center flex-col">
        <h1 className=" text-md font-bold">Welcome</h1> <h1 className="text-md font-bold  bg-gradient-to-tr from-green-400 to-green-500 bg-clip-text text-transparent"> {name}!</h1>
        <Divider/>
        </div>) 
        : (
          <div>
            <div className="flex justify-between items-center w-full gap-5 p-2">
              <div>
            <h1 className=" text-md font-bold">Welcome</h1> 
            <h1 className="text-md font-bold  bg-gradient-to-tr from-green-500 to-green-700 bg-clip-text text-transparent"> {name}!</h1>
            </div>

          <UserButton afterSignOutUrl="/" 
            appearance={{
              elements: {
                userButtonPopoverCard:"pointer-events-auto",
              }
            }}
          
          />
          </div>
          <Divider />
          {members &&(
          <SidebarController 
            profile={profile} 
            joinedGroups={nonUserCreatedGroups} 
            createdGroups={userCreatedGroups} 
            members={members}/>
            )}


          
          
        
          </div>
        )} 
</div>
  );
}
export default SideBar;