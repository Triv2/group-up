
import SidebarController from "./sidebar-controller";

import { Group, Message, MessageThread, Profile } from "@prisma/client";

interface SideBarProps {
  userCreatedGroups?: Group[] | null;
  nonUserCreatedGroups: Group[] | null;
  members?:Profile[] | null;
  profile?: Profile | null;
  name: string;
  allGroups: Group[] | null;
  allFriends: Profile[] | null;
  allMessageThreads: MessageThread[] | null;
  allMessages: Message[] | null;
}


const SideBar =  ({
  userCreatedGroups,
  nonUserCreatedGroups,
  members,
  profile,
  name,
  allGroups,
  allFriends,
  allMessageThreads,
  allMessages
}:
SideBarProps) => {



  return (
<div className="w-[148px] bg-zinc-100 dark:bg-gradient-to-r   from-zinc-900 to-slate-800   h-full px-20 shadow-md">
  
       
          {members && profile &&(
          <SidebarController 
            messages={allMessages}
            allFriends={allFriends}
            profile={profile} 
            joinedGroups={nonUserCreatedGroups} 
            createdGroups={userCreatedGroups} 
            members={members}
            allGroups={allGroups}
            messageThreads={allMessageThreads}
            />
            )}
      
        
</div>
  );
}
export default SideBar;