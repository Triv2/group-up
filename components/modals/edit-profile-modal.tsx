'use client'


import ProfileEditForm from '@/app/(main)/dashboard/profiles/[profileId]/settings/_components/profile-form';
import { Modal } from '@/components/ui/modal';
import { Button } from '@nextui-org/react';
import { Profile } from '@prisma/client';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  profile: Profile;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  profile,
}) => {


  return(
    <Modal
    title="Edit your Profile?"
    description="Change any of your profile settings."
    isOpen={isOpen}
    onClose={onClose}
    >
      

      <ProfileEditForm profile={profile} onClose={onClose}/>

      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading}  onClick ={onClose}>
          Cancel
        </Button>
        
      </div>

    </Modal>
  )
}

export default EditProfileModal;