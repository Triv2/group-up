
import { Group, Profile } from '@prisma/client';


import { Divider } from '@nextui-org/react';
import GroupSummary from './group-summary';
import { ScrollArea } from '../ui/scroll-area';


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
    <ScrollArea className="h-[400px]">
    <div className="h-auto w-auto px-5 py-6 flex flex-col items-center justify-center gap-5 bg-zinc-200 dark:bg-zinc-600 rounded-md shadow-md">
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
    </ScrollArea>
  );
}
export default GroupList;