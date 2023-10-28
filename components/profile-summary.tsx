import { Avatar, Divider } from "@nextui-org/react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import SantaUser from "./ui/santa-user";
import { Group, Profile } from "@prisma/client";
import NavButton from "./ui/nav-button";
import { Edit, Layers, User2, UserSquare2, Users2 } from "lucide-react";

import ProfileGroupList from "./profile/profile-group-list";

interface ProfileSummaryProps {
  profile: Profile;
  joinedGroups?:Group[];
  createdGroups?:Group[];
}

const ProfileSummary = async ({
  profile,
  joinedGroups,
  createdGroups,
}:ProfileSummaryProps) => {
  return (
<div className="flex items-center justify-start flex-col px-2 py-2 gap-1  rounded-md bg-zinc-100/80 shadow-md w-full">
      <Accordion className="w-full"  type="single" collapsible>
        <AccordionItem className="w-full"  value="item-1">
          <AccordionTrigger className="flex items-center justify-between hover:scale-105 hover:bg-white w-full no-underline hover:no-underline px-2 py-2 gap-1 ">
          {profile.name &&(  
            <div className="flex items-center justify-center sm:flex-row flex-col gap-2">

          <div className="flex items-center justify-center gap-5 rounded-md p-2">
            
            <div className="  border-black flex items-center justify-center gap-5 rounded-md p-2">
            <Avatar size="md" color="success" isBordered src={profile.imageUrl}/>
            <div>
              <p className="text-lg font-semibold">{profile.name}</p>
              <Divider />
              </div>
              </div>
          </div>


          </div>
          )}
        </AccordionTrigger>
        <Divider/>
        <AccordionContent className="md:px-10 w-full" >
          <div className="">
        <div className="flex gap-5 justify-between items-center w-full py-2 px-2">
          
          <p className="text-sm">Avatar:</p>
          <Avatar src={profile.imageUrl} size="sm" />
        </div>
        <Divider/>
        <div className="flex items-center flex-col gap-1">
          <div className="flex gap-1 justify-between items-center w-full px-2">
        <p className="text-sm">Name:</p><p className="text-xs text-end">{profile.name}</p>
        </div>
        <Divider/>
        <div className="flex gap-1 justify-between items-center w-full px-2">
        <p className="text-sm">Joined Groups:</p>
        <div>
        {joinedGroups && (joinedGroups.length>0) ? 
          (
          <ProfileGroupList groups={joinedGroups} icon={<Users2 className="h-4 w-4"/> }/>
          )
        : (
          <p className="text-xs">No Groups</p>
        )}
        </div>
        </div>
        <Divider/>
        <div className="flex gap-1 justify-between items-center w-full px-2">
          <p className="text-sm">Created Groups:</p>
          <div>
      {createdGroups && (createdGroups.length>0) ? 
          (
          <ProfileGroupList groups={createdGroups} icon={<UserSquare2 className="h-4 w-4"/> }/>  
          )
        : (
          <p className="text-xs">No Groups</p>
        )}
        </div>
        </div>
        <Divider />
        <div className="flex gap-1 justify-between items-center w-full px-2">
        <p className="text-sm">Interests:</p><p className="text-xs ">{profile.content}</p>
        </div>
        <Divider />
        <div className="flex gap-1 p-1 flex-col md:flex-row">
    {profile.setupComplete &&(   
        <div>
       <NavButton 
          href={`/dashboard/profiles/${profile?.id}/settings`}
          icon={<Edit className="h-3 w-3" />}
          text="Profile Settings"
          className="flex items-center justify-center px-2 py-2 gap-1 hover:scale-105 rounded-md bg-emerald-700 text-white hover:bg-emerald-500 transition-all text-sm shadow-md"
          />
           <NavButton 
          href={`/dashboard/groups/settings`}
          icon={<User2 className="h-3 w-3" />}
          text="Group Settings"
          className="flex items-center justify-center px-2 py-2 gap-1 hover:scale-105 rounded-md bg-emerald-700 text-white hover:bg-emerald-500 transition-all text-sm shadow-md"
          />
          </div>)}
           <NavButton 
          href={`/group`}
          icon={<Edit className="h-3 w-3" />}
          text="Create or Join Groups"
          className="flex items-center justify-center px-2 py-2 gap-1 hover:scale-105 rounded-md bg-emerald-700 text-white hover:bg-emerald-500 transition-all text-sm shadow-md"
          />
        </div>
        </div>
        </div>
        </AccordionContent>
        </AccordionItem>
        </Accordion>
      </div>
  );
}
export default ProfileSummary;