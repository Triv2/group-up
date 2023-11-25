'use client'
import { Tab, Tabs } from '@nextui-org/react';
import { Group, Thread } from '@prisma/client';
import {useState, useEffect} from'react'
import ThreadViewerItem from './thread-viewer-item';

interface ThreadViewerProps {
  allThreads: Thread[] | null;
  userGroups:Group[] | null;
}

const ThreadViewer:React.FC<ThreadViewerProps> = ({
  allThreads,
  userGroups
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
      <Tabs className="w-[200px] overflow-x-scroll md:overflow-hidden md:w-auto">
        Categories:
        <Tab key="all" title="All">
          <div className="flex items-center flex-col justify-center px-4 py-2 bg-zinc-500 rounded-md gap-2">
        {allThreads && allThreads.map((thread) => (
          <ThreadViewerItem key={thread.id} thread={thread}/>
        ))}
        </div>
        </Tab>
        <Tab key="announcements" title="Announcements">
          Announcements
        </Tab>
        <Tab key="events" title="Events">
          Events
        </Tab>
        <Tab key="tasks" title="Tasks">
          Tasks
        </Tab>
        <Tab key="groupChat" title="Group Chat">
          Group Chat
        </Tab>
      </Tabs>
    </div>
  );
}
export default ThreadViewer;