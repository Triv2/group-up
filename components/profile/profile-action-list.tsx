'use client'
 import { Button, Divider, Tooltip,  } from '@nextui-org/react';
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

import { useParams, useRouter } from 'next/navigation';
import { Ban, Blocks, Cast, Cog, DoorClosed, DoorOpen, Home, Mail, MenuSquare, Plus, Scroll, Undo, User, UserPlus2, Workflow } from 'lucide-react';
import { AlertModal } from '../modals/alert-modal';
import axios from 'axios';
import toast from 'react-hot-toast';


interface ProfileActionListProps {
  profile: Profile;
  
  onClose: () => void;
  targetId: string;
}



const ProfileActionList:React.FC<ProfileActionListProps> = ({
  
 profile,
  onClose,
  targetId,

}) => {

 
const [isMounted, setIsMounted] = useState(false);
const [loading, setLoading] = useState(false);

const router = useRouter();





useEffect(() => {
setIsMounted(true);
}, []);

if (!isMounted) {
return null;
}


const addFriend = async () => {
  try {
    setLoading(true);
    await axios.patch(`/api/profile/${profile.id}/friend/`, {
      profileId: profile.id,
      targetId: targetId,
    });
    onClose();
    toast.success("Friend added!");
  } catch (error) {
    toast.error("Something went wrong.");
  } finally {
    router.refresh();
    setLoading(false);
  }
}




  return (
    <>
    <div className="flex items-center gap-3">
      <Tooltip content="Ask to be friends" placement="top">
      <Button onClick={()=>addFriend()} size="sm" className="shadow-md hover:scale-105 transition-all bg-emerald-700 text-white hover:bg-emerald-500">
        <User className="h-3 w-3"/><p className="hidden sm:block">Friend</p>
      </Button>
      </Tooltip>
      <Tooltip content="Send a message" placement="top">
      <Button size="sm" className="shadow-md hover:scale-105 transition-all bg-blue-700 text-white hover:bg-blue-500">
        <Mail className="h-3 w-3"/><p className="hidden sm:block">Message</p>
      </Button>
      </Tooltip>
     
     <Tooltip content="Block user from messaging you" placement="top">
      <Button size="sm" className="shadow-md hover:scale-105 transition-all bg-red-700 text-white hover:bg-red-500">
        <Ban className="h-3 w-3"/><p className="hidden sm:block">Block</p>
      </Button>
      </Tooltip>
    </div>
   
    
    </>
  );
}
export default ProfileActionList;