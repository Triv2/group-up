import { currentGroups } from "@/lib/current-groups";

import { currentProfile } from "@/lib/current-profile";

import { auth, redirectToSignIn } from "@clerk/nextjs";
import { Divider } from "@nextui-org/react";

import { redirect } from "next/navigation";

import GroupSummary from "@/components/group/group-summary";
import { allMembers } from "@/lib/all-members";

import ThreadViewer from "@/components/thread/thread-viewer";
import { allUserGroupThreads } from "@/lib/all-user-group-threads";

import { allPosts } from "@/lib/all-posts";

import { Post, Profile, Thread } from "@prisma/client";

export const revalidate = 0;

export type ThreadObject = {
  thread: Thread;
  participants: Profile[];
  threadPosts: Post[];
};

const DashboardPage = async () => {
  const { userId } = auth();
  if (!userId) {
    redirectToSignIn();
  }
  const profile = await currentProfile();
  const userGroups = await currentGroups();
  const allThreads = await allUserGroupThreads();
  const posts = await allPosts();
  const allProfiles = await allMembers();
  if (!allProfiles) {
    return null;
  }

  const threadStuff: ThreadObject[] = [];

  allThreads?.forEach((thread) => {
    let profiles = allProfiles.filter((profile) =>
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

  if (!profile && !userGroups) {
    redirect("/setup/profile");
  }

  if (!profile && userGroups) {
    redirect(`/invite/${userGroups[0].inviteCode}`);
  }

  return (
    <div
      className="md:pl-[180px] flex items-center justify-center min-h-screen h-auto w-auto min-w-screen flex-col bg-gradient-to-b from-zinc-400 to-zinc-100 
    dark:bg-gradient-to-br dark:from-zinc-900  dark:to-slate-950 bg-no-repeat bg-cover bg-center"
    >
      <div className="rounded-md  bg-zinc-200 dark:bg-gradient-to-b from-slate-800 via-slate-900 to-slate-800 flex flex-col items-center justify-center gap-2 py-3 mt-10 md:px-10 md:p-5 shadow-md ">
        <div className=" bg-[url(/mbg1.png)]  h-[100px] rounded-md w-full flex items-center justify-center shadow-lg">
          <div className="bg-slate-800/60 h-full w-full flex items-center justify-center rounded-md shadow-md">
            <h1 className="text-white text-lg md:text-3xl font-bold">
              Welcome, {profile?.name}!
            </h1>
          </div>
        </div>

        <Divider />
        <div className="grid xl:grid-cols-2 h-auto gap-10 sm:px-7 ">
          <div className="flex items-center  flex-col gap-2 w-auto">
            Threads
            <Divider />
            {profile && threadStuff && (
              <ThreadViewer threadObjects={threadStuff} profile={profile} />
            )}
          </div>

          <div className=" flex items-center flex-col gap-2 w-auto">
            Groups
            <Divider />
            {userGroups &&
              allProfiles &&
              profile &&
              userGroups.map((group) => (
                <GroupSummary
                  key={group.id}
                  group={group}
                  members={allProfiles}
                  profile={profile}
                />
              ))}
            {profile && profile.groupIds.length === 0 && (
              <div className="flex items-center flex-col">
                <p className=" text-muted-foreground dark:text-sky-100/50 px-1">
                  You are not in any groups, please create or join a group
                </p>
              </div>
            )}
          </div>
        </div>

        <Divider />
        <div className="flex items-center justify-center md:flex-row flex-col gap-3 "></div>
      </div>
    </div>
  );
};
export default DashboardPage;
