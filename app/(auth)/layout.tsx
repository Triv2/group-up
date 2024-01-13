import Particles from "@/components/effects/particles";

const AuthLayout = ( {
  children
}: {children: React.ReactNode}) => {
  return (
  <div className="min-h-screen h-auto w-full flex bg-[url(/mbg1.png)] bg-no-repeat bg-cover bg-fixed bg-center items-center justify-center">
    <Particles className="fixed inset-0  " />
    {children}
  </div>
  );
}
export default AuthLayout;