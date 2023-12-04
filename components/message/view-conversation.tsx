import { Divider } from "@nextui-org/react";
import { Message, MessageThread, Profile } from "@prisma/client";
import MessageItem from "./message-item";

interface ViewConversationProps {
  currentProfile: Profile;
  currentConversation: MessageThread;
  targetProfile: Profile;
  messages:Message[];
  onClose: () => void;
}

const ViewConversation = ({
  currentProfile,
  currentConversation,
  targetProfile,
  messages,
  onClose,
}:ViewConversationProps) => {
  return (
<div className="flex items-center justify-center flex-col gap-2 p-5">
    <div>{currentConversation.title}</div>
    <Divider/>
    {messages && messages.map((message) => (
    <div key={message.id}>
      <MessageItem
        message={message}
        profile={targetProfile}
        currentProfile={currentProfile}
      />

    </div>))}
</div>
  );
}
export default ViewConversation;