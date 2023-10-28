'use client'
import {useState, useEffect} from'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Avatar, AvatarGroup, Divider } from '@nextui-org/react';
import { Creator, Group, Profile } from '@prisma/client';
import InviteCode from './ui/invite-code';
import GroupActionList from './group/group-action-list';

interface GroupSummaryProps {
  group: Group;
 members:Profile[];
  profile?: Profile;
  
}

const GroupSummary:React.FC<GroupSummaryProps> = ({
  group,
  members,
  profile,
}) => {

const [isMounted, setIsMounted] = useState(false);


const groupProfileIds = group?.profileIds;
const matchedMembers = members.filter((member) => groupProfileIds?.includes(member.id));
const creator = matchedMembers.find((member) => member.id === group.creator);
const user = matchedMembers.find((member) => profile?.id === member.id);

useEffect(() => {
setIsMounted(true);
}, []);

if (!isMounted) {
return null;
}
  return (
    
    <div className="flex items-center justify-start flex-col px-2 py-2 gap-1 h-auto rounded-md bg-zinc-100/80 shadow-md w-[250px] sm:[400px] md:w-[300px]">
      <Accordion className="w-full h-full" type="single" collapsible>
        <AccordionItem  value="item-1">
          <AccordionTrigger className="flex items-center justify-between  w-full no-underline px-2 py-2 gap-1 hover:bg-white hover:scale-105">
      
        
       {group &&( <div className="flex items-center gap-2 w-full">
        <Avatar  src={group.imageUrl} size="md" className="border-5 hover:scale-105 shadow-md"/>
        <p className=" font-bold">{group.name}</p>
        </div>)}
        <AvatarGroup size="sm" isBordered max={3} total={matchedMembers?.length} >
      {matchedMembers && matchedMembers.map((member) => (
        <Avatar src={member.imageUrl} size="sm" key={member.id} />
        ))}
          
    </AvatarGroup>
      
      </AccordionTrigger>
      <Divider/>
      <AccordionContent>
      <ul >
        <div className="flex items-center flex-col gap-1 w-full p-1 ">
        {creator && (<InviteCode group={group} creator={creator} members={members} profile={profile}/>)}
        <Divider/>
        <div className="py-2 font-bold text-lg">
        Group Members
        </div>
        <Divider/>
       {matchedMembers  && matchedMembers.map((member) => (
        <li className="text-xs  flex items-center gap-1 justify-start w-full shadow-md py-1 rounded-md bg-zinc-50 px-2" key={member.id}>
        <Avatar src={member.imageUrl} size="sm"  />
        <div className="flex flex-col">
        {member.name}
        <Divider/>
          </div>
        </li>
      ))} 
      </div>
      </ul>
    
      </AccordionContent>
      </AccordionItem>
        </Accordion>
    </div>
  );
}
export default GroupSummary;