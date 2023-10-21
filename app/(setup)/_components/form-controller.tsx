'use client'
import {useState, useEffect} from'react'
import CreateGroupForm from './create-group-form';
import JoinGroupForm from './join-group-form';
import ProfileForm from '../../(main)/[groupId]/[profileId]/settings/_components/profile-form';
import { Group, Profile } from '@prisma/client';
import { Button } from '@nextui-org/react';


interface FormControllerProps {
  groups: Group[];
  profile: Profile;
}

const FormController:React.FC<FormControllerProps> = ({
  groups,
  profile,
}) => {

const [isMounted, setIsMounted] = useState(false);
const [create, setCreate] = useState(false);
const [join, setJoin] = useState(false);


useEffect(() => {
setIsMounted(true);
}, []);

if (!isMounted) {
return null;
}
  return (
    <div >
      <div>

        {!create && !join && (<div>
            <h2>Step One: Create or Join a Group</h2>
            <div>
            <Button onClick={()=> setCreate(true)} type="submit">Create Group</Button>
            <Button onClick={()=> setJoin(true)} type="submit">Join Group</Button>
            </div>
            </div>
          )}

       {create && (
        <div>
          <CreateGroupForm />
          <Button onClick={()=> setCreate(false)} type="submit">Cancel</Button>
       </div>
       )}   

       {join && (
       <div>
          <JoinGroupForm initialData={groups} />
          <Button onClick={()=> setJoin(false)} type="submit">Cancel</Button>
       </div>
       )}

      
      </div>
    </div>
  );
}
export default FormController;