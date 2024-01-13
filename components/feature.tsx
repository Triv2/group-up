import { Divider } from "@nextui-org/react";

interface FeatureProps {
  title: string;
  description: string;
  icon: JSX.Element;
}

const Feature = ({
  title,
  description,
  icon,
}: FeatureProps) => {
  return (
    <section className="shadow-md shadow-sky-900/50 flex items-center flex-col justify-center p-2 rounded-md bg-gradient-to-b from-sky-800/80 to-slate-800/80 py-5">
    <p className="text-slate-200 flex items-center justify-center gap-2 font-semibold text-xl">{icon}{title}</p>
    <Divider />
    <p className="text-sky-300 px-2 pt-2">{description}</p>
  </section>
  );
}
export default Feature;