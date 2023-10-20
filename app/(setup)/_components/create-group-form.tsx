'use client'
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
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Group } from '@prisma/client';



interface CreateGroupFormProps {
  
}

const formSchema= z.object({
  
  name: z.string().min(1),
  password: z.string().includes("password", {message: "Password must be correct."}),
  
});


export type CreateGroupFormValues = z.infer<typeof formSchema>


 const CreateGroupForm:React.FC<CreateGroupFormProps>= ({
  
}) => {

  const router = useRouter();

  const [value, setValue] = React.useState(new Set([""]));
const [loading, setLoading] = useState(false);
const [isMounted, setIsMounted] = useState(false);

const [create, setCreate] = useState(false);
const [join, setJoin] = useState(false);


const form = useForm<CreateGroupFormValues>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    name: "",
    password: ""
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
      
    
      console.log("OnSubmit", data)
      await axios.post(`/api/group/`, data)
      router.push(`/`);
      
      toast.success("Group created!");
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-8 px-20 w-full ">
            <div>
              <div>
          <div className="flex items-center justify-center flex-col gap-3">
              <h3 className="font-bold text-2xl">Create a group</h3>
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
               
               placeholder="Please enter a group name"
                className="text-black rounded-md"
               disabled={loading}  {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
            )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Password
              </FormLabel>
              <FormControl>
               <Input 
               
               type="password"
               
               placeholder="Please set a password"
                className="text-black rounded-md"
               disabled={loading}  {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
            )}
        />
        <Button type="submit">Submit</Button>
       
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