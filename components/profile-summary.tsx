import { Avatar, Divider } from "@nextui-org/react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import SantaUser from "./ui/santa-user";
import { Group, Profile } from "@prisma/client";

interface ProfileSummaryProps {
  profile: Profile;
  group?:Group;
}

const ProfileSummary = ({
  profile,
  group,
}:ProfileSummaryProps) => {
  return (
<div className="flex items-center justify-start flex-col px-2 py-2 gap-1  rounded-md bg-zinc-100/80 shadow-md">
      <Accordion type="single" collapsible>
        <AccordionItem  value="item-1">
          <AccordionTrigger className="flex items-center justify-between flex-col w-full no-underline px-2 py-2 gap-1">
          {profile.name &&(  
            <div className="flex items-center justify-center md:flex-row flex-col gap-2">
              <p>Profile:</p>
          <SantaUser imageUrl={profile?.imageUrl} name={profile.name} />
          </div>
          )}
        </AccordionTrigger>
        <Divider/>
        <AccordionContent >
        <div className="flex gap-1 justify-between items-center w-full py-2">
          <p className="text-sm">Avatar:</p>
          <Avatar src={profile.imageUrl} size="sm" />
        </div>
        <div className="flex items-center flex-col gap-1">
          <div className="flex gap-1 justify-between items-center w-full">
        <p className="text-sm">Name:</p><p className="text-xs">{profile.name}</p>
        </div>
        
        <div className="flex gap-1 justify-between items-center w-full">
        <p className="text-sm">Group:</p><p className="text-xs">{group?.name || "No Group"}</p>
        </div>
        
        <div className="flex gap-1 justify-between items-center w-full">
        <p className="text-sm">Interests:</p><p className="text-xs">{profile.content}</p>
        </div>
        </div>
        </AccordionContent>
        </AccordionItem>
        </Accordion>
      </div>
  );
}
export default ProfileSummary;