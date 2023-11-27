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
    
    const { title,  openThread, content, groupId, imageUrl} = body;
  
    let image= imageUrl;
    if(imageUrl === null || imageUrl === ""){
      image = user.imageUrl
 
    }
    
    if (!title) {
      return new NextResponse("Title is required.",{ status: 400 });
    }
    
    const checkProfile = await db.profile.findFirst({ 
      where: {
        clerkId:user.id,
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
        imageUrl: image,
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
        groupName: checkGroup.name,
        profileIds: [checkProfile.id],
        imageUrl: image,
      },
    })
    await db.group.update({
      where: {
        id:groupId
      },
      data: {
        threadIds: {
          push: newThread.id,
        }
      },
    })
    const newPost= await db.post.create({
      data: {
        title,
        content,
        threadId: newThread.id,
        profileId: checkProfile.id,
      },
    })
    await db.thread.update({
      where: {
        id:newThread.id,
      },
      data: {
        postIds:[newPost.id]
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

