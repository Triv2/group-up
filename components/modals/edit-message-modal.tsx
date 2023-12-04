'use client'


import ProfileEditForm from '@/components/profile/profile-edit-form';
import { Modal } from '@/components/ui/modal';
import { Button } from '@nextui-org/react';
import { Group, Message, Post, Profile } from '@prisma/client';
import DeleteButton from '../ui/delete-button';
import { Trash } from 'lucide-react';
import PostEditForm from '../post/post-edit-form';
import EditMessageForm from '../message/edit-message-form';


interface EditMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  message:Message;
}

export const EditMessageModal: React.FC<EditMessageModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  message,
}) => {


  return(
    <Modal
    title="Edit your Message?"
    description="Edit any of your message."
    isOpen={isOpen}
    onClose={onClose}
    >
      

      <EditMessageForm message={message} onClose={onClose}/>

      <div className="pt-6 space-x-2 flex items-center justify-between w-full">
        
        <Button disabled={loading}  onClick ={onClose}>
          Cancel
        </Button>
        
      </div>

    </Modal>
  )
}

export default EditMessageModal;