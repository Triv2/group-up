'use client'

import CreateGroupForm from '@/components/group/create-group-form';
import { Modal } from '@/components/ui/modal';
import { Button } from '@nextui-org/react';
import { useEffect } from 'react';
import JoinGroupForm from '../group/join-group-form';
import { Group, MessageThread, Profile } from '@prisma/client';
import { ScrollArea } from '../ui/scroll-area';
import ConversationList from '../message/conversation-list';

interface InboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  conversations: MessageThread[];
  profile: Profile;
  friends: Profile[];
}

export const InboxModal: React.FC<InboxModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  conversations,
  profile,
  friends,
}) => {
  

  return(
    <Modal
    title="Current Conversations"
    description="Browse through the conversations you are a part of."
    isOpen={isOpen}
    onClose={onClose}
    
    >
    {conversations && (
      <ConversationList
      conversations={conversations}
      profile={profile}
      friends={friends} 
       onClose={onClose} 
      />
    )}
  
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading}  onClick ={onClose}>
          Cancel
        </Button>
        
      </div>

    </Modal>
  )
}

export default InboxModal;