import { currentGroups } from "@/lib/current-groups";

import { allGroups } from "@/lib/all-groups";
import { currentCreators } from "@/lib/current-creators";
import NavButton from "@/components/ui/nav-button";
import { MoveLeft } from "lucide-react";
import { currentProfile } from "@/lib/current-profile";
import InviteCode from "@/components/ui/invite-code";
import { Divider } from "@nextui-org/react";
import { UserButton, auth, redirectToSignIn } from "@clerk/nextjs";

import EditGroupSettingsForm from "../../../../../components/group/edit-group-settings";
import { currentCreatedGroups } from "@/lib/current-created-groups";
import { currentCreator } from "@/lib/current-creator";
import axios from "axios";
import { db } from "@/lib/db";
import { Calendar } from "@/components/ui/calendar";
import GroupSummary from "./_components/group-summary";
import ThreadViewer from "@/components/thread/thread-viewer";
import Image from "next/image";


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
 

  const creatorProfile = await db.profile.findUnique({
      where:{
        id: group.creator,
      }
  });
 
  
 
  
      
   
 
  return (
<div className="flex items-center justify-center flex-col h-auto min-h-screen bg-[url(/cbg5.png)] bg-no-repeat bg-cover bg-center p-5 py-10">
  <div>
    {group.bgImageUrl && (<Image height={250} width={250} src={group.bgImageUrl} alt={group.bgImageUrl}/> )}
  </div>
  <div className="bg-zinc-200 dark:bg-zinc-600 flex items-center justify-center flex-col md:flex-row rounded-md p-3">
      {/* <div>
    
    <div>Creator Actions</div>
   <Divider/>
      <Calendar/>
   
      </div> */}
   <div>
   PUBLIC GROUP DETAILS
   <Divider/>
   {creatorProfile && profile &&(<GroupSummary creator={creatorProfile} group={group} members={members} profile={profile}/>)}
   {/* <ThreadViewer
    allPosts={posts}
    userGroups={userGroups}
    allThreads={allThreads}
    profile={profile}
    /> */}
  </div>
  </div>
</div>
  );
}
export default GroupViewPage;