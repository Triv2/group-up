import { auth } from "@clerk/nextjs"

import { db } from "@/lib/db"


export const currentGroup = async () => {
  const { userId} = auth();
  

  if(!userId) { 
    
    return null;
  }

  const profile =await db.profile.findFirst({
    where: {
       clerkId:userId
    }
  });
  
  if(!profile){
    return null;
  }
  const group = await db.group.findFirst({
    where: {
      id:profile.groupIds[0],
       
    }
  });
  return group;
}