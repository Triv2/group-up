"use client";

import { Modal } from "@/components/ui/modal";
import { Button } from "@nextui-org/react";

import { Profile } from "@prisma/client";
import CreateMessageThread from "../message/create-message-thread";

interface DirectMessageThreadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  profile: Profile;
  allFriends: Profile[];
}

export const DirectMessageThreadModal: React.FC<
  DirectMessageThreadModalProps
> = ({ isOpen, onClose, onConfirm, loading, profile, allFriends }) => {
  return (
    <Modal
      title="Start a conversation with a friend?"
      description="Fill out the form to create a new friend messaging thread."
      isOpen={isOpen}
      onClose={onClose}
    >
      <CreateMessageThread
        profile={profile}
        allFriends={allFriends}
        onClose={onClose}
      />

      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
      <Button disabled={loading} onClick={onClose} className="dark:text-white dark:bg-slate-600/50 dark:hover:bg-slate-500">
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default DirectMessageThreadModal;
