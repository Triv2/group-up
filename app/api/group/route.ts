import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
   
) {
  try {
    // Auth
    const body = await req.json();
    console.log(body);
    const { name } = body;
  
    
    
    if (!name) {
      return new NextResponse("name is required",{ status: 400 });
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