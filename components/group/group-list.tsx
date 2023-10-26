'use client'
import { Group, Profile } from '@prisma/client';
import {useState, useEffect} from'react'
import GroupListItem from './group-list-item';
import { Divider } from '@nextui-org/react';
import GroupSummary from '../group-summary';


interface GroupListProps {
  groups: Group[] | null | undefined;
  members: Profile[];
  title: string;
  profile: Profile;
}

const GroupList:React.FC<GroupListProps> = ({
  groups,
  members,
  title,
  profile,
}) => {

const [isMounted, setIsMounted] = useState(false);

useEffect(() => {
setIsMounted(true);
}, []);

if (!isMounted) {
return null;
}
  return (
    <div className="h-auto w-auto px-5 py-6 flex flex-col items-center justify-center gap-5 bg-zinc-100/90">
      <h2>{title}</h2>
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