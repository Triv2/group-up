import { auth } from "@clerk/nextjs"

import { db } from "@/lib/db"


export const allGroups = async () => {
  const { userId} = auth();
  

  if(!userId) { 
    
    return null;
  } 

  const groups =await db.group.findMany({});

  if(groups.length === 0){
    return null;
  }
 
  return groups;
  
  
}