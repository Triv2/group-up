import { Avatar, Divider } from "@nextui-org/react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import SantaUser from "./ui/santa-user";
import { Group, Profile } from "@prisma/client";

interface ProfileSummaryProps {
  profile: Profile;
  groups?:Group[];
}

const ProfileSummary = ({
  profile,
  groups,
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
        <AccordionContent className="px-10 w-full" >
          <div className="">
        <div className="flex gap-5 justify-between items-center w-full py-2 px-2">
          
          <p className="text-sm">Avatar:</p>
          <Avatar src={profile.imageUrl} size="sm" />
        </div>
        <div className="flex items-center flex-col gap-1">
          <div className="flex gap-1 justify-between items-center w-full px-2">
        <p className="text-sm">Name:</p><p className="text-xs">{profile.name}</p>
        </div>
        
        <div className="flex gap-1 justify-between items-center w-full px-2">
        <p className="text-sm">Groups:</p>
        {groups && (groups.length>0) ? (
        groups?.map((group) =>(
        <div key={group.id} className="text-xs flex flex-col justify-center items-center">
          {group?.name || "No Group"}
          </div>
          ))
        ) : (
          <p className="text-xs">No Groups</p>
        )}
        </div>
        
        <div className="flex gap-1 justify-between items-center w-full px-2">
        <p className="text-sm">Interests:</p><p className="text-xs ">{profile.content}</p>
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