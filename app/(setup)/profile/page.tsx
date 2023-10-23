
import { currentGroup } from "@/lib/current-group";
import ProfileForm from "./_components/profile-form";
import InviteCode from "@/components/ui/invite-code";
import { Divider } from "@nextui-org/react";
import { currentProfile } from "@/lib/current-profile";
import axios from "axios";
import { redirect } from "next/navigation";
import NavButton from "@/components/ui/nav-button";
import { MoveLeft } from "lucide-react";
import { currentCreator } from "@/lib/current-creator";

interface ProfileSettingsPageProps {}

const ProfileSettingsPage = async  () => {
  const group = await currentGroup();
  const profile = await currentProfile();
  const creator = await currentCreator();

  if(!group || !profile){
    redirect("/")
  }
  
 

  return (
<div className="flex items-center justify-center flex-col h-auto bg-[url(/cbg1.png)] bg-no-repeat bg-cover bg-center p-5 text-white">
<div className=" rounded-md flex items-center justify-center flex-col pt-10 pb-10 h-auto bg-emerald-800/90 shadow-xl">
  <div>
<h2 className="font-bold text-lg">Create your Profile</h2>
<Divider className="bg-white"/>
<div>
{group && creator && (<InviteCode code={group?.inviteCode} name={group?.name} image={group?.imageUrl} creator={creator.name}/>)}
</div>
</div>
<Divider className="bg-white"/>
<div className="bg-red-800 rounded-md shadow-md">
<ProfileForm  />
</div>
<div className="p-2">
<NavButton
   href={`/${group?.id}`}
   icon={<MoveLeft className="h-3 w-3" />}
   text="Change Group"
   className="flex items-center justify-center px-2 py-2 gap-1 hover:scale-105 rounded-md hover:bg-emerald-500 text-white bg-red-800 transition-all text-sm shadow-lg"
   
/>
</div>
    </div>
</div>
  );
}
export default ProfileSettingsPage;