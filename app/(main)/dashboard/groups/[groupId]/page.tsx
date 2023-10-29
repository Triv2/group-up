import { currentGroups } from "@/lib/current-groups";

import { allGroups } from "@/lib/all-groups";
import { currentCreators } from "@/lib/current-creators";
import NavButton from "@/components/ui/nav-button";
import { MoveLeft } from "lucide-react";
import { currentProfile } from "@/lib/current-profile";
import InviteCode from "@/components/ui/invite-code";
import { Divider } from "@nextui-org/react";
import { UserButton, auth, redirectToSignIn } from "@clerk/nextjs";

import EditGroupSettingsForm from "./edit/_components/edit-group-settings";
import { currentCreatedGroups } from "@/lib/current-created-groups";
import { currentCreator } from "@/lib/current-creator";
import axios from "axios";
import { db } from "@/lib/db";
import { Calendar } from "@/components/ui/calendar";
import GroupSummary from "./_components/group-summary";


interface GroupViewPageProps {
  params:  { groupId: string  };
}

const GroupViewPage = async ({
  params,
}:GroupViewPageProps) => {

  const { userId} = auth();
  if(!userId) {
    redirectToSignIn();
  }

  const profile = await currentProfile();
  const creator = await currentCreator();

  if(!creator) { return null; }

  const creatorProfile = await db.profile.findUnique({
      where:{
        id: creator.id
      }
  });
 
  let visible= false;

  const group = await db.group.findUnique({
    where: {
      id: params.groupId,
    },
  })

  if(!group) {
    return {
      notFound: true,
    }
  }

  const members= await db.profile.findMany({
    where: {
      id: {
        in: group.profileIds,
      },
    },
  })
 
    
  const currentGroup=await db.group.findUnique({
    where: {
      id: params.groupId,
    },
  })
  
  if(currentGroup?.creator === creator?.id) {
    visible = true;
  }
  
      
   
 
  return (
<div className="flex items-center justify-center flex-col h-auto min-h-screen bg-[url(/cbg5.png)] bg-no-repeat bg-cover bg-center p-5 py-10">
  <div className="bg-zinc-100/80 flex items-center justify-center flex-col rounded-md p-3">
 
   
   
      <Divider/>
    {visible && currentGroup &&( 
    <div>Creator Actions</div>)}
    
   <Divider/>
      <Calendar/>
   

   <Divider/>
   PUBLIC GROUP DETAILS

   {creator && profile &&(<GroupSummary creator={creatorProfile} group={group} members={members} profile={profile}/>)}
   <Divider/>
<div className="p-2 flex items-center justify-between px-5 w-full">
  
<NavButton
    href={`/`}
    icon={<MoveLeft className="h-3 w-3" />}
    text="Back"
    className="flex items-center justify-center px-2 py-2 gap-1 hover:scale-105 rounded-md hover:bg-red-500 text-white bg-red-800 transition-all text-sm shadow-md"
    
  />
  <UserButton afterSignOutUrl="/"/>
  </div>
  </div>
</div>
  );
}
export default GroupViewPage;