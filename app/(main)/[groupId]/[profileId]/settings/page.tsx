import { currentProfile } from "@/lib/current-profile";
import ProfileForm from "./_components/profile-form";

interface ProfileSettingsPageProps {}

const ProfileSettingsPage = async () => {
  const profile = await currentProfile();
  return (
<div className="flex items-center justify-center flex-col h-screen">
ProfileSettingsPage
{profile?.setupComplete ? (
  <h2>Edit Your Profile</h2>
) : (<h2>Step Two: Customize your Profile</h2>)}


<ProfileForm  />
    
</div>
  );
}
export default ProfileSettingsPage;