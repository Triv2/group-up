'use client'
import { Profile } from '@prisma/client';
import {useState, useEffect} from'react'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
import * as z from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/alert-modal";
import { Lock, Users } from 'lucide-react';
import { FileUpload } from '@/components/file-upload';

interface ProfileFormProps {
  initialData: Profile;
}

const formSchema= z.object({
  
  name: z.string().min(1),
  imageUrl: z.string().default(""),
  interests: z.array(z.string()),
  group: z.string().min(1),
  items: z.array(z.string()),
});

export type ProfileFormValues = z.infer<typeof formSchema>

const ProfileForm:React.FC<ProfileFormProps> = ({
  initialData,
}) => {
  const router=useRouter();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
const [open, setOpen] = useState(false);
const [isMounted, setIsMounted] = useState(false);
const [loading, setLoading] = useState(false);

const [interests, setInterests]=useState([""]);
const [interest, setinterest]=useState("");

const [items, setItems]=useState([""]);
const [item, setItem]=useState("");



const form = useForm<ProfileFormValues>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    name: "",
    interests: [""],
    items: [""],
    group: "",
    imageUrl: ""
  },
});

useEffect(() => {
setIsMounted(true);
}, []);

if (!isMounted) {
return null;
}

const onSubmit = async (data:ProfileFormValues) => {
  try {
    setLoading(true);
    
  
    console.log("OnSubmit", data)
    await axios.post(`/api/profile/`, data)
    router.refresh();
    router.push(`/entry`);
    toast.success("Entry created!");
  } catch (error) {
    toast.error("Something went wrong.");
  } finally {
    setLoading(false);
  }
};

  return (
    <>
    
      <Button onPress={onOpen} color="primary">Create Profile</Button>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
        
      >
        <ModalContent className="bg-red-600">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Create Group</ModalHeader>
              <ModalBody>
                <Form  {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-10 px-20 w-full ">
                  <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                          <Input
                            autoFocus
                            endContent={
                              <Users className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                            }
                            label="Group"
                            placeholder="Enter the name of your group"
                            variant="bordered"
                            className="bg-emerald-600 rounded-lg"
                          />
                        )}
                      />
                  <FormField
                      control={form.control}
                      name="group"
                      render={({ field }) => (
                        <Input
                          endContent={
                            <Lock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                          }
                          label="Password"
                          placeholder="Enter your password"
                          type="password"
                          variant="bordered"
                          className="bg-emerald-600 rounded-lg"
                        />
                      )}
                      />
                      <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Attach Images
                </FormLabel>
                <FormControl>
                <FileUpload
                          endpoint="serverImage"
                          value={field.value}
                          onChange={field.onChange}
                        />
                </FormControl>
                <FormMessage/>
              </FormItem>
              )}
          />
               
                
                </form>
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button type="submit" color="primary" onPress={onClose}>
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
export default ProfileForm;