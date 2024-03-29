import { auth, currentUser, redirectToSignIn } from "@clerk/nextjs";
import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";

import { allGroups } from "@/lib/all-groups";

import { Divider } from "@nextui-org/react";

import { allOpenGroups } from "@/lib/all-open-groups";

import { currentCreatedGroups } from "@/lib/current-created-groups";
import { allMembers } from "@/lib/all-members";
import { currentGroups } from "@/lib/current-groups";

import GroupListSorter from "@/components/group/group-list-sorter";
import { allClosedGroups } from "@/lib/all-closed-groups";

export default async function GroupSetupPage() {
  const { userId } = auth();
  
  const groups = (await allGroups()) || null;
  const profile = await currentProfile();
  const profileGroups = await currentGroups();
  const userCreatedGroups = await currentCreatedGroups();
  const members = (await allMembers()) || null;
  const closedGroups = (await allClosedGroups()) || null;
  const openGroups = await allOpenGroups();

  if (!userId) {
    redirectToSignIn();
  }

  if (!profile) {
    redirect(`/setup/profile`);
  }

  return (
    <main className="flex items-center  flex-col min-h-screen h-auto w-full gap-3 bg-[url(/cbg3.png)]  bg-no-repeat bg-cover bg-center px-2 py-2">
      <div className="flex items-center flex-col gap-5 pt-3 sm:p-8 bg-zinc-300 dark:bg-zinc-700 rounded-md mt-[35px] shadow-md h-auto">
        <Divider />
        {members && (
          <GroupListSorter
            allGroups={groups}
            openGroups={openGroups}
            closedGroups={closedGroups}
            joinedGroups={profileGroups}
            createdGroups={userCreatedGroups}
            members={members}
            profile={profile}
          />
        )}
      </div>
    </main>
  );
}
