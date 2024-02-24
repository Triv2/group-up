"use client";

import {
  Avatar,
  AvatarGroup,
  Button,
  Divider,
  Tooltip,
} from "@nextui-org/react";
import { Message, MessageThread, Profile } from "@prisma/client";
import ConversationModal from "../modals/conversation-modal";
import { useState } from "react";

interface ConversationListItemProps {
  conversation: MessageThread;
  currentProfile: Profile;
  friends: Profile[];
  messages: Message[];
}

const ConversationListItem = ({
  conversation,
  currentProfile,
  friends,
  messages,
}: ConversationListItemProps) => {
  const [open, setOpen] = useState(false);

  let targetFriendId = "";

  if (conversation.starterId === currentProfile.id) {
    targetFriendId = conversation.profileIds[1];
  } else {
    targetFriendId = conversation.profileIds[0];
  }
  const targetFriend = friends.find((friend) => friend.id === targetFriendId);

  let conversationMessages = messages.filter(
    (message) => message.messageThreadId === conversation.id
  );

 

  const handleClick = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  return (
    <div className="flex items-center justify-start flex-col max-w-[140px] min-w-[140px] w-full">
      <Tooltip
        placement="right"
        content={
          <div className="flex items-center flex-col justify-center gap-1 p-1">
            <div className="flex items-center gap-2 p-1">
              <AvatarGroup size="sm" max={2}>
                <Avatar src={currentProfile?.imageUrl} size="sm" />
                <Avatar src={targetFriend?.imageUrl} size="sm" />
              </AvatarGroup>
              {conversation.title}
            </div>
            <Divider />
            Click to View Conversation
          </div>
        }
      >
        <Button
          onPress={handleClick}
          className="w-full pl-0 rounded-none bg-zinc-200/80 
          dark:bg-slate-700/50 hover:dark:bg-slate-400/50 hover:bg-opacity-5 hover:bg-zinc-50 dark:hover:text-sky-200 hover:text-sky-500 hover:scale-105"
        >
          <div className="flex items-center justify-start  w-full">
            <div>
              {/* <Avatar  src={profile.imageUrl} size="sm" className="border-5 hover:scale-105 shadow-md"/> */}
              <AvatarGroup size="sm" max={2}>
                <Avatar src={currentProfile?.imageUrl} size="sm" />
                <Avatar src={targetFriend?.imageUrl} size="sm" />
              </AvatarGroup>
            </div>
            <p className="font-semibold text-xs truncate">
              {conversation.title}
            </p>
          </div>
          {targetFriend && (
            <ConversationModal
              isOpen={open}
              onClose={() => setOpen(false)}
              onConfirm={() => setOpen(false)}
              loading={false}
              conversation={conversation}
              profile={currentProfile}
              target={targetFriend}
              messages={conversationMessages}
            />
          )}
        </Button>
      </Tooltip>
    </div>
  );
};
export default ConversationListItem;
