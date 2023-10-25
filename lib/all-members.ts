import { auth } from "@clerk/nextjs"

import { db } from "@/lib/db"


export const allMembers= async () => {
  const { userId} = auth();
  

  if(!userId) { 
    
    return null;
  }

  const profiles =await db.profile.findMany({});

  if(!profiles){
    return null;
  }
  return profiles; 
  
}
