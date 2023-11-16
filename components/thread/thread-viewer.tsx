'use client'
import { Tab, Tabs } from '@nextui-org/react';
import { Thread } from '@prisma/client';
import {useState, useEffect} from'react'
import ThreadViewerItem from './thread-viewer-item';

interface ThreadViewerProps {
  AllThreads: Thread[] | null;
  groupId: string;
}

const ThreadViewer:React.FC<ThreadViewerProps> = ({
  AllThreads,
  groupId,
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
        {AllThreads && AllThreads.map((thread) => (
          <ThreadViewerItem key={thread.id} thread={thread}/>
        ))}
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