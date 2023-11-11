'use client'
import {useState, useEffect} from'react'
import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button,  useDisclosure, Select, SelectItem, Switch, Divider, } from "@nextui-org/react";
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



interface CreateGroupFormProps {
  
}

const formSchema= z.object({
  
  name: z.string().min(1),
  openGroup: z.boolean().default(false),
  imageUrl: z.string().default(""),
 
  
});


export type CreateGroupFormValues = z.infer<typeof formSchema>


 const CreateGroupForm:React.FC<CreateGroupFormProps>= ({
  
}) => {

  const router = useRouter();
  const params = useParams();
 
const [loading, setLoading] = useState(false);
const [isMounted, setIsMounted] = useState(false);
const [upload,setUpload] = useState(false);
const [openGroup, setOpenGroup] = useState(false);



const form = useForm<CreateGroupFormValues>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    name: "",
    openGroup: false,
    imageUrl: ""
  },
});

useEffect(() => {
  setIsMounted(true);
  }, []);
  
  if (!isMounted) {
    return null;
  }
  
  const onSubmit = async (data:CreateGroupFormValues) => {
    try {
      setLoading(true);
      
    
      data.openGroup=openGroup;
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
  const handleOpenGroup= () => {
    if(openGroup) {
      setOpenGroup(false);
    } else {
      setOpenGroup(true);
    }
  }
 
  
  return (
    <>
      <div className="h-auto w-auto">
           <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" px-10  w-full ">
            <div>
              <div>
          <div className="flex items-center justify-center flex-col px-4 bg-zinc-100 dark:bg-zinc-500 rounded-md shadow-md py-3 gap-4">
              <h3 className="font-bold text-xl">Create a Group</h3>
              <Divider/>
              <div className="px-2 text-xs">
        
        {openGroup ? (
          <p className="text-muted-foreground">Group is set to be <span className="font-bold text-sm dark:text-white">Public</span></p>
        ):(
          <p className="text-muted-foreground">Group is set to be <span className="font-bold text-sm dark:text-white">Private</span></p>
        )}
        
        <Switch defaultSelected  size="sm"  onClick={()=>handleOpenGroup()}><p className="text-xs">Is This An Open Group?</p></Switch>
          </div>
          <Divider/>
            <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">
                Group Name
              </FormLabel>
              <FormControl>
               <Input 
               
               type="name"
               
               placeholder="Please enter a group name"
                className="text-black dark:text-white rounded-md h-[25px]"
               disabled={loading}  {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
            )}
        />
        
        <Divider/>
         <div className="flex items-center flex-col justify-center">
          <Switch defaultSelected size="sm" onClick={()=>handleClick()}> <p className="text-xs">Upload Image?</p></Switch>
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
export default CreateGroupForm;