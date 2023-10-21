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
  className="flex items-center justify-center px-2 py-2 gap-1 hover:scale-105 rounded-md bg-emerald-700 text-white hover:bg-red-800 transition-all text-sm shadow-md"
  />
  </div>
  </div>
  <div className="grid md:grid-cols-2 gap-10 px-7 ">
    <div className="flex items-center justify-start flex-col px-2 py-2 gap-1  rounded-md bg-zinc-100/80 shadow-md">
      <h3>List of People in your {group?.name}</h3>
      <Divider/>
      <ul className="flex items-center flex-col gap-1">
       {members && members.map((member) => (
        <li key={member.id}>
        
          {member.name}
        </li>
      ))} 
      </ul>

    </div>
    {profile &&(
    <div className="flex items-center justify-start flex-col px-2 py-2 gap-1  rounded-md bg-zinc-100/80 shadow-md">
      
        <h3>Your current profile</h3>
        <Divider/>
        <div className="flex items-center flex-col gap-1">
          <div>
        <p >Name:</p><p>{profile.name}</p>
        </div>
        <div>
        <p className="flex gap-1 justify-between items-center w-full">Interests:{profile.content}</p>
        </div>
        <div>
        <p className="flex gap-1 justify-between items-center w-full">Group:{group?.name}</p>
        </div>
        <div>
        <Image src={profile.imageUrl} width={50} height={50} alt={profile?.name || ""} />
        </div>
        </div>
      </div>
    )}
  </div>

</div>
  );
}
export default ProfilePage;