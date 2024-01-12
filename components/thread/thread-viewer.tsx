'use client'
import { Tab, Tabs } from '@nextui-org/react';
import { Group, Post, Profile, Thread } from '@prisma/client';
import {useState, useEffect} from'react'
import ThreadViewerItem from './thread-viewer-item';
import { ScrollArea } from '../ui/scroll-area';
import { ThreadObject } from '@/app/(main)/dashboard/page';

interface ThreadViewerProps {
  
  
  profile:Profile;

  threadObjects:ThreadObject[];
}

const ThreadViewer:React.FC<ThreadViewerProps> = ({
 
 
  profile,
  
  threadObjects,
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
      {/* <Tabs className=" overflow-x-scroll md:overflow-hidden md:w-auto w-full flex items-center ">
        <Tab key="all" title="All"> */}
          <ScrollArea>
          <div className="flex items-center flex-col justify-center py-2   rounded-md w-auto px-2 sm:px-5 gap-2">
        {threadObjects &&  threadObjects.map((threadObject) => (
          <ThreadViewerItem 
            key={threadObject.thread.id} 
            thread={threadObject.thread} 
            profile={profile} 
            threadPosts={threadObject.threadPosts} 
            participants={threadObject.participants}/>
        ))}
        </div>
        </ScrollArea>
        {/* </Tab> */}
        {/* <Tab className="p-0 sm:p-4" key="announcements" title="Announcements">
          Announcements
        </Tab>
        <Tab className="p-0 sm:p-4" key="events" title="Events">
          Events
        </Tab>
        <Tab className="p-0 sm:p-4" key="tasks" title="Tasks">
          Tasks
        </Tab> */}
        
      {/* </Tabs> */}
    </div>
  );
}
export default ThreadViewer;