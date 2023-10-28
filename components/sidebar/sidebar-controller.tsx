'use client'
import { Avatar, Button, Divider, Tab, Tabs } from '@nextui-org/react';
import { Group, Profile } from '@prisma/client';
import { Contact, Home, UserCircle, UserPlus2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {useState, useEffect} from'react'
import GroupList from '../group/group-list';
import SidebarGroupList from './sidebar-group-list';
import { ScrollArea } from '../ui/scroll-area';

interface SidebarControllerProps {
  profile: Profile;
  createdGroups: Group[] | null | undefined;
  joinedGroups: Group[] | null | undefined;
  members: Profile[];
}

const SidebarController:React.FC<SidebarControllerProps> = ({
  profile,
  createdGroups,
  joinedGroups,
  members,
}) => {
const router = useRouter();
const [isMounted, setIsMounted] = useState(false);

useEffect(() => {
setIsMounted(true);
}, []);

if (!isMounted) {
return null;
}
  return (
    <div className='text-xs'>
      <Tabs key="size" size="sm">
        <Tab key="profile" title="Profile">
          <div className="flex flex-col items-center justify-center gap-1">
            
            <Button
              className="flex items-center justify-center px-1 py-1 gap-1 hover:scale-105 rounded-md bg-emerald-700 text-white hover:bg-emerald-500 transition-all text-xs shadow-lg w-full"
              onClick={()=>router.push(`/dashboard/profiles/${profile.id}/settings`)}
            >
               <Contact className="h-3 w-3"/>Profile Settings
            </Button>
            <Button
              className="flex items-center justify-center px-2 py-1 gap-1 hover:scale-105 rounded-md bg-red-700 text-white hover:bg-red-500 transition-all text-xs shadow-lg w-full"
              onClick={()=>router.push(`/dashboard`)}
            >
              <Home className="h-3 w-3"/> Dashboard
            </Button>
            <Divider/>
            <div className="flex gap-5 justify-between items-center w-full py-2 px-2">

                <p className="text-sm">Avatar:</p>
                <Avatar src={profile.imageUrl} size="sm" />
               </div>
            <Divider/>

            <div className="flex items-center flex-col gap-1">
              <div className="flex gap-5 justify-between items-center w-full py-2 px-2">
            <p className="text-sm">Name:</p><p className="text-xs text-end">{profile.name}</p>
            </div>
            <Divider/>
            <div className="flex gap-5 justify-between items-center w-full py-2 px-2">
            <p className="text-sm">Interests:</p><p className="text-xs ">{profile.content}</p>
            </div>
            <Divider/>
            </div>
              </div>
        </Tab>
        <Tab key="groups" title="Groups">
        <div className="flex flex-col items-center justify-center gap-1">
        <Button
            onClick={()=>router.push(`/group/join`)}
              className="flex items-center justify-center px-1 py-1 gap-1 hover:scale-105 rounded-md bg-emerald-700 text-white hover:bg-emerald-500 transition-all text-xs shadow-lg w-full"
            >
              <UserPlus2 className="h-3 w-3"/> Add Groups
            </Button>
            <Button
            onClick={()=>router.push(`/group`)}
            className="flex items-center justify-center px-1 py-1 gap-1 hover:scale-105 rounded-md bg-red-700 text-white hover:bg-red-500 transition-all text-xs shadow-lg w-full"
            >
             <UserCircle className="h-3 w-3"/>  Create Groups
            </Button>
            <Divider/>
            
            <div>
              <p>Joined Groups</p>
              <Divider/>
            <ScrollArea className='w-[148px] h-[140px]'>
            <SidebarGroupList
              groups={joinedGroups}
              members={members}
              profile={profile}
            />
            </ScrollArea>
            </div>
            <div>
              <p>Created Groups</p>
              <Divider/>
            <ScrollArea className='w-[148px] h-[140px]'>
            <SidebarGroupList
              groups={createdGroups}
              members={members}
              profile={profile}
            />
            </ScrollArea>
            </div>
         </div>
      
        </Tab>
       
    
      </Tabs>
    </div>
  );
}
export default SidebarController;