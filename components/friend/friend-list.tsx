'use client'
import { Profile } from '@prisma/client';
import Image from 'next/image';
import {useState, useEffect} from'react'
import FriendListItem from './friend-list-item';

interface FriendListProps {
  friends: Profile[];
  currentProfile: Profile;
}

const FriendList:React.FC<FriendListProps> = ({
  friends,
  currentProfile,
}) => {

const [isMounted, setIsMounted] = useState(false);

useEffect(() => {
setIsMounted(true);
}, []);

if (!isMounted) {
return null;
}
  return (
    <div className="h-auto w-full flex   pl-1 flex-col items-center justify-center ">
      {friends.map((friend) => (
        <div key={friend.id} className="h-auto w-full flex   flex-col items-center justify-center  " >
         
         <FriendListItem
         currentProfile={currentProfile}
         profile={friend}
         />
          
        </div>
      ))}
    </div>
  );
}
export default FriendList;