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

  

  const creators= [profile.groupIds.forEach(async (groupId) => { 
    const group =await db.group.findUnique({
      where: {
        id:groupId,
      },
    });
    const creator = await db.creator.findUnique({
      where: {
        id:group?.creator,
      },
    })
    if(!creator) {
      return null;
    }
    return creator;
    
    
    //This might need fixing, it might return only one creator when it should return more. or Vice versa.
  })]

 


  
    return creators;
}

 

