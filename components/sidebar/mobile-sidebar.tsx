"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";


import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import  Sidebar  from "@/components/sidebar/sidebar";

import { Group, Profile } from "@prisma/client";
import { Button } from "../ui/button";


interface MobileSidebarProps {
  userCreatedGroups?: Group[] | null;
  nonUserCreatedGroups: Group[] | null;
  members?:Profile[] | null;
  profile?: Profile | null;
  name: string;
}

export const MobileSidebar = ({
  userCreatedGroups,
  nonUserCreatedGroups,
  members,
  profile,
  name
}:MobileSidebarProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Sheet >
      <SheetTrigger >
        <Button  size="sm" className="fixed z-50 bg-zinc-200 shadow-xl text-emerald-700 hover:text-emerald-500 hover:bg-zinc-100/80">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-zinc-200 pt-[20px] w-[160px]">
      <Sidebar
      userCreatedGroups={userCreatedGroups}
      nonUserCreatedGroups={nonUserCreatedGroups}
      members={members}
      profile={profile}
      name={name}
     />
      </SheetContent>
    </Sheet>
  );
};