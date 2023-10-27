'use client'
import {v4 as uuidv4} from "uuid";
import {useState, useEffect} from'react'
import { Avatar, Button, Divider, Input, Tooltip } from "@nextui-org/react";
import { Check, Copy } from "lucide-react";
import Image from "next/image";
import GroupActionList from "../group/group-action-list";
import { Creator, Group, Profile } from "@prisma/client";

interface InviteCodeProps {
  group: Group;
  creator:Profile;
  members:Profile[];
  profile?: Profile;
}

const InviteCode:React.FC<InviteCodeProps> = ({
  group,
  creator,
  members,
  profile,
}) => {

const [isMounted, setIsMounted] = useState(false);
const [copiedCode,setCopiedCode] = useState(false);
const [copiedUrl,setCopiedUrl] = useState(false);
const [isLoading,setIsLoading] = useState(false);

const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : "";

const inviteUrl = `${origin}/invite/${group.inviteCode}`;

// const inviteCode=`${group.inviteCode}`;

// const onCopyCode = () => {
  
//   navigator.clipboard.writeText(inviteCode);
//   setCopiedCode(true);

//   setTimeout(() => {
//     setCopiedCode(false);
//   }, 1000);
// };

useEffect(() => {
setIsMounted(true);
}, []);

const onCopyUrl = () => {
  
  navigator.clipboard.writeText(inviteUrl);
  setCopiedUrl(true);

  setTimeout(() => {
    setCopiedUrl(false);
  }, 1000);
};

useEffect(() => {
setIsMounted(true);
}, []);

if (!isMounted) {
return null;
}
  return (
    <div className="text-xs">

      <div className="flex justify-between items-center p-2 ">
        <h3> Group:</h3> 
      <div className="flex items-center justify-between rounded-md gap-5 p-2">
      <h3 className="font-bold text-lg ">{group.name}</h3> <Avatar size="lg" src={group.imageUrl} className="border-5 shadow-md"  alt="group avatar" />  
      </div>
      </div>

        <div className="py-2 px-2 flex items-center justify-between">
          <h3>Access:</h3>
          {group.openGroup ? (
          <h3 className="font-bold text-sm ">
            Public
            </h3>
          ):(<h3 className="font-bold text-sm ">
            Private
          </h3>)}
        </div>

      <div className="py-2 px-2 flex items-center justify-between">
        <h3>Creator:</h3>
        <h3 className="font-bold text-sm ">{creator.name}</h3> 
        </div>
      
      <div className="py-2 px-2 flex items-center justify-between"> 
      <h3>Actions:</h3>
        {creator && 
        (<GroupActionList group={group} members={members} creator={creator} profile={profile} />)
        }
        </div>
      <Divider />
   
    <div className="flex items-center justify-between p-2 gap-1" >
    <Tooltip 
      placement="top"
      content="This url will automatically assign someone to this group."
      className="px-5 text-xs w-[200px] "
    >
     <p> InviteUrl</p>
     </Tooltip>
     <Input className=" border-0 focus-visible:ring-0 text-xs/10 text-black focus-visible:ring-offset-0"
              value={inviteUrl} disabled={isLoading} size="sm" onClick={onCopyUrl}
            />
            
            {copiedUrl ? (
                <Tooltip placement="right" content="Invite Url Copied" className="px-5 text-xs">
                    <Button disabled={isLoading} onClick={onCopyUrl} size="sm"className="flex items-center justify-center px-2 py-2 gap-1 hover:scale-105 rounded-md hover:bg-emerald-500 text-white bg-red-800 transition-all text-sm shadow-md">
                    <Check className="w-4 h-4"/> 
                    </Button>
               
                </Tooltip>
               ) : (<Button disabled={isLoading} onClick={onCopyUrl} size="sm"className="flex items-center justify-center px-2 py-2 gap-1 hover:scale-105 rounded-md hover:bg-emerald-500 text-white bg-red-800 transition-all text-sm shadow-md">
               <Copy className="w-4 h-4"/> 
               </Button> )}
    </div>
    

    

   
    {/* <div className="flex items-center justify-between p-2 gap-1 " >
    <Tooltip
      placement="top"
      content="This is a password used to register to this group."
      className="px-5 text-xs/10 w-[200px] "
      >
     <p> InviteCode</p>
      </Tooltip>

     <Input className=" border-0 focus-visible:ring-0 text-xs/10 text-black focus-visible:ring-offset-0"
              value={group.inviteCode} disabled={isLoading} size="sm" onClick={onCopyCode}
            />
   {copiedCode ? (
                <Tooltip placement="right" content="Invite Code Copied" className="px-5 text-xs/10">
                    <Button disabled={isLoading} onClick={onCopyCode} size="sm"className="flex items-center justify-center px-2 py-2 gap-1 hover:scale-105 rounded-md hover:bg-emerald-500 text-white bg-red-800 transition-all text-sm shadow-md">
                    <Check className="w-4 h-4"/> 
                    </Button>
               
                </Tooltip>
               ) : (<Button disabled={isLoading} onClick={onCopyCode} size="sm"className="flex items-center justify-center px-2 py-2 gap-1 hover:scale-105 rounded-md hover:bg-emerald-500 text-white bg-red-800 transition-all text-sm shadow-md">
               <Copy className="w-4 h-4"/> 
               </Button> )}
            
    </div>
     */}

    
    </div>
  );
}
export default InviteCode;