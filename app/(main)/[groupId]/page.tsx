import { currentGroup } from "@/lib/current-group";
import GroupEditForm from "./_components/group-form";
import { currentGroups } from "@/lib/current-groups";
import { currentCreator } from "@/lib/current-creator";
import NavButton from "@/components/ui/nav-button";
import { MoveLeft } from "lucide-react";
import { currentProfile } from "@/lib/current-profile";

interface GroupEditPageProps {}

const GroupEditPage = async () => {
  const group = await currentGroup();
  const groups = await currentGroups();
  const profile = await currentProfile();
  const creator= await currentCreator();

  return (
<div className="flex items-center justify-center flex-col h-auto min-h-screen bg-[url(/cbg4.png)] bg-no-repeat bg-cover bg-center p-5 py-10">
  <div className="bg-zinc-100/80 flex items-center justify-center flex-col rounded-md p-3">
<GroupEditForm group={group} initData={groups}/>
<div>
<NavButton
    href={`/${group?.id}/${profile?.id}`}
    icon={<MoveLeft className="h-3 w-3" />}
    text="Cancel"
    className="flex items-center justify-center px-2 py-2 gap-1 hover:scale-105 rounded-md bg-emerald-700 text-white hover:bg-red-800 transition-all text-sm shadow-md"
    
  />
  </div>
  </div>
</div>
  );
}
export default GroupEditPage;