import { Avatar, Divider } from "@nextui-org/react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import SantaUser from "../ui/santa-user";
import { Group, Profile } from "@prisma/client";
import NavButton from "../ui/nav-button";
import { Edit, Layers, User2, UserSquare2, Users2 } from "lucide-react";

import ProfileGroupList from "@/components/profile/profile-group-list";
import ProfileActionList from "@/components/profile/profile-action-list";
import { currentCreatedGroups } from "@/lib/current-created-groups";
import FriendActionList from "./friend-action-list";

interface FriendSummaryProps {
  currentProfile: Profile;
  profile: Profile;
  joinedGroups?:Group[];
  createdGroups?:Group[];
  onClose: () => void;
}



const FriendSummary = ({
  onClose,
  profile,
  joinedGroups,
  createdGroups,
  currentProfile,
}:FriendSummaryProps) => {
  return (
<div className="flex items-center justify-start flex-col px-2 py-2 gap-1  rounded-md bg-zinc-100 dark:bg-zinc-700 shadow-md w-full">

            
            <div className="flex gap-5 justify-between items-center w-full py-2 px-2">

                <p className="text-xs">Avatar:</p>
                <Avatar src={profile.imageUrl} size="sm" />
               </div>
            <Divider/>

            
              <div className="flex gap-5 justify-between items-center w-full py-2 px-2">
            <p className="text-xs">Name:</p><p className="text-xs text-end">{profile.name}</p>
            </div>
            <Divider/>
            <div className="flex gap-5 justify-between items-center w-full py-2 px-2">
            <p className="text-xs">Interests:</p><p className="text-xs ">{profile.content}</p>
            </div>
           <Divider/>
        {profile && ( <FriendActionList profile={currentProfile} onClose={onClose} targetId={profile.id} />)}
      </div>
  );
}
export default FriendSummary;