import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";

export const currentGroups = async () => {
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

  if (profile.groupIds) {
    const groups = await db.group.findMany({
      where: {
        id: {
          in: profile.groupIds,
        },
      },
    });

    return groups;
  }
};
