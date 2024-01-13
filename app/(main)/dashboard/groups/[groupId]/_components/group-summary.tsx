"use client";
import { useState, useEffect } from "react";

import { Avatar, AvatarGroup, Divider } from "@nextui-org/react";
import {  Group, Profile } from "@prisma/client";
import InviteCode from "@/components/ui/invite-code";
import GroupActionList from "@/components/group/group-action-list";

interface GroupSummaryProps {
  group: Group;
  members: Profile[];
  profile?: Profile;
  creator: Profile | null;
}

const GroupSummary: React.FC<GroupSummaryProps> = ({
  group,
  members,
  profile,
  creator,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="flex items-center justify-start flex-col px-2 py-2 gap-1 h-auto rounded-md bg-zinc-100 dark:bg-gradient-to-b dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 shadow-md w-min-[200px] md:w-[500px]">
      {group && (
        <div className="flex items-center gap-2 w-full">
          <Avatar
            src={group.imageUrl}
            size="md"
            className="border-5 hover:scale-105 shadow-md"
          />
          <p className=" font-bold">{group.name}</p>
        </div>
      )}
      <AvatarGroup size="sm" isBordered max={3} total={members?.length}>
        {members.map((member) => (
          <Avatar src={member.imageUrl} size="sm" key={member.id} />
        ))}
      </AvatarGroup>

      <Divider />

      <ul className="w-full">
        <div className="flex items-center flex-col gap-1 w-full p-1 ">
          <div className="flex gap-5 justify-between items-center w-full py-2 px-2">
            <h3 className="text-xs">Access:</h3>
            {group.openGroup ? (
              <h3 className="font-bold text-sm ">Public</h3>
            ) : (
              <h3 className="font-bold text-sm ">Private</h3>
            )}
          </div>

          <div className="flex gap-5 justify-between items-center w-full py-2 px-2">
            <h3 className="text-xs">Creator:</h3>
            {creator && <h3 className="font-bold text-sm ">{creator.name}</h3>}
          </div>

          <div className="py-2 px-2 flex w-full items-center justify-between">
            <h3 className="text-xs">Actions:</h3>
            {creator && (
              <GroupActionList
                group={group}
                members={members}
                creator={creator}
                profile={profile}
              />
            )}
          </div>
          {creator && (
            <InviteCode
              group={group}
              creator={creator}
              members={members}
              profile={profile}
            />
          )}

          <Divider />
          <div className="py-2 font-bold text-lg">Group Members</div>
          <Divider />
          {members.map((member) => (
            <li
              className="text-xs  flex items-center gap-1 justify-start w-full shadow-md py-1 rounded-md bg-zinc-50 dark:bg-slate-800 px-2"
              key={member.id}
            >
              <Avatar src={member.imageUrl} size="sm" />
              <div className="flex flex-col">
                {member.name}
                <Divider />
              </div>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
};
export default GroupSummary;
