'use client'
import {useState, useEffect} from'react'

interface PostProps {}

const Post:React.FC<PostProps> = () => {

const [isMounted, setIsMounted] = useState(false);

useEffect(() => {
setIsMounted(true);
}, []);

if (!isMounted) {
return null;
}
  return (
    <div>
      Post
    </div>
  );
}
export default Post;