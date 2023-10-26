import GroupList from "@/components/group/group-list";
import { allGroups } from "@/lib/all-groups";
import { allMembers } from "@/lib/all-members";
import { currentProfile } from "@/lib/current-profile";

interface GroupsPageProps {}

const GroupsPage = async () => {
  const allGroup = await allGroups();
  const members = await allMembers();
  const profile = await currentProfile();
  return (
<div>
{allGroup && members && profile && (<GroupList title="List of All Groups" groups={allGroup} members={members} profile={profile} />)}
</div>
  );
}
export default GroupsPage;