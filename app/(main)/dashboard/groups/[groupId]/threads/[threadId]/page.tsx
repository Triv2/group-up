import CreatePostButton from "@/components/thread/create-post-button";
import PostItem from "@/components/thread/post-item";
import ThreadViewerItem from "@/components/thread/thread-viewer-item";
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
   
  const posts = thread.postIds;

  const currentPosts = await db.post.findMany({
    where: {
      id: {
        in: posts,
      },
    },
  })

  const currentPostCount= thread.postIds.length;
  
  return (
<div className="flex  w-full bg-zinc-300 dark:bg-zinc-800 min-h-screen h-auto">

<div className="mt-[35px] pt-10 w-full px-10 md:ml-[140px]">
  <div className="flex items-center justify-center flex-col gap-1 bg-zinc-100 dark:bg-zinc-700 rounded-md shadow-md dark:shadow-white w-full py-5">
    <div className="flex items-center gap-3 justify-between w-full px-5">
    <p className="text-xl font-semi-bold">{thread?.groupName}</p>
    <p className="text-3xl font-bold">{thread?.title}</p>
    {thread?.imageUrl&&(
      <Image className="rounded-full" src={thread.imageUrl} width={50} height={50} alt={thread.imageUrl} />
    )}
    </div>
    <Divider/>
    <div className="flex items-center gap-3">
      <p>Number of posts:</p>
      <div className="rounded-full bg-emerald-400 p-1 px-2 font-bold">
      <p>{currentPostCount}</p>
      
      </div>
      <CreatePostButton/>
    </div>
    </div>
    <div className="flex items-center flex-col justify-center gap-3 px-4">
      {currentPosts && currentPosts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
</div>
</div>
  );
}
export default ThreadIdPage;