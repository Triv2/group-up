'use client'
import { Tab, Tabs } from '@nextui-org/react';
import { Group, Post, Profile, Thread } from '@prisma/client';
import {useState, useEffect} from'react'
import ThreadViewerItem from './thread-viewer-item';
import { ScrollArea } from '../ui/scroll-area';

interface ThreadViewerProps {
  allThreads: Thread[] | null;
  userGroups:Group[] | null;
  profile:Profile;
  allPosts:Post[] | null;
}

const ThreadViewer:React.FC<ThreadViewerProps> = ({
  allThreads,
  userGroups,
  profile,
  allPosts,
}) => {

const [isMounted, setIsMounted] = useState(false);

useEffect(() => {
setIsMounted(true);
}, []);

if (!isMounted) {
return null;
}
  return (
    <div>
      <Tabs className=" overflow-x-scroll md:overflow-hidden md:w-auto w-full ">
        <Tab key="all" title="All">
          <ScrollArea>
          <div className="flex items-center flex-col justify-center py-2 bg-zinc-200 dark:bg-zinc-500 rounded-md w-auto px-2 sm:px-5 gap-2">
        {allThreads && allPosts && allThreads.map((thread) => (
          <ThreadViewerItem key={thread.id} thread={thread} profile={profile} allPosts={allPosts}/>
        ))}
        </div>
        </ScrollArea>
        </Tab>
        <Tab className="p-0" key="announcements" title="Announcements">
          Announcements
        </Tab>
        <Tab className="p-0" key="events" title="Events">
          Events
        </Tab>
        <Tab className="p-0" key="tasks" title="Tasks">
          Tasks
        </Tab>
        
      </Tabs>
    </div>
  );
}
export default ThreadViewer;