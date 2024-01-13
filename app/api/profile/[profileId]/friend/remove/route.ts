import { db } from "@/lib/db";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { profileId: string } }
) {
  try {
    const user = await currentUser();
    if (!user) {
      return redirectToSignIn();
    }

    const body = await req.json();

    const { profileId, targetId } = body;

    const currentProfile = await db.profile.findUnique({
      where: {
        id: profileId,
      },
    });
    if (!currentProfile) {
      return new NextResponse("Profile not found", { status: 400 });
    }
    const targetProfile = await db.profile.findUnique({
      where: {
        id: targetId,
      },
    });
    if (!targetProfile) {
      return new NextResponse("Profile not found", { status: 400 });
    }

    let newFriendIds: string[] = [];
    currentProfile.friendIds.map((friendId) => {
      if (friendId !== targetId) {
        newFriendIds.push(friendId);
      }
    });

    let newFriendIds2: string[] = [];
    targetProfile.friendIds.map((friendId) => {
      if (friendId !== profileId) {
        newFriendIds2.push(friendId);
      }
    });

    const removedFriends = await db.profile.update({
      where: {
        id: targetProfile?.id,
      },
      data: {
        friendIds: newFriendIds2,
      },
    });
    await db.profile.update({
      where: {
        id: currentProfile?.id,
      },
      data: {
        friendIds: newFriendIds,
      },
    });

    return NextResponse.json(removedFriends);
  } catch (error) {
    console.log("[PROFILE_ID_FRIEND_REMOVE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
