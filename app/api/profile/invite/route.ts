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

    
      const checkGroup = await db.group.findUnique({ 
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
          setupComplete:true,
          setupGroup: true,
          groupIds: groupId,
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

    
  } catch (error) {
    console.log('[PROFILE_POST]', error);
    return new NextResponse("Internal Error", {status:500});
  }
}