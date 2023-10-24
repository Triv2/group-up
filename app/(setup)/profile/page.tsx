
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
import { UserButton, auth,  redirectToSignIn } from "@clerk/nextjs";

interface ProfileSettingsPageProps {}

const ProfileSettingsPage = async  () => {
  const { userId} = auth();
  const profile = await currentProfile();
  const group = await currentGroup();

  if(!userId) {
    redirectToSignIn();
  }
  
  if(group){
    redirect(`/${profile?.groupId}/${profile?.id}`)
  }
  
  if(profile?.setupComplete === true) {
    redirect(`/${profile.groupId}/${profile.id}`);
  }
 

  return (
<div className="flex items-center justify-center flex-col h-auto bg-[url(/cbg1.png)] bg-no-repeat bg-cover bg-center p-5 text-white">
<div className=" rounded-md flex items-center justify-center flex-col pt-10 pb-10 h-auto bg-emerald-800/90 shadow-xl">
  <div>
<h2 className="font-bold text-lg">Create your Profile</h2>

<Divider className="bg-white"/>

</div>
<Divider className="bg-white"/>
<div className="bg-red-800 rounded-md shadow-md">
<ProfileForm  />
</div>
<div className="p-2 flex items-center justify-between px-5 w-full">
<NavButton
   href={`/`}
   icon={<MoveLeft className="h-3 w-3" />}
   text="Back to Setup"
   className="flex items-center justify-center px-2 py-2 gap-1 hover:scale-105 rounded-md hover:bg-emerald-500 text-white bg-red-800 transition-all text-sm shadow-lg"
   
/>
<UserButton afterSignOutUrl="/"/>
</div>
    </div>
</div>
  );
}
export default ProfileSettingsPage;