import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

interface SantaUserProps {
  name: string ;
  imageUrl: string ;
  
}

const SantaUser = ({
  name,
  imageUrl,
}:SantaUserProps) => {
  return (
<div className="flex items-center justify-center rounded-md">
    {/* <Image className="rounded-full" height={45} width={45} src={imageUrl } alt={"image"}/> */}
    <p className="text-sm text-muted-foreground">{name}</p>
</div>
  );
}
export default SantaUser;