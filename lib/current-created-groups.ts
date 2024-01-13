import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";

export const currentCreatedGroups = async () => {
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

  const creator = await db.creator.findUnique({
    where: {
      id: profile?.id,
    },
  });
  if (!creator) {
    return null;
  }

  if (creator.groupIds) {
    const groups = await db.group.findMany({
      where: {
        id: {
          in: creator.groupIds,
        },
      },
    });

    return groups;
  }
};
