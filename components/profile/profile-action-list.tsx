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
import { Cast, Cog, DoorClosed, DoorOpen, Home, MenuSquare, Scroll, Undo, UserPlus2, Workflow } from 'lucide-react';
import { AlertModal } from '../modals/alert-modal';
import axios from 'axios';
import toast from 'react-hot-toast';


interface ProfileActionListProps {
  groups: Group[];
 
  profile?: Profile;
}



const ProfileActionList:React.FC<ProfileActionListProps> = ({
  groups,
  profile,

}) => {

  
  const router = useRouter();
const [isMounted, setIsMounted] = useState(false);








useEffect(() => {
setIsMounted(true);
}, []);

if (!isMounted) {
return null;
}
  return (
    <>
   
    <DropdownMenu >
   
      <DropdownMenuTrigger
            className="flex items-center justify-between px-2 py-2 gap-1 hover:scale-105 rounded-md bg-emerald-700 text-white  hover:bg-emerald-500 transition-all text-sm shadow-lg">
        <Tooltip 
         placement="left"
         content="Navigation and Settings"
         
       >  
       
           <MenuSquare className="h-4 w-4 z-50"/> 
           
           </Tooltip>
      </DropdownMenuTrigger>
    
      <DropdownMenuContent className="shadow-xl" aria-label="Static Actions">

      <Tooltip 
         placement="left"
         content="Create a Group"
         className="px-5 text-xs"
       >
      <DropdownMenuItem textValue="createGroup" key="createGroup">
       <Button 
        onClick={()=>router.push(`/group`)}
        className="flex items-center justify-center px-2 py-2 gap-1 hover:scale-105 rounded-md bg-orange-700 text-white hover:bg-orange-500 transition-all text-sm shadow-lg w-full" >
         <UserPlus2 className="h-4 w-4"/> Create Groups
        </Button>
       </DropdownMenuItem> 
      </Tooltip>
      <Tooltip 
         placement="left"
         content="Join, or Apply to a Group"
         className="px-5 text-xs  "
       >
      <DropdownMenuItem textValue="createGroup" key="createGroup">
       <Button 
        onClick={()=>router.push(`/group/join`)}
        className="flex items-center justify-center px-2 py-2 gap-1 hover:scale-105 rounded-md bg-orange-700 text-white hover:bg-orange-500 transition-all text-sm shadow-lg w-full" >
         <UserPlus2 className="h-4 w-4"/> Add Groups
        </Button>
       </DropdownMenuItem> 
      </Tooltip>
      
      {profile &&( 
         <Tooltip 
         placement="left"
         content="Edit or Delete this Profile"
         className="px-5 text-xs "
       >
       <DropdownMenuItem textValue="profileSettings" key="profileSettings">
       <Button 
        onClick={()=>router.push(`/dashboard/profiles/${profile.id}/settings`)}
        className="flex items-center justify-center px-2 py-2 gap-1 hover:scale-105 rounded-md bg-orange-700 text-white hover:bg-orange-500 transition-all text-sm shadow-lg w-full" >
         <Cog className="h-4 w-4"/> Profile Settings
        </Button>
       </DropdownMenuItem> 
        </Tooltip>)}

       {groups &&( 
        <Tooltip 
        placement="left"
        content="Change your Group Settings"
        className="px-5 text-xs "
      >
       <DropdownMenuItem textValue="groupSettings" key="groupSettings">
       <Button 
        onClick={()=>router.push(`/dashboard/groups/settings`)}
        className="flex items-center justify-center px-2 py-2 gap-1 hover:scale-105 rounded-md bg-orange-700 text-white hover:bg-orange-500 transition-all text-sm shadow-lg w-full" >
         <Cog className="h-4 w-4"/> Group Settings
        </Button>
       </DropdownMenuItem>
       </Tooltip> )}
       
    {profile && groups &&(
      <Tooltip 
      placement="left"
      content="Return to Dashboard"
      className="px-5 text-xs  "
    >
          <DropdownMenuItem textValue="dashboard" key="dashboard">
            <Button 
            onClick={()=>router.push(`/dashboard`)}
            className="flex items-center justify-center px-2 py-2 gap-1 hover:scale-105 rounded-md bg-red-700 text-white hover:bg-red-500 transition-all text-sm shadow-lg w-full" >
            <Home className="h-4 w-4"/> Dashboard 
            </Button>
          </DropdownMenuItem>
          </Tooltip>
          )}
         
      
          
      </DropdownMenuContent>
    </DropdownMenu>
    </>
  );
}
export default ProfileActionList;