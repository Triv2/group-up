"use client";


import { Modal } from "@/components/ui/modal";
import { Button } from "@nextui-org/react";

import CreateMessage from "../message/create-message";

interface CreateMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  threadId: string;
}

export const CreateMessageModal: React.FC<CreateMessageModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  threadId,
}) => {
  return (
    <Modal
      title="Reply?"
      description="Fill out the form to create a new message."
      isOpen={isOpen}
      onClose={onClose}
    >
      <CreateMessage messageThreadId={threadId} onClose={onClose} />

      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
      <Button disabled={loading} onClick={onClose} className="dark:text-white dark:bg-slate-600/50 dark:hover:bg-slate-500">
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default CreateMessageModal;
