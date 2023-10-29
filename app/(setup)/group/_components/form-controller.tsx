'use client'
import {useState, useEffect} from'react'
import CreateGroupForm from './create-group-form';
import JoinGroupForm from './join-group-form';

import { Group, Profile} from '@prisma/client';
import { Button, Divider } from '@nextui-org/react';


interface FormControllerProps {
  groups: Group[] | null;
  profile: Profile | null;
  members: Profile[] | null;
}

const FormController:React.FC<FormControllerProps> = ({
  groups,
  profile,
  members,
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
    <div className="h-auto" >
      <div>

        {!create && !join &&  (<div className="bg-white p-5 rounded-md gap-2 flex items-center flex-col shadow-md">
        
            <h2 className="font-semibold"> Create  a Group</h2>
            {!groups &&(<p className="text-muted-foreground text-xs/10">There are no groups, please create one! </p>)}
            
            <Divider/>
            <div className="flex items-center gap-2 p-2">
            <Button className="shadow-md hover:scale-105 transition-all bg-emerald-700 text-white hover:bg-emerald-500" onClick={()=> setCreate(true)} >Create Group</Button>
            {groups &&(
            <Button className="shadow-md hover:scale-105 transition-all bg-emerald-700 text-white hover:bg-emerald-500" onClick={()=> setJoin(true)} >Join Group</Button>
            )}
            </div>
            </div>
          )}

       {create && (
        <div className="bg-zinc-100/90 p-2 rounded-md shadow-md">
          <CreateGroupForm />
          <Button className="shadow-md hover:scale-105 transition-all hover:bg-red-500 text-white bg-red-800" onClick={()=> setCreate(false)} type="submit">Cancel</Button>
       </div>
       )}   

       {join && groups  && (
       <div className="bg-zinc-100/90 p-2 rounded-md shadow-md">
          <JoinGroupForm groups={groups} members={members} profile={profile}/>
          <Button className="shadow-md hover:scale-105 transition-all hover:bg-red-500 text-white bg-red-800" onClick={()=> setJoin(false)} type="submit">Cancel</Button>
       </div>
       )}

      
      </div>
    </div>
  );
}
export default FormController;