
import { Group, Profile } from '@prisma/client';


import { Divider } from '@nextui-org/react';
import GroupSummary from '../group-summary';
import SidebarGroupSummary from './sidebar-group-summary';


interface SidebarGroupListProps {
  groups: Group[] | null | undefined;
  members: Profile[];
 
  profile: Profile;
}

const SidebarGroupList:React.FC<SidebarGroupListProps> = ({
  groups,
  members,
  
  profile,
}) => {


  return (
    <div className="h-auto w-auto px-5 py-6 flex flex-col items-center justify-center gap-5 bg-zinc-100/90">
      <Divider/>
      {groups && groups.map((group) => (
        <SidebarGroupSummary
        key={group.id}
        group={group}
        members={members}
        profile={profile}
        />
      ))}
    </div>
  );
}
export default SidebarGroupList;