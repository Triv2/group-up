'use client'
import { Tab, Tabs } from '@nextui-org/react';
import { Group, Post, Profile, Thread } from '@prisma/client';
import {useState, useEffect} from'react'
import ThreadViewerItem from '@/components/thread/thread-viewer-item';
import { ScrollArea } from '@/components/ui/scroll-area';

interface GroupThreadViewerProps {
  allThreads: Thread[] | null;
  profile:Profile;
  allPosts:Post[] | null;
}

const GroupThreadViewer:React.FC<GroupThreadViewerProps> = ({
  allThreads,
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
      <Tabs className=" overflow-x-scroll md:overflow-hidden md:w-auto w-full flex items-center ">
        <Tab key="all" title="All">
          <ScrollArea>
          <div className="flex items-center flex-col justify-center py-2 bg-zinc-200 dark:bg-zinc-500 rounded-md w-auto px-2 sm:px-5 gap-2">
        {/* {allThreads && allPosts && allThreads.map((thread) => (
          <ThreadViewerItem key={thread.id} thread={thread} profile={profile} allPosts={allPosts}/>
        ))} */}
        </div>
        </ScrollArea>
        </Tab>
        <Tab className="p-0 sm:p-4" key="announcements" title="Announcements">
          Announcements
        </Tab>
        <Tab className="p-0 sm:p-4" key="events" title="Events">
          Events
        </Tab>
        <Tab className="p-0 sm:p-4" key="tasks" title="Tasks">
          Tasks
        </Tab>
        
      </Tabs>
    </div>
  );
}
export default GroupThreadViewer;