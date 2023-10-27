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
    
    // add route to bring in the group to be updated
    const { name, imageUrl, group, openGroup } = body;
  
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

    if(profile.groupIds){
    const updatedGroup= await db.group.update({
      where: {
       id:group.id
      },
      data: {
        name:name,
        openGroup,
        imageUrl:image,
       
      },
    })
    



    
    
    return NextResponse.json(updatedGroup);
  } else {
    return new NextResponse("Group not found",{ status: 400 });
  }
  } catch (error) {
    console.log('[GROUP_ID_PATCH]', error);
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
  const body = await req.json();
  const {group} = body;
    
    
    
    const profile = await db.profile.findFirst({
      where: {
        clerkId:user.id,
      },
    })
    if (!profile) {
      return new NextResponse("Profile not found",{ status: 400 });
    }

    
    const getGroup = await db.group.findUnique({
      where: {
       id:group.id,
      }
    })
   


    return NextResponse.json(getGroup);
    
  } catch (error) {
    console.log('[GROUP_ID_GET]', error);
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
    
  const body = await req.json();
  
    
    
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

    if(!creator) {
      return new NextResponse("Creator not found",{ status: 400 });
    }

    if (creator) {
      const group=  await db.group.findFirst({
        where: {
          creator:creator.id,
        },
      })
      if (group) {
        const groupIndex = creator.groupIds.findIndex(
          (g) => g[0] === group.id
        );


        if (groupIndex !== -1) {
          creator.groupIds.splice(groupIndex, 1);
          await db.creator.update({
            where: { id: creator.id },
            data: { groupIds: creator.groupIds },
          });
          await db.group.delete({ where: { id: group.id } });
    }

  }
}  
    
  } catch (error) {
    console.log('[GROUP_ID_DELETE]', error);
    return new NextResponse("Internal Error", {status:500});
  }
}