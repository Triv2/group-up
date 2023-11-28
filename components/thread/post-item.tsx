'use client'
import { Button, Divider } from '@nextui-org/react';
import { Post, Profile } from '@prisma/client';
import { Dot, GripHorizontal, GripVertical } from 'lucide-react';
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
    <div className="w-full shadow-md dark:shadow-zinc-500 bg-zinc-200 rounded-md  dark:bg-zinc-600">
      <div className="flex flex-col sm:flex-row justify-between px-5 py-5 gap-3">
      <div className="flex items-center justify-center gap-1 w-full">
      <div className=" h-[5rem] w-[5rem]  flex items-center flex-col justify-center px-5 py-1 border-r-1 dark:bg-zinc-500 shadow-md bg-zinc-100 rounded-md border-black/80">
      {post.profileImageUrl &&(  <Image className="rounded-full" src={post.profileImageUrl} width={50} height={50} alt={post.profileImageUrl}/>)}
        <p className="font-semibold">{post.profileName}</p>
        </div>

        <div className=" min-h-[6rem] font-semibold flex items-center justify-center px-10 py-4  bg-zinc-100 dark:bg-zinc-500 shadow-md rounded-md w-full">
          {post.content}
          </div>
          </div>
        <div className="flex items-center justify-center border-t-1 sm:border-l-1 rounded-md  border-black/30" >
        <div className="flex items-center justify-center py-3 px-2">
        <Button size="sm"  className="shadow-md  p-0 dark:bg-zinc-400 flex items-center justify-center rounded-md">
          <GripVertical className="hidden sm:flex"/>
          <GripHorizontal className="flex sm:hidden"/>
        </Button>
        </div>
        
        <div className="min-h-[4rem]  flex flex-col gap-1 items-center justify-center px-3 py-1 ">
        <p className="text-center text-sm font-semibold">{createdAt.toLocaleTimeString()}</p>
          <p className="text-muted-foreground ">{createdAt.getMonth()}/{createdAt.getDay()}/{createdAt.getFullYear()}</p>
          
          </div>
          

          
        </div>

        </div>
    </div>
  );
}
export default PostItem;