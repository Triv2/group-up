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
    
    const { name, content, imageUrl } = body;
  
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


    const updatedProfile= await db.profile.update({
      where: {
       id:profile?.id,
      },
      data: {
        name:name,
        content:content,
        imageUrl:image,
        setupComplete:true,
      },
    })
    await db.creator.update({
      where: {
        id:profile?.id,
      },
      data: {
        name:name,
        imageUrl:image,
      },
    })


    
    
    return NextResponse.json(updatedProfile);
  } catch (error) {
    console.log('[PROFILE_ID_PATCH]', error);
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


   


    return NextResponse.json(profile);
  } catch (error) {
    console.log('[PROFILE_ID_GET]', error);
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

    
    const deletedProfile= await db.profile.delete({
      where: {
        id:profile?.id,
      },
    })
    
    return NextResponse.json(deletedProfile);
    
  } catch (error) {
    console.log('[PROFILE_ID_DELETE]', error);
    return new NextResponse("Internal Error", {status:500});
  }
}