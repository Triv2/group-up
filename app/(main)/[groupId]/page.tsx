import { currentGroup } from "@/lib/current-group";
import GroupEditForm from "./_components/group-form";
import { currentGroups } from "@/lib/current-groups";
import { currentCreator } from "@/lib/current-creator";
import NavButton from "@/components/ui/nav-button";
import { MoveLeft } from "lucide-react";
import { currentProfile } from "@/lib/current-profile";
import InviteCode from "@/components/ui/invite-code";
import { Divider } from "@nextui-org/react";
import { UserButton } from "@clerk/nextjs";

interface GroupEditPageProps {}

const GroupEditPage = async () => {
  const group = await currentGroup();
  const groups = await currentGroups();
  const profile = await currentProfile();
  const creator= await currentCreator();

  return (
<div className="flex items-center justify-center flex-col h-auto min-h-screen bg-[url(/cbg5.png)] bg-no-repeat bg-cover bg-center p-5 py-10">
  <div className="bg-zinc-100/80 flex items-center justify-center flex-col rounded-md p-3">
   {group && creator &&(<InviteCode code={group?.inviteCode} name={group?.name} image={group.imageUrl} creator={creator.name}/>)}
   <Divider/>
   {groups && group &&( <GroupEditForm group={group} initData={groups} profile={profile} /> )}
   <Divider/>
<div className="p-2 flex items-center justify-between px-5 w-full">
  
<NavButton
    href={`/`}
    icon={<MoveLeft className="h-3 w-3" />}
    text="Cancel"
    className="flex items-center justify-center px-2 py-2 gap-1 hover:scale-105 rounded-md hover:bg-emerald-700 text-white bg-red-800 transition-all text-sm shadow-md"
    
  />
  <UserButton afterSignOutUrl="/"/>
  </div>
  </div>
</div>
  );
}
export default GroupEditPage;