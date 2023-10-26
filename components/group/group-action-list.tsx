'use client'
import { Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { Creator, Group, Profile } from '@prisma/client';
import {useState, useEffect} from'react'
import CreatorActions from './creator-actions';
import { useParams, useRouter } from 'next/navigation';

interface GroupActionListProps {
  group: Group;
  members: Profile[];
  creator?: Profile;
}

const actions = [
  {
    key:"join",
    name:"Join"
  },
  {
    key:"apply",
    name:"Apply"
  },
  {
    key:"leaving",
    name:"Leaving"
  },

]
const GroupActionList:React.FC<GroupActionListProps> = ({
  group,
  members,
  creator,

}) => {

  const params = useParams();
  const router = useRouter();
const [isMounted, setIsMounted] = useState(false);


useEffect(() => {
setIsMounted(true);
}, []);

if (!isMounted) {
return null;
}
  return (
    <Dropdown>
      <DropdownTrigger>
            <Button>
            GroupActionList
            </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dynamic Actions" items={actions}>

       
          <DropdownItem key={action.key}>
            <Button>
              {action.name}
            </Button>
          </DropdownItem>
       
         
         
        <Divider/>
          <DropdownItem>
       {creator &&(<CreatorActions />)}
          </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
export default GroupActionList;