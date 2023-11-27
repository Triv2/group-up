'use client'


import { Button, Divider } from "@nextui-org/react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Post, Profile, Thread } from "@prisma/client";
import { Lock, Unlock } from "lucide-react";
import Image from "next/image";

import { useRouter } from "next/navigation";
import ThreadActionList from "./thread-action-list";
import PostItem from "./post-item";

interface ThreadViewerItemProps {
  profile:Profile;
  thread:Thread;
  allPosts:Post[] | null;
}

const ThreadViewerItem = ({
  thread,
  profile,
  allPosts,
}: ThreadViewerItemProps) => {

  let posts:Post[] = [];
  if (allPosts) {
    posts = allPosts.filter((post) => post.threadId === thread.id);
  }
  const router = useRouter();

  return (
  <div className="flex items-center justify-around px-4 py-2 bg-zinc-100 dark:bg-zinc-600 w-full rounded-md gap-2" >
    <Accordion className="w-full h-full" type="single" collapsible>
    <AccordionItem  value="item-1">
      <AccordionTrigger>
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
    </AccordionTrigger>
    <AccordionContent>
      <div className="flex items-center justify-center flex-col gap-2">
        {posts && posts.map((post) => (
          <PostItem key={post.id} post={post}/>
        ))}
      </div>
      </AccordionContent>
    </AccordionItem>
   </Accordion>
  </div>
  );
}
export default ThreadViewerItem;