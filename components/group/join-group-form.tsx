

import React from "react";


import { Group, Profile } from '@prisma/client';

import GroupListServer from '@/components/group/group-list-server';



interface GroupFormProps {
  groups: Group[] | null;
  members: Profile[] | null;
  profile: Profile | null;
  onClose: () => void;
}



const JoinGroupForm:React.FC<GroupFormProps>= ({
  groups,
  members,
  profile,
  onClose,
}) => {

 
  
  return (
    <>
      <div>

      {groups && members && profile && (
        <GroupListServer/>)}
         

         </div>   
    </>
  );
 }
export default JoinGroupForm;