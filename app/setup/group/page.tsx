import { auth, redirectToSignIn } from "@clerk/nextjs";
import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";

import InitialGroupForm from "./_components/initial-group-form";
import { Divider } from "@nextui-org/react";

export default async function GroupSetupPage() {
  const { userId } = auth();

  const profile = await currentProfile();

  if (!userId) {
    redirectToSignIn();
  }

  if (!profile) {
    redirect(`/setup/profile`);
  }

  return (
    <main className="flex items-center justify-center flex-col min-h-screen h-auto bg-gradient-to-b from-zinc-400 to-zinc-100 
    dark:bg-gradient-to-b dark:from-zinc-900/80  dark:to-slate-950/80     ">
       <div className=" rounded-md flex items-center justify-center flex-col pt-3 border dark:border-sky-500 h-auto bg-zinc-200 dark:bg-slate-900 shadow-xl">
      <div>
          <h2 className="font-bold text-lg">Create your Group</h2>

          
        </div>
        <Divider className="bg-sky-500/50"/>
        <p className="text-muted-foreground pt-1 text-xs">
                    You can edit your group at anytime after creation.
                  </p>
      <InitialGroupForm />
      </div>
    </main>
  );
}
