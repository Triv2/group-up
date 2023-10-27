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


  if(profile.groupIds){

    const group = await db.group.findFirst({
      where: {
        id: {
          in: profile.groupIds,
        },
      },
    })
    if (!group) {
      return new NextResponse("Group not found",{ status: 400 });
    }
    
    
    group?.profileIds.forEach(profileId => {
      if (profileId === profile.id) {
        group.profileIds = group.profileIds.filter(
          (id) => id!== profile.id
        );
      }
    })







     await db.group.update({
      where: {
       id:group.id,
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
    
    await db.creator.delete({
        where:{
          id:group.creator,
        }
      })
    if(group.profileIds.length === 0){
      await db.group.delete({
        where:{
          id:group.id,
        }
      })
    } else {
      await db.group.update({
        where: {
          id:group.id,
        },
        data: {
          profileIds:group?.profileIds,
        },
      })
    }
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