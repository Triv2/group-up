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
    const { name, content, imageUrl, groupId } = body;
  
    
    
    if (!name) {
      return new NextResponse("name is required",{ status: 400 });
    }
    
    const checkProfile = await db.profile.findFirst({ 
      where: {
        clerkId: user.id,
      }
    })
    
    if (checkProfile) {
      return new NextResponse("Profile already exists",{ status: 400 });
    }

    if(groupId){
      const checkGroup = await db.group.findFirst({ 
        where: {
          id: groupId,
        }
      })
      
      if (!checkGroup) {
        return new NextResponse("Group does not exist",{ status: 400 });
      } 
      
      const profile = await db.profile.create({
        data: {
          clerkId:user.id,
          name: name,
          imageUrl: imageUrl || user.imageUrl,
          email: user.emailAddresses[0].emailAddress,
          setupProfile: true,
          groupId: groupId,
          content,
        },
        
        
      });
     
      if (!profile) {
        return new NextResponse("Profile not found",{ status: 400 });
      }
      
      if(profile && checkGroup){
        await db.group.update({
          where: {
            id:checkGroup.id,
          },
          data:{
            profileIds:{
              push:profile.id,
            },
            
          }
        })
      }
  
      
      return NextResponse.json(profile);

    } else {
    

    const profile = await db.profile.create({
      data: {
        clerkId:user.id,
        name: name,
        imageUrl: imageUrl || user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
        setupProfile: true,
        content,
      },

      
    });

    if (!profile) {
      return new NextResponse("Profile not found",{ status: 400 });
    }


    
    return NextResponse.json(profile); }
    
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
        setupComplete:true,
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
    console.log('[PROFILE_PATCH]', error);
    return new NextResponse("Internal Error", {status:500});
  }
}
