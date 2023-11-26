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



interface EditGroupSettingsFormProps {
  group: Group;
  onClose: () => void;
}

const formSchema= z.object({
  
  name: z.string().min(1),
  openGroup: z.boolean().default(false),
  imageUrl: z.string().default(""),
 
  
});


export type EditGroupSettingsFormValues = z.infer<typeof formSchema>


 const EditGroupSettingsForm:React.FC<EditGroupSettingsFormProps>= ({
  group,
  onClose,
}) => {

  const router = useRouter();
  
 
const [loading, setLoading] = useState(false);
const [isMounted, setIsMounted] = useState(false);
const [upload,setUpload] = useState(false);
const [openGroup, setOpenGroup] = useState(false);


const form = useForm<EditGroupSettingsFormValues>({
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
  
  const onSubmit = async (data:EditGroupSettingsFormValues) => {
    try {
      setLoading(true);
      
      data.openGroup=openGroup;
      
      await axios.patch(`/api/group/${group.id}`, data)
      
      onClose();
      toast.success("Group updated!");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      router.refresh();
      router.push(`/dashboard/`);
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-5 px-10  w-full ">
            <div>
              <div>
          <div className="flex items-center justify-center flex-col gap-6">
              <h3 className="font-bold text-xl">Edit Group</h3>
            <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">
               <div className="flex flex-col gap-1">Current Name: <p className="text-muted-foreground">{group.name} </p></div>
              </FormLabel>
              <FormControl>
               <Input 
               
               type="name"
               
               placeholder="Please enter new group name"
                className="text-black rounded-md h-[25px]"
               disabled={loading}  {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
            )}
        />
        <Divider/>
        <div className="w-full">
          <Switch defaultSelected  size="sm"  onClick={()=>handleOpenGroup()}>    {openGroup ? (
          <p className="text-muted-foreground text-xs">Group is set to be <span className="font-bold text-sm dark:text-white">Public</span></p>
        ):(
          <p className="text-muted-foreground text-xs">Group is set to be <span className="font-bold text-sm dark:text-white">Private</span></p>
        )}</Switch>
         </div>
        <Divider/>
         <div className="flex items-center flex-col justify-center">
          <Switch defaultSelected size="sm" onClick={()=>handleClick()}><p className="text-xs">Upload Image?</p></Switch>
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
       
        <Button className="shadow-md hover:scale-105 transition-all bg-emerald-700 text-white hover:bg-emerald-500" type="submit">Update Group</Button>
       
        </div>
          
            </div>

            
           
           
            </div>
            </form>
           </Form>
         </div>   
    </>
  );
 }
export default EditGroupSettingsForm;