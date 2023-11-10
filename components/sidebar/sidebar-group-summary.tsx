'use client'
import {useState, useEffect} from'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Avatar, AvatarGroup, Button, Divider, Tooltip } from '@nextui-org/react';
import { Creator, Group, Profile } from '@prisma/client';
import InviteCode from '../ui/invite-code';
import GroupActionList from '../group/group-action-list';
import { useRouter } from 'next/navigation';

interface SidebarGroupSummaryProps {
  group: Group;
 members:Profile[];
  profile?: Profile;
  
}

const SidebarGroupSummary:React.FC<SidebarGroupSummaryProps> = ({
  group,
  members,
  profile,
}) => {

const [isMounted, setIsMounted] = useState(false);
const router = useRouter();

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
    
    <div className="flex items-center justify-start flex-col max-w-[140px] min-w-[140px] w-full">
     {group &&(  
     <Tooltip
       placement="right"
       content={group.name}
       className="">
        <Button 
        onClick={()=>router.push(`/dashboard/groups/${group.id}`)}
        size="sm" 
        className="w-full pl-0 rounded-none bg-zinc-200/80 dark:bg-zinc-700/50 hover:dark:bg-zinc-400/50 hover:bg-opacity-5 hover:bg-zinc-50 dark:hover:text-emerald-400 hover:text-emerald-500 hover:scale-105"
        >
       <div className="flex items-center justify-start  w-full">
        <div>
        <Avatar  src={group.imageUrl} size="sm" className="border-5 hover:scale-105 shadow-md"/>
        </div>
        <p className="text-xs   truncate ">{group.name}</p>
        </div>
      
      
      </Button>
      </Tooltip>)}
    </div>
  );
}
export default SidebarGroupSummary;