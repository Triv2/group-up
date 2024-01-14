import NotificationIcon from "@/components/notification-icon";
import CreatePostButton from "@/components/post/create-post-button";
import PostItem from "@/components/post/post-item";
import { PostObject } from "@/components/thread/thread-viewer-item";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { Divider } from "@nextui-org/react";
import { MessageSquarePlus, Users } from "lucide-react";

import Image from "next/image";

interface ThreadIdPageProps {
  params: {
    threadId: string;
  };
}

const ThreadIdPage = async ({ params }: ThreadIdPageProps) => {
  const profile = await currentProfile();

  const thread = await db.thread.findUnique({
    where: {
      id: params.threadId,
    },
  });
  if (!thread) {
    return null;
  }

  const threadPosts: PostObject[] = [];

  const participants = await db.profile.findMany({
    where: {
      id: {
        in: thread.profileIds,
      },
    },
  });

  const currentPosts = await db.post.findMany({
    where: {
      id: {
        in: thread.postIds,
      },
    },
  });

  currentPosts.forEach((post) => {
    for (let i = 0; i < participants.length; i++) {
      if (post.profileId === participants[i].id) {
        threadPosts.push({
          posterProfile: participants[i],
          post,
        });
      }
    }
  });

  const currentPostCount = thread.postIds.length;

  const threadCreator = await db.profile.findUnique({
    where: {
      id: thread.starter,
    },
  });

  return (
    <div className="flex px-2 md:px-1 w-full bg-gradient-to-b from-zinc-400 to-zinc-100 
    dark:bg-gradient-to-br dark:from-zinc-900  dark:to-slate-950 min-h-screen h-auto">
      <div className="mt-[35px] pt-5 w-full px-2 md:px-10 md:ml-[140px]">
        <div className="flex items-center justify-center flex-col gap-2 bg-zinc-100 dark:bg-slate-800 rounded-md shadow-md  w-full py-5">
          <div className="flex items-center gap-3 justify-center w-full px-5">
            {thread?.imageUrl && (
              <Image
                className="rounded-full"
                src={thread.imageUrl}
                width={50}
                height={50}
                alt={thread.imageUrl}
              />
            )}
            <p className="text-2xl md:text-3xl font-bold">{thread?.title}</p>
          </div>

          <Divider />
          <div className="w-full flex items-center justify-around px-2 sm:px-10">
            <div>
              <p className="text-muted-foreground">Group:</p>
              <p className="text-lg md:text-xl font-bold dark:font-semibold pl-2">
                {thread?.groupName}
              </p>
            </div>
            {threadCreator && (
              <div>
                <p className="text-muted-foreground">Thread Creator:</p>
                <p className="text-lg md:text-xl  font-bold dark:font-semibold pl-10">
                  {threadCreator.name}
                </p>
              </div>
            )}
          </div>

          <Divider  />
          <div className="flex md:flex-row flex-col items-center gap-2 justify-between w-full px-2 md:px-10 ">

            <div className="flex items-center md:flex-row justify-around gap-2">

             
              <NotificationIcon
                icon={<Users className="text-sky-900/80  dark:text-sky-400 "/>}
                count={participants.length.toString()}
                className="relative text-bg-sky-500 bg-sky-200  dark:bg-sky-700  hover:bg-sky-400 dark:hover:bg-sky-500  p-2 rounded-full"
              />
              <NotificationIcon
                icon={<MessageSquarePlus className="text-sky-900/80  dark:text-sky-200 "/>}
                count={currentPostCount.toString()}
                className="relative text-bg-sky-500 bg-sky-200  dark:bg-sky-700  hover:bg-sky-400 dark:hover:bg-sky-500  p-2 rounded-full"
              />

              
              <div className="min-h-[4rem]  flex  gap-2 items-center  px-2 sm:px-10  ">
                <p>Created:</p>
                <div className="flex items-center justify-center  flex-col text-md">
                  <p className="font-bold">
                    {thread?.createdAt.toLocaleTimeString()}
                  </p>
                  <p className="text-muted-foreground font-semibold">
                    {thread?.createdAt.getMonth()}/{thread?.createdAt.getDay()}/
                    {thread?.createdAt.getFullYear()}
                  </p>
                </div>
              </div>
            </div>

            <CreatePostButton threadId={params.threadId} />
          </div>
        </div>
        <div className="flex items-center flex-col justify-center  sm:px-4">
          {threadPosts &&
            profile &&
            threadPosts.map((threadPost) => (
              <PostItem
                key={threadPost.post.id}
                post={threadPost.post}
                profile={threadPost.posterProfile}
                currentProfile={profile}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
export default ThreadIdPage;
