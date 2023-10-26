



import Image from 'next/image'
import { UserButton, auth, currentUser, redirectToSignIn } from '@clerk/nextjs';
import { currentProfile } from '@/lib/current-profile';
import { redirect } from 'next/navigation';

import { allGroups } from '@/lib/all-groups';


import { Divider } from '@nextui-org/react';
import FormController from './_components/form-controller';

import ProfileSummary from '@/components/profile-summary';
import { allOpenGroups } from '@/lib/all-open-groups';
import { Home } from 'lucide-react';
import NavButton from '@/components/ui/nav-button';

export default async function GroupSetupPage() {
  const { userId} = auth();
  const user = await currentUser();
  const groups = await allGroups() || null;
  const profile = await currentProfile();
  const openGroups= await allOpenGroups() || null;

  if(!userId) { 
    
    redirectToSignIn();
  }
  
  if(!profile) {
    redirect(`/profile`)
  }
  
  
  

  return (
    <main className="flex items-center  flex-col min-h-screen h-auto w-full gap-3 bg-[url(/cbg3.png)] bg-no-repeat bg-cover bg-center px-2 py-2">
      <div className="flex items-center flex-col gap-5 pt-3 sm:p-8 bg-zinc-100/80 rounded-md shadow-md h-auto">
      {!profile ? (
        <h1 className=" text-xl md:text-3xl font-bold">Welcome {`${user?.firstName} ${user?.lastName}`}!</h1>) 
        : (
          <div>
            <div className="flex justify-between w-full gap-5 p-2">
          <h1 className=" text-xl md:text-3xl font-bold">Welcome {`${user?.firstName} ${user?.lastName}`}! </h1>
          {profile.setupComplete &&( 
          <div>
            <NavButton 
          href={`/dashboard`}
          icon={<Home className="h-3 w-3" />}
          text="Back to Dashboard"
          className="flex items-center justify-center px-2 py-2 gap-1 hover:scale-105 rounded-md bg-emerald-700 text-white hover:bg-emerald-500 transition-all text-sm shadow-md"
          />
        </div>)}
          <UserButton afterSignOutUrl="/" />
          </div>
          <Divider />
          {profile.name && !groups &&(
           
          <div className="flex gap-5 items-center justify-center w-full">
        
            <ProfileSummary
            profile={profile}
            />
            </div>)}

            {groups && profile && (
            <div className="flex gap-5 items-center justify-center w-full">
        
            <ProfileSummary
              profile={profile}
              groups={groups}
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
