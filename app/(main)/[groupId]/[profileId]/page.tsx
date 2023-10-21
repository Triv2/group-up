import NavButton from "@/components/ui/nav-button";
import SantaUser from "@/components/ui/santa-user";
import { currentGroup } from "@/lib/current-group";
import { currentMembers } from "@/lib/current-members";
import { currentProfile } from "@/lib/current-profile";
import { UserButton } from "@clerk/nextjs";
import { Button, Divider, User } from "@nextui-org/react";
import { Edit } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";



interface ProfilePageProps {}

const ProfilePage = async () => {
   const profile = await currentProfile();
   const group = await currentGroup();
   const members = await currentMembers();
 
  

  
 
  return (
<div className="flex items-center h-screen flex-col gap-4 pt-10 bg-[url(/cbg2.png)] bg-no-repeat bg-cover bg-center">
  <div className="rounded-md bg-zinc-100/80 flex flex-col items-center justify-center gap-2 p-5 shadow-md">
  <h1 className="text-3xl font-bold">Welcome, {profile?.name}!</h1>
  <p>You are apart of the {group?.name}</p>
  <Divider />
  <div className="flex items-center justify-center gap-3">
  <UserButton afterSignOutUrl="/"/>
  <NavButton 
  href={`/${group?.id}/${profile?.id}/settings`}
  icon={<Edit className="h-4 w-4" />}
  text="Edit Profile"
  className="flex items-center justify-center px-2 py-2 gap-1 bg-emerald-500/20 rounded-md hover:scale-105 transition-all text-sm shadow-md"
  />
  </div>
  </div>
  <div className="grid md:grid-cols-2 gap-10 px-7 ">
    <div className="flex items-center justify-center flex-col px-2 py-2  rounded-md bg-zinc-100/80 shadow-md">
      <h3>List of People in your {group?.name}</h3>
      <Divider/>
       {members && members.map((member) => (
        <div key={member.id}>
        
          {member.name}
        </div>
      ))} 
      

    </div>
    {profile &&(
    <div className="flex items-center  flex-col px-2 py-2  rounded-md bg-zinc-100/80 shadow-md">
      
        <h3>Your current profile</h3>
        <Divider/>
        <p>Name:{profile.name}</p>
        <p>Interests:{profile.content}</p>
        <p>Group:{group?.name}</p>
        <Image src={profile.imageUrl} width={50} height={50} alt={profile?.name || ""} />
      
      </div>
    )}
  </div>

</div>
  );
}
export default ProfilePage;