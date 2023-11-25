import { Button, Divider } from "@nextui-org/react";
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
  <div className="flex items-center justify-around px-4 py-2 bg-zinc-600 w-full rounded-md gap-2" onClick={()=>router.push(`/dashboard/groups/`)}>
    <div className="flex items-center justify-center">
    {thread.imageUrl}
    </div>
    <div className="flex items-center flex-col">
    {thread.title}
    <Divider/>
    {thread.content}
    </div>
    <Button className="shadow-md hover:scale-105 transition-all" type="button">
      Delete
    </Button>
  </div>
  );
}
export default ThreadViewerItem;