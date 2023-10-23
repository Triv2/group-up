'use client'
import {v4 as uuidv4} from "uuid";
import {useState, useEffect} from'react'
import { Button, Divider, Input, Tooltip } from "@nextui-org/react";
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
      <div className="flex justify-evenly items-center  py-2"><h3>Current Group:</h3> <h3 className="font-bold text-sm ">{name}</h3> <Image src={image} width={35} height={35} alt="group avatar" />  </div>
      <div className="flex justify-evenly items-center  py-2"><h3>Creator:</h3><h3 className="font-bold text-sm ">{creator}</h3> </div>
      <Divider className="bg-white"/>
    <Tooltip 
      placement="top"
      content="This url will automatically assign someone to this group."
      className="px-5 text-xs/10"
    >
    <div className="flex items-center justify-between p-2 gap-1" >
     <p> InviteUrl</p>
     <Input className=" border-0 focus-visible:ring-0 text-xs/10 text-black focus-visible:ring-offset-0"
              value={code} disabled={isLoading} size="sm" onClick={onCopyUrl}
            />
            
    <Button disabled={isLoading} onClick={onCopyUrl}  size="sm" className="flex items-center justify-center px-2 py-2 gap-1 hover:scale-105 rounded-md hover:bg-emerald-500 text-white bg-red-800 transition-all text-sm shadow-md"
   >
              {copiedUrl ? <Tooltip placement="right" content="Invite URL Copied" className="px-5 text-xs/10"><Check className="w-4 h-4"/></Tooltip> : <Copy className="w-4 h-4"/> }
            </Button>
            
    </div>
    </Tooltip>

    

    <Tooltip
      placement="bottom"
      content="This code is a password used to register to this group."
      className="px-5 text-xs/10"
      >
    <div className="flex items-center justify-between p-2 gap-1 " >
     <p> InviteCode</p>
     <Input className=" border-0 focus-visible:ring-0 text-xs/10 text-black focus-visible:ring-offset-0"
              value={code} disabled={isLoading} size="sm" onClick={onCopyCode}
            />
    <Button disabled={isLoading} onClick={onCopyCode} size="sm"className="flex items-center justify-center px-2 py-2 gap-1 hover:scale-105 rounded-md hover:bg-emerald-500 text-white bg-red-800 transition-all text-sm shadow-md"
   >
              {copiedCode ? <Tooltip placement="right" content="Invite Code Copied" className="px-5 text-xs/10"><Check className="w-4 h-4"/></Tooltip>  : <Copy className="w-4 h-4"/> }
            </Button>
    </div>
    </Tooltip>

    
    </div>
  );
}
export default InviteCode;