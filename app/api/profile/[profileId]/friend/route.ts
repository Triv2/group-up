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

    if (!profileId || !targetId) {
      return new NextResponse("profileId and targetId are required", {
        status: 400,
      });
    }

    const profile = await db.profile.findFirst({
      where: {
        id: profileId,
      },
    });
    if (!profile) {
      return new NextResponse("Profile not found", { status: 400 });
    }
    const targetProfile = await db.profile.findFirst({
      where: {
        id: targetId,
      },
    });
    if (!targetProfile) {
      return new NextResponse("Target Profile doesn't exist.", { status: 400 });
    }

    if (
      profile.id === targetProfile.id ||
      profile.friendIds.includes(targetProfile.id) ||
      targetProfile.friendIds.includes(profile.id)
    ) {
      return new NextResponse(
        "You can't add yourself to your friend list or already in friend's list",
        { status: 400 }
      );
    }

    const updatedProfile = await db.profile.update({
      where: {
        id: profile?.id,
      },
      data: {
        friendIds: { push: [targetId] },
      },
    });

    await db.profile.update({
      where: {
        id: targetProfile?.id,
      },
      data: {
        friendIds: { push: [profileId] },
      },
    });

    return NextResponse.json(updatedProfile);
  } catch (error) {
    console.log("[PROFILE_ID_FRIEND_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
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
    console.log("[PROFILE_ID_FRIEND_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
