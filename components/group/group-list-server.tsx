import { currentCreatedGroups } from "@/lib/current-created-groups";
import { currentProfile } from "@/lib/current-profile";
import GroupListSorter from "./group-list-sorter";
import { currentGroups } from "@/lib/current-groups";
import { allGroups } from "@/lib/all-groups";
import { allMembers } from "@/lib/all-members";
import { allClosedGroups } from "@/lib/all-closed-groups";
import { allOpenGroups } from "@/lib/all-open-groups";

interface GroupListServerProps {}

const GroupListServer = async () => {
  const groups = await allGroups() || null;
  const profile = await currentProfile();
  const profileGroups= await currentGroups();
  const userCreatedGroups= await currentCreatedGroups();
  const members= await allMembers() || null;
  const closedGroups =  await allClosedGroups() || null;
  const openGroups = await allOpenGroups();


  return (
<div>
   {profile && members &&( 
   <GroupListSorter
      allGroups={groups}
      openGroups={openGroups}
      closedGroups={closedGroups}
      joinedGroups={profileGroups}
      createdGroups={userCreatedGroups}
      members={members}
      profile={profile}
    />)}
</div>
  );
}
export default GroupListServer;