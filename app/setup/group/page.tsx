




import {  auth,  redirectToSignIn } from '@clerk/nextjs';
import { currentProfile } from '@/lib/current-profile';
import { redirect } from 'next/navigation';



import { Divider } from '@nextui-org/react';

import CreateGroupForm from './_components/create-group-form';

export default async function GroupSetupPage() {
  const { userId} = auth();
 
  const profile = await currentProfile();
 

  if(!userId) { 
    
    redirectToSignIn();
  }
  
  if(!profile) {
    redirect(`/setup/profile`)
  }
  
  
  

  return (
    <main className="flex items-center justify-center flex-col min-h-screen h-auto w-full gap-3 bg-[url(/cbg3.png)]  bg-no-repeat bg-cover bg-center px-2 py-2">
      <div className="flex items-center  justify-center  sm:p-8 bg-zinc-200 dark:bg-zinc-700 rounded-md shadow-md mt-[35px] h-auto">
   
        <CreateGroupForm/>
        </div>
    </main>
  )
}
