import { currentGroup } from "@/lib/current-group";
import ProfileForm from "./_components/profile-form";

import { Divider } from "@nextui-org/react";
import { currentProfile } from "@/lib/current-profile";

import { redirect } from "next/navigation";

import { auth, redirectToSignIn } from "@clerk/nextjs";

const ProfileSettingsPage = async () => {
  const { userId } = auth();
  const profile = await currentProfile();
  const group = await currentGroup();

  if (!userId) {
    redirectToSignIn();
  }

  if (group && profile) {
    redirect(`/dashboard`);
  }

  if (!group && profile) {
    redirect(`/setup/group`);
  }

  if (profile?.setupComplete === true) {
    redirect(`/dashboard`);
  }

  return (
    <div
      className="flex items-center justify-center flex-col min-h-screen h-auto bg-gradient-to-b from-zinc-400 to-zinc-100 
    dark:bg-gradient-to-b dark:from-zinc-900/80  dark:to-slate-950/80    "
    >
      <div className=" rounded-md flex items-center justify-center flex-col pt-3 border dark:border-sky-500 h-auto bg-zinc-200 dark:bg-slate-900 shadow-xl">
        <div>
          <h2 className="font-bold text-lg">Create your Profile</h2>
        </div>
        <Divider className="dark:bg-sky-500" />
        <p className="text-muted-foreground text-xs pt-1">
          You can change your profile at anytime after creation.
        </p>

        <div className=" rounded-md shadow-md">
          <ProfileForm />
        </div>
      </div>
    </div>
  );
};
export default ProfileSettingsPage;
