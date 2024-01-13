"use client";

import { Modal } from "@/components/ui/modal";
import { Button } from "@nextui-org/react";
import { Post } from "@prisma/client";

import PostEditForm from "../post/post-edit-form";

interface EditPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  post: Post;
}

export const EditPostModal: React.FC<EditPostModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  post,
}) => {
  return (
    <Modal
      title="Edit your Post?"
      description="Edit any of your post."
      isOpen={isOpen}
      onClose={onClose}
    >
      <PostEditForm post={post} onClose={onClose} />

      <div className="pt-6 space-x-2 flex items-center justify-between w-full">
      <Button disabled={loading} onClick={onClose} className="dark:text-white dark:bg-slate-600/50 dark:hover:bg-slate-500">
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default EditPostModal;
