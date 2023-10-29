import { auth } from "@clerk/nextjs"

import { db } from "@/lib/db"


export const allNoncreatedJoinedGroups = async () => {
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

  const creator = await db.creator.findUnique({
    where: {
      id:profile?.id,
    },
  })

  if(!creator) {
    const currentGroups=await db.group.findMany({
      where: {
        id: {
          in: profile.groupIds,
        },
      },
    })
    return currentGroups;
  }

  

  let difference = profile.groupIds.filter(id =>!creator.groupIds.includes(id));




  // creator.groupIds.forEach( (groupId) => {
  //   if(profile.groupIds.includes(groupId)) {

  //   } else{
  //     groupIds.push(groupId);
  //   }
  // })

  // if(groupIds.length > 0) {
    const groupList= await db.group.findMany({
      where: {
        id: {
          in: difference,
        },
      },
    });
  


  
    
  return groupList;
  }



