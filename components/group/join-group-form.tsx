

import React from "react";


import { Group, Profile } from '@prisma/client';

import GroupListServer from '@/components/group/group-list-server';
import GroupListSorter from "./group-list-sorter";



interface GroupFormProps {
  groups: Group[] | null;
  joinedGroups: Group[] | null | undefined;
  createdGroups: Group[] | null | undefined;
  members: Profile[] | null;
  profile: Profile | null;
  onClose: () => void;
}



const JoinGroupForm:React.FC<GroupFormProps>= ({
  groups,
  members,
  profile,
  onClose,
  createdGroups,
  joinedGroups,
}) => {

  const openGroups = groups?.filter((group) => group.openGroup === true);
  const closedGroups = groups?.filter((group) => group.openGroup === false);

 
  
  return (
    <>
      <div>

      {groups && members && profile && (
        <GroupListSorter
        allGroups={groups}
        openGroups={openGroups}
        closedGroups={closedGroups}
        joinedGroups={joinedGroups}
        createdGroups={createdGroups}
        members={members}
        profile={profile}
      />)}
         

         </div>   
    </>
  );
 }
export default JoinGroupForm;