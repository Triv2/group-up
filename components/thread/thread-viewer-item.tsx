'use client'


import { Button, Divider } from "@nextui-org/react";
import { Profile, Thread } from "@prisma/client";
import { Lock, Unlock } from "lucide-react";
import Image from "next/image";

import { useRouter } from "next/navigation";
import ThreadActionList from "./thread-action-list";

interface ThreadViewerItemProps {
  profile:Profile;
  thread:Thread;
}

const ThreadViewerItem = ({
  thread,
  profile,
}: ThreadViewerItemProps) => {
  const router = useRouter();

  return (
  <div className="flex items-center justify-around px-4 py-2 bg-zinc-100 dark:bg-zinc-600 w-full rounded-md gap-2" onClick={()=>router.push(`/dashboard/groups/`)}>
    <div className="w-full">
      {thread.openThread ? (
        <Unlock className="h-3 w-3 "/>
      ):(
        <Lock className="h-3 w-3"/>
      )}
    </div>
    <div className="flex items-center justify-center w-full">
    {thread.imageUrl &&(<Image className="rounded-full" src={thread.imageUrl} width={50} height={50} alt={thread.imageUrl} />)}
    </div>
    <div>
      {thread.groupName}
    </div>
    <div className="flex items-center flex-col w-full">
    <p className="font-bold text-lg">{thread.title}</p>
    <Divider/>
    <p className="text-sm truncate w-[300px]">{thread.content}</p>
    </div>
    <ThreadActionList thread={thread} profile={profile} />
    {/* <Button onClick={()=>router.push(`/dashboard/groups/${thread.groupId}/threads/${thread.id}`)} className="shadow-md hover:scale-105 transition-all" >
      View
    </Button>
    <Button className="shadow-md hover:scale-105 transition-all" type="button">
      Delete
    </Button> */}
  </div>
  );
}
export default ThreadViewerItem;