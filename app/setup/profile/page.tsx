
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
    redirect(`/setup/group`)
  }
  
  if(profile?.setupComplete === true) {
    redirect(`/dashboard`);
  }
 

  return (
<div className="flex items-center justify-center flex-col min-h-screen h-auto bg-[url(/cbg1.png)] bg-no-repeat bg-cover pt-[50px] bg-center p-5 ">
<div className=" rounded-md flex items-center justify-center flex-col pt-10 pb-10 h-auto bg-zinc-100/70 shadow-xl">
  <div>
<h2 className="font-bold text-lg">Create your Profile</h2>

<Divider />

</div>
<Divider className="bg-white"/>
<div className=" rounded-md shadow-md">
<ProfileForm  />
</div>

    </div>
</div>
  );
}
export default ProfileSettingsPage;