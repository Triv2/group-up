"use client";
import { useState, useEffect } from "react";

import { Avatar, Button, Divider, Tooltip } from "@nextui-org/react";
import { Group, Profile } from "@prisma/client";

import { useRouter } from "next/navigation";

interface SidebarGroupSummaryProps {
  group: Group;
  members: Profile[];
  profile?: Profile;
}

const SidebarGroupSummary: React.FC<SidebarGroupSummaryProps> = ({
  group,
  members,
  profile,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  const groupProfileIds = group?.profileIds;
  const matchedMembers = members.filter((member) =>
    groupProfileIds?.includes(member.id)
  );
  const creator = matchedMembers.find((member) => member.id === group.creator);
  const user = matchedMembers.find((member) => profile?.id === member.id);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="flex items-center justify-start flex-col max-w-[140px] min-w-[140px] w-full">
      {group && (
        <Tooltip
          placement="right"
          content={
            <div className="flex items-center  flex-col p-2 gap-2">
              Click to view group page.
              <Divider />
              <div className="text-xs flex gap-1 justify-between w-full">
                <p>Name:</p>
                <p>{group.name}</p>
              </div>
              <div className="text-xs flex justify-between gap-1  w-full">
                <p>Creator:</p>
                <p>{creator?.name}</p>
              </div>
              <div className="text-xs flex justify-between gap-1 w-full">
                <p>Members:</p>
                <p>{group.profileIds.length}</p>
              </div>
            </div>
          }
          className=""
        >
          <Button
            onClick={() => router.push(`/dashboard/groups/${group.id}`)}
            size="sm"
            className="w-full pl-0 rounded-none bg-zinc-200/80 dark:bg-zinc-700/50 hover:dark:bg-zinc-400/50 hover:bg-opacity-5 hover:bg-zinc-50 dark:hover:text-emerald-400 hover:text-emerald-500 hover:scale-105"
          >
            <div className="flex items-center justify-start  w-full">
              <div>
                <Avatar
                  src={group.imageUrl}
                  size="sm"
                  className="border-5 hover:scale-105 shadow-md"
                />
              </div>
              <p className="text-xs   truncate ">{group.name}</p>
            </div>
          </Button>
        </Tooltip>
      )}
    </div>
  );
};
export default SidebarGroupSummary;
