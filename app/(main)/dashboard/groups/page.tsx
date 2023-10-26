import GroupList from "@/components/group/group-list";
import { allGroups } from "@/lib/all-groups";
import { allMembers } from "@/lib/all-members";

interface GroupsPageProps {}

const GroupsPage = async () => {
  const allGroup = await allGroups();
  const members = await allMembers();
  return (
<div>
{allGroup && members && (<GroupList title="List of All Groups" groups={allGroup} members={members} />)}
</div>
  );
}
export default GroupsPage;