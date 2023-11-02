'use client'
import { Divider } from '@nextui-org/react';
import { Post, Thread } from '@prisma/client';
import {useState, useEffect} from'react'
import PostItem from './post-item';

interface ThreadProps {
  params:  { threadId: string  };
  posts: Post[];
  thread: Thread;
}

const Thread:React.FC<ThreadProps> = ({
  params,
  posts,
}) => {

const [isMounted, setIsMounted] = useState(false);

useEffect(() => {
setIsMounted(true);
}, []);

if (!isMounted) {
return null;
}
  return (
    <div className="flex flex-col items-center justify-center ">
        <div>
          <div className="flex items-center justify-center">
            <h1 className="text-3xl font-bold">
              {params.threadId}
            </h1>
          </div>
          <div className="flex items-center justify-center">
            <p className="text-xl font-bold">
              {posts.length} posts
            </p>
          </div>
          

        </div>
        <Divider/>
        <div className="flex flex-col items-center justify-center sm:px-10">
          {posts && (posts.map((post) => (
              <PostItem key={post.id} post={post}/>
            )
           )
          )}
        </div>
      
    </div>
  );
}
export default Thread;