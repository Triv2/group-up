import { currentGroup } from "@/lib/current-group";
import { currentProfile } from "@/lib/current-profile";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { redirect } from "next/navigation";



interface ProfilePageProps {}

const ProfilePage = async () => {
  const profile = await currentProfile();
  const group = await currentGroup();
 
  return (
<div className="flex items-center justify-center h-screen flex-col">
  <h1 className="text-3xl font-bold">Welcome, {profile?.name}!</h1>
  <p>You are apart of the {group?.name}</p>
  <p>Time for Step Two:</p>
  <p>Customize your profile to participate.</p>
  

</div>
  );
}
export default ProfilePage;