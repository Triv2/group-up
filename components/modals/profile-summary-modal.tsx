'use client'


import ProfileEditForm from '@/components/profile/profile-edit-form';
import { Modal } from '@/components/ui/modal';
import { Button } from '@nextui-org/react';
import { Profile } from '@prisma/client';
import DeleteButton from '../ui/delete-button';
import { Trash } from 'lucide-react';
import ProfileSummary from '../profile/profile-summary';

interface ProfileSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  profile: Profile;
}

export const ProfileSummaryModal: React.FC<ProfileSummaryModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  profile,
}) => {


  return(
    <Modal
    title={profile.name + "'s Profile"}
    description="Add this person as a friend or send them a message."
    isOpen={isOpen}
    onClose={onClose}
    >
      

      <ProfileSummary profile={profile} onClose={onClose}/>

      <div className="pt-6 space-x-2 flex items-center justify-between w-full">
      
        <Button disabled={loading}  onClick ={onClose}>
          Cancel
        </Button>
        
      </div>

    </Modal>
  )
}

export default ProfileSummaryModal;