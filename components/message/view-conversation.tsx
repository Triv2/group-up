'use client'

import { Button, Divider } from "@nextui-org/react";
import { Message, MessageThread, Profile } from "@prisma/client";
import MessageItem from "./message-item";
import { ScrollArea } from "../ui/scroll-area";
import { useState } from "react";
import CreateMessageModal from "../modals/create-message-modal";

interface ViewConversationProps {
  currentProfile: Profile;
  currentConversation: MessageThread;
  targetProfile: Profile;
  messages:Message[];
  onClose: () => void;
}

const ViewConversation = ({
  currentProfile,
  currentConversation,
  targetProfile,
  messages,
  onClose,
}:ViewConversationProps) => {

  const [open, setOpen] = useState(false);


  const handleReply = () => {
    if(open){
      setOpen(false)
    } else {
      setOpen(true)
    }
  };
  const checkUser = (message:Message) => {
    if(currentProfile.id === message.starterId){
      return currentProfile;
    } else {
      return targetProfile;
    }
  }
    const checkUser2 = (message:Message) => {
      if(targetProfile.id === message.starterId){
        return targetProfile;
      } else {
        return currentProfile;
      }
    }

  return (
<div className="flex items-center justify-center flex-col gap-2 h-auto p-5">
    <div>{currentConversation.title}</div>
    <Divider/>
    <ScrollArea className="h-[400px]">
    {messages && messages.map((message) => (
    <div key={message.id}>
      <MessageItem
        message={message}
        profile={checkUser(message)}
        currentProfile={checkUser(message)}
      />

    </div>))}
    </ScrollArea>
    <div className="pt-6 space-x-2 flex items-center justify-start w-full">
        <Button   onClick ={handleReply}>
          Reply
        </Button>
        
      </div>
      <CreateMessageModal
      isOpen={open}
      onClose={()=>void setOpen(false)}
      onConfirm={()=>void setOpen(false)}
      loading={false}
      threadId={currentConversation.id}
      />
</div>
  );
}
export default ViewConversation;