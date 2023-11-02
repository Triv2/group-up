'use client'
import {useState, useEffect} from'react'
import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button,  useDisclosure, Select, SelectItem, Switch, Divider, Textarea, } from "@nextui-org/react";
import { Lock, Users } from 'lucide-react';

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import * as z from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Group } from '@prisma/client';
import { FileUpload } from '@/components/file-upload';



interface CreateThreadProps {
  
}

const formSchema= z.object({
  
  title: z.string().min(1),
  openThread: z.boolean().default(false),
  content: z.string().min(1),
  imageUrl: z.string().default(""),
 
  
});


export type CreateThreadValues = z.infer<typeof formSchema>


 const CreateThread:React.FC<CreateThreadProps>= ({
  
}) => {

  const router = useRouter();
  const params = useParams();
 
const [loading, setLoading] = useState(false);
const [isMounted, setIsMounted] = useState(false);
const [upload,setUpload] = useState(false);
const [openThread, setOpenThread] = useState(false);



const form = useForm<CreateThreadValues>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    title: "",
    openThread: false,
    imageUrl: "",
    content: "",
  },
});

useEffect(() => {
  setIsMounted(true);
  }, []);
  
  if (!isMounted) {
    return null;
  }
  
  const onSubmit = async (data:CreateThreadValues) => {
    try {
      setLoading(true);
      
    
      data.openThread=openThread;
      await axios.post(`/api/group/`, data)
      
      
      toast.success("Group created!");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      router.push(`/dashboard`);
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
  const handleOpenThread= () => {
    if(openThread) {
      setOpenThread(false);
    } else {
      setOpenThread(true);
    }
  }
 
  
  return (
    <>
      <div className="h-auto w-auto">
           <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-5 px-10  w-full ">
            <div>
              <div>
          <div className="flex items-center justify-center flex-col gap-6">
              <h3 className="font-bold text-xl">Create a Thread</h3>
              <Divider/>
            <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">
                Thread Title
              </FormLabel>
              <FormControl>
               <Input 
               
               type="name"
               
               placeholder="Please enter a group name"
                className="text-black rounded-md h-[25px]"
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
                Content
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
        <Divider/>
        <Switch defaultSelected className="text-xs"  onClick={()=>handleOpenThread()}>Is This An Open Thread?</Switch>
        <div className="px-2 text-xs">
        <p>Current Choice:</p>
        {openThread ? (
          <p className="text-muted-foreground">Thread is set to be Public</p>
        ):(
          <p className="text-muted-foreground">Thread is set to be Private</p>
        )}
        </div>
        <Divider/>
         <div className="flex items-center flex-col justify-center">
          <Switch defaultSelected  onClick={()=>handleClick()}>Upload Image?</Switch>
          {upload && (
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
        )}
        </div>
       
        <Button className="shadow-md hover:scale-105 transition-all bg-emerald-700 text-white hover:bg-emerald-500" type="submit">Create</Button>
       
        </div>
          
            </div>

            
           
           
            </div>
            </form>
           </Form>
         </div>   
    </>
  );
 }
export default CreateThread;