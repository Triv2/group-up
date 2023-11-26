'use client'


import ProfileEditForm from '@/components/profile/profile-edit-form';
import { Modal } from '@/components/ui/modal';
import { Button } from '@nextui-org/react';
import { Group, Profile } from '@prisma/client';
import DeleteButton from '../ui/delete-button';
import { Trash } from 'lucide-react';
import EditGroupSettingsForm from '../group/edit-group-settings';

interface EditGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  group:Group;
}

export const EditGroupModal: React.FC<EditGroupModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  group,
}) => {


  return(
    <Modal
    title="Edit your Group?"
    description="Change any of your group settings."
    isOpen={isOpen}
    onClose={onClose}
    >
      

      <EditGroupSettingsForm group={group} onClose={onClose}/>

      <div className="pt-6 space-x-2 flex items-center justify-between w-full">
        
        <Button disabled={loading}  onClick ={onClose}>
          Cancel
        </Button>
        
      </div>

    </Modal>
  )
}

export default EditGroupModal;