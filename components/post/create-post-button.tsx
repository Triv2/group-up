"use client";
import { Button } from "@nextui-org/react";
import { PlusCircle } from "lucide-react";
import { useState, useEffect } from "react";
import CreatePostModal from "../modals/create-post-modal";

interface CreatePostButtonProps {
  threadId: string;
}

const CreatePostButton: React.FC<CreatePostButtonProps> = ({ threadId }) => {
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
        className="w-full shadow-md font-bold  bg-zinc-200/80 dark:bg-zinc-500/50 rounded-md hover:dark:bg-zinc-400/50 hover:bg-opacity-5 hover:bg-zinc-50 dark:hover:text-emerald-400 hover:text-emerald-500 hover:scale-105 text-md justify-start px-5 "
        onClick={() => setPost(true)}
      >
        <PlusCircle className="h-4 w-4" />
        Create Post
      </Button>

      <CreatePostModal
        threadId={threadId}
        isOpen={post}
        onClose={() => setPost(false)}
        onConfirm={() => {}}
        loading={loading}
      />
    </div>
  );
};
export default CreatePostButton;
