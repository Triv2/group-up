'use client'
import { useClerk } from "@clerk/clerk-react";


import { Button } from '@nextui-org/react';
import axios from 'axios';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

import {useState, useEffect} from'react'
import toast from 'react-hot-toast';

interface NavButtonProps {
  href: string;
  text?: string;
  className?: string;
  icon?:JSX.Element;
}

const DeleteButton:React.FC<NavButtonProps> = ({
  href,
  text,
  className,
  icon
}) => {
  const { signOut } = useClerk();
  const router = useRouter()
const params= useParams();
const [loading, setLoading] = useState(false);
const [isMounted, setIsMounted] = useState(false);


useEffect(() => {
setIsMounted(true);
}, []);

if (!isMounted) {
return null;
}
const onDelete = async () => {
  try {
    setLoading(true);
    
  
    console.log("OnDelete")
    await axios.delete(`/api/profile/${params.profileId}`)
    toast.success("Profile Deleted!");
    signOut();
    router.push("/")
   
  } catch (error) {
    toast.error("Something went wrong.");
  } finally {
    setLoading(false);
  }
}

  return (
    <Button className={className} onClick={onDelete} >
      {icon}{text}
    </Button>
  );
}
export default DeleteButton;