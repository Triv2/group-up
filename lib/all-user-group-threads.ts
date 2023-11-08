import { auth } from "@clerk/nextjs"

import { db } from "@/lib/db"


export const allUserGroupThreads = async () => {
  const { userId} = auth();
  

  if(!userId) { 
    
    return null;
  }

  const profile = await db.profile.findFirst({
    where: {
      clerkId:userId,
    }
  })

   if(!profile) {
    return null;
  }

  const groups =await db.group.findMany({
    where: {
      id:{
        in:profile.groupIds
      }
    }
  })

  if(groups.length === 0){
    return null;
  }

  const threads = await db.thread.findMany({
    where: {
      groupId: {
        in: groups.map((group) => group.id)
      }
    }
  })
  
  if(threads.length === 0){
    return null;
  }
 
  return threads;
  
  
}