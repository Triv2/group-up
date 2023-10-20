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
    <div>
           <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-10 px-20 w-full ">
            <div>
            <h2>Step Two: Customize your Profile</h2>
            <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Name
              </FormLabel>
              <FormControl>
               <Input 
               
               type="name"
               
               placeholder="Please enter a name"
                className="text-black rounded-md"
               disabled={loading}  {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
            )}
        />
        <FormField
          control={form.control}
          name="group"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Password
              </FormLabel>
              <FormControl>
               <Input 
               
               type="password"
               
               placeholder="Please enter a password"
                className="text-black rounded-md"
               disabled={loading}  {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
            )}
        />
        <Button type="submit">Submit</Button>
        
            </div>
            </form>
           </Form>
         </div>  
    </>
  );
}
export default ProfileForm;