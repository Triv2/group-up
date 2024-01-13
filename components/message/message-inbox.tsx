"use client";
import { useState, useEffect } from "react";

interface MessageInboxProps {}

const MessageInbox: React.FC<MessageInboxProps> = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return <div>MessageInbox</div>;
};
export default MessageInbox;
