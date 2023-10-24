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



interface GroupFormProps {
  initialData: Group[] ;
}

const formSchema= z.object({
  
  name: z.string(),
  inviteCode: z.string().min(1),
  
});


export type GroupFormValues = z.infer<typeof formSchema>


const JoinGroupForm:React.FC<GroupFormProps>= ({
  initialData =[],
}) => {

  const router = useRouter();

  const [value, setValue] = useState([`${initialData[0].name}`]);
const [loading, setLoading] = useState(false);
const [isMounted, setIsMounted] = useState(false);




const form = useForm<GroupFormValues>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    name: "",
    inviteCode: "",
  },
});

useEffect(() => {
  setIsMounted(true);
  }, []);
  
  if (!isMounted) {
    return null;
  }
  
  const onSubmit = async (data:GroupFormValues) => {
    try {
      setLoading(true);
      
    
      console.log("OnSubmit", data)
      await axios.patch(`/api/group/`, data)
      router.push("/");
      
      toast.success("Group joined!");
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 p-3 px-10 w-full  ">
            
              <div>
        
            <div >
           
           <div className="flex items-center justify-center flex-col gap-2" >
              <h3 className="font-bold text-lg ">Join a group</h3>
              
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex   flex-col">
                    <FormLabel className="font-semibold">
                      Name
                    </FormLabel>
                    <FormControl>
                    <Select
                    className="w-[200px]  flex  "
                      label="Please select a group"
                      selectedKeys={value}
                      // @ts-ignore
                      onSelectionChange={setValue}
                      {...field}
                    >
                      {initialData && (initialData.map((group) => (
                        <SelectItem key={group.name} value={group.name}>
                        {group.name}
                      </SelectItem>
                    )))}
                    </Select>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
            )}
        />
        <FormField
          control={form.control}
          name="inviteCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">
                Invite Code
              </FormLabel>
              <FormControl>
               <Input 
               
               
               
               placeholder="Please paste your invite code here"
                className="text-black rounded-md h-[25px]"
               disabled={loading}  {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
            )}
        />
        <Button className="shadow-md hover:scale-105 transition-all bg-emerald-700 text-white hover:bg-red-800" type="submit">Join</Button>
        
        </div>
           
            </div>
            </div>
            </form>
           </Form>
         </div>   
    </>
  );
 }
export default JoinGroupForm;