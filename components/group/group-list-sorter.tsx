'use client'

// horizontal checkbox with booleans to filter the groups

import { Checkbox, CheckboxGroup, Tab, Tabs } from '@nextui-org/react';
import {useState, useEffect} from'react'
import GroupList from './group-list';
import { Group, Profile } from '@prisma/client';

interface GroupListSorterProps {
  allGroups: Group[] | null | undefined;
  openGroups: Group[] | null | undefined;
  closedGroups: Group[] | null | undefined;
  joinedGroups: Group[] | null | undefined;
  createdGroups: Group[] | null | undefined;
  members: Profile[];
  profile: Profile;
}

const GroupListSorter:React.FC<GroupListSorterProps> = ({
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
       
        <Tabs aria-label="Sort by Type">
          <Tab key="all" title="All">
            <GroupList
              groups={allGroups}
              members={members}
              profile={profile}
            />
          </Tab>
            
          <Tab key="public" title="Public">
            <GroupList
              groups={openGroups}
              members={members}
              profile={profile}
            />
          </Tab>

          <Tab key="private" title="Private">
            <GroupList
              groups={closedGroups}
              members={members}
              profile={profile}
            />
          </Tab>
          <Tab key="joined" title="Joined">
            <GroupList
              groups={joinedGroups}
              members={members}
              profile={profile}
            />
          </Tab>
          <Tab key="created" title="Created">
            <GroupList
              groups={createdGroups}
              members={members}
              profile={profile}
            />
          </Tab>
        </Tabs>
      

    </div>
  );
}
export default GroupListSorter;