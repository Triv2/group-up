import CreateThread from "@/components/thread/create-thread";
import ThreadViewer from "@/components/thread/thread-viewer";

interface ThreadsPageProps {}

const ThreadsPage = () => {
  return (
<div className="grid grid-cols-2">
<div>
<ThreadViewer/>
</div>
<div>
  <CreateThread/>
</div>
</div>
  );
}
export default ThreadsPage;