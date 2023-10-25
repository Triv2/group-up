import { db } from "@/lib/db";
import InviteProfileForm from "./_components/invite-profile-form";
import { UserButton, currentUser, redirectToSignIn } from "@clerk/nextjs";
import { Divider } from "@nextui-org/react";

interface InviteCodePageProps {
  params:{
    inviteCode: string;
  }
}

const InviteCodePage = async ({
  params
}:InviteCodePageProps) => {
  const user = await currentUser();
  if (!user){
    redirectToSignIn();
  }
  
 const group = await db.group.findUnique({
        where:{
          inviteCode:params.inviteCode,
        }
      })
  


  return (
<div><div className="flex items-center justify-center flex-col min-h-screen h-auto bg-[url(/cbg1.png)] bg-no-repeat bg-cover bg-center p-5 ">
<div className=" rounded-md flex items-center justify-center flex-col pt-10 pb-10 h-auto bg-zinc-100/70 shadow-xl">
  <div>
    <h1>Welcome {user?.firstName} {user?.lastName}</h1>
    <p> You have joined the {group?.name} group!</p>
    <Divider />
<h2 className="font-bold text-lg">Create your Profile</h2>

<Divider />

</div>

<div className=" rounded-md shadow-md">
{group && (<InviteProfileForm group={group}/>)}
</div>
<div className="p-2 flex items-center justify-between px-5 w-full">

<UserButton afterSignOutUrl="/"/>
</div>
    </div>
</div>

</div>
  );
}
export default InviteCodePage;