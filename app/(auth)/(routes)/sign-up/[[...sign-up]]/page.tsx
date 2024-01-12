import { SignUp } from "@clerk/nextjs";
 
export default function Page() {
  return <SignUp appearance={{
    elements: {
      formButtonPrimary:
        "bg-emerald-800 hover:bg-emerald-500 text-lg normal-case",
        card: "bg-zinc-800 border border-orange-400 shadow-lg",
        socialButtons: "bg-orange-500 hover:bg-orange-400 rounded-md text-white",
        headerTitle:"font-bold text-3xl text-orange-400",
        headerSubtitle:"text-emerald-400",
        dividerLine:"bg-orange-400",
        dividerText:"text-emerald-400",
        formFieldLabel:"text-emerald-400",
        footerActionText: "text-emerald-400",
        formFieldInput:"bg-orange-400/50 text-emerald-300",
        footerActionLink:"text-orange-500",
        formFieldInfoText: "text-emerald-400",
        socialButtonsBlockButtonText: "text-white text-lg font-bold",
    },
  }} />;
}