



import Image from 'next/image'
import { UserButton, auth, currentUser, redirectToSignIn } from '@clerk/nextjs';
import { currentProfile } from '@/lib/current-profile';
import { redirect } from 'next/navigation';

import { currentGroups } from '@/lib/current-groups';


import { Divider } from '@nextui-org/react';
import FormController from '../_components/form-controller';

export default async function GroupSetupPage() {
  const { userId} = auth();
  const user = await currentUser();
  const groups = await currentGroups();

  if(!userId) { 
    
    redirectToSignIn();
  }
  
  
  
  
 if (groups)
  return (
    <main className="flex items-center  flex-col min-h-screen h-auto w-full gap-3 bg-[url(/cbg3.png)] bg-no-repeat bg-cover bg-center px-2 py-2">
      <div className="flex items-center flex-col gap-5 pt-3 sm:p-8 bg-zinc-100/80 rounded-md shadow-md h-auto">
        <h1 className=" text-xl md:text-3xl font-bold">Welcome, {`${user?.firstName} ${user?.lastName}`}!</h1>
        <UserButton afterSignOutUrl="/" />
        <Divider />
        <FormController groups={groups} />
        </div>
    </main>
  )
}
