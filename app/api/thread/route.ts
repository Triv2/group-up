import { db } from "@/lib/db";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function POST(
  req: Request,
   
) {
  try {
    const user = await currentUser();
  if (!user) {
    return redirectToSignIn();
  }
    const body = await req.json();
   
    const { title, starter, openThread,} = body;
  
    
    
    if (!title) {
      return new NextResponse("Title is required.",{ status: 400 });
    }
    
    const checkProfile = await db.profile.findFirst({ 
      where: {
        id:starter.id,
      }
    })
    
    if (!checkProfile) {
      return new NextResponse("Profile doesn't exist.",{ status: 400 });
    }

    const newThread = await db.thread.create({
      data: {
        title,
        starter: starter.id,
        openThread,
        
      },
    })
   
    
    return NextResponse.json(newThread); 

  } catch (error) {
    console.log('[THREAD_POST]', error);
    return new NextResponse("Internal Error", {status:500});
  }
}

