import { auth } from "@clerk/nextjs"

import { db } from "@/lib/db"


export const allMembers= async () => {
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
  
  const groups = await db.group.findMany({
    where: {
      id: {
        in: profile.groupIds,
      },
    },
  })
  
  const memberIds = groups.flatMap((group) => group.profileIds)

  const members = await db.profile.findMany({
    where: {
      id: {
        in: memberIds,
      },
    },
  })
  return members;
}
