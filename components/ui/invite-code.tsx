'use client'
import {v4 as uuidv4} from "uuid";
import {useState, useEffect} from'react'
import { Button, Input } from "@nextui-org/react";
import { Check, Copy } from "lucide-react";

interface InviteCodeProps {
  code?:string;
}

const InviteCode:React.FC<InviteCodeProps> = ({
  code,
}) => {

const [isMounted, setIsMounted] = useState(false);
const [copied,setCopied] = useState(false);
const [isLoading,setIsLoading] = useState(false);

const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : "";

const inviteUrl = `${origin}/invite/${code}`;

const onCopy = () => {
  
  navigator.clipboard.writeText(inviteUrl);
  setCopied(true);

  setTimeout(() => {
    setCopied(false);
  }, 1000);
};

useEffect(() => {
setIsMounted(true);
}, []);

if (!isMounted) {
return null;
}
  return (
    <div className="flex items-center justify-between p-2 gap-1" >
     <p> InviteCode</p>
     <Input className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
              value={code} disabled={isLoading}
            />
    <Button disabled={isLoading} onClick={onCopy} size="sm">
              {copied ? <Check className="w-4 h-4"/> : <Copy className="w-4 h-4"/> }
            </Button>
    </div>
  );
}
export default InviteCode;