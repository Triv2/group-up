import { Thread } from "@prisma/client";
import Link from "next/link";

interface ThreadViewerItemProps {
  params:  { threadId: string  };
  thread:Thread;
}

const ThreadViewerItem = ({
  thread,
  params : { threadId }
}: ThreadViewerItemProps) => {
  return (
<Link href="/dashboard/groups">
    {thread.title}
    
</Link>
  );
}
export default ThreadViewerItem;