
import { currentGroup } from "@/lib/current-group";
import ProfileForm from "./_components/profile-form";
import InviteCode from "@/components/ui/invite-code";
import { Divider } from "@nextui-org/react";
import { currentProfile } from "@/lib/current-profile";
import axios from "axios";
import { redirect } from "next/navigation";
import NavButton from "@/components/ui/nav-button";
import { MoveLeft } from "lucide-react";

import { UserButton, auth,  redirectToSignIn } from "@clerk/nextjs";

interface ProfileSettingsPageProps {}

const ProfileSettingsPage = async  () => {
  const { userId} = auth();
  const profile = await currentProfile();
  const group = await currentGroup();

  if(!userId) {
    redirectToSignIn();
  }
  
  if(group && profile) {
    redirect(`/dashboard`)
  }

  if(!group && profile) {
    redirect(`/group`)
  }
  
  if(profile?.setupComplete === true) {
    redirect(`/dashboard`);
  }
 

  return (
<div className="flex items-center justify-center flex-col min-h-screen h-auto bg-[url(/cbg1.png)] bg-no-repeat bg-cover bg-center p-5 ">
<div className=" rounded-md flex items-center justify-center flex-col pt-10 pb-10 h-auto bg-zinc-100/70 shadow-xl">
  <div>
<h2 className="font-bold text-lg">Create your Profile</h2>

<Divider />

</div>
<Divider className="bg-white"/>
<div className=" rounded-md shadow-md">
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