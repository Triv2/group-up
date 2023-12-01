import { db } from "@/lib/db";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const user = await currentUser();
  if (!user) {
    return redirectToSignIn();
  }
    const body = await req.json();
    
    const { content } = body;


    

    if (!params.postId ||!content) {
      return new NextResponse("Post and content are required",{ status: 400 });
    }
    
    const profile = await db.profile.findFirst({
      where: {
        clerkId:user.id
      },
    })
    if (!profile) {
      return new NextResponse("Profile not found",{ status: 400 });
    }
   
    const updatedPost= await db.post.update({
      where:{
        id:params.postId,
      },
      data:{
        content:content
      }
    })
    
    return NextResponse.json(updatedPost);
  } catch (error) {
    console.log('[POST_ID_PATCH]', error);
    return new NextResponse("Internal Error", {status:500});
  }
}

