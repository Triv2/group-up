import { v4 as uuidv4 } from "uuid";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { groupId: string } }
) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.groupId) {
      return new NextResponse("Group ID missing", { status: 400 });
    }

    const group = await db.group.update({
      where: {
        id: params.groupId,
      },
      data: {
        inviteCode: uuidv4(),
      },
    });
    return NextResponse.json(group);
  } catch (error) {
    console.log("[GROUP_ID_INVITE_NEW]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { groupId: string } }
) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.groupId) {
      return new NextResponse("Group ID missing", { status: 400 });
    }

    const group = await db.group.findFirst({
      where: {
        id: params.groupId,
      },
    });
    return NextResponse.json(group?.inviteCode);
  } catch (error) {
    console.log("[GROUP_ID_INVITE_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
