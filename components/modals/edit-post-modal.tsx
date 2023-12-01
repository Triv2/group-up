'use client'


import ProfileEditForm from '@/components/profile/profile-edit-form';
import { Modal } from '@/components/ui/modal';
import { Button } from '@nextui-org/react';
import { Group, Post, Profile } from '@prisma/client';
import DeleteButton from '../ui/delete-button';
import { Trash } from 'lucide-react';
import PostEditForm from '../post/post-edit-form';


interface EditPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  post:Post;
}

export const EditPostModal: React.FC<EditPostModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  post,
}) => {


  return(
    <Modal
    title="Edit your Post?"
    description="Edit any of your post."
    isOpen={isOpen}
    onClose={onClose}
    >
      

      <PostEditForm post={post} onClose={onClose}/>

      <div className="pt-6 space-x-2 flex items-center justify-between w-full">
        
        <Button disabled={loading}  onClick ={onClose}>
          Cancel
        </Button>
        
      </div>

    </Modal>
  )
}

export default EditPostModal;