'use client'
import { Button } from '@nextui-org/react';
import { PlusCircle } from 'lucide-react';
import {useState, useEffect} from'react'
import CreatePostModal from '../modals/create-post-modal';

interface CreatePostButtonProps {}

const CreatePostButton:React.FC<CreatePostButtonProps> = () => {

const [isMounted, setIsMounted] = useState(false);
const [post, setPost] = useState(false);
const [loading, setLoading] = useState(false);

useEffect(() => {
setIsMounted(true);
}, []);

if (!isMounted) {
return null;
}
  return (
    <div>
      <Button
            size="sm"
            className="w-full  rounded-none bg-zinc-200/80 dark:bg-zinc-700/50 hover:dark:bg-zinc-400/50 hover:bg-opacity-5 hover:bg-zinc-50 dark:hover:text-emerald-400 hover:text-emerald-500 hover:scale-105 text-xs justify-start px-1 pl-2"
              onClick={()=>setPost(true)}
            >
               <PlusCircle className="h-3 w-3"/>Create Post
            </Button>
            
            
            <CreatePostModal
             isOpen={post}
             onClose={()=>setPost(false)}
             onConfirm={()=>{}}
             loading={loading}
            
            />
    </div>
  );
}
export default CreatePostButton;