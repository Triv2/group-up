

import { initialProfile } from '@/lib/initial-profile'

import Image from 'next/image'
import { auth, redirectToSignIn } from '@clerk/nextjs';
import { currentProfile } from '@/lib/current-profile';
import { redirect } from 'next/navigation';

import { currentGroups } from '@/lib/current-groups';

import FormController from './_components/form-controller';

export default async function SetupPage() {
  const { userId} = auth();
  const initProfile = await initialProfile();
  const groups = await currentGroups();

  if(!userId) { 
    
    redirectToSignIn();
  }
  
  const getCurrentProfile = await currentProfile() || null;

  if(getCurrentProfile?.setupComplete) {
    redirect(`/${getCurrentProfile.groupId}/${getCurrentProfile.id}`);
   }
  
   if(getCurrentProfile?.groupId){
    redirect(`/profile`);
   }

 if (groups)
  return (
    <main className="flex items-center justify-center flex-col h-screen w-full gap-3 bg-[url(/cbg3.png)] bg-no-repeat bg-cover bg-center px-2 py-2">
      <div className="flex items-center flex-col gap-5 p-10 bg-zinc-100/75 rounded-md">
        <h1 className="text-3xl font-bold">Welcome, {initProfile.name}!</h1>
        <p className="w-[150px] sm:w-[300px] md:w-[450px]">Please fill out the form prior to 12/15/2023 to participate in Secret Santa. </p>
        
       
        <FormController groups={groups} profile={initProfile}/>
        </div>
    </main>
  )
}
