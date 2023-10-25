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
    
    group?.profileIds.forEach(profileId => {
      if (profileId === profile.id) {
        group.profileIds = group.profileIds.filter(
          (id) => id!== profile.id
        );
      }
    })







     await db.group.update({
      where: {
       id:profile?.groupId,
      },
      data: {
        profileIds:group?.profileIds
        
      },  
    })
    const updatedProfile= await db.profile.update({
      where: {
       id:profile?.id,
      },
      data: {
        groupId:null,
       
        
      },
    })

    if (group?.creator===profile.id){
      await db.creator.findFirst({
        where:{
          id:group.creator,
        }
      })
      await db.creator.delete({
        where:{
          id:group.creator,
        }
      })
      await db.group.delete({
        where:{
          id:group.id,
        }
      })
    }

    
    
    return NextResponse.json(updatedProfile);
  } else {
    return NextResponse.json(profile);
  }

  } catch (error) {
    console.log('[LEAVE_GROUP_PATCH]', error);
    return new NextResponse("Internal Error", {status:500});
  }
}