import Navbar from "@/components/navbar/navbar";

import { currentUser, redirectToSignIn } from "@clerk/nextjs";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();

  if (!user) {
    redirectToSignIn();
    return null;
  }

  return (
    <div className="h-full">
      <Navbar />

      <main className=" h-full ">{children}</main>
    </div>
  );
};
export default MainLayout;
