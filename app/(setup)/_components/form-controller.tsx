'use client'
import {useState, useEffect} from'react'
import CreateGroupForm from './create-group-form';
import JoinGroupForm from './join-group-form';

import { Group} from '@prisma/client';
import { Button, Divider } from '@nextui-org/react';


interface FormControllerProps {
  groups: Group[];
  
}

const FormController:React.FC<FormControllerProps> = ({
  groups,
  
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

        {!create && !join && (<div className="bg-white p-5 rounded-md gap-2 flex items-center flex-col shadow-md">
        
            <h2 className="font-semibold">Step One: Create or Join a Group</h2>
            <p className="w-[150px] sm:w-[300px]  text-muted-foreground font-semibold text-sm">Please fill out the form prior to 12/15/2023 to participate in Secret Santa. </p>
            <Divider/>
            <div className="flex items-center gap-2 p-2">
            <Button className="shadow-md hover:scale-105 transition-all bg-emerald-700 text-white hover:bg-red-800" onClick={()=> setCreate(true)} >Create Group</Button>
            <Button className="shadow-md hover:scale-105 transition-all bg-emerald-700 text-white hover:bg-red-800" onClick={()=> setJoin(true)} >Join Group</Button>
            </div>
            </div>
          )}

       {create && (
        <div className="bg-emerald-400 p-2 rounded-md shadow-md">
          <CreateGroupForm />
          <Button className="shadow-md hover:scale-105 transition-all hover:bg-emerald-700 text-white bg-red-800" onClick={()=> setCreate(false)} type="submit">Cancel</Button>
       </div>
       )}   

       {join && (
       <div className="bg-emerald-400 p-2 rounded-md shadow-md">
          <JoinGroupForm initialData={groups} />
          <Button className="shadow-md hover:scale-105 transition-all hover:bg-emerald-700 text-white bg-red-800" onClick={()=> setJoin(false)} type="submit">Cancel</Button>
       </div>
       )}

      
      </div>
    </div>
  );
}
export default FormController;