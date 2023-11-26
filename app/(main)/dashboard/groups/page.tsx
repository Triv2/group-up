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
<div className="flex items-center flex-col justify-center gap-2 min-h-screen">
  <h1 className="font-bold text-3xl">List of all Groups</h1>
{allGroup && members && profile && (<GroupList  groups={allGroup} members={members} profile={profile} />)}
</div>
  );
}
export default GroupsPage;