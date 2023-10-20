

import { initialProfile } from '@/lib/initial-profile'

import Image from 'next/image'
import { auth, redirectToSignIn } from '@clerk/nextjs';
import { currentProfile } from '@/lib/current-profile';
import { redirect } from 'next/navigation';
import GroupForm from './_components/group-form';
import ProfileForm from './_components/profile-form';

export default async function SetupPage() {
  const { userId} = auth();
  const initProfile = await initialProfile();

  if(!userId) { 
    
    redirectToSignIn();
  }
  
  const getCurrentProfile = await currentProfile() || null;

  if(getCurrentProfile?.setupComplete) {
    redirect(`/${getCurrentProfile.groupId}/${getCurrentProfile.id}`);
   } 

  
  return (
    <main className="flex items-center justify-center flex-col h-screen gap-5">
      <div className="flex items-center flex-col gap-5">
        <h1>Welcome, {initProfile.name}!</h1>
        <p className="w-[450px]">Please fill out the form prior to 12/15/2023 to participate in Secret Santa. </p>
        </div>
      <GroupForm/>
      <ProfileForm initialData={initProfile}/>
    </main>
  )
}
