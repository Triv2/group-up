"use client";
import { Button } from "@nextui-org/react";

import { Group, Profile } from "@prisma/client";
import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";
import { Cog, DoorOpen, Glasses, Scroll, Undo } from "lucide-react";
import { AlertModal } from "../modals/alert-modal";
import axios from "axios";
import toast from "react-hot-toast";
import EditGroupModal from "../modals/edit-group-modal";

interface GroupActionListProps {
  group: Group;
  members: Profile[];
  creator?: Profile;
  profile?: Profile;
}

const GroupActionList: React.FC<GroupActionListProps> = ({
  group,
  members,
  creator,
  profile,
}) => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [leave, setLeave] = useState(false);
  const [edit, setEdit] = useState(false);

  const handleLeave = () => {
    if (leave) {
      setLeave(false);
    } else {
      setLeave(true);
    }
  };

  const handleEdit = () => {
    if (edit) {
      setEdit(false);
    } else {
      setEdit(true);
    }
  };

  const leaveGroup = async (group: Group) => {
    try {
      setLoading(true);
      const groupId = { groupId: group.id };

      console.log("OnSubmit", groupId);
      await axios.patch(`/api/group/${groupId}/leave`, groupId);
      if (leave) {
        setLeave(false);
      }
      router.push("/dashboard");
      toast.success("Group Left!");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      router.refresh();
      setLoading(false);
    }
  };

  let selectedJoinedGroup = false;
  let currentCreator = false;

  if (creator?.id === profile?.id) {
    currentCreator = true;
  }

  profile?.groupIds.forEach((groupId) => {
    if (groupId === group.id) {
      selectedJoinedGroup = true;
    }
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <AlertModal
        isOpen={leave}
        onClose={() => setLeave(false)}
        onConfirm={() => leaveGroup(group)}
        loading={loading}
      />
      <div className="flex items-center flex-col sm:flex-row gap-1">
        <Button
          size="sm"
          onClick={() => router.push(`/dashboard/groups/${group.id}`)}
          className="flex items-center justify-center px-2 gap-1 hover:scale-105 rounded-md bg-sky-700 text-white hover:bg-sky-500 transition-all text-sm shadow-lg w-full"
        >
          <Glasses className="h-4 w-4" />{" "}
          <p className="hidden sm:block">View</p>
        </Button>

        {!selectedJoinedGroup && group.openGroup && (
          <Button
            size="sm"
            onClick={() => router.push(`/invite/${group.inviteCode}`)}
            className="flex items-center justify-center px-2 py-1 gap-1 hover:scale-105 rounded-md bg-sky-700 text-white hover:bg-sky-500 transition-all text-sm shadow-lg w-full"
          >
            <DoorOpen className="h-4 w-4" /> Join
          </Button>
        )}
        {!selectedJoinedGroup && !group.openGroup && (
          <Button
            onClick={() => router.push(`/dashboard/groups/${group.id}/apply`)}
            className="flex items-center justify-center px-2 py-1 gap-1 hover:scale-105 rounded-md bg-sky-700 text-white hover:bg-sky500 transition-all text-sm shadow-lg w-full"
          >
            <Scroll className="h-4 w-4" />
            <p className="hidden sm:block">Apply</p>
          </Button>
        )}

        {currentCreator && (
          <div>
            <Button
              size="sm"
              onClick={handleEdit}
              className="flex items-center justify-center px-2 gap-1 hover:scale-105 rounded-md bg-orange-700 text-white hover:bg-orange-500 transition-all text-sm shadow-lg w-full"
            >
              <Cog className="h-4 w-4" />{" "}
              <p className="hidden sm:block">Edit</p>
            </Button>

            <EditGroupModal
              group={group}
              isOpen={edit}
              onClose={() => setEdit(false)}
              onConfirm={() => {}}
              loading={loading}
            />
          </div>
        )}

        {selectedJoinedGroup && (
          <Button
            size="sm"
            onClick={handleLeave}
            className="flex items-center justify-center px-2  gap-1 hover:scale-105 rounded-md bg-red-700 text-white hover:bg-red-500 transition-all text-sm shadow-lg w-full"
          >
            <Undo className="h-4 w-4" />{" "}
            <p className="hidden sm:block">Leave</p>
          </Button>
        )}
      </div>
    </>
  );
};
export default GroupActionList;
