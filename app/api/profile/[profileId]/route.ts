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


  // if(group){
  //   const updatedGroup = await db.group.findFirst({
  //     where: {
  //       inviteCode: group,
  //     }
  //   })
  //   if (!updatedGroup) {
  //     return new NextResponse("Group not found",{ status: 400 });
  //   }
  //   const updatedProfile= await db.profile.update({
  //     where: {
  //      id:profile?.id,
  //     },
  //     data: {
  //       name:name,
  //       content:content,
  //       imageUrl:image,
  //       setupComplete:true,
  //       groupId:updatedGroup?.id,
        
  //     },

  //   })
  //   console.log(updatedProfile);
  //   return NextResponse.json(updatedProfile);

  // } else {

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
    console.log(deletedProfile);
    return NextResponse.json(deletedProfile);
    
  } catch (error) {
    console.log('[PROFILE_DELETE]', error);
    return new NextResponse("Internal Error", {status:500});
  }
}