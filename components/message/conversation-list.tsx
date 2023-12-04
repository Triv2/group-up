import { Message, MessageThread, Profile } from "@prisma/client";
import ConversationListItem from "./conversation-list-item";

interface ConversationListProps {
  conversations: MessageThread[];
  profile: Profile;
  friends: Profile[];
  onClose: () => void;
  messages: Message[];
}

const ConversationList = ({
  conversations,
  profile,
  friends,
  messages,
  onClose,
}: ConversationListProps) => {

 

  return (
<div className="h-auto w-full flex   pl-1 flex-col items-center justify-center ">
{conversations && conversations.map((conversation) => (
              <div className="h-auto w-full flex   flex-col items-center justify-center  " key={conversation.id}>
                  <ConversationListItem
                    conversation={conversation}
                    currentProfile={profile}
                    friends={friends}
                    messages={messages}
                    onClose={onClose}
                  />
                  
              </div>
              ))}
            
</div>
  );
}
export default ConversationList;