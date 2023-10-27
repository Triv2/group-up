'use client'
import { Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { Creator, Group, Profile } from '@prisma/client';
import {useState, useEffect} from'react'
import CreatorActions from './creator-actions';
import { useParams, useRouter } from 'next/navigation';
import { Workflow } from 'lucide-react';
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


if(creator?.id===profile?.id){
  const userCreator = profile;
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
    <Dropdown className="shadow-xl">
      <DropdownTrigger>
            <Button 
            
            className="flex items-center justify-center px-2 py-2 gap-1 hover:scale-105 rounded-md bg-emerald-700 text-white hover:bg-emerald-500 transition-all text-sm shadow-lg">
           <Workflow className="h-4 w-4"/> Options
            </Button>
      </DropdownTrigger>
      <DropdownMenu  aria-label="Static Actions">
    
      
     
       {group.openGroup  ? (  
         <DropdownItem textValue="join" key="join">
          {!selectedJoinedGroup && (
            <Button 
            onClick={()=>router.push(`/group/${group.id}/edit`)}
            className="flex items-center justify-center px-2 py-2 gap-1 hover:scale-105 rounded-md bg-emerald-700 text-white hover:bg-emerald-500 transition-all text-sm shadow-lg w-full">
             Join
            </Button>
          )}
          </DropdownItem>
          ):(
            <DropdownItem textValue="apply" key="apply">
          {!selectedJoinedGroup && (
            <Button 
            onClick={()=>router.push(`/group/${group.id}/edit`)}
            className="flex items-center justify-center px-2 py-2 gap-1 hover:scale-105 rounded-md bg-emerald-700 text-white hover:bg-emerald-500 transition-all text-sm shadow-lg w-full" >
             Apply
            </Button>)}
          </DropdownItem>
          )}
       


          <DropdownItem textValue="leave" key="leave">
            <Button 
            onClick={handleLeave}
            className="flex items-center justify-center px-2 py-2 gap-1 hover:scale-105 rounded-md bg-emerald-700 text-white hover:bg-emerald-500 transition-all text-sm shadow-lg w-full" >
             Leave Group
            </Button>
          </DropdownItem>
       <DropdownItem textValue="edit" key="edit">
        <Button 
        onClick={()=>router.push(`/group/${group.id}/edit`)}
        className="flex items-center justify-center px-2 py-2 gap-1 hover:scale-105 rounded-md bg-emerald-700 text-white hover:bg-emerald-500 transition-all text-sm shadow-lg w-full" >
          Edit Group
        </Button>
       </DropdownItem>
          
      </DropdownMenu>
    </Dropdown>
    </>
  );
}
export default GroupActionList;