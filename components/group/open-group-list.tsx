import { allOpenGroups } from "@/lib/all-open-groups";

interface OpenGroupListProps {}



const OpenGroupList = async () => {
  const openGroups= await allOpenGroups();
  return (
<div>
OpenGroupList
</div>
  );
}
export default OpenGroupList;