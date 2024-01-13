import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";

export const currentMembers = async () => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const profile = await db.profile.findFirst({
    where: {
      clerkId: userId,
    },
  });

  if (!profile) {
    return null;
  }

  const groups = await db.group.findMany({
    where: {
      id: {
        in: profile.groupIds,
      },
    },
  });

  const memberObjects = groups.map((group) => {
    return {
      groupId: group.id,
      member: group.profileIds.map((id) => {
        return db.profile.findUnique({
          where: {
            id,
          },
        });
      }),
    };
  });

  return memberObjects;
};
