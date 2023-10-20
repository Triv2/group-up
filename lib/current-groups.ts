import { auth } from "@clerk/nextjs"

import { db } from "@/lib/db"


export const currentGroups = async () => {
  const { userId} = auth();
  

  if(!userId) { 
    
    return null;
  }

  const group =await db.group.findMany({});
  
  return group;
}