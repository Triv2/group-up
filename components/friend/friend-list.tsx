'use client'
import { Profile } from '@prisma/client';
import Image from 'next/image';
import {useState, useEffect} from'react'

interface FriendListProps {
  friends: Profile[];
}

const FriendList:React.FC<FriendListProps> = ({
  friends,
}) => {

const [isMounted, setIsMounted] = useState(false);

useEffect(() => {
setIsMounted(true);
}, []);

if (!isMounted) {
return null;
}
  return (
    <div>
      {friends.map((friend) => (
        <div key={friend.id} className="flex items-center gap-3">
         
          <div className="flex flex-col gap-1">
            <Image src={friend.imageUrl} alt={friend.id} width={32} height={32} className="rounded-full" />
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {friend.name}
            </p>

          </div>
        </div>
      ))}
    </div>
  );
}
export default FriendList;