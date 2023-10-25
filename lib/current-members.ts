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
  
  
  const group =await db.group.findUnique({
    where: {
      id:profile?.groupIds
    },
    
  });

  const members = await db.profile.findMany({
    where: {
      groupIds:group?.id,
    },
  })

  
  return members;
}
