import { currentUser, redirectToSignIn } from '@clerk/nextjs';

import { db } from '@/lib/db';

export const initialProfile = async () => {
  const user = await currentUser();
  if (!user) {
    return redirectToSignIn();
  }

  const profile = await db.profile.findFirst({
    where: {
        clerkId: user.id,
    },
  });

  if(profile){
    return profile;
  }

  const newProfile = await db.user.create({
    data: {
      clerkId: user.id,
      name:`${user.firstName} ${user.lastName}`,
      
      email: user.emailAddresses[0].emailAddress,
    },
  });
  
  return newProfile;
}