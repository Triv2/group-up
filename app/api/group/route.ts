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
    console.log(body);
    const { name } = body;
  
    
    
    if (!name) {
      return new NextResponse("name is required",{ status: 400 });
    }
    
    
    const checkGroup = await db.group.findFirst({
      where: {
        name,
      },
    })

    if (checkGroup) {
      return new NextResponse("Group already exists",{ status: 400 });
    }


    const group = await db.group.create({
      data: {
        name,
      },
    })
    
    console.log(group);
    return NextResponse.json(group);
  } catch (error) {
    console.log('[GROUPS_POST]', error);
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
    const { name } = body;
  
    
    
    if (!name) {
      return new NextResponse("name is required",{ status: 400 });
    }
    
    const profile = await db.profile.findFirst({
      where: {
        clerkId:user.id,
      },
    });
    if (!profile) {
      return new NextResponse("Profile not found",{ status: 400 });
    }


    const group = await db.group.findFirst({
      where: {
        name,
      },
    })
    if (!group) {
      return new NextResponse("Group not found",{ status: 400 });
    }

    const updatedProfile= await db.profile.update({
      where: {
       id:profile?.id,
      },
      data: {
        groupId:group?.id,
      },
    })



    const updatedGroup = await db.group.update({
      where:{
        id:group?.id,
      },
      data:{
        profiles:{
          create:{
            id:updatedProfile.id,
          }
        }
      }
      
    })
    
    console.log(updatedGroup);
    return NextResponse.json(updatedGroup);
  } catch (error) {
    console.log('[GROUPS_PATCH]', error);
    return new NextResponse("Internal Error", {status:500});
  }
}