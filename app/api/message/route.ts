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
    
    const {   messageThreadId, content, } = body;
  
   
    
    const checkProfile = await db.profile.findFirst({ 
      where: {
        clerkId:user.id,
      }
    })
    
    if (!checkProfile) {
      return new NextResponse("Profile doesn't exist.",{ status: 400 });
    }

    const checkThread = await db.messageThread.findUnique({
      where: {
        id:messageThreadId,
      },
    })

    if (!checkThread) {
      return new NextResponse("Thread doesn't exist.",{ status: 400 });
    }
    
    const newMessage= await db.message.create({
      data: {
        content,
        messageThreadId: checkThread.id,

        profileId: checkProfile.id,
        profileName: checkProfile.name,
        profileImageUrl: checkProfile.imageUrl,
    
      },
    })
    await db.messageThread.update({
      where: {
        id:checkThread.id,
      },
      data: {
        messageIds:{
          push:[newMessage.id]}
      },
    })

   
    console.log("onSubmit", newMessage);
    
    return NextResponse.json(newMessage); 
  
 

  } catch (error) {
    console.log('[MESSAGE_POST]', error);
    return new NextResponse("Internal Error", {status:500});
  }
}

