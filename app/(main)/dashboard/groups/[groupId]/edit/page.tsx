
import NavButton from "@/components/ui/nav-button";
import { MoveLeft } from "lucide-react";

import { Divider } from "@nextui-org/react";
import { UserButton, auth, redirectToSignIn } from "@clerk/nextjs";

import EditGroupSettingsForm from "../../../../../../components/group/edit-group-settings";

import { currentCreator } from "@/lib/current-creator";

import { db } from "@/lib/db";


interface GroupEditPageProps {
  params:  { groupId: string  };
}

const GroupEditPage = async ({
  params,
}:GroupEditPageProps) => {

  const { userId} = auth();
  if(!userId) {
    redirectToSignIn();
  }

 
  const creator = await currentCreator();
 
  let visible= false;

 
    
  const currentGroup=await db.group.findUnique({
    where: {
      id: params.groupId,
    },
  })
  
  if(currentGroup?.creator === creator?.id) {
    visible = true;
  }
  
      
   
 
  return (
<div className="flex items-center justify-center flex-col h-auto min-h-screen bg-[url(/cbg5.png)] bg-no-repeat bg-cover bg-center p-5 py-10">
  <div className="bg-zinc-100 dark:bg-zinc-700 flex items-center justify-center flex-col rounded-md p-3">
 
   
   
      
    {(visible && currentGroup) ?( <EditGroupSettingsForm group={currentGroup}/>
    ):(
      <div className="flex items-center flex-col justify-center gap-2 p-2">
        <h1 className="text-3xl text-red-500 font-bold">ACCESS DENIED</h1>
      <p className="text-muted-foreground">I could have redirected you, instead you have to press a button. Take that.</p>
      </div>
    )}
   
   <Divider/>
 
   
   <Divider/>
<div className="p-2 flex items-center justify-between px-5 w-full">
  
<NavButton
    href={`/`}
    icon={<MoveLeft className="h-3 w-3" />}
    text="Back"
    className="flex items-center justify-center px-2 py-2 gap-1 hover:scale-105 rounded-md hover:bg-red-500 text-white bg-red-800 transition-all text-sm shadow-md"
    
  />
  <UserButton afterSignOutUrl="/"/>
  </div>
  </div>
</div>
  );
}
export default GroupEditPage;