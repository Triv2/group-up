import { auth } from "@clerk/nextjs"

import { db } from "@/lib/db"


export const currentGroup = async () => {
  const { userId} = auth();
  

  if(!userId) { 
    
    return null;
  }

  const profile =await db.profile.findFirst({
    where: {
      clerkId:userId,
    },
  });

  if(!profile){
    return null;
  }

  if(profile.groupId) {
  const group =await db.group.findUnique({
    where: {
      id:profile?.groupId,
    }
  });
  
  return group;
}
}