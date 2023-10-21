


const SetupLayout = async ({
  children
}:{
  children: React.ReactNode
}) => {
  return (
    <div className="h-full bg-red-700">
      
      <main className=" h-full">
      {children}
      </main>
    </div>
  );
}
export default SetupLayout;