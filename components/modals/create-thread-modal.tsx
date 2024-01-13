"use client";


import { Modal } from "@/components/ui/modal";
import { Button } from "@nextui-org/react";

import CreateThread from "../thread/create-thread";
import { Group } from "@prisma/client";

interface CreateThreadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  groups: Group[] | undefined;
}

export const CreateThreadModal: React.FC<CreateThreadModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  groups,
}) => {
  return (
    <Modal
      title="Create a thread?"
      description="Fill out the form to create a new thread."
      isOpen={isOpen}
      onClose={onClose}
    >
      {groups && <CreateThread groups={groups} onClose={onClose} />}

      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default CreateThreadModal;
