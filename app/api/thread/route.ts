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
    
    const { title,  openThread, content, groupId} = body;
  
    
    
    if (!title) {
      return new NextResponse("Title is required.",{ status: 400 });
    }
    
    const checkProfile = await db.profile.findFirst({ 
      where: {
        id:user.id,
      }
    })
    
    if (!checkProfile) {
      return new NextResponse("Profile doesn't exist.",{ status: 400 });
    }

    const checkGroup= await db.group.findUnique({
      where: {
        id:groupId,
      }
     })

    if(!checkGroup){
    const newThread = await db.thread.create({
      data: {
        title,
        starter: checkProfile.id,
        openThread,
        content,
      },
    })
    return NextResponse.json(newThread); 
  } else {
    const newThread = await db.thread.create({
      data: {
        title,
        starter: checkProfile.id,
        openThread,
        content,
        groupId:groupId,
      },
    })
    await db.group.update({
      where: {
        id:groupId,
      },
      data: {
        threadIds: {
          push: newThread.id,
        }
      },
    })
    console.log("onSubmit", newThread);
    
    return NextResponse.json(newThread); 
  }
   
    
 

  } catch (error) {
    console.log('[THREAD_POST]', error);
    return new NextResponse("Internal Error", {status:500});
  }
}

