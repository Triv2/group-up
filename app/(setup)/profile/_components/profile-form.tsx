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
import { Lock, Users, X } from 'lucide-react';
import { FileUpload } from '@/components/file-upload';
import { Textarea } from '@/components/ui/textarea';



const formSchema= z.object({
  
  name: z.string().min(1),
  imageUrl: z.string().default(""),
  content:  z.string().min(1),
});

export type ProfileFormValues = z.infer<typeof formSchema>

const ProfileForm = ({
  
}) => {
  const router=useRouter();
  const params = useParams();
const [isMounted, setIsMounted] = useState(false);
const [loading, setLoading] = useState(false);




const form = useForm<ProfileFormValues>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    name: "",
    content: "",
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
    await axios.patch(`/api/profile/${params.profileId}`, data)
    router.refresh();
    router.push("/");
    toast.success("Profile created!");
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
            <div className="flex items-center flex-col justify-center p-5 gap-5">
            
            <div className="flex items-center gap-2">
            <div className='flex items-center flex-col justify-center p-5 gap-5'>
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
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Interests
                <p></p>
              </FormLabel>
              <FormControl>
               <Textarea
               placeholder="Please enter what you want the person that draws you, to know about you."
                className="text-black rounded-md"
               disabled={loading}  {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
            )}
        />
        </div>
        <div className="flex items-center flex-col justify-center">
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Image
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
        </div>
        </div>
        <Button type="submit">Submit</Button>
        
            </div>
            </form>
           </Form>
         </div>  
    </>
  );
}
export default ProfileForm;