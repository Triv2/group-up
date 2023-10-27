'use client'
 import { Button, Divider,  } from '@nextui-org/react';
 import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Creator, Group, Profile } from '@prisma/client';
import {useState, useEffect} from'react'
import CreatorActions from './creator-actions';
import { useParams, useRouter } from 'next/navigation';
import { Cog, DoorClosed, DoorOpen, Scroll, Undo, Workflow } from 'lucide-react';
import { AlertModal } from '../modals/alert-modal';
import axios from 'axios';
import toast from 'react-hot-toast';


interface GroupActionListProps {
  group: Group;
  members: Profile[];
  creator?: Profile;
  profile?: Profile;
}



const GroupActionList:React.FC<GroupActionListProps> = ({
  group,
  members,
  creator,
  profile,

}) => {

  
  const router = useRouter();
const [isMounted, setIsMounted] = useState(false);
const [loading, setLoading] = useState(false);
const [leave, setLeave] = useState(false);


const handleLeave =  () => {
  if(leave){
    setLeave(false);
  }else{
    setLeave(true);
  }
}

const leaveGroup = async (group:Group) => {
  try {
    setLoading(true);
    const groupId = {groupId:group.id}
  
    console.log("OnSubmit", groupId)
    await axios.patch(`/api/group/${groupId}/leave`,groupId)
    if(leave){
      setLeave(false);
    }
    
    toast.success("Group Left!");
  } catch (error) {
    toast.error("Something went wrong.");
  } finally {
    router.refresh();
    setLoading(false);
  }
}

let selectedJoinedGroup = false;
let currentCreator= false;

if(creator?.id===profile?.id){
  currentCreator = true;
}



profile?.groupIds.forEach(groupId => {
  if (groupId === group.id) {
    selectedJoinedGroup = true;
  }
})

useEffect(() => {
setIsMounted(true);
}, []);

if (!isMounted) {
return null;
}
  return (
    <>
    <AlertModal
        isOpen={leave}
        onClose={()=> setLeave(false)}
        onConfirm={()=>leaveGroup(group)}
        loading={loading}
      />
    <DropdownMenu >
      <DropdownMenuTrigger
            className="flex items-center justify-center px-2 py-2 gap-1 hover:scale-105 rounded-md bg-emerald-700 text-white hover:bg-emerald-500 transition-all text-sm shadow-lg">
           <Workflow className="h-4 w-4"/> Options
           
      </DropdownMenuTrigger>
      <DropdownMenuContent className="shadow-xl" aria-label="Static Actions">
    
      
     
      {!selectedJoinedGroup && group.openGroup &&(
         <DropdownMenuItem textValue="join" key="join">
         
            <Button 
            onClick={()=>router.push(`/invite/${group.inviteCode}`)}
            className="flex items-center justify-center px-2 py-2 gap-1 hover:scale-105 rounded-md bg-emerald-700 text-white hover:bg-emerald-500 transition-all text-sm shadow-lg w-full">
            <DoorOpen className="h-4 w-4"/> Join
            </Button>
          
          </DropdownMenuItem> )}
          {!selectedJoinedGroup && !group.openGroup &&(
            <DropdownMenuItem textValue="apply" key="apply">
          
            <Button 
            onClick={()=>router.push(`/dashboard/groups/${group.id}/apply`)}
            className="flex items-center justify-center px-2 py-2 gap-1 hover:scale-105 rounded-md bg-emerald-700 text-white hover:bg-emerald-500 transition-all text-sm shadow-lg w-full" >
             <Scroll className="h-4 w-4"/>Apply
            </Button>
          </DropdownMenuItem>
          )}
       
       {currentCreator && ( 
       <DropdownMenuItem textValue="edit" key="edit">
       <Button 
        onClick={()=>router.push(`/dashboard/groups/${group.id}`)}
        className="flex items-center justify-center px-2 py-2 gap-1 hover:scale-105 rounded-md bg-orange-700 text-white hover:bg-orange-500 transition-all text-sm shadow-lg w-full" >
         <Cog className="h-4 w-4"/> Edit
        </Button>
       </DropdownMenuItem> )}
       

          <DropdownMenuItem textValue="leave" key="leave">
            <Button 
            onClick={handleLeave}
            className="flex items-center justify-center px-2 py-2 gap-1 hover:scale-105 rounded-md bg-red-700 text-white hover:bg-red-500 transition-all text-sm shadow-lg w-full" >
            <Undo className="h-4 w-4"/> Leave 
            </Button>
          </DropdownMenuItem>
          
         
      
          
      </DropdownMenuContent>
    </DropdownMenu>
    </>
  );
}
export default GroupActionList;