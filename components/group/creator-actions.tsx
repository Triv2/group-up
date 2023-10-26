'use client'
import {useState, useEffect} from'react'

interface CreatorActionsProps {}

const CreatorActions:React.FC<CreatorActionsProps> = () => {

const [isMounted, setIsMounted] = useState(false);

useEffect(() => {
setIsMounted(true);
}, []);

if (!isMounted) {
return null;
}
  return (
    <div>
      CreatorActions
      _____________
          creator powers
          public/private
          accept new applications
          editing

    </div>
  );
}
export default CreatorActions;