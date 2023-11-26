import ThreadViewerItem from "@/components/thread/thread-viewer-item";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

interface ThreadIdPageProps {
  params: {
    threadId: string;
  }
}

const ThreadIdPage = async ({
  params,
}:ThreadIdPageProps) => {
  const profile = await currentProfile();
  const thread = await db.thread.findUnique({
    where: {
      id: params.threadId,
    },
  }) 


  return (
<div className="flex items-center justify-center">
ThreadIdPage
<div className="mt-[35px] pt-10">
 {thread && profile &&( <ThreadViewerItem thread={thread} profile={profile}/>)}
</div>
</div>
  );
}
export default ThreadIdPage;