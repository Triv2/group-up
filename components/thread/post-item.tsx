'use client'
import { Divider } from '@nextui-org/react';
import { Post, Profile } from '@prisma/client';
import {useState, useEffect} from'react'

interface PostItemProps {
  post: Post;
  profile:Profile;
}

const PostItem:React.FC<PostItemProps> = ({
  post,
  profile
}) => {

const [isMounted, setIsMounted] = useState(false);

useEffect(() => {
setIsMounted(true);
}, []);

if (!isMounted) {
return null;
}
  return (
    <div className="w-full shadow-md bg-zinc-200 rounded-md dark:bg-zinc-500">
      <div className="  flex items-center justify-center px-2 py-1">{post.content}</div>
      <Divider/>
      <div className="  flex items-center justify-center px-2 py-1">{profile.name}</div>
    </div>
  );
}
export default PostItem;