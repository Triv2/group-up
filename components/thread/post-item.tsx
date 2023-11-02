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
    <div>
      PostItem
    </div>
  );
}
export default PostItem;