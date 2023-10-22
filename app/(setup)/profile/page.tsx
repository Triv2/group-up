
import { currentGroup } from "@/lib/current-group";
import ProfileForm from "./_components/profile-form";
import InviteCode from "@/components/ui/invite-code";

interface ProfileSettingsPageProps {}

const ProfileSettingsPage = async  () => {
  const group = await currentGroup();
  return (
<div className="flex items-center justify-center flex-col h-screen bg-[url(/cbg1.png)] bg-no-repeat bg-cover bg-center">
<div className="bg-zinc-100/80 rounded-md flex items-center justify-center flex-col ">
<h2>Step Two: Create your Profile</h2>
<InviteCode code={group?.inviteCode} />
<ProfileForm  />
    </div>
</div>
  );
}
export default ProfileSettingsPage;