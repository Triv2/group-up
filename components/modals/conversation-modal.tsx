'use client'

import CreateGroupForm from '@/components/group/create-group-form';
import { Modal } from '@/components/ui/modal';
import { Button } from '@nextui-org/react';
import { useEffect } from 'react';
import JoinGroupForm from '../group/join-group-form';
import { Group, Message, MessageThread, Profile } from '@prisma/client';
import { ScrollArea } from '../ui/scroll-area';
import ConversationList from '../message/conversation-list';
import ViewConversation from '../message/view-conversation';

interface ConversationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  conversation: MessageThread;
  profile: Profile;
  friends: Profile[];
  messages: Message[];
}

export const ConversationModal: React.FC<ConversationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  conversation,
  profile,
  friends,
  messages,
}) => {

  let targetFriendId="";
  if (conversation.starterId=== profile.id){
    targetFriendId = conversation.profileIds[1]
  }
  else{
    targetFriendId = conversation.profileIds[0]
  }
  const targetFriend = friends.find((friend) => friend.id === targetFriendId)
  if(!targetFriend){return null}

  let someMessages = messages.filter((message) => message.starterId === profile.id)
  let otherMessages = messages.filter((message) => message.targetId=== targetFriend.id )
  let allMessages=someMessages.concat(otherMessages);

  return(
    <Modal
    title={conversation.title}
    description="View Conversation"
    isOpen={isOpen}
    onClose={onClose}
    
    >
     {conversation && targetFriend && ( 
    <ViewConversation
     currentProfile={profile}
     targetProfile={targetFriend}
     currentConversation={conversation}
     messages={allMessages}
     onClose={onClose}
    />)}
  
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading}  onClick ={onClose}>
          Cancel
        </Button>
        
      </div>

    </Modal>
  )
}

export default ConversationModal;