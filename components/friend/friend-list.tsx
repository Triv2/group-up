'use client'
import {useState, useEffect} from'react'

interface FriendListProps {}

const FriendList:React.FC<FriendListProps> = () => {

const [isMounted, setIsMounted] = useState(false);

useEffect(() => {
setIsMounted(true);
}, []);

if (!isMounted) {
return null;
}
  return (
    <div>
      FriendList
    </div>
  );
}
export default FriendList;