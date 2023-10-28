
import { Group, Profile } from '@prisma/client';


import { Divider } from '@nextui-org/react';
import GroupSummary from '../group-summary';


interface GroupListProps {
  groups: Group[] | null | undefined;
  members: Profile[];
 
  profile: Profile;
}

const GroupList:React.FC<GroupListProps> = ({
  groups,
  members,
  
  profile,
}) => {


  return (
    <div className="h-auto w-auto px-5 py-6 flex flex-col items-center justify-center gap-5 bg-zinc-100/90">
      <Divider/>
      {groups && groups.map((group) => (
        <GroupSummary
        key={group.id}
        group={group}
        members={members}
        profile={profile}
        />
      ))}
    </div>
  );
}
export default GroupList;