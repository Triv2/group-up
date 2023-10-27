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

  const params = useParams();
  const router = useRouter();
const [isMounted, setIsMounted] = useState(false);
const [loading, setLoading] = useState(false);
const [leave, setLeave] = useState(false);


const handleLeave = async () => {
  if(leave){
    setLeave(false);
  }else{
    setLeave(true);
  }
}

const leaveGroup = async () => {
  try {
    setLoading(true);
    
  
    console.log("OnSubmit")
    await axios.patch(`/api/group/${params.groupId}/leave`)
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


if(creator?.id===profile?.id){
  const userCreator = profile;
}


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
        onConfirm={leaveGroup}
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

      
       {group.openGroup ?(  
         <DropdownItem key="join">
            <Button 
            onClick={()=>router.push(`/group/${group.id}/edit`)}
            className="flex items-center justify-center px-2 py-2 gap-1 hover:scale-105 rounded-md bg-emerald-700 text-white hover:bg-emerald-500 transition-all text-sm shadow-lg w-full">
             Join
            </Button>
          </DropdownItem>
          ):(
            <DropdownItem key="apply">
            <Button 
            onClick={()=>router.push(`/group/${group.id}/edit`)}
            className="flex items-center justify-center px-2 py-2 gap-1 hover:scale-105 rounded-md bg-emerald-700 text-white hover:bg-emerald-500 transition-all text-sm shadow-lg w-full" >
             Apply
            </Button>
          </DropdownItem>
          )}
          <DropdownItem key="leave">
            <Button 
            onClick={handleLeave}
            className="flex items-center justify-center px-2 py-2 gap-1 hover:scale-105 rounded-md bg-emerald-700 text-white hover:bg-emerald-500 transition-all text-sm shadow-lg w-full" >
             Leave Group
            </Button>
          </DropdownItem>
       <DropdownItem key="edit">
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