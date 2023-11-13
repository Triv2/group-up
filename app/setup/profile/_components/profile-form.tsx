'use client'
import { Profile } from '@prisma/client';
import {useState, useEffect} from'react'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Button, useDisclosure, Checkbox, Input, Link, Textarea, Switch, Divider} from "@nextui-org/react";
import * as z from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/alert-modal";
import { Lock, Users, X } from 'lucide-react';
import { FileUpload } from '@/components/file-upload';
// import { Textarea } from '@/components/ui/textarea';



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
const [upload,setUpload] = useState(false);




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
    
  
    
    await axios.post(`/api/profile/`, data)
    router.refresh();
    router.push("/setup/group");
    toast.success("Profile created!");
  } catch (error) {
    toast.error("Something went wrong.");
  } finally {
    setLoading(false);
  }
};

const handleClick= () => {
  if(upload) {
    setUpload(false);
  } else {
    setUpload(true);
  }
}

  return (
    <>
    <div >
           <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" h-auto px-5 w-full ">
            <div className="flex items-center flex-col justify-center p-5 gap-5">
            
            <div className="flex items-center flex-col md:flex-row gap-2 ">
            <div className='flex items-center  flex-col  gap-2 p-3 w-full  rounded-md shadow-md bg-zinc-100 dark:bg-zinc-800 '>
            <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>
                Name
              </FormLabel>
              <FormControl>
               <Input 
               size="sm"
               variant="bordered"
               type="name"
               color="success"
               placeholder="Please enter a name"
                className="text-black rounded-md dark:text-white "
               disabled={loading}  {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
            )}
        />
        <Divider />
           <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>
                Interests
              </FormLabel>
              <FormControl>
             
                 <Textarea
                 variant="bordered"
                  color="success"
                  size="sm"
                  placeholder="Enter your description"
                  className="max-w-xs text-black  dark:text-white"
                  {...field}
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
            )}
        />
        </div>
        <div className="flex items-center flex-col justify-center ">
          <Switch defaultSelected  size="sm" onClick={()=>handleClick()}><p className="text-xs md:text-md" >Change Avatar?</p></Switch>
          {upload && (
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Image
              </FormLabel>
              <FormControl >
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
        )}
        </div>
        </div>
        <Button className="flex items-center justify-center px-2 py-2 gap-1 hover:scale-105 rounded-md bg-emerald-700 text-white hover:bg-emerald-500 transition-all text-sm shadow-lg"
    type="submit">Submit</Button>
        
            </div>
            </form>
           </Form>
         </div>  
    </>
  );
}
export default ProfileForm;