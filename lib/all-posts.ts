import { auth } from "@clerk/nextjs"

import { db } from "@/lib/db"


export const allPosts = async () => {
  const { userId} = auth();
  

  if(!userId) { 
    
    return null;
  }

  const posts =await db.post.findMany({});

  if(posts.length === 0){
    return null;
  }
 
  return posts;
  
  
}