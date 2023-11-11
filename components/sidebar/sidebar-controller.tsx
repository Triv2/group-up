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
    <div className='text-xs flex items-center justify-center flex-col'>
      <Tabs key="size" size="sm" variant="underlined"
        classNames={{
          tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider ",
          cursor: "w-full bg-emerald-500",
          tab: "max-w-fit px-0 h-12 ",
          tabContent: "group-data-[selected=true]:text-emerald-500 dark:group-data-[selected=true]:text-emerald-400 w-[60px] hover:text-emerald-500 dark:hover:text-emerald-400 dark:text-white",
        }}>

        <Tab key="profile" title="Profile">
          <div className="flex flex-col items-center justify-center min-w-[140px] max-w-[140px] w-auto">

          <div className="w-full shadow-md">
          <p className="font-bold text-md py-1 px-1 w-full">Actions</p>
          </div>
          <Divider/>
          <Button
            size="sm"
            className="w-full  rounded-none bg-zinc-200/80 hover:bg-zinc-200/10 dark:bg-zinc-700/50 hover:dark:bg-zinc-400/50 hover:bg-opacity-5 hover:bg-zinc-50 dark:hover:text-emerald-400 hover:text-emerald-500 hover:scale-105 text-xs justify-start px-1 pl-2"
              onClick={()=>router.push(`/dashboard`)}
            >
              <Home className="h-3 w-3"/> Dashboard
            </Button>
            <Button
            size="sm"
            className="w-full  rounded-none bg-zinc-200/80 dark:bg-zinc-700/50 hover:dark:bg-zinc-400/50 hover:bg-opacity-5 hover:bg-zinc-50 dark:hover:text-emerald-400 hover:text-emerald-500 hover:scale-105 text-xs justify-start px-1 pl-2"
              onClick={()=>router.push(`/dashboard/profiles/${profile.id}/settings`)}
            >
               <Contact className="h-3 w-3"/>Profile Settings
            </Button>
            
            <Divider/>
            <div className=" pt-2 pb-2">
            <div className="w-full ">
          <p className="font-bold text-md py-1 px-1 pt-2 w-full">Profile Information</p>
          </div>
          <Divider/>
            <div className="flex gap-5 justify-between items-center w-full py-2 px-2">

                <p className="text-xs">Avatar:</p>
                <Avatar src={profile.imageUrl} size="sm" />
               </div>
            <Divider/>

            <div className="flex items-center flex-col">
              <div className="flex gap-5 justify-between items-center w-full py-2 px-2">
            <p className="text-xs">Name:</p><p className="text-xs text-end">{profile.name}</p>
            </div>
            <Divider/>
            <div className="flex gap-5 justify-between items-center w-full py-2 px-2">
            <p className="text-xs">Interests:</p><p className="text-xs ">{profile.content}</p>
            </div>
            <Divider/>
            </div>
              </div>
          </div>
        </Tab>
                {/* ///////////////////////////////////////////////////////////////////////// */}
        <Tab key="groups" title="Groups">
        <div className="flex flex-col items-center justify-center min-w-[140px] max-w-[140px] w-auto">
          
          <div className="w-full shadow-md">
          <p className="font-bold text-md  py-1 px-1 w-full">Actions</p>
          </div>
          <Divider/>

        <Button
        size="sm"
            onClick={()=>router.push(`/setup/group/join`)}
            className="w-full  rounded-none bg-zinc-200/80 dark:bg-zinc-700/50 hover:dark:bg-zinc-400/50 hover:bg-opacity-5 hover:bg-zinc-50 dark:hover:text-emerald-400 hover:bg-zinc-200/10 hover:text-emerald-500 hover:scale-105 text-xs justify-start px-1 pl-2"
            >
              <div className="">
              <UserPlus2 className="h-3 w-3"/>
              </div>
               Add Groups
            </Button>
            <Button
            size="sm"
            onClick={()=>router.push(`/setup/group`)}
            className="w-full  rounded-none bg-zinc-200/80 dark:bg-zinc-700/50 hover:dark:bg-zinc-400/50 hover:bg-opacity-5 hover:bg-zinc-50 dark:hover:text-emerald-400 hover:bg-zinc-200/10 hover:text-emerald-500 hover:scale-105 text-xs justify-start px-1 pl-2"
            >
              <div className="">
             <UserCircle className="h-3 w-3"/> 
             </div> Create Groups
            </Button>
            <Divider/>
            




            <div className="pt-2 pb-2">
              <p className="font-bold text-md shadow-xl py-1 px-1">Joined Groups</p>
              <Divider/>
              <ScrollArea className='w-auto  h-[110px]'>
            <SidebarGroupList
              groups={joinedGroups}
              members={members}
              profile={profile}
            />
            </ScrollArea>
            </div>
            <div>
              <p className="font-bold text-md shadow-xl py-1 px-1">Created Groups</p>
              <Divider/>
            <ScrollArea className='w-auto h-[110px]'>
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