'use client'
import { Post } from '@prisma/client';
import {useState, useEffect} from'react'

interface PostItemProps {
  post: Post;
}

const PostItem:React.FC<PostItemProps> = ({
  post
}) => {

const [isMounted, setIsMounted] = useState(false);

useEffect(() => {
setIsMounted(true);
}, []);

if (!isMounted) {
return null;
}
  return (
    <div className="w-full shadow-md bg-zinc-200 dark:bg-zinc-500">
      <div>{post.content}</div>
      
    </div>
  );
}
export default PostItem;