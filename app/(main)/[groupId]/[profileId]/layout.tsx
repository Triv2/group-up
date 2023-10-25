import { Toaster } from "react-hot-toast";

const MainLayout = async ({
  children
}:{
  children: React.ReactNode
}) => {
  return (
    <div className="h-full">
      <main className=" h-full ">
      
      {children}
      </main>
    </div>
  );
}
export default MainLayout;