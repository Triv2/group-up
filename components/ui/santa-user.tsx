import { Avatar, Divider } from "@nextui-org/react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

interface SantaUserProps {
  name: string;
  imageUrl: string;
  
}

const SantaUser = ({
  name,
  imageUrl,
}:SantaUserProps) => {
  return (
<div className="flex items-center justify-center gap-5 rounded-md p-2">
   Current Profile:
   <div className=" shadow-lg bg-white border-black flex items-center justify-center gap-5 rounded-md p-2">
   <Avatar size="md" color="success" isBordered src={imageUrl}/>
   <div>
    <p className="text-lg text-muted-foreground">{name}</p>
    <Divider />
    </div>
    </div>
</div>
  );
}
export default SantaUser;