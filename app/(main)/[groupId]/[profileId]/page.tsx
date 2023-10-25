import DeleteButton from "@/components/ui/delete-button";
import InviteCode from "@/components/ui/invite-code";
import NavButton from "@/components/ui/nav-button";
import SantaUser from "@/components/ui/santa-user";
import { currentCreator } from "@/lib/current-creators";
import { currentGroup } from "@/lib/current-groups";
import { currentMembers } from "@/lib/current-members";
import { currentProfile } from "@/lib/current-profile";
import { inviteProfile } from "@/lib/invite-profile";
import { UserButton, auth, redirectToSignIn } from "@clerk/nextjs";
import { Avatar, AvatarGroup, Button, Divider, User } from "@nextui-org/react";
import axios from "axios";
import { Edit, Trash, User2 } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import ProfileSummary from "@/components/profile-summary";
import GroupSummary from "@/components/group-summary";

interface ProfilePageProps {}

const ProfilePage = async () => {
  const { userId} = auth();
  if(!userId) {
    redirectToSignIn();
  }
   const profile = await currentProfile();
   const group = await currentGroup();
   const members = await currentMembers();
   const creator = await currentCreator();
   
  
  if(!profile && !group) {
    redirect("/");
  }

  if(!profile && group) {
    redirect(`/invite/${group.inviteCode}`);
  }
   

  
 
  return (
<div className="flex items-center min-h-screen h-auto w-full flex-col gap-4 pt-10  pb-10 bg-[url(/cbg2.png)] bg-no-repeat bg-cover bg-center">
  <div className="rounded-md bg-zinc-100/80 flex flex-col items-center justify-center gap-2 p-5 shadow-md">
  <h1 className="text-3xl font-bold">Welcome, {profile?.name}!</h1>
    {!group && (<div className="flex items-center flex-col">
      <h1 className="text-red-500">ALERT: YOUR GROUP LEADER HAS DISBANDED THE GROUP.</h1>
      <h2>PLEASE CREATE OR JOIN A GROUP</h2>
      
    </div>)}
  <Divider />

  <div className="grid md:grid-cols-2 gap-10 px-7 ">

    {group && members && (
      <GroupSummary group={group} members={members}/>
    )}

    {profile && group &&(
    <ProfileSummary profile={profile} group={group}/>
    )}
    {profile && !group &&(<ProfileSummary profile={profile} />)}
  </div>
    <Divider />
  {group && creator &&(<InviteCode code={group.inviteCode} name={group.name} image={group.imageUrl} creator={creator.name}/>)}
  <Divider />
  <div className="flex items-center justify-center md:flex-row flex-col gap-3 ">
 
       <NavButton 
          href={`/${group?.id}/${profile?.id}/settings`}
          icon={<Edit className="h-3 w-3" />}
          text="Profile Settings"
          className="flex items-center justify-center px-2 py-2 gap-1 hover:scale-105 rounded-md bg-emerald-700 text-white hover:bg-emerald-500 transition-all text-sm shadow-md"
          />
      <NavButton 
          href={`/${group?.id}`}
          icon={<User2 className="h-3 w-3" />}
          text="Group Settings"
          className="flex items-center justify-center px-2 py-2 gap-1 hover:scale-105 rounded-md bg-emerald-700 text-white hover:bg-emerald-500 transition-all text-sm shadow-md"
          />
      <UserButton afterSignOutUrl="/"/>
  <DeleteButton 
      href={`/`}
      icon={<Trash className="h-3 w-3" />}
      text="Delete Profile"
      className="flex items-center justify-center px-2 py-2 gap-1 hover:scale-105 rounded-md hover:bg-red-500 text-white bg-red-800 transition-all text-sm shadow-md"
      
      />
  </div>
  </div>

  
</div>
  );
}
export default ProfilePage;