'use client'
 import { Button } from '@nextui-org/react';
 import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Creator, Group, Profile, Thread } from '@prisma/client';
import {useState, useEffect} from'react'

import { useParams, useRouter } from 'next/navigation';
import { Cog, DoorClosed, DoorOpen, Glasses, Scroll, Undo, Workflow } from 'lucide-react';
import { AlertModal } from '../modals/alert-modal';
import axios from 'axios';
import toast from 'react-hot-toast';


interface ThreadActionListProps {
  profile:Profile;
  thread: Thread;
  
}



const ThreadActionList:React.FC<ThreadActionListProps> = ({
  profile,
  thread,
}) => {

  
  const router = useRouter();
const [isMounted, setIsMounted] = useState(false);
const [loading, setLoading] = useState(false);
const [deleted, setDelete] = useState(false);


const handleDelete =  () => {
  if(deleted){
    setDelete(false);
  }else{
    setDelete(true);
  }
}

const deleteThread = async (thread:Thread) => {
  try {
    setLoading(true);
  
    
    await axios.delete(`/api/thread/${thread.id}`)
    if(deleted){
      setDelete(false);
    }
    router.push("/dashboard");
    toast.success("Thread deleted!");
  } catch (error) {
    toast.error("Something went wrong.");
  } finally {
    router.refresh();
    setLoading(false);
  }
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
        isOpen={deleted}
        onClose={()=> setDelete(false)}
        onConfirm={()=>deleteThread(thread)}
        loading={loading}
      />
    <DropdownMenu >
      <DropdownMenuTrigger
            className="flex items-center justify-center px-2 py-2 gap-1 hover:scale-105 rounded-md bg-emerald-700 text-white hover:bg-emerald-500 transition-all text-sm shadow-lg">
           <Workflow className="h-4 w-4"/> 
           
      </DropdownMenuTrigger>
      <DropdownMenuContent className="shadow-xl" aria-label="Static Actions">
      <DropdownMenuItem textValue="view" key="View">
         
         <Button 
         onClick={()=>router.push(`/dashboard/groups/${thread.groupId}/threads/${thread.id}`)}  
         className="flex items-center justify-center px-2 py-2 gap-1 hover:scale-105 rounded-md bg-emerald-700 text-white hover:bg-emerald-500 transition-all text-sm shadow-lg w-full">
         <Glasses className="h-4 w-4"/> View
         </Button>
       
       </DropdownMenuItem> 
      
     
      
       {thread.starter===profile.id && ( 
       <DropdownMenuItem textValue="edit" key="edit">
       <Button 
        onClick={()=>router.push(`/dashboard/groups/${thread.groupId}/threads/${thread.id}`)}
        className="flex items-center justify-center px-2 py-2 gap-1 hover:scale-105 rounded-md bg-orange-700 text-white hover:bg-orange-500 transition-all text-sm shadow-lg w-full" >
         <Cog className="h-4 w-4"/> Edit
        </Button>
       </DropdownMenuItem> )}
       
        {thread.starter===profile.id && (
          <DropdownMenuItem textValue="delete" key="delete">
            <Button 
            onClick={handleDelete}
            className="flex items-center justify-center px-2 py-2 gap-1 hover:scale-105 rounded-md bg-red-700 text-white hover:bg-red-500 transition-all text-sm shadow-lg w-full" >
            <Undo className="h-4 w-4"/> Delete
            </Button>
          </DropdownMenuItem>)}
          
         
      
          
      </DropdownMenuContent>
    </DropdownMenu>
    </>
  );
}
export default ThreadActionList;