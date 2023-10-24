'use client'
import {useState, useEffect} from'react'
import CreateGroupForm from './create-group-form';
import JoinGroupForm from './join-group-form';

import { Group, Profile} from '@prisma/client';
import { Button, Divider } from '@nextui-org/react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useParams, useRouter } from 'next/navigation';
import { AlertModal } from '@/components/modals/alert-modal';
import ProfileSummary from '@/components/profile-summary';


interface EditGroupControllerProps {
  groups: Group[] | null | undefined;
  group: Group  | null | undefined;
  profile: Profile;
}

const EditGroupController:React.FC<EditGroupControllerProps> = ({
  groups,
  group,
  profile,
}) => {

  const params= useParams();
  const router = useRouter();

const [isMounted, setIsMounted] = useState(false);
const [create, setCreate] = useState(false);
const [join, setJoin] = useState(false);
const [leave, setLeave] = useState(false);
const [loading, setLoading] = useState(false);

const handleLeave = async () => {
  if(leave){
    setLeave(false);
  }else{
    setLeave(true);
  }
}

const leaveGroup = async () => {
  try {
    setLoading(true);
    
  
    console.log("OnSubmit")
    await axios.patch(`/api/group/${params.groupId}/leave`)
    if(leave){
      setLeave(false);
    }
    
    toast.success("Group Left!");
  } catch (error) {
    toast.error("Something went wrong.");
  } finally {
    router.refresh();
    setLoading(false);
  }
}


useEffect(() => {
setIsMounted(true);

}, []);

if (!isMounted) {
return null;
}
  return (
    <div className="h-auto" >
      <AlertModal
        isOpen={leave}
    onClose={()=> setLeave(false)}
    onConfirm={leaveGroup}
    loading={loading}
      />
      <div>
      {group && (
      <div className="flex items-center justify-enter flex-col p-5 bg-white shadow-md rounded-md gap-3">
        <ProfileSummary profile={profile} />
        <h3>You must first leave a group to join a group.</h3>
          <Button className="shadow-md hover:scale-105 transition-all hover:bg-red-500 text-white bg-red-700" disabled={loading} onClick={handleLeave}>
            Leave Group
          </Button>
      </div>)}


      {!group &&(<div>
        {!create && !join && (<div className="bg-white p-5 rounded-md gap-2 flex items-center flex-col shadow-md">
        <ProfileSummary profile={profile} />
            <h2 className="font-semibold"> Create {groups && (groups.length > 0) &&("or Join")} a Group</h2>
            {!groups &&(<p className="text-muted-foreground text-xs/10">There are no groups, please create one! </p>)}
             <Divider/>
            <div className="flex items-center gap-2 p-2">
            <Button className="shadow-md hover:scale-105 transition-all bg-emerald-700 text-white hover:bg-emerald-500" onClick={()=> setCreate(true)} >Create Group</Button>
            { groups && (groups.length > 0) &&(
            <Button className="shadow-md hover:scale-105 transition-all bg-emerald-700 text-white hover:bg-emerald-500" onClick={()=> setJoin(true)} >Join Group</Button>
            )}
            </div>
            </div>
          )}

       {create && (
        <div className="bg-zinc-100/80 p-2 rounded-md shadow-md">
          <ProfileSummary profile={profile} />
          <CreateGroupForm />
          <Button className="shadow-md hover:scale-105 transition-all hover:bg-red-500 text-white bg-red-800" onClick={()=> setCreate(false)} type="submit">Cancel</Button>
       </div>
       )}   

       {join  && (
       <div className="bg-zinc-100/80 p-2 rounded-md shadow-md">
        <ProfileSummary profile={profile} />
         {groups&&(<JoinGroupForm initialData={groups} />)}
          <Button className="shadow-md hover:scale-105 transition-all hover:bg-red-500 text-white bg-red-800" onClick={()=> setJoin(false)} type="submit">Cancel</Button>
       </div>
       )}
       </div>
        )}
      
      </div>
    </div>
  );
}
export default EditGroupController;