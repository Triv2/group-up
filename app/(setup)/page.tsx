

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
    redirect(`/${getCurrentProfile.groupId}/${getCurrentProfile.id}/settings`);
   }

 if (groups)
  return (
    <main className="flex items-center justify-center flex-col h-screen w-full gap-3">
      <div className="flex items-center flex-col gap-5 p-5">
        <h1 className="text-3xl font-bold">Welcome, {initProfile.name}!</h1>
        <p className="w-[200px] md:w-[450px]">Please fill out the form prior to 12/15/2023 to participate in Secret Santa. </p>
        </div>
        <FormController groups={groups} profile={initProfile}/>
      
    </main>
  )
}
