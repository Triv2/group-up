import { auth } from "@clerk/nextjs"

import { db } from "@/lib/db"


export const allThreads = async () => {
  const { userId} = auth();
  

  if(!userId) { 
    
    return null;
  }

  const threads =await db.thread.findMany({});

  if(threads.length === 0){
    return null;
  }
 
  return threads;
  
  
}