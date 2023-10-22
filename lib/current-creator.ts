import { auth } from "@clerk/nextjs"

import { db } from "@/lib/db"


export const currentCreator= async () => {
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

  const group =await db.group.findFirst({
    where: {
      id:profile?.groupId,
    }
  });

  if(!group) {
    return null;
  }

  const creator = await db.profile.findUnique({
    where: {
      id:group.creator,
    }
  })
  
  return creator;
}