import CreateThread from "@/components/thread/create-thread";
import ThreadViewer from "@/components/thread/thread-viewer";
import { allThreads } from "@/lib/all-threads";

interface ThreadsPageProps {}

const ThreadsPage = async () => {

  const threads = await allThreads();
  return (
<div className="flex items-center justify-center h-auto w-auto pt-[35px] pl-[170px]">
<div>
<ThreadViewer AllThreads={threads}/>
</div>
<div>
  <CreateThread/>
</div>
</div>
  );
}
export default ThreadsPage;