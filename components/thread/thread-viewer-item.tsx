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
import { db } from "@/lib/db";

interface ThreadViewerItemProps {
  profile:Profile;
  thread:Thread;
  threadPosts:Post[];
  participants:Profile[];
}

export type PostObject = {
  posterProfile:Profile;
  post:Post;
}


const ThreadViewerItem = ({
  thread,
  profile,
  threadPosts,
  participants,
}: ThreadViewerItemProps) => {

  const postStuffs:PostObject[]=[];

  if(!participants ||!threadPosts) { return null; }



  threadPosts.forEach((post) => {
    for (let i = 0; i < participants.length; i++)
     {
      if(post.profileId===participants[i].id) {
        console.log(participants[i].id);
        postStuffs.push({
          posterProfile: participants[i],
          post,
        });
      };
    }
  });
  


  return (
  <div className="flex items-center px-4  bg-zinc-100 dark:bg-zinc-700 w-full rounded-md " >
    <Accordion className="w-full" type="single" collapsible>
    <AccordionItem  value="item-1">
      <AccordionTrigger className="flex items-center justify-between gap-2 no-underline">
    <div >
      {thread.openThread ? (
        <Unlock className="h-3 w-3 "/>
      ):(
        <Lock className="h-3 w-3"/>
      )}
    </div>
    <div className="rounded-full p-1 px-2 text-xs bg-emerald-400">{thread.postIds.length}</div>
    <div className="flex items-center justify-center ">
    {thread.imageUrl &&(<Image className="rounded-full" src={thread.imageUrl} width={50} height={50} alt={thread.imageUrl} />)}
    </div>

    <div className="w-full flex items-center justify-center flex-col sm:flex-row">
    <div className="flex items-center flex-col w-full">
    <p className="font-bold text-sm sm:text-lg">{thread.title}</p>
    
    </div>

    <div className="text-sm sm:text-md">
      {thread.groupName}
    </div>
    </div>
    <ThreadActionList thread={thread} profile={profile} />
    </AccordionTrigger>
    <AccordionContent>
      <ScrollArea className="h-[300px]">
      <div className="flex items-center justify-center flex-col gap-2 w-full">
        {postStuffs && postStuffs.map((postStuff) => (
          <PostItem key={postStuff.post.id} post={postStuff.post} profile={postStuff.posterProfile} />
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