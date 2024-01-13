import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";

export const currentCreator = async () => {
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

  return creator;
};
