
import { currentGroup } from "@/lib/current-group";
import ProfileForm from "./_components/profile-form";
import InviteCode from "@/components/ui/invite-code";
import { Divider } from "@nextui-org/react";
import { currentProfile } from "@/lib/current-profile";
import axios from "axios";

interface ProfileSettingsPageProps {}

const ProfileSettingsPage = async  () => {
  const group = await currentGroup();
  const profile = await currentProfile();
  
 

  return (
<div className="flex items-center justify-center flex-col h-screen bg-[url(/cbg1.png)] bg-no-repeat bg-cover bg-center p-5">
<div className="bg-zinc-100/80 rounded-md flex items-center justify-center flex-col pt-10 pb-10 h-auto">
  <div>
<h2>Create your Profile</h2>

<InviteCode code={group?.inviteCode} />
</div>
<Divider/>
<ProfileForm  />
    </div>
</div>
  );
}
export default ProfileSettingsPage;