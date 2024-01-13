"use client";

import { Avatar, Button, Tooltip } from "@nextui-org/react";
import { Profile } from "@prisma/client";

import { useState } from "react";

import FriendSummaryModal from "../modals/friend-summary-modal";

interface FriendListItemProps {
  profile: Profile;
  currentProfile: Profile;
}

const FriendListItem = ({ profile, currentProfile }: FriendListItemProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  return (
    <div className="flex items-center justify-start flex-col max-w-[140px] min-w-[140px] w-full">
      <Button
        onPress={handleClick}
        className="w-full pl-0 rounded-none bg-zinc-200/80 dark:bg-slate-700/50 hover:dark:bg-slate-400/50 hover:bg-opacity-5 hover:bg-zinc-50 dark:hover:text-sky-200 hover:text-sky-500 hover:scale-105"
      >
        <div className="flex items-center justify-start  w-full">
          <div>
            <Avatar
              src={profile.imageUrl}
              size="sm"
              className="border-5 hover:scale-105 shadow-md"
            />
          </div>
          <p className="font-semibold text-xs truncate">{profile.name}</p>
        </div>
        <FriendSummaryModal
          currentProfile={currentProfile}
          profile={profile}
          isOpen={open}
          onClose={() => setOpen(false)}
          onConfirm={() => {}}
          loading={loading}
        />
      </Button>
    </div>
  );
};
export default FriendListItem;
