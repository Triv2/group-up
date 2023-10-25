'use client'
import {v4 as uuidv4} from "uuid";
import {useState, useEffect} from'react'
import { Avatar, Button, Divider, Input, Tooltip } from "@nextui-org/react";
import { Check, Copy } from "lucide-react";
import Image from "next/image";

interface InviteCodeProps {
  code?:string;
  name?:string;
  image:string;
  creator:string | null;
}

const InviteCode:React.FC<InviteCodeProps> = ({
  code,
  name,
  image,
  creator
}) => {

const [isMounted, setIsMounted] = useState(false);
const [copiedCode,setCopiedCode] = useState(false);
const [copiedUrl,setCopiedUrl] = useState(false);
const [isLoading,setIsLoading] = useState(false);

const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : "";

const inviteUrl = `${origin}/invite/${code}`;

const inviteCode=`${code}`;

const onCopyCode = () => {
  
  navigator.clipboard.writeText(inviteCode);
  setCopiedCode(true);

  setTimeout(() => {
    setCopiedCode(false);
  }, 1000);
};

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
      <div className="flex justify-evenly items-center  py-2"><h3>Current Group:</h3> 
      <div className="bg-zinc-50/50 shadow-md flex items-center justify-between rounded-md gap-5 p-2">
      <h3 className="font-bold text-lg ">{name}</h3> <Avatar size="lg" src={image} className="border-5 shadow-md"  alt="group avatar" />  
      </div>
      </div>
      <div className="flex justify-evenly items-center  py-2"><h3>Creator:</h3><h3 className="font-bold text-sm ">{creator}</h3> </div>
      <Divider />
   
    <div className="flex items-center justify-between p-2 gap-1" >
    <Tooltip 
      placement="top"
      content="This url will automatically assign someone to this group."
      className="px-5 text-xs/10 w-[200px] "
    >
     <p> InviteUrl</p>
     </Tooltip>
     <Input className=" border-0 focus-visible:ring-0 text-xs/10 text-black focus-visible:ring-offset-0"
              value={inviteUrl} disabled={isLoading} size="sm" onClick={onCopyUrl}
            />
            
            {copiedUrl ? (
                <Tooltip placement="right" content="Invite Url Copied" className="px-5 text-xs/10">
                    <Button disabled={isLoading} onClick={onCopyUrl} size="sm"className="flex items-center justify-center px-2 py-2 gap-1 hover:scale-105 rounded-md hover:bg-emerald-500 text-white bg-red-800 transition-all text-sm shadow-md">
                    <Check className="w-4 h-4"/> 
                    </Button>
               
                </Tooltip>
               ) : (<Button disabled={isLoading} onClick={onCopyUrl} size="sm"className="flex items-center justify-center px-2 py-2 gap-1 hover:scale-105 rounded-md hover:bg-emerald-500 text-white bg-red-800 transition-all text-sm shadow-md">
               <Copy className="w-4 h-4"/> 
               </Button> )}
    </div>
    

    

   
    <div className="flex items-center justify-between p-2 gap-1 " >
    <Tooltip
      placement="top"
      content="This is a password used to register to this group."
      className="px-5 text-xs/10 w-[200px] "
      >
     <p> InviteCode</p>
      </Tooltip>

     <Input className=" border-0 focus-visible:ring-0 text-xs/10 text-black focus-visible:ring-offset-0"
              value={code} disabled={isLoading} size="sm" onClick={onCopyCode}
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
    

    
    </div>
  );
}
export default InviteCode;