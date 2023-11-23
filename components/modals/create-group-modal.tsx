'use client'

import CreateGroupForm from '@/app/setup/group/_components/create-group-form';
import { Modal } from '@/components/ui/modal';
import { Button } from '@nextui-org/react';

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


  return(
    <Modal
    title="Create a group?"
    description="Fill out the form to create a new group."
    isOpen={isOpen}
    onClose={onClose}
    >
      <CreateGroupForm/>



      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading}  onClick ={onClose}>
          Cancel
        </Button>
        
      </div>

    </Modal>
  )
}

export default CreateGroupModal;