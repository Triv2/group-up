import { Group, Profile } from "@prisma/client";

import { Divider } from "@nextui-org/react";
import GroupSummary from "../group/group-summary";
import SidebarGroupSummary from "./sidebar-group-summary";

interface SidebarGroupListProps {
  groups: Group[] | null | undefined;
  members: Profile[];

  profile: Profile;
}

const SidebarGroupList: React.FC<SidebarGroupListProps> = ({
  groups,
  members,

  profile,
}) => {
  return (
    <div className="h-auto w-full flex   pl-1 flex-col items-center justify-center  ">
      {groups &&
        groups.map((group) => (
          <div
            className="h-auto w-full flex   flex-col items-center justify-center  "
            key={group.id}
          >
            <SidebarGroupSummary
              key={group.id}
              group={group}
              members={members}
              profile={profile}
            />
            <Divider />
          </div>
        ))}
    </div>
  );
};
export default SidebarGroupList;
