import { db } from "@/lib/db";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
   
) {
  try {
    const user = await currentUser();
  if (!user) {
    return redirectToSignIn();
  }
    const body = await req.json();
    console.log(body);
    const { name, imageUrl } = body;
  
    let image= imageUrl;
    
    if (!name) {
      return new NextResponse("name is required",{ status: 400 });
    }
    
    const profile = await db.profile.findFirst({
      where: {
        clerkId:user.id,
      },
    })
    if (!profile) {
      return new NextResponse("Profile not found",{ status: 400 });
    }

    if(imageUrl === null || imageUrl === ""){
      image = user.imageUrl
     }

    if(profile.groupId){
    const updatedGroup= await db.group.update({
      where: {
       id:profile.groupId,
      },
      data: {
        name:name,
       
        imageUrl:image,
       
      },
    })



    
    console.log(updatedGroup);
    return NextResponse.json(updatedGroup);
  } else {
    return new NextResponse("Group not found",{ status: 400 });
  }
  } catch (error) {
    console.log('[GROUP_ID_PATCH]', error);
    return new NextResponse("Internal Error", {status:500});
  }
}

export async function GET(
  req: Request,
   
) {
  try {
    const user = await currentUser();
  if (!user) {
    return redirectToSignIn();
  }
    
    
    
    const profile = await db.profile.findFirst({
      where: {
        clerkId:user.id,
      },
    })
    if (!profile) {
      return new NextResponse("Profile not found",{ status: 400 });
    }

    if(profile.groupId){
    const group = await db.group.findFirst({
      where: {
       id:profile.groupId,
      }
    })
   


    return NextResponse.json(group);
    }
  } catch (error) {
    console.log('[GROUP_ID_GET]', error);
    return new NextResponse("Internal Error", {status:500});
  }
}

export async function DELETE(
  req: Request,
   
) {
  try {
    const user = await currentUser();
  if (!user) {
    return redirectToSignIn();
  }
    
    
    
    const profile = await db.profile.findFirst({
      where: {
        clerkId:user.id,
      },
    })
    if (!profile) {
      return new NextResponse("Profile not found",{ status: 400 });
    }

    const creator = await db.creator.findUnique({
      where: {
        id:profile.id,
      },
    });

    if (creator) {
       await db.group.delete({
        where: {
          creator:creator.id,
        },
      })
      await db.creator.delete({ 
        where: {
          id:creator.id,
        },
      })
    }

    
    
    
  } catch (error) {
    console.log('[GROUP_ID_DELETE]', error);
    return new NextResponse("Internal Error", {status:500});
  }
}