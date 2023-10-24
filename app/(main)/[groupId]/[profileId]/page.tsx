import DeleteButton from "@/components/ui/delete-button";
import InviteCode from "@/components/ui/invite-code";
import NavButton from "@/components/ui/nav-button";
import SantaUser from "@/components/ui/santa-user";
import { currentCreator } from "@/lib/current-creator";
import { currentGroup } from "@/lib/current-group";
import { currentMembers } from "@/lib/current-members";
import { currentProfile } from "@/lib/current-profile";
import { inviteProfile } from "@/lib/invite-profile";
import { UserButton, auth, redirectToSignIn } from "@clerk/nextjs";
import { Avatar, Button, Divider, User } from "@nextui-org/react";
import axios from "axios";
import { Edit, Trash } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface ProfilePageProps {}

const ProfilePage = async () => {
   const profile = await currentProfile();
   const group = await currentGroup();
   const members = await currentMembers();
   const creator = await currentCreator();
   const { userId} = auth();
  if(!userId) {
    redirectToSignIn();
  }
  if(!profile) {
    redirect("/");
  }
   

  
 
  return (
<div className="flex items-center min-h-screen h-auto flex-col gap-4 pt-10 bg-[url(/cbg2.png)] bg-no-repeat bg-cover bg-center">
  <div className="rounded-md bg-zinc-100/80 flex flex-col items-center justify-center gap-2 p-5 shadow-md">
  <h1 className="text-3xl font-bold">Welcome, {profile?.name}!</h1>
 
  <Divider />
  <div className="grid md:grid-cols-2 gap-10 px-7 ">
    <div className="flex items-center justify-start flex-col px-2 py-2 gap-1 h-auto rounded-md bg-zinc-100/80 shadow-md">
      <Accordion type="single" collapsible>
        <AccordionItem  value="item-1">
          <AccordionTrigger className="flex items-center justify-between flex-col w-full no-underline px-2 py-2 gap-1">
      
  
      <p className=" w-full no-underline">Members List</p>
      
      </AccordionTrigger>
      <Divider/>
      <AccordionContent>
      <ul className="flex items-center flex-col gap-1 w-full p-1">
       {members && members.map((member) => (
        <li className="text-xs  flex items-center justify-between w-full" key={member.id}>
        <Avatar src={member.imageUrl} size="sm" />
          {member.name}
        </li>
      ))} 
      </ul>
      </AccordionContent>
      </AccordionItem>
        </Accordion>
    </div>
    {profile &&(
    <div className="flex items-center justify-start flex-col px-2 py-2 gap-1  rounded-md bg-zinc-100/80 shadow-md">
      <Accordion type="single" collapsible>
        <AccordionItem  value="item-1">
          <AccordionTrigger className="flex items-center justify-between flex-col w-full no-underline px-2 py-2 gap-1">
        <h3 className="no-underline">Current Profile</h3>
        </AccordionTrigger>
        <Divider/>
        <AccordionContent >
        <div className="flex gap-1 justify-between items-center w-full py-2">
          <p className="text-sm">Avatar:</p>
          <Avatar src={profile.imageUrl} size="sm" />
        </div>
        <div className="flex items-center flex-col gap-1">
          <div className="flex gap-1 justify-between items-center w-full">
        <p className="text-sm">Name:</p><p className="text-xs">{profile.name}</p>
        </div>
        
        <div className="flex gap-1 justify-between items-center w-full">
        <p className="text-sm">Group:</p><p className="text-xs">{group?.name}</p>
        </div>
        
        <div className="flex gap-1 justify-between items-center w-full">
        <p className="text-sm">Interests:</p><p className="text-xs">{profile.content}</p>
        </div>
        </div>
        </AccordionContent>
        </AccordionItem>
        </Accordion>
      </div>
    )}
  </div>
    <Divider />
  {group && creator &&(<InviteCode code={group.inviteCode} name={group.name} image={group.imageUrl} creator={creator.name}/>)}
  <Divider />
  <div className="flex items-center justify-center gap-3">
  <UserButton afterSignOutUrl="/"/>
       <NavButton 
          href={`/${group?.id}/${profile?.id}/settings`}
          icon={<Edit className="h-3 w-3" />}
          text="Edit Profile"
          className="flex items-center justify-center px-2 py-2 gap-1 hover:scale-105 rounded-md bg-emerald-700 text-white hover:bg-red-500 transition-all text-sm shadow-md"
          />
      <NavButton 
          href={`/${group?.id}`}
          icon={<Edit className="h-3 w-3" />}
          text="Edit Group"
          className="flex items-center justify-center px-2 py-2 gap-1 hover:scale-105 rounded-md bg-emerald-700 text-white hover:bg-red-500 transition-all text-sm shadow-md"
          />
      
  <DeleteButton 
      href={`/`}
      icon={<Trash className="h-3 w-3" />}
      text="Delete Profile"
      className="flex items-center justify-center px-2 py-2 gap-1 hover:scale-105 rounded-md hover:bg-emerald-500 text-white bg-red-800 transition-all text-sm shadow-md"
      
      />
  </div>
  </div>

  
</div>
  );
}
export default ProfilePage;