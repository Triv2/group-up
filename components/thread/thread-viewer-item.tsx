import { Button } from "@nextui-org/react";
import { Thread } from "@prisma/client";

import { useRouter } from "next/navigation";

interface ThreadViewerItemProps {
  
  thread:Thread;
}

const ThreadViewerItem = ({
  thread,
  
}: ThreadViewerItemProps) => {
  const router = useRouter();

  return (
  <Button onClick={()=>router.push(`/dashboard/groups/`)}>
    {thread.title}
    
  </Button>
  );
}
export default ThreadViewerItem;