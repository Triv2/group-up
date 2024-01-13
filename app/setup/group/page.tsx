import { auth, redirectToSignIn } from "@clerk/nextjs";
import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";

import InitialGroupForm from "./_components/initial-group-form";

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
    <main className="flex items-center justify-center flex-col min-h-screen h-auto w-full gap-3 bg-[url(/cbg3.png)]  bg-no-repeat bg-cover bg-center px-2 py-2">
      <InitialGroupForm />
    </main>
  );
}
