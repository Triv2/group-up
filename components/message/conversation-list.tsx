import { MessageThread, Profile } from "@prisma/client";
import ConversationListItem from "./conversation-list-item";

interface ConversationListProps {
  conversations: MessageThread[];
  profile: Profile;
  friends: Profile[];
}

const ConversationList = ({
  conversations,
  profile,
  friends,
}: ConversationListProps) => {
  return (
<div className="h-auto w-full flex   pl-1 flex-col items-center justify-center ">
{conversations && conversations.map((conversation) => (
              <div className="h-auto w-full flex   flex-col items-center justify-center  " key={conversation.id}>
                  <ConversationListItem
                    conversation={conversation}
                    currentProfile={profile}
                    friends={friends}
                  />
                  
              </div>
              ))}
            
</div>
  );
}
export default ConversationList;