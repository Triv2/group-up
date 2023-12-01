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

interface CreatePostProps {
  threadId: string;
  onClose: () => void;
}
const formSchema= z.object({
  
  
  
  content:  z.string().min(1),
  threadId:  z.string(),
});

export type CreatePostValues = z.infer<typeof formSchema>

const CreatePost = ({
  onClose,
  threadId,
}:CreatePostProps) => {
  const router=useRouter();
  

  
const [isMounted, setIsMounted] = useState(false);
const [loading, setLoading] = useState(false);
const [upload,setUpload] = useState(false);




const form = useForm<CreatePostValues>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    threadId: threadId,
    content: "",
    
  },
});

useEffect(() => {
setIsMounted(true);
}, []);

if (!isMounted) {
return null;
}

const onSubmit = async (data:CreatePostValues) => {
  try {
    setLoading(true);
    
    await axios.patch(`/api/thread/${threadId}`, data)
    
    toast.success("Post created!");
  } catch (error) {
    toast.error("Something went wrong.");
  } finally {
    setLoading(false);
    router.refresh();
    onClose();
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 h-auto px-5 w-full ">
            <div className="flex items-center flex-col justify-center p-5 gap-5">
            
            <div className="flex items-center flex-col md:flex-row gap-2">
            <div className='flex items-center flex-col justify-center p-5 gap-5 w-full broder-black border-1 rounded-md shadow-md bg-neutral-100/50'>
           
       
           <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Your post:
              </FormLabel>
              <FormControl>
             
                 <Textarea
                 
                  placeholder="Enter your description"
                  className="max-w-xs text-black"
                  {...field}
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
            )}
        />
        </div>
        {/* <div className="flex items-center flex-col justify-center ">
          <Switch defaultSelected  onClick={()=>handleClick()}><p >Upload Image?</p></Switch>
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
        </div> */}
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
export default CreatePost;