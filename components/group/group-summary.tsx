"use client";
import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Avatar, AvatarGroup, Divider } from "@nextui-org/react";
import {  Group, Profile } from "@prisma/client";
import InviteCode from "../ui/invite-code";
import GroupActionList from "./group-action-list";

interface GroupSummaryProps {
  group: Group;
  members: Profile[];
  profile?: Profile;
}

const GroupSummary: React.FC<GroupSummaryProps> = ({
  group,
  members,
  profile,
}) => {
  const [isMounted, setIsMounted] = useState(false);

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
    <div className="flex items-center justify-start flex-col sm:px-2 py-2 gap-1 h-auto rounded-md 
    bg-zinc-100 dark:bg-gradient-to-b dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 shadow-md w-[15rem] sm:w-[25rem] 
    animate-fade animate-duration-[2000ms] transition-all animate-ease-in">
      <Accordion className="w-full h-full" type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="flex items-center flex-col sm:flex-row justify-between w-full no-underline px-2 py-2 gap-2 bg-zinc-100 dark:bg-gradient-to-b dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 rounded-md hover:bg-white ">
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
            <Divider className="w-full sm:hidden block" />
            <AvatarGroup
              size="sm"
              isBordered
              max={3}
              total={matchedMembers?.length}
            >
              {matchedMembers &&
                matchedMembers.map((member) => (
                  <Avatar src={member.imageUrl} size="sm" key={member.id} />
                ))}
            </AvatarGroup>
          </AccordionTrigger>

          <AccordionContent>
            <ul className="w-full animate-fade animate-duration-[500ms] transition-all animate-ease-in">
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
                  {creator && (
                    <h3 className="font-bold text-sm ">{creator.name}</h3>
                  )}
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
                {matchedMembers &&
                  matchedMembers.map((member) => (
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
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
export default GroupSummary;
