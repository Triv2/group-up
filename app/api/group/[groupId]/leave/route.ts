import { db } from "@/lib/db";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const user = await currentUser();
    if (!user) {
      return redirectToSignIn();
    }

    const body = await req.json();
    const { groupId } = body;

    const profile = await db.profile.findFirst({
      where: {
        clerkId: user.id,
      },
    });
    if (!profile) {
      return new NextResponse("Profile not found", { status: 400 });
    }

    if (profile.groupIds) {
      const group = await db.group.findFirst({
        where: {
          id: groupId,
        },
      });
      if (!group) {
        return new NextResponse("Group not found", { status: 400 });
      }

      group?.profileIds.forEach((profileId) => {
        if (profileId === profile.id) {
          group.profileIds = group.profileIds.filter((id) => id !== profile.id);
        }
      });

      profile.groupIds = profile.groupIds.filter((id) => id !== groupId);

      await db.group.update({
        where: {
          id: group.id,
        },
        data: {
          profileIds: group?.profileIds,
        },
      });

      const updatedProfile = await db.profile.update({
        where: {
          id: profile?.id,
        },
        data: {
          groupIds: profile.groupIds,
        },
      });
      if (group.profileIds.length === 0) {
        await db.group.delete({
          where: {
            id: group.id,
          },
        });
      }

      if (group?.creator === profile.id) {
        const creator = await db.creator.findFirst({
          where: {
            id: group.creator,
          },
        });
        if (creator) {
          creator.groupIds = creator.groupIds.filter((id) => id !== groupId);
          await db.creator.update({
            where: {
              id: creator.id,
            },
            data: {
              groupIds: creator.groupIds,
            },
          });
        }
        if (group.profileIds.length === 0) {
          await db.group.delete({
            where: {
              id: group.id,
            },
          });
        } else {
          await db.group.update({
            where: {
              id: group.id,
            },
            data: {
              creator: group.profileIds[0],
            },
          });
          const checkCreator = await db.creator.findFirst({
            where: {
              id: group.profileIds[0],
            },
          });
          if (checkCreator) {
            await db.creator.update({
              where: {
                id: checkCreator.id,
              },
              data: {
                groupIds: {
                  push: groupId,
                },
              },
            });
          } else {
            await db.creator.create({
              data: {
                id: group.profileIds[0],
                groupIds: groupId,
              },
            });
          }
        }
      }
      
      if (group.profileIds.length === 0) {
        await db.group.delete({
          where: {
            id: group.id,
          },
        });
      }
      return NextResponse.json(updatedProfile);
    } else {
      return NextResponse.json(profile);
    }
  } catch (error) {
    console.log("[LEAVE_GROUP_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
