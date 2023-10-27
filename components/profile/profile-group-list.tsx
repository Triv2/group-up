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

import { useParams, useRouter } from 'next/navigation';
import { Cog, DoorClosed, DoorOpen, Layers, Scroll, Undo, UserCircle, UserCircle2, Workflow } from 'lucide-react';



interface ProfileGroupListProps {
  groups: Group[];
  
}



const ProfileGroupList:React.FC<ProfileGroupListProps> = ({
  groups

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
            className="flex items-center justify-center px-2 py-2 gap-1 hover:scale-105 rounded-md bg-emerald-700 text-white hover:bg-emerald-500 transition-all text-sm shadow-lg">
           <Layers className="h-4 w-4"/> Groups
           
      </DropdownMenuTrigger>
      <DropdownMenuContent className="shadow-xl" aria-label="Static Actions">
    
      {groups.map(group => (
        <DropdownMenuItem textValue={group.name} key={group.id}>
          <Button 
          onClick={()=>router.push(`/dashboard/groups/${group.id}`)}
          className="flex items-center justify-center px-2 py-2 gap-1 hover:scale-105 rounded-md bg-emerald-700 text-white hover:bg-emerald-500 transition-all text-sm shadow-lg w-full" >
          <UserCircle2 className="h-4 w-4"/> {group.name}
          </Button>
        </DropdownMenuItem>
        )
      )}
     
      
          
      </DropdownMenuContent>
    </DropdownMenu>
    </>
  );
}
export default ProfileGroupList;