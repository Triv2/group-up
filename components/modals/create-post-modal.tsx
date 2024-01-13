"use client";

import { Modal } from "@/components/ui/modal";
import { Button } from "@nextui-org/react";

import CreatePost from "../post/create-post";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  threadId: string;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  threadId,
}) => {
  return (
    <Modal
      title="Create a post?"
      description="Fill out the form to create a new post."
      isOpen={isOpen}
      onClose={onClose}
    >
      <CreatePost threadId={threadId} onClose={onClose} />

      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default CreatePostModal;
