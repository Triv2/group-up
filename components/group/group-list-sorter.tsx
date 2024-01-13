"use client";

// horizontal checkbox with booleans to filter the groups, maybe

import { Tab, Tabs } from "@nextui-org/react";
import GroupList from "./group-list";
import { Group, Profile } from "@prisma/client";

interface GroupListSorterProps {
  allGroups: Group[] | null | undefined;
  openGroups: Group[] | null | undefined;
  closedGroups: Group[] | null | undefined;
  joinedGroups: Group[] | null | undefined;
  createdGroups: Group[] | null | undefined;
  members: Profile[];
  profile: Profile;
}

const GroupListSorter: React.FC<GroupListSorterProps> = ({
  allGroups,
  openGroups,
  closedGroups,
  joinedGroups,
  createdGroups,
  members,
  profile,
}) => {
  return (
    <div>
      <Tabs className="p-0" aria-label="Sort by Type">
        <Tab className="p-1" key="all" title="All">
          <GroupList groups={allGroups} members={members} profile={profile} />
        </Tab>

        <Tab className="p-0" key="public" title="Public">
          <GroupList groups={openGroups} members={members} profile={profile} />
        </Tab>

        <Tab className="p-0" key="private" title="Private">
          <GroupList
            groups={closedGroups}
            members={members}
            profile={profile}
          />
        </Tab>
        <Tab className="p-0" key="joined" title="Joined">
          <GroupList
            groups={joinedGroups}
            members={members}
            profile={profile}
          />
        </Tab>
        <Tab className="p-0" key="created" title="Created">
          <GroupList
            groups={createdGroups}
            members={members}
            profile={profile}
          />
        </Tab>
      </Tabs>
    </div>
  );
};
export default GroupListSorter;
