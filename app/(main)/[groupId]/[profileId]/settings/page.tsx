import { currentProfile } from "@/lib/current-profile";
import ProfileForm from "./_components/profile-form";
import NavButton from "@/components/ui/nav-button";
import { MoveLeft } from "lucide-react";
import { currentGroup } from "@/lib/current-group";

interface ProfileSettingsPageProps {}

const ProfileSettingsPage = async () => {
  const profile = await currentProfile();
  const group = await currentGroup();
  return (
<div className="flex items-center justify-center flex-col h-screen bg-[url(/cbg4.png)] bg-no-repeat bg-cover bg-center">

<div className="flex items-center justify-center flex-col bg-zinc-100/80 rounded-md p-3">
  <h2 className="font-bold text-xl mt-5">Edit Your Profile</h2>

<ProfileForm profile={profile} />
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