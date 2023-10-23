import { db } from "@/lib/db";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import {v4 as uuidv4} from "uuid";

export async function POST(
  req: Request,
   
) {
  try {
    const user = await currentUser();
  if (!user) {
    return redirectToSignIn();
  }
    const body = await req.json();
    console.log(body);
    const { name, interests, imageUrl } = body;
  
    
    
    if (!name) {
      return new NextResponse("name is required",{ status: 400 });
    }
    

  
    
    const profile = await db.profile.create({
      data: {
        clerkId:user.id,
        name:`${user.firstName} ${user.lastName}`,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
      },

      
    });

    if (!profile) {
      return new NextResponse("Profile not found",{ status: 400 });
    }


    
    return NextResponse.json(profile);
  } catch (error) {
    console.log('[PROFILE_POST]', error);
    return new NextResponse("Internal Error", {status:500});
  }
}


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
    const { groupId , newProfileId} = body;
  
    
    
    if (!groupId) {
      return new NextResponse("Group ID is required",{ status: 400 });
    }
    
    
    const checkGroup = await db.group.findFirst({
      where: {
        id:groupId,
        
      },
    })

    if (checkGroup) {
      return new NextResponse("Group already exists",{ status: 400 });
    }

    
    
    const profile = await db.profile.update({
      where: {
        id:newProfileId,
      },
      data: {
        groupId:groupId,
        groupAdded:true,
      },

      
    });

    if (!profile) {
      return new NextResponse("Profile not found",{ status: 400 });
    }


    

   



    const updatedGroup = await db.group.update({
      where:{
        id:groupId
      },
      data:{
        
        profileIds:{
          push:profile.id,
        },
        
      }
      
    })
    
    console.log(updatedGroup);
    return NextResponse.json(profile);
  } catch (error) {
    console.log('[INVITE_PROFILE_POST]', error);
    return new NextResponse("Internal Error", {status:500});
  }
}
