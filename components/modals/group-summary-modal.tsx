'use client'


import ProfileEditForm from '@/components/profile/profile-edit-form';
import { Modal } from '@/components/ui/modal';
import { Button } from '@nextui-org/react';
import { Profile } from '@prisma/client';
import DeleteButton from '../ui/delete-button';
import { Trash } from 'lucide-react';
import ProfileSummary from '../profile/profile-summary';

interface GroupSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  profile: Profile;
  currentProfile: Profile;
}

export const GroupSummaryModal: React.FC<GroupSummaryModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  profile,
  currentProfile,
}) => {


  return(
    <Modal
    title={profile.name + "'s Profile"}
    description="Add this person as a friend or send them a message."
    isOpen={isOpen}
    onClose={onClose}
    >
      
 {/* FINISH THIS  */}
      <ProfileSummary currentProfile={currentProfile} profile={profile} onClose={onClose}/>

      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading}  onClick ={onClose}>
          Cancel
        </Button>
        
      </div>

    </Modal>
  )
}

export default GroupSummaryModal;