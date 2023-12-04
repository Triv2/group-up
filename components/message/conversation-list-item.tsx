'use client'

import { Avatar, AvatarGroup, Button, Divider, Tooltip } from "@nextui-org/react";
import { Message, MessageThread, Profile } from "@prisma/client";
import ViewConversation from "./view-conversation";
import ConversationModal from "../modals/conversation-modal";
import { useState } from "react";

interface ConversationListItemProps {
  conversation:MessageThread;
  currentProfile: Profile;
  friends: Profile[];
  messages: Message[];
  onClose: () => void;
}

const ConversationListItem = ({
  conversation,
  currentProfile,
  friends,
  messages,
  onClose,
}: ConversationListItemProps) => {

  const [open, setOpen] = useState(false);

  let targetFriendId="";

  if (conversation.starterId=== currentProfile.id){
    targetFriendId = conversation.profileIds[1]
  }
  else{
    targetFriendId = conversation.profileIds[0]
  }
  const targetFriend = friends.find((friend) => friend.id === targetFriendId)

  let conversationMessages = messages.filter((message) => message.messageThreadId=== conversation.id)
  
  console.log(conversationMessages)

  const handleClick = () => {
    if(open){
      setOpen(false)
    } else {
      setOpen(true)
    }
  }

  return (
<div className="flex items-center justify-start flex-col max-w-[140px] min-w-[140px] w-full">
    <Tooltip
      placement="right"
      content={
      <div className="flex items-center flex-col justify-center gap-1 p-1">
        <div className="flex items-center gap-2 p-1">
         <AvatarGroup size="sm"  max={2}>
           <Avatar src={currentProfile?.imageUrl} size="sm" />
              <Avatar src={targetFriend?.imageUrl} size="sm" />
              
            </AvatarGroup>
        {conversation.title}
        </div>
        <Divider/>
        Click to View Conversation
      </div>}
    >
    <Button onClick={handleClick} className="w-full pl-0 rounded-none bg-zinc-200/80 dark:bg-zinc-700/50 hover:dark:bg-zinc-400/50 hover:bg-opacity-5 hover:bg-zinc-50 dark:hover:text-emerald-400 hover:text-emerald-500 hover:scale-105">
        <div className="flex items-center justify-start  w-full">
            <div>
            {/* <Avatar  src={profile.imageUrl} size="sm" className="border-5 hover:scale-105 shadow-md"/> */}
            <AvatarGroup size="sm"  max={2}>
            <Avatar src={currentProfile?.imageUrl} size="sm" />
              <Avatar src={targetFriend?.imageUrl} size="sm" />
              
            </AvatarGroup>
      
          </div>
            <p className="font-semibold text-xs truncate">{conversation.title}</p>
            </div>
        {targetFriend && (
       <ConversationModal
          isOpen={open}
          onClose={onClose}
          onConfirm={onClose}
          loading={false}
          conversation={conversation}
          profile={currentProfile}
          target={targetFriend}
          friends={friends}
          messages={conversationMessages}
       />
        )}
            </Button>
    </Tooltip>
</div>
  );
}
export default ConversationListItem;