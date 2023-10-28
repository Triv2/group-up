
import {useState, useEffect} from'react'
import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button,  useDisclosure, Select, SelectItem, } from "@nextui-org/react";
import { Lock, Users } from 'lucide-react';

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import * as z from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Group, Profile } from '@prisma/client';
import GroupList from '@/components/group/group-list';
import GroupListSorter from '@/components/group/group-list-sorter';
import GroupListServer from '@/components/group/group-list-server';



interface GroupFormProps {
  groups: Group[] | null;
  members: Profile[] | null;
  profile: Profile | null;
}



const JoinGroupForm:React.FC<GroupFormProps>= ({
  groups,
  members,
  profile,
}) => {

 

  
  return (
    <>
      <div>

      {groups && members && profile && (
        <GroupListServer/>)}
         

         </div>   
    </>
  );
 }
export default JoinGroupForm;