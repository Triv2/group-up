'use client'
import { Button, Divider, Tooltip } from '@nextui-org/react';
import { Message, Post, Profile } from '@prisma/client';
import { Dot, GripHorizontal, GripVertical } from 'lucide-react';

import {useState, useEffect} from'react'
import ProfileAvatar from '../profile/profile-avatar';

import EditPostModal from '../modals/edit-post-modal';
import EditMessageModal from '../modals/edit-message-modal';

interface MessageItemProps {
  message: Message;
  profile: Profile;
  currentProfile: Profile;
  user: Profile;
}

const MessageItem:React.FC<MessageItemProps> = ({
  message,
  profile,
  currentProfile,
  user,
}) => {

const [isMounted, setIsMounted] = useState(false);
const [loading, setLoading] = useState(false);
const [open, setOpen] = useState(false);

useEffect(() => {
setIsMounted(true);
}, []);

if (!isMounted) {
return null;
}

const handleOpen = () => {
  if(open) {
    setOpen(false);
  } else {
    setOpen(true);
  }
}

const createdAt = new Date(message.createdAt);




  return (
    <div className="w-full shadow-md dark:shadow-zinc-500 bg-zinc-200 rounded-md  dark:bg-zinc-700">
      <div className="flex flex-col sm:flex-row justify-between px-5 py-5 gap-3">

      <div className="flex flex-col-reverse sm:flex-row items-center justify-center gap-1 w-full">
        {profile && (   
          <ProfileAvatar 
            profile={profile}
            currentProfile={currentProfile}
          />
         )}
        <div className=" min-h-[6rem]  font-semibold flex items-center justify-center px-2 sm:px-10 py-4  bg-zinc-100 dark:bg-zinc-500 shadow-md rounded-md w-full">
          <p className="break-words text-sm sm:text-md ">{message.content}</p>
          </div>
          </div>


        <div className="flex items-center justify-center sm:flex-col border-t-1 border-l-1 border-r-1 sm:border-r-0 sm:border-b-1 rounded-md  border-black/30" >
        {(user.id===message.starterId) && (
        <div className="flex items-center justify-center py-3 px-2">
         <Tooltip
            placement="bottom"
            content="Edit Message"
          >
      
        <Button onClick={handleOpen} size="sm"  className="shadow-md  p-0 dark:bg-zinc-400 flex items-center justify-center rounded-md">
          <GripHorizontal />
        </Button>
       

        </Tooltip>
        </div>)}
        <EditMessageModal
           isOpen={open}
           onClose={()=>setOpen(false)}
           onConfirm={()=>{}}
           loading={loading}
           message={message}
        />
        <div className="min-h-[4rem]  flex flex-col gap-1 items-center justify-center px-3 py-1 ">
        <p className="text-center text-sm font-semibold">{createdAt.toLocaleTimeString()}</p>
          <p className="text-muted-foreground ">{createdAt.getMonth()}/{createdAt.getDay()}/{createdAt.getFullYear()}</p>
          
          </div>
          

          
        </div>

        </div>
    </div>
  );
}
export default MessageItem;