"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";


import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import  Sidebar  from "@/components/sidebar/sidebar";

import { Group, MessageThread, Profile } from "@prisma/client";
import { Button } from "../ui/button";


interface MobileSidebarProps {
  userCreatedGroups?: Group[] | null;
  nonUserCreatedGroups: Group[] | null;
  members?:Profile[] | null;
  profile?: Profile | null;
  name: string;
  allGroups: Group[] | null;
  allFriends: Profile[] | null;
  allMessageThreads: MessageThread[] | null;
}

export const MobileSidebar = ({
  userCreatedGroups,
  nonUserCreatedGroups,
  members,
  profile,
  name,
  allGroups,
  allFriends,
  allMessageThreads,
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
        <Button  size="sm" className="fixed z-50 bg-zinc-200 dark:bg-zinc-700 shadow-xl dark:text-emerald-500 text-emerald-700 hover:text-emerald-500 hover:bg-zinc-100/80">
          <Menu className="h-4 w-4"/>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-zinc-200 pt-[2.5rem] dark:bg-zinc-700 w-[161px]">
      <Sidebar
      allMessageThreads={allMessageThreads}
      allFriends={allFriends}
      allGroups={allGroups}
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