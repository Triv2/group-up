import SantaUser from "@/components/ui/santa-user";
import { currentGroup } from "@/lib/current-group";
import { currentMembers } from "@/lib/current-members";
import { currentProfile } from "@/lib/current-profile";
import { UserButton } from "@clerk/nextjs";
import { Button, Divider, User } from "@nextui-org/react";
import Link from "next/link";
import { redirect } from "next/navigation";



interface ProfilePageProps {}

const ProfilePage = async () => {
   const profile = await currentProfile();
   const group = await currentGroup();
   const members = await currentMembers();
 
  

  
 
  return (
<div className="flex items-center h-screen flex-col gap-4 pt-10 bg-[url(/cbg2.png)] bg-no-repeat bg-cover bg-center">
  <h1 className="text-3xl font-bold">Welcome, {profile?.name}!</h1>
  <p>You are apart of the {group?.name}</p>
  <UserButton afterSignOutUrl="/"/>
  <div className="grid md:grid-cols-2 gap-10 ">
    <div className="flex items-center justify-center flex-col px-2 py-2 border-black border-1 rounded-md">
      <h3>List of People in your {group?.name}</h3>
      <Divider/>
       {members && members.map((member) => (
        <div key={member.id}>
        
          {member.name}
        </div>
      ))} 
      

    </div>
    <div className="flex items-center  flex-col px-2 py-2 border-black border-1 rounded-md">
        <h3>Your current profile</h3>
        <Divider/>
        <p>{profile?.content}</p>
        
      </div>

  </div>

</div>
  );
}
export default ProfilePage;