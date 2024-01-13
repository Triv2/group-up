"use client";
import { Button, Tooltip } from "@nextui-org/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Group } from "@prisma/client";
import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";
import { UserCircle2 } from "lucide-react";

interface ProfileGroupListProps {
  groups: Group[];
  icon?: JSX.Element;

  toolTipContent?: string;
  toolTipClassName?: string;
}

const ProfileGroupList: React.FC<ProfileGroupListProps> = ({
  groups,
  icon,
  toolTipContent,
  toolTipClassName,
}) => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <DropdownMenu>
        <Tooltip
          placement="top"
          content={toolTipContent}
          className={toolTipClassName}
        >
          <DropdownMenuTrigger className="flex items-center justify-center px-2 py-2 gap-1 hover:scale-105 rounded-md bg-emerald-700 text-white hover:bg-emerald-500 transition-all text-sm shadow-lg">
            {icon}
          </DropdownMenuTrigger>
        </Tooltip>
        <DropdownMenuContent className="shadow-xl" aria-label="Static Actions">
          {groups.map((group) => (
            <DropdownMenuItem textValue={group.name} key={group.id}>
              <Button
                onClick={() => router.push(`/dashboard/groups/${group.id}`)}
                className="flex items-center justify-center px-2 py-2 gap-1 hover:scale-105 rounded-md bg-emerald-700 text-white hover:bg-emerald-500 transition-all text-sm shadow-lg w-full"
              >
                <UserCircle2 className="h-4 w-4" /> {group.name}
              </Button>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
export default ProfileGroupList;
