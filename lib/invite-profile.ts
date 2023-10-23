import { auth, currentUser, redirectToSignIn } from "@clerk/nextjs"

import { db } from "@/lib/db"
import { currentGroup } from "./current-group";


export const inviteProfile = async () => {
  
  const user = await currentUser();
  
  if(!user){
    return redirectToSignIn();
  }

  const group = await db.group.findFirst({});

  
  const newProfile = await db.profile.create({
    data: {
      clerkId:user.id,
      name:`${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      groupId:group?.id,
      email: user.emailAddresses[0].emailAddress,
      setupComplete:false,
    },
  });

  
  
  return newProfile;
}