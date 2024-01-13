"use client";

import { Modal } from "@/components/ui/modal";
import { Button } from "@nextui-org/react";

import { Message, MessageThread, Profile } from "@prisma/client";

import ViewConversation from "../message/view-conversation";

interface ConversationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  conversation: MessageThread;
  profile: Profile;
  target: Profile;

  messages: Message[];
}

export const ConversationModal: React.FC<ConversationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  conversation,
  profile,

  messages,
  target,
}) => {
  let currentConversationMessages = messages.filter(
    (message) => message.messageThreadId === conversation.id
  );

  return (
    <Modal
      title={conversation.title}
      description="View Conversation"
      isOpen={isOpen}
      onClose={onConfirm}
    >
      {conversation && target && (
        <ViewConversation
          currentProfile={profile}
          targetProfile={target}
          currentConversation={conversation}
          messages={currentConversationMessages}
          onClose={onClose}
        />
      )}

      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default ConversationModal;
