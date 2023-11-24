'use client'

import CreateGroupForm from '@/components/group/create-group-form';
import { Modal } from '@/components/ui/modal';
import { Button } from '@nextui-org/react';
import { useEffect } from 'react';
import JoinGroupForm from '../group/join-group-form';
import { Group, Profile } from '@prisma/client';

interface AllGroupsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  groups: Group[] | null;
  members: Profile[] | null;
  profile: Profile | null;
}

export const AllGroupsModal: React.FC<AllGroupsModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  

  return(
    <Modal
    title="Looking to join a group?"
    description="Search through the list of groups to find groups you want to join."
    isOpen={isOpen}
    onClose={onClose}
    
    >
      <JoinGroupForm onClose={onClose}/>



      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading}  onClick ={onClose}>
          Cancel
        </Button>
        
      </div>

    </Modal>
  )
}

export default AllGroupsModal;