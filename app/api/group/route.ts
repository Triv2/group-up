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
    
    const { name, imageUrl, openGroup } = body;
  
    let image= imageUrl;
    
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

    if(imageUrl === null || imageUrl === ""){
      image = user.imageUrl
     }


    const profile = await db.profile.findFirst({
      where: {
        clerkId:user.id,
      },
    })
    if(!profile){
      return new NextResponse("Profile not found",{ status: 400 });
    }

    const creator = await db.creator.create({
      data: {
        id:profile?.id,
        name: name,
        imageUrl: profile.imageUrl,
      }
    })


    const group = await db.group.create({
      data: {
        name,
        inviteCode: uuidv4(),
        creator: creator.id,
        imageUrl: image,
        openGroup,
        
      },
    })

    await db.creator.update({ 
      where: {
        id:creator.id,
      },
      data: {
        groupIds:{
          push:group.id,
        },
      },
    })

    const updatedGroup = await db.group.update({
      where: {
        id:group?.id,
      },
      data: {
        profileIds:{
          push:profile?.id,
        },
      },
    })
    
    await db.profile.update({
      where: {
        id:profile?.id,
      },
      data: {
        groupIds:{
          push:group?.id},
        setupGroup:true,
        setupComplete:true,
      },
    })
  



    
    
    return NextResponse.json(updatedGroup);
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
    
    const { name, inviteCode } = body;
   
    
    
    
    

    const profile = await db.profile.findFirst({
      where: {
        clerkId:user.id,
      },

      
    });

    if (!profile) {
      return new NextResponse("Profile not found",{ status: 400 });
    }


    

   



    const updatedGroup = await db.group.update({
      where:{
        inviteCode,
      },
      data:{
        profileIds:{
          push:profile.id,
        },
        
      }
      
    })

    await db.profile.update({
      where: {
        id:profile.id,
      },
      data: {
        groupIds:{
          push:updatedGroup.id
        },
        setupGroup:true,
        setupComplete:true,
      },
    })
    
    
    return NextResponse.json(updatedGroup);
  } catch (error) {
    console.log('[GROUPS_PATCH]', error);
    return new NextResponse("Internal Error", {status:500});
  }
}