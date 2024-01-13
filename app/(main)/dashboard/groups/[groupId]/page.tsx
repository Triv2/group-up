import { currentProfile } from "@/lib/current-profile";

import { auth, redirectToSignIn } from "@clerk/nextjs";

import { db } from "@/lib/db";

import GroupSummary from "./_components/group-summary";
import ThreadViewer from "@/components/thread/thread-viewer";
import Image from "next/image";
import { ThreadObject } from "../../page";
import { allPosts } from "@/lib/all-posts";

interface GroupViewPageProps {
  params: { groupId: string };
}

const GroupViewPage = async ({ params }: GroupViewPageProps) => {
  const { userId } = auth();
  if (!userId) {
    redirectToSignIn();
  }

  const profile = await currentProfile();

  const posts = await allPosts();

  const group = await db.group.findUnique({
    where: {
      id: params.groupId,
    },
  });

  if (!group) {
    return {
      notFound: true,
    };
  }

  const members = await db.profile.findMany({
    where: {
      id: {
        in: group.profileIds,
      },
    },
  });

  const creatorProfile = await db.profile.findUnique({
    where: {
      id: group.creator,
    },
  });

  const threads = await db.thread.findMany({
    where: {
      id: {
        in: group.threadIds,
      },
    },
  });

  const threadStuff: ThreadObject[] = [];

  threads?.forEach((thread) => {
    let profiles = members.filter((profile) =>
      thread.profileIds.includes(profile.id)
    );
    if (!posts) {
      return null;
    }
    let allPosts = posts.filter((post) => thread.postIds.includes(post.id));
    threadStuff.push({
      thread,
      participants: profiles,
      threadPosts: allPosts,
    });
  });
  return (
    <div className="flex items-center justify-center flex-col h-auto min-h-screen bg-gradient-to-b from-zinc-400 to-zinc-100 
    dark:bg-gradient-to-br dark:from-zinc-900  dark:to-slate-950 bg-no-repeat bg-cover bg-center  py-10">
      <div className="bg-zinc-200 dark:bg-slate-950 gap-5 flex items-center justify-center flex-col  rounded-md px-2 py-6">
        <div>
          {group.bgImageUrl && (
            <Image
              height={250}
              width={250}
              src={group.bgImageUrl}
              alt={group.bgImageUrl}
            />
          )}
          {creatorProfile && profile && (
            <GroupSummary
              creator={creatorProfile}
              group={group}
              members={members}
              profile={profile}
            />
          )}
        </div>
        {profile && threads && (
          <ThreadViewer threadObjects={threadStuff} profile={profile} />
        )}
      </div>
    </div>
  );
};
export default GroupViewPage;
