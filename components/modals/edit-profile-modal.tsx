"use client";

import ProfileEditForm from "@/components/profile/profile-edit-form";
import { Modal } from "@/components/ui/modal";
import { Button } from "@nextui-org/react";
import { Profile } from "@prisma/client";
import DeleteButton from "../profile/delete-button";
import { Trash } from "lucide-react";

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
  return (
    <Modal
      title="Edit your Profile?"
      description="Change any of your profile settings."
      isOpen={isOpen}
      onClose={onClose}
    >
      <ProfileEditForm profile={profile} onClose={onClose} />

      <div className="pt-6 space-x-2 flex items-center justify-between w-full">
        <DeleteButton
          icon={<Trash className="h-4 w-4" />}
          text="Delete Profile"
          
          className="text-red-500 dark:bg-slate-700/50"
        />
        <Button disabled={loading} onClick={onClose} className="dark:text-white dark:bg-slate-600/50 dark:hover:bg-slate-500">
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default EditProfileModal;
