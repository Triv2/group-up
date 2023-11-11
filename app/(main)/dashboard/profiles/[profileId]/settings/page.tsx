import { currentProfile } from "@/lib/current-profile";
import ProfileForm from "./_components/profile-form";
import NavButton from "@/components/ui/nav-button";
import { MoveLeft, Trash } from "lucide-react";

import { UserButton, auth, redirectToSignIn } from "@clerk/nextjs";
import DeleteButton from "@/components/ui/delete-button";

interface ProfileSettingsPageProps {}

const ProfileSettingsPage = async () => {
  const profile = await currentProfile();
 
  const { userId} = auth();
  if(!userId) {
    redirectToSignIn();
  }
  
  return (
<div className="flex items-center justify-center flex-col min-h-screen h-auto bg-[url(/cbg4.png)] bg-no-repeat bg-cover bg-center p-5 py-10">

<div className="flex items-center justify-center flex-col bg-zinc-300 dark:bg-zinc-700 rounded-md shadow-md p-3">
  <h2 className="font-bold text-xl mt-5">Edit Your Profile</h2>

<div className="bg-zinc-200 dark:bg-zinc-500 rounded-md shadow-lg">
<ProfileForm profile={profile}   />
</div>
<div className="p-2 flex items-center justify-between  md:flex-row flex-col gap-2 px-5 w-full">
<NavButton 

  href={`/dashboard/`}
  icon={<MoveLeft className="h-3 w-3" />}
  text="Cancel"
  className="flex items-center justify-center px-2 py-2 gap-1 hover:scale-105 rounded-md bg-red-800 text-white hover:bg-red-500 transition-all text-sm shadow-md"
  />
  
  <DeleteButton 
      href={`/`}
      icon={<Trash className="h-3 w-3" />}
      text="Delete Profile"
      className="flex items-center justify-center px-1  gap-1 hover:scale-105 rounded-md hover:bg-red-500 text-white bg-red-800 transition-all text-sm shadow-md"
      
      />
      
  </div>
</div>
    
</div>
  );
}
export default ProfileSettingsPage;