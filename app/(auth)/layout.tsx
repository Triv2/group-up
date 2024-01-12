
const AuthLayout = ( {
  children
}: {children: React.ReactNode}) => {
  return (
  <div className="min-h-screen h-auto w-full flex bg-[url(/gbg.png)] bg-no-repeat bg-cover bg-fixed bg-center items-center justify-center">
    {children}
  </div>
  );
}
export default AuthLayout;