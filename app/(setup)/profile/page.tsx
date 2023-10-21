import { currentProfile } from "@/lib/current-profile";
import ProfileForm from "./_components/profile-form";

interface ProfileSettingsPageProps {}

const ProfileSettingsPage = async () => {
  const profile = await currentProfile();
  return (
<div className="flex items-center justify-center flex-col h-screen bg-[url(/cbg1.png)] bg-no-repeat bg-cover bg-center">
<div className="bg-zinc-100/80 rounded-md flex items-center justify-center flex-col ">
<h2>Step Two: Customize your Profile</h2>
<ProfileForm  />
    </div>
</div>
  );
}
export default ProfileSettingsPage;