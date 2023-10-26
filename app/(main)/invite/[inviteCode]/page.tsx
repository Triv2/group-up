import { db } from "@/lib/db";
import InviteProfileForm from "./_components/invite-profile-form";
import { UserButton, auth, currentUser, redirectToSignIn } from "@clerk/nextjs";
import { Divider } from "@nextui-org/react";
import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";

interface InviteCodePageProps {
  params:{
    inviteCode: string;
  }
}

const InviteCodePage = async ({
  params
}:InviteCodePageProps) => {


  const {userId} = auth();
  if (!userId) { 
    redirectToSignIn();
  }
  const group = await db.group.findUnique({
    where:{
      inviteCode:params.inviteCode,
    }
  })

  const profile = await currentProfile() || null;

  

  if(profile && group){
    try{
    await db.profile.update({
      where:{
        id:profile.id
      },
      data:{
        groupIds:{push:group.id},
      }
    });
    await db.group.update({
      where:{
        id:group.id
      },
      data:{
        profileIds:{
          push:profile.id,
        },
      }
    })
    } catch (error) {
      console.log(error)
    } finally {
    redirect(`/dashboard/`)
    }
  }

  const user = await currentUser();
  if (!user){
    redirectToSignIn();
  }
  
 
  
if(group) {

  return (
<div><div className="flex items-center justify-center flex-col min-h-screen h-auto bg-[url(/cbg1.png)] bg-no-repeat bg-cover bg-center p-5 ">
<div className=" rounded-md flex items-center justify-center flex-col pt-10 pb-10 h-auto bg-zinc-100/70 shadow-xl">
<h1 className="text-2xl font-bold text-start w-full pl-10 px-2">Welcome, {user?.firstName} {user?.lastName}!</h1>
<Divider/>
  <div className="px-2 flex flex-col items-center justify-center gap-3 py-2">
    <p className="font-semibold"> You have joined the {group?.name} group!</p>
    <Divider />
    {group && !profile && (<h2 className="font-bold text-lg">Create your Profile</h2>)}
    {group && profile && (
      <h2 className="font-bold text-lg">
        Accepting invitation!
        </h2>
    )}
<Divider />

</div>

<div className=" rounded-md shadow-md">
{group && !profile && (<InviteProfileForm group={group}/>)}

</div>
<div className="p-2 flex items-center justify-between px-5 w-full">

<UserButton afterSignOutUrl="/"/>
</div>
    </div>
</div>

</div>
  );
}
}
export default InviteCodePage;