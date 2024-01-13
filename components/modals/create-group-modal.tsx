"use client";

import CreateGroupForm from "@/components/group/create-group-form";
import { Modal } from "@/components/ui/modal";
import { Button } from "@nextui-org/react";


interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export const CreateGroupModal: React.FC<CreateGroupModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  return (
    <Modal
      title="Create a group?"
      description="Fill out the form to create a new group."
      isOpen={isOpen}
      onClose={onClose}
    >
      <CreateGroupForm onClose={onClose} />

      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
      <Button disabled={loading} onClick={onClose} className="dark:text-white dark:bg-slate-600/50 dark:hover:bg-slate-500">
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default CreateGroupModal;
