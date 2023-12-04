import { Avatar, AvatarGroup, Button, Divider, Tooltip } from "@nextui-org/react";
import { Message, MessageThread, Profile } from "@prisma/client";
import ViewConversation from "./view-conversation";
import ConversationModal from "../modals/conversation-modal";

interface ConversationListItemProps {
  conversation:MessageThread;
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

  let targetFriendId="";

  if (conversation.starterId=== currentProfile.id){
    targetFriendId = conversation.profileIds[1]
  }
  else{
    targetFriendId = conversation.profileIds[0]
  }
  const targetFriend = friends.find((friend) => friend.id === targetFriendId)

  let conversationMessages = messages.filter((message) => message.starterId === conversation.starterId)
  let otherMessages = messages.filter((message) => message.targetId!== conversation.starterId )

  let allMessages=conversationMessages.concat(otherMessages);

  return (
<div className="flex items-center justify-start flex-col max-w-[140px] min-w-[140px] w-full">
    <Tooltip
      placement="right"
      content={
      <div className="flex items-center flex-col justify-center gap-1 p-1">
        <div className="flex items-center gap-2 p-1">
         <AvatarGroup size="sm"  max={2}>
           <Avatar src={currentProfile?.imageUrl} size="sm" />
              <Avatar src={targetFriend?.imageUrl} size="sm" />
              
            </AvatarGroup>
        {conversation.title}
        </div>
        <Divider/>
        Click to View Conversation
      </div>}
    >
    <Button onClick={()=>{}} className="w-full pl-0 rounded-none bg-zinc-200/80 dark:bg-zinc-700/50 hover:dark:bg-zinc-400/50 hover:bg-opacity-5 hover:bg-zinc-50 dark:hover:text-emerald-400 hover:text-emerald-500 hover:scale-105">
        <div className="flex items-center justify-start  w-full">
            <div>
            {/* <Avatar  src={profile.imageUrl} size="sm" className="border-5 hover:scale-105 shadow-md"/> */}
            <AvatarGroup size="sm"  max={2}>
            <Avatar src={currentProfile?.imageUrl} size="sm" />
              <Avatar src={targetFriend?.imageUrl} size="sm" />
              
            </AvatarGroup>
      
          </div>
            <p className="font-semibold text-xs truncate">{conversation.title}</p>
            </div>
        {targetFriend && (
       <ConversationModal
          isOpen={true}
          onClose={()=>{}}
          onConfirm={()=>{}}
          loading={false}
          conversation={conversation}
          profile={currentProfile}
          friends={friends}
          messages={allMessages}
       />
        )}
            </Button>
    </Tooltip>
</div>
  );
}
export default ConversationListItem;