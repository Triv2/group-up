import { currentGroups } from "@/lib/current-groups";

import { allGroups } from "@/lib/all-groups";
import { currentCreators } from "@/lib/current-creators";
import NavButton from "@/components/ui/nav-button";
import { MoveLeft } from "lucide-react";
import { currentProfile } from "@/lib/current-profile";
import InviteCode from "@/components/ui/invite-code";
import { Divider } from "@nextui-org/react";
import { UserButton, auth, redirectToSignIn } from "@clerk/nextjs";
import EditGroupController from "./_components/edit-group-controller";
import EditGroupSettingsForm from "./_components/edit-group-settings";
import { currentCreatedGroups } from "@/lib/current-created-groups";
import { currentCreator } from "@/lib/current-creator";
import GroupList from "@/components/group/group-list";
import { allMembers } from "@/lib/all-members";


interface GroupEditPageProps {}

const GroupEditPage = async () => {
  const { userId} = auth();
  if(!userId) {
    redirectToSignIn();
  }
  const allGroup = await allGroups();
  const userGroups = await currentGroups();
  const profile = await currentProfile();
  const userCreators= await currentCreators();
  const userCreatedGroups= await currentCreatedGroups();
  const creator = await currentCreator();
  const members = await allMembers();

  
 
  return (
<div className="flex items-center justify-center flex-col h-auto min-h-screen bg-[url(/cbg5.png)] bg-no-repeat bg-cover bg-center p-5 py-10">
  <div className="bg-zinc-100/80 flex items-center justify-center flex-col rounded-md p-3">
   {userGroups && members && (<GroupList groups={allGroup} members={members} />)}
   {userCreatedGroups && creator &&(
    userCreatedGroups.map((group) => (
   <InviteCode key={group.id} code={group?.inviteCode} name={group?.name} image={group.imageUrl} creator={creator.name}/>))
   )}
  
   <Divider/>
   {creator && profile && (creator.id===profile.id) && userGroups && (
    userGroups.map((group) => (
    <div className="py-1" key={group.id}>
      <p>For Creators Only</p>
      <Divider/>
      <EditGroupSettingsForm group={group}/>
    </div>)
    )
   )}

   <Divider/>
   {userCreatedGroups && profile &&(
    userCreatedGroups.map((group) => (
    <EditGroupController key={group.id} userGroups={group} groups={allGroup} profile={profile}/>))
   )}
 
      
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
export default GroupEditPage;