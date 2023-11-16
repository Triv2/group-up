import CreateThread from "@/components/thread/create-thread";
import ThreadViewer from "@/components/thread/thread-viewer";
import { allThreads } from "@/lib/all-threads";

interface ThreadsPageProps {
  params:  { groupId: string  };
}

const ThreadsPage = async (
  {
    params,
  }:ThreadsPageProps
) => {

  const threads = await allThreads();
  return (
<div className="flex items-center justify-center h-auto w-auto pt-[35px] pl-[170px]">
{/* <div>
<ThreadViewer AllThreads={threads} groupId={params.groupId}/>
</div> */}
<div>
  <CreateThread/>
</div>
</div>
  );
}
export default ThreadsPage;