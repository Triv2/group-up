import { Avatar, Divider } from "@nextui-org/react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import SantaUser from "../ui/santa-user";
import { Group, Profile } from "@prisma/client";
import NavButton from "../ui/nav-button";
import { Edit, Layers, User2, UserSquare2, Users2 } from "lucide-react";

import ProfileGroupList from "./profile-group-list";
import ProfileActionList from "./profile-action-list";

interface ProfileSummaryProps {
  profile: Profile;
  joinedGroups?:Group[];
  createdGroups?:Group[];
  onClose: () => void;
}



const ProfileSummary = ({
  onClose,
  profile,
  joinedGroups,
  createdGroups,
}:ProfileSummaryProps) => {
  return (
<div className="flex items-center justify-start flex-col px-2 py-2 gap-1  rounded-md bg-zinc-100/80 shadow-md w-full">

            <div className="w-full ">
          <p className="font-bold text-md py-1 px-1 pt-2 w-full">Profile Information</p>
          </div>
          <Divider/>
            <div className="flex gap-5 justify-between items-center w-full py-2 px-2">

                <p className="text-xs">Avatar:</p>
                <Avatar src={profile.imageUrl} size="sm" />
               </div>
            <Divider/>

            <div className="flex items-center flex-col">
              <div className="flex gap-5 justify-between items-center w-full py-2 px-2">
            <p className="text-xs">Name:</p><p className="text-xs text-end">{profile.name}</p>
            </div>
            <Divider/>
            <div className="flex gap-5 justify-between items-center w-full py-2 px-2">
            <p className="text-xs">Interests:</p><p className="text-xs ">{profile.content}</p>
            </div>
            <Divider/>
            </div>
      </div>
  );
}
export default ProfileSummary;