




import { UserButton, auth, currentUser, redirectToSignIn } from '@clerk/nextjs';
import { currentProfile } from '@/lib/current-profile';
import { redirect } from 'next/navigation';


import { Divider } from '@nextui-org/react';
import NavButton from '@/components/ui/nav-button';
import { Box, Check, File, User2 } from 'lucide-react';
import SantaUser from '@/components/ui/santa-user';
import { currentGroup } from '@/lib/current-groups';
import ProfileSummary from '@/components/profile-summary';

export default async function SetupPage() {
  const { userId} = auth();
  const user = await currentUser();
  

  if(!userId) { 
    
    redirectToSignIn();
  }
  
  const profile = await currentProfile();
  const group = await currentGroup();

  if(profile?.setupComplete === true) {
    redirect(`/${profile.groupId}/${profile.id}`);
   }
  
   if(group &&profile){
    redirect(`/${profile.groupId}/${profile.id}`);
   }
  

  return (
    <main className="flex items-center justify-center flex-col min-h-screen h-auto w-full gap-3 bg-[url(/cbg3.png)] bg-no-repeat bg-cover bg-center px-2 py-2">
      <div className="flex items-center flex-col gap-5 pt-3 sm:p-8 bg-zinc-100/80 rounded-md shadow-md h-auto">
        {!profile ? (
        <div className="flex gap-2 p-2">
        <h1 className=" text-xl md:text-3xl font-bold">Welcome {`${user?.firstName} ${user?.lastName}`}!</h1>
        <UserButton afterSignOutUrl="/" /></div>) 
        : (
          <div>
          <div className="flex justify-between w-full gap-5 p-2">
        <h1 className=" text-xl md:text-3xl font-bold">Welcome {`${user?.firstName} ${user?.lastName}`}! </h1>

        <UserButton afterSignOutUrl="/" />
        </div>
        <Divider />
        {profile.name &&(
          <div className="flex gap-5 items-center justify-center w-full">
           
            <ProfileSummary
            profile={profile}
            />
        </div>
        )}
      
        </div>
          
        )}

        
        
        <Divider />
        <h2>Initial Setup </h2>
        <Divider />

      {!profile?.setupProfile ? (
        <div className="flex justify-center items-center px-2 py-2 w-full">
        <NavButton 
          href={`/profile`}
          icon={<File className="h-3 w-3" />}
          text="Create a Profile"
          className="flex items-center justify-center px-2 py-2 gap-1 hover:scale-105 rounded-md bg-emerald-700 text-white hover:bg-red-800 transition-all text-sm shadow-md"
          />
          </div> ) : (<div className="flex justify-between items-center px-2 py-2 w-full gap-5">
            <div>Profile Created!</div><div><Check/></div>
          </div>

          )}

        
      {profile?.setupProfile && (
      <div className="flex items-center flex-col">

      <div className="flex justify-between flex-col items-center px-2 py-2 w-full gap-5 ">
       
     
      <div className="flex justify-between  items-center px-2 py-2 w-full">
      <NavButton 
          href={`/group`}
          icon={<User2 className="h-3 w-3" />}
          text="Create or Join a Group"
          className="flex items-center justify-center px-2 py-2 gap-1 hover:scale-105 rounded-md bg-emerald-700 text-white hover:bg-emerald-500 transition-all text-sm shadow-md"
          />
          </div>

          </div>
          </div>
          )}
        
        </div>
    </main>
  )
}
