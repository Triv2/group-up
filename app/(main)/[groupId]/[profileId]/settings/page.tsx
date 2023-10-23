import { currentProfile } from "@/lib/current-profile";
import ProfileForm from "./_components/profile-form";
import NavButton from "@/components/ui/nav-button";
import { MoveLeft } from "lucide-react";
import { currentGroup } from "@/lib/current-group";
import { currentGroups } from "@/lib/current-groups";

interface ProfileSettingsPageProps {}

const ProfileSettingsPage = async () => {
  const profile = await currentProfile();
  const group = await currentGroup();
  const groups = await currentGroups();
  return (
<div className="flex items-center justify-center flex-col h-auto bg-[url(/cbg4.png)] bg-no-repeat bg-cover bg-center p-5 py-10">

<div className="flex items-center justify-center flex-col bg-zinc-100/80 rounded-md p-3">
  <h2 className="font-bold text-xl mt-5">Edit Your Profile</h2>

<div className="bg-yellow-200/60 rounded-md">
<ProfileForm profile={profile} group={group} groups={groups} />
</div>
<NavButton 

  href={`/${group?.id}/${profile?.id}/`}
  icon={<MoveLeft className="h-3 w-3" />}
  text="Cancel"
  className="flex items-center justify-center px-2 py-2 gap-1 hover:scale-105 rounded-md bg-emerald-700 text-white hover:bg-red-800 transition-all text-sm shadow-md"
  />
</div>
    
</div>
  );
}
export default ProfileSettingsPage;