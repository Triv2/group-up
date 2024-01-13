"use client";

import { Modal } from "@/components/ui/modal";
import { Button } from "@nextui-org/react";
import { Profile } from "@prisma/client";

import FriendSummary from "../friend/friend-summary";

interface FriendSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  profile: Profile;
  currentProfile: Profile;
}

export const FriendSummaryModal: React.FC<FriendSummaryModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  profile,
  currentProfile,
}) => {
  return (
    <Modal
      title={profile.name + "'s Profile"}
      description="This is a friend, message them or invite them to join a group."
      isOpen={isOpen}
      onClose={onClose}
    >
      <FriendSummary
        currentProfile={currentProfile}
        profile={profile}
        onClose={onClose}
      />

      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
      <Button disabled={loading} onClick={onClose} className="dark:text-white dark:bg-slate-600/50 dark:hover:bg-slate-500">
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default FriendSummaryModal;
