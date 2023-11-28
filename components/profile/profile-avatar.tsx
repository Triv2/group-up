import { Profile } from "@prisma/client";
import Image from "next/image";

interface ProfileAvatarProps {
  profileName:string;
  profileImageUrl:string;
  profileId:string;
  
}

const ProfileAvatar = ({
  profileName,
  profileImageUrl,
  profileId,
}: ProfileAvatarProps) => {
  return (
<div className=" h-[5rem] w-[5rem]  flex items-center flex-col justify-center px-5 py-1  dark:bg-zinc-500 shadow-md bg-zinc-100 rounded-md">
      {profileName && profileImageUrl &&(  <Image className="rounded-full" src={profileImageUrl} width={50} height={50} alt={profileImageUrl}/>)}
        <p className="font-semibold">{profileName}</p>
        </div>

  );
}
export default ProfileAvatar;