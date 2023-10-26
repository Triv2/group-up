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
  profile?: Profile;
}


const GroupActionList:React.FC<GroupActionListProps> = ({
  group,
  members,
  creator,
  profile,

}) => {

  const params = useParams();
  const router = useRouter();
const [isMounted, setIsMounted] = useState(false);


if(creator?.id===profile?.id){
  const userCreator = profile;
}


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
      <DropdownMenu aria-label="Static Actions">

      
       {group.openGroup ?(  
         <DropdownItem>
            <Button>
             Join
            </Button>
          </DropdownItem>
          ):(
            <DropdownItem>
            <Button>
             Apply
            </Button>
          </DropdownItem>
          )}
          <DropdownItem>
            <Button>
             Leave Group
            </Button>
          </DropdownItem>
         
     
          
      
       <DropdownItem>
        <Button>
          Edit Group
        </Button>
       </DropdownItem>
          
      </DropdownMenu>
    </Dropdown>
  );
}
export default GroupActionList;