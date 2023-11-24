'use client'

import CreateGroupForm from '@/components/group/create-group-form';
import { Modal } from '@/components/ui/modal';
import { Button } from '@nextui-org/react';
import { useEffect } from 'react';
import JoinGroupForm from '../group/join-group-form';
import { Group, Profile } from '@prisma/client';
import { ScrollArea } from '../ui/scroll-area';

interface AllGroupsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  groups: Group[] | null;
  members: Profile[] | null;
  profile: Profile | null;
  joinedGroups: Group[] | null | undefined;
  createdGroups: Group[] | null | undefined;
}

export const AllGroupsModal: React.FC<AllGroupsModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  groups,
  members,
  profile,
  joinedGroups,
  createdGroups,
}) => {
  

  return(
    <Modal
    title="Looking to join a group?"
    description="Search through the list of groups to find groups you want to join."
    isOpen={isOpen}
    onClose={onClose}
    
    >
      
      <JoinGroupForm
      joinedGroups={joinedGroups}
      createdGroups={createdGroups} 
      onClose={onClose}
      groups={groups}
      members={members}
      profile={profile}/>

    

      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading}  onClick ={onClose}>
          Cancel
        </Button>
        
      </div>

    </Modal>
  )
}

export default AllGroupsModal;