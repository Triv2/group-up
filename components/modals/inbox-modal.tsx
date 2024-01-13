"use client";
//IN PROGRESS
import { Modal } from "@/components/ui/modal";
import { Button } from "@nextui-org/react";

import { MessageThread, Profile } from "@prisma/client";

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
  return (
    <Modal
      title="Current Conversations"
      description="Browse through the conversations you are a part of."
      isOpen={isOpen}
      onClose={onClose}
    >
      {/* {conversations && (
      <ConversationList
      conversations={conversations}
      profile={profile}
      friends={friends} 
       onClose={onClose} 
      />
    )} */}
      {/* finish this */}
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
      <Button disabled={loading} onClick={onClose} className="dark:text-white dark:bg-slate-600/50 dark:hover:bg-slate-500">
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default InboxModal;
