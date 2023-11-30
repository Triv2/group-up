import CreatePostButton from "@/components/thread/create-post-button";
import PostItem from "@/components/thread/post-item";
import ThreadViewerItem, { PostObject } from "@/components/thread/thread-viewer-item";
import { allPosts } from "@/lib/all-posts";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { Divider } from "@nextui-org/react";
import { Post } from "@prisma/client";
import Image from "next/image";

interface ThreadIdPageProps {
  params: {
    threadId: string;
  }
}

const ThreadIdPage = async ({
  params,
}:ThreadIdPageProps) => {
  const profile = await currentProfile();
  
  const thread = await db.thread.findUnique({
    where: {
      id: params.threadId,
    },
  })
  if (!thread) { return null; }
   
  const threadPosts:PostObject[]=[];

  const participants = await db.profile.findMany({
    where: {
      id: {
        in: thread.profileIds,
      },
    },
})



  const currentPosts = await db.post.findMany({
    where: {
      id: {
        in: thread.postIds,
      },
    },
  })
  
  currentPosts.forEach((post) => {
    for (let i = 0; i < participants.length; i++) {
      if(post.profileId===participants[i].id) {
       
        threadPosts.push({
          posterProfile: participants[i],
          post,
        });
      };
    };

  })

  const currentPostCount= thread.postIds.length;

  const threadCreator= await db.profile.findUnique({
    where: {
      id: thread.starter,
    },
  })
  
  
  return (
<div className="flex px-2 md:px-1 w-full bg-zinc-300 dark:bg-zinc-800 min-h-screen h-auto">

<div className="mt-[35px] pt-10 w-full px-2 md:px-10 md:ml-[140px]">
  <div className="flex items-center justify-center flex-col gap-2 bg-zinc-100 dark:bg-zinc-700 rounded-md shadow-md dark:shadow-white w-full py-5">
    <div className="flex items-center gap-3 justify-center w-full px-5">
    {thread?.imageUrl&&(
      <Image className="rounded-full" src={thread.imageUrl} width={50} height={50} alt={thread.imageUrl} />
    )}
    <p className="text-2xl md:text-3xl font-bold">{thread?.title}</p>
    
    
    
    </div>
    <Divider/>
    <div className="w-full flex items-center justify-around px-2 sm:px-10">
      <div>
      <p className="text-muted-foreground">Group:</p>
    <p className="text-lg md:text-xl font-bold dark:font-semibold pl-2">{thread?.groupName}</p>
    </div>
{threadCreator &&(
    <div>
      <p className="text-muted-foreground">Thread Creator:</p>
    <p className="text-lg md:text-xl  font-bold dark:font-semibold pl-10">{threadCreator.name}</p>
    </div>
)}
    </div>
    <Divider/>
    <div className="min-h-[4rem]  flex  gap-1 items-center justify-around w-full px-2 sm:px-10  ">
      <p className="text-muted-foreground">Thread Created:</p>
         <div className="flex items-center justify-center  flex-col gap-1">
         <p>{thread?.createdAt.toLocaleTimeString()}</p>
          <p className="text-muted-foreground">{thread?.createdAt.getMonth()}/{thread?.createdAt.getDay()}/{thread?.createdAt.getFullYear()}</p>
          
          </div>
          </div>
    
    <Divider/>
    <div className="flex md:flex-row flex-col items-center gap-2 justify-between w-full px-2 md:px-10 py-1">
    <div className="flex items-center justify-around gap-2">
        <p className="text-muted-foreground">Participants:</p>
        <div className="rounded-full bg-blue-400 p-1 px-3 font-bold">
        <p >{participants.length}</p>
        </div>
      <div className="flex items-center justify-around gap-2">
      <p>Posts:</p>
      <div className="rounded-full bg-emerald-400 p-1 px-3 font-bold">
      <p>{currentPostCount}</p>
      </div>
      </div>
      
      </div>

      <CreatePostButton threadId={params.threadId}/>
    
    </div>
    </div>
    <div className="flex items-center flex-col justify-center gap-2 sm:px-4">
      {threadPosts && threadPosts.map((threadPost) => (
        <PostItem key={threadPost.post.id} post={threadPost.post} profile={threadPost.posterProfile}/>
      ))}
    </div>
</div>
</div>
  );
}
export default ThreadIdPage;