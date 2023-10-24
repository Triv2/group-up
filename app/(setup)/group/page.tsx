



import Image from 'next/image'
import { UserButton, auth, currentUser, redirectToSignIn } from '@clerk/nextjs';
import { currentProfile } from '@/lib/current-profile';
import { redirect } from 'next/navigation';

import { currentGroups } from '@/lib/current-groups';


import { Divider } from '@nextui-org/react';
import FormController from '../_components/form-controller';
import SantaUser from '@/components/ui/santa-user';
import ProfileSummary from '@/components/profile-summary';

export default async function GroupSetupPage() {
  const { userId} = auth();
  const user = await currentUser();
  const groups = await currentGroups();
  const profile = await currentProfile() || null;

  if(!userId) { 
    
    redirectToSignIn();
  }
  
  
  
  
 if (groups)
  return (
    <main className="flex items-center  flex-col min-h-screen h-auto w-full gap-3 bg-[url(/cbg3.png)] bg-no-repeat bg-cover bg-center px-2 py-2">
      <div className="flex items-center flex-col gap-5 pt-3 sm:p-8 bg-zinc-100/80 rounded-md shadow-md h-auto">
      {!profile ? (
        <h1 className=" text-xl md:text-3xl font-bold">Welcome {`${user?.firstName} ${user?.lastName}`}!</h1>) 
        : (
          <div>
            <div className="flex justify-between w-full gap-5 p-2">
          <h1 className=" text-xl md:text-3xl font-bold">Welcome {`${user?.firstName} ${user?.lastName}`}! </h1>

          <UserButton afterSignOutUrl="/" />
          </div>
          <Divider />
          {profile.name &&(
          <div className="flex gap-5 items-center justify-center">
          Current Profile:
            <ProfileSummary
            profile={profile}
            />
            </div>
          )}
        
          </div>
        )} 
        
        <Divider />
        <FormController groups={groups} />
        </div>
    </main>
  )
}
