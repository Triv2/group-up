'use client'
import { Divider } from '@nextui-org/react';
import { Post, Profile } from '@prisma/client';
import Image from 'next/image';
import {useState, useEffect} from'react'

interface PostItemProps {
  post: Post;
  
}

const PostItem:React.FC<PostItemProps> = ({
  post,
  
}) => {

const [isMounted, setIsMounted] = useState(false);

useEffect(() => {
setIsMounted(true);
}, []);

if (!isMounted) {
return null;
}


const createdAt = new Date(post.createdAt);


  return (
    <div className="w-full shadow-md bg-zinc-200 rounded-md  dark:bg-zinc-600">
      <div className="flex justify-between px-5 py-5 gap-3">
      <div className="  flex items-center flex-col justify-center px-5 py-1 border-r-1 dark:bg-zinc-500 shadow-md bg-zinc-100 rounded-md border-black/80">
      {post.profileImageUrl &&(  <Image className="rounded-full" src={post.profileImageUrl} width={50} height={50} alt={post.profileImageUrl}/>)}
        {post.profileName}
        </div>
        <div className="  flex items-center justify-center px-2  bg-zinc-100 dark:bg-zinc-500 shadow-md rounded-md w-full">{post.content}</div>
  
        <div className="  flex items-center justify-center px-2 py-1 border-l-1 rounded-md border-black/50">{createdAt.toLocaleTimeString()}</div>
        </div>
    </div>
  );
}
export default PostItem;