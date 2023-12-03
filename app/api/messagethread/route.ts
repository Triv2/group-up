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
    
    const { title,  content,   targetId } = body;
  
    console.log(title, content, targetId);
   
    let newTitle= title;

    
   
    
    const checkProfile = await db.profile.findFirst({ 
      where: {
        clerkId:user.id,
      }
    })
    
    if (!checkProfile) {
      return new NextResponse("Profile doesn't exist.",{ status: 400 });
    }
    const targetProfile= await db.profile.findFirst({ 
      where: {
        id:targetId,
      }
    })
    if(!targetProfile) {
      return new NextResponse("Target Profile doesn't exist.",{ status: 400 });
    }
    if(title===""){
      newTitle=  checkProfile.name + " to " + targetProfile.name;
    }
   
    
    const newMessageThread = await db.messageThread.create({
      data: {
        title: newTitle,
        starterId: checkProfile.id,
        
        content,
        profileIds: [checkProfile.id],
        
      },
    })
   
    const newMessage= await db.message.create({
      data: {
        content,
        messageThreadId: newMessageThread.id,
        starterId: checkProfile.id,
        targetId: targetProfile.id,
        starterName: checkProfile.name,
        targetName: targetProfile.name,
      },
    })
    await db.messageThread.update({
      where: {
        id:newMessageThread.id,
      },
      data: {
        messageIds:[newMessage.id],
        profileIds:{ push: [targetId]}
      },
    })
    await db.profile.update({
      where: {
        id:checkProfile.id,
      },
      data: {
        messageThreadIds:{
          push:[newMessageThread.id]}
      },
    })
    await db.profile.update({
      where: {
        id:targetProfile.id,
      },
      data: {
        messageThreadIds:{
          push:[newMessageThread.id]}
      },
    })

   
    console.log("onSubmit", newMessageThread);
    
    return NextResponse.json(newMessageThread); 
  
   
    
 

  } catch (error) {
    console.log('[MESSAGE_THREAD_POST]', error);
    return new NextResponse("Internal Error", {status:500});
  }
}

