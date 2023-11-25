import DeleteButton from "@/components/ui/delete-button";
import InviteCode from "@/components/ui/invite-code";
import NavButton from "@/components/ui/nav-button";
import SantaUser from "@/components/ui/santa-user";
import { currentCreator } from "@/lib/current-creator";
import {  currentGroups } from "@/lib/current-groups";
import { currentMembers } from "@/lib/current-members";
import { currentProfile } from "@/lib/current-profile";

import { UserButton, auth, redirectToSignIn } from "@clerk/nextjs";
import { Avatar, AvatarGroup, Button, Divider, User } from "@nextui-org/react";

import { Edit, Trash, User2 } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";


import ProfileSummary from "@/components/profile/profile-summary";
import GroupSummary from "@/components/group/group-summary";
import { allMembers } from "@/lib/all-members";
import { Calendar } from "@/components/ui/calendar";
import { currentCreatedGroups } from "@/lib/current-created-groups";
import Thread from "@/components/thread/thread";
import ThreadViewer from "@/components/thread/thread-viewer";
import { allUserGroupThreads } from "@/lib/all-user-group-threads";
import CreateGroupModal from "@/components/modals/create-group-modal";

export const revalidate = 1;

const DashboardPage = async () => {
  const { userId} = auth();
  if(!userId) {
    redirectToSignIn();
  }
   const profile = await currentProfile();
   const userGroups = await currentGroups();
  const allThreads = await allUserGroupThreads();





   const userCreatedGroups = await currentCreatedGroups();
   const creator = await currentCreator();
   
   const allProfiles= await allMembers();
   
  if(!profile && !userGroups) {
    redirect("/setup/profile");
  }

  if(!profile && userGroups) {
    redirect(`/invite/${userGroups[0].inviteCode}`);
  }
   

  
 
  return (
<div className="md:pl-[148px] flex items-center justify-center min-h-screen h-auto w-auto flex-col gap-4 pt-10  pb-10 bg-[url(/cbg2.png)] bg-no-repeat bg-cover bg-center">
  <div className="rounded-md bg-zinc-100 dark:bg-zinc-600 flex flex-col items-center justify-center gap-2 py-3 md:px-10 md:p-5 shadow-md ">
  <h1 className="text-3xl font-bold">Welcome, {profile?.name}!</h1>
    {!userGroups && (<div className="flex items-center flex-col">
      <h1 className="text-red-500">ALERT: YOUR ARE NOT IN ANY GROUPS.</h1>
      <h2>PLEASE CREATE OR JOIN A GROUP</h2>
      
    </div>)}
    
  <Divider/>
  <div className="grid md:grid-cols-2 gap-10 px-7 ">
    <div className="flex items-center justify-center flex-col gap-2">
    Threads:
    <Divider/>
    <ThreadViewer
    userGroups={userGroups}
    allThreads={allThreads}
    />
</div>
<div  className="flex items-center justify-center flex-col gap-2">
  <Divider />
    Event Calendar
    <Divider />
    <Calendar/>
    </div>



  {/* {userGroups && allProfiles && profile  &&(
      
      userGroups.map((group) => (
        
      <GroupSummary
        key={group.id}
        group={group}
        members={allProfiles}
        profile={profile}
      />
        )
      )
    )} */}
   
  

  </div>
   

  
  <Divider />
  <div className="flex items-center justify-center md:flex-row flex-col gap-3 ">
 
      
 
  </div>
  </div>

  
</div>
  );
}
export default DashboardPage;