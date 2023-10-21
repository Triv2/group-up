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



    
    console.log(updatedProfile);
    return NextResponse.json(updatedProfile);
  } catch (error) {
    console.log('[PROFILE_PATCH]', error);
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
    console.log('[PROFILE_GET]', error);
    return new NextResponse("Internal Error", {status:500});
  }
}