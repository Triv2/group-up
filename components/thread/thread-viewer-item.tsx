'use client'


import { Button, Divider } from "@nextui-org/react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Post, Profile, Thread } from "@prisma/client";
import { Lock, Unlock } from "lucide-react";
import Image from "next/image";

import { useRouter } from "next/navigation";
import ThreadActionList from "./thread-action-list";
import PostItem from "./post-item";
import { ScrollArea } from "../ui/scroll-area";

interface ThreadViewerItemProps {
  profile:Profile;
  thread:Thread;
  allPosts:Post[];
}

const ThreadViewerItem = ({
  thread,
  profile,
  allPosts,
}: ThreadViewerItemProps) => {

  const  posts = thread.postIds;
  let currentPosts:Post[];
  if (posts) {
    currentPosts = allPosts.filter((post) => posts.includes(post.id));
  } else {
    currentPosts = [];
  }
  
  const router = useRouter();

  return (
  <div className="flex items-center px-4 py-2 bg-zinc-100 dark:bg-zinc-600 w-full rounded-md " >
    <Accordion className="w-full h-full" type="single" collapsible>
    <AccordionItem  value="item-1">
      <AccordionTrigger className="flex items-center justify-between gap-5 no-underline">
    <div >
      {thread.openThread ? (
        <Unlock className="h-3 w-3 "/>
      ):(
        <Lock className="h-3 w-3"/>
      )}
    </div>
    <div className="rounded-full p-1 bg-emerald-400 px-2">{thread.postIds.length}</div>
    <div className="flex items-center justify-center w-full">
    {thread.imageUrl &&(<Image className="rounded-full" src={thread.imageUrl} width={50} height={50} alt={thread.imageUrl} />)}
    </div>
    <div className="flex items-center flex-col w-full">
    <p className="font-bold text-lg">{thread.title}</p>
    
    </div>
    <div>
      {thread.groupName}
    </div>
    
    <ThreadActionList thread={thread} profile={profile} />
    </AccordionTrigger>
    <AccordionContent>
      <ScrollArea className="h-[300px]">
      <div className="flex items-center justify-center flex-col gap-2 w-full">
        {currentPosts && currentPosts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
      </ScrollArea>
      </AccordionContent>
    </AccordionItem>
   </Accordion>
  </div>
  );
}
export default ThreadViewerItem;