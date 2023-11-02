'use client'
import {useState, useEffect} from'react'

interface ThreadProps {
  params:  { threadId: string  };
}

const Thread:React.FC<ThreadProps> = () => {

const [isMounted, setIsMounted] = useState(false);

useEffect(() => {
setIsMounted(true);
}, []);

if (!isMounted) {
return null;
}
  return (
    <div className="flex flex-col items-center justify-center">

      
    </div>
  );
}
export default Thread;