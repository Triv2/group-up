'use client'

import { Button, Tooltip } from "@nextui-org/react";
import { Profile } from "@prisma/client";
import Image from "next/image";
import ProfileSummaryModal from "../modals/profile-summary-modal";
import { useState } from "react";
import axios from "axios";

interface ProfileAvatarProps {
  profile:Profile;
  currentProfile:Profile;
}

const ProfileAvatar = ({
  profile,
  currentProfile,
}: ProfileAvatarProps) => {

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    if(open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }
 

  return (
<Tooltip
  placement="bottom"
  content="View Profile"
>
<Button onClick={handleClick} className=" h-[5rem] w-[5rem]  flex items-center flex-col justify-center px-5 py-1 hover:scale-105 transition duration-300  dark:bg-zinc-500 shadow-md bg-zinc-100 rounded-md">
       <Image className="rounded-full" src={profile.imageUrl} width={50} height={50} alt={profile.imageUrl}/>
        <p className="font-semibold">{profile.name}</p>
        <ProfileSummaryModal
          currentProfile={currentProfile}
          profile={profile}
          isOpen={open}
          onClose={()=>setOpen(false)}
          onConfirm={()=>{}}
          loading={loading}
        />
        </Button>

       
</Tooltip>
  );
}
export default ProfileAvatar;