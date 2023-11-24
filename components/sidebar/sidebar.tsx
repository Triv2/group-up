
import SidebarController from "./sidebar-controller";

import { Group, Profile } from "@prisma/client";

interface SideBarProps {
  userCreatedGroups?: Group[] | null;
  nonUserCreatedGroups: Group[] | null;
  members?:Profile[] | null;
  profile?: Profile | null;
  name: string;
  allGroups: Group[] | null;
}


const SideBar =  ({
  userCreatedGroups,
  nonUserCreatedGroups,
  members,
  profile,
  name,
  allGroups,
}:
SideBarProps) => {



  return (
<div className="w-[148px] bg-zinc-100 dark:bg-zinc-600 h-full px-20 shadow-md">
  
       
          {members && profile &&(
          <SidebarController 
            profile={profile} 
            joinedGroups={nonUserCreatedGroups} 
            createdGroups={userCreatedGroups} 
            members={members}
            allGroups={allGroups}/>
            )}
      
        
</div>
  );
}
export default SideBar;