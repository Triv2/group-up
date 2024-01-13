"use client";
import { Button, Tooltip } from "@nextui-org/react";

import { Profile } from "@prisma/client";
import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";
import { Minus } from "lucide-react";

import axios from "axios";
import toast from "react-hot-toast";

interface FriendActionListProps {
  profile: Profile;

  onClose: () => void;
  targetId: string;
}

const FriendActionList: React.FC<FriendActionListProps> = ({
  profile,
  onClose,
  targetId,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const removeFriend = async () => {
    try {
      setLoading(true);
      await axios.patch(`/api/profile/${profile.id}/friend/remove`, {
        profileId: profile.id,
        targetId: targetId,
      });
      onClose();
      toast.success("Friend removed!");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      router.refresh();
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-3">
        <Tooltip content="Remove from friends" placement="top">
          <Button
            onClick={() => removeFriend()}
            size="sm"
            className="shadow-md hover:scale-105 transition-all bg-orange-700 text-white hover:bg-orange-500"
          >
            <Minus className="h-3 w-3" />
            <p className="hidden sm:block">Unfriend</p>
          </Button>
        </Tooltip>
        {/* <Tooltip content="Send a message" placement="top">
      <Button size="sm" className="shadow-md hover:scale-105 transition-all bg-blue-700 text-white hover:bg-blue-500">
        <Mail className="h-3 w-3"/><p className="hidden sm:block">Message</p>
      </Button>
      </Tooltip> */}
        {/* <Tooltip content="Block user from messaging you" placement="top">
      <Button size="sm" className="shadow-md hover:scale-105 transition-all bg-emerald-700 text-white hover:bg-emerald-500">
        <User className="h-3 w-3"/><p className="hidden sm:block">Invite to Groups</p>
      </Button>
      </Tooltip> */}

        {/* <Tooltip content="Block user from messaging you" placement="top">
      <Button size="sm" className="shadow-md hover:scale-105 transition-all bg-red-700 text-white hover:bg-red-500">
        <Ban className="h-3 w-3"/><p className="hidden sm:block">Block</p>
      </Button>
      </Tooltip> */}
      </div>
    </>
  );
};
export default FriendActionList;
