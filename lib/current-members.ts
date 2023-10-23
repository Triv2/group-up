import { auth } from "@clerk/nextjs"

import { db } from "@/lib/db"


export const currentMembers= async () => {
  const { userId} = auth();
  

  if(!userId) { 
    
    return null;
  }

  const profile =await db.profile.findFirst({
    where: {
      clerkId:userId,
    },
  });

  if(!profile) {
    return null;
  } 
  
  if(profile.groupId) {
  const group =await db.group.findFirst({
    where: {
      id:profile?.groupId,
    },
    
  });

  const members = await db.profile.findMany({
    where: {
      groupId:group?.id,
    },
  })

  
  return members;
}
}