const MainLayout = async ({
  children
}:{
  children: React.ReactNode
}) => {
  return (
    <div className="h-full">
      <main className=" h-full bg-red-700">
      {children}
      </main>
    </div>
  );
}
export default MainLayout;