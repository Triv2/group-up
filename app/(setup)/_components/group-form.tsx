'use client'
import {useState, useEffect} from'react'
import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, } from "@nextui-org/react";
import { Lock, Users } from 'lucide-react';

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import * as z from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';


interface GroupFormProps {}

const formSchema= z.object({
  
  name: z.string().min(1),
  password: z.string().includes("password", {message: "Password must be correct."}),
  
});

export type GroupFormValues = z.infer<typeof formSchema>


const GroupForm:React.FC<GroupFormProps> = () => {

  const router = useRouter();

const [loading, setLoading] = useState(false);
const [isMounted, setIsMounted] = useState(false);
const {isOpen, onOpen, onOpenChange} = useDisclosure();


const form = useForm<GroupFormValues>({
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
  
  const onSubmit = async (data:GroupFormValues) => {
    try {
      setLoading(true);
      
    
      console.log("OnSubmit", data)
      await axios.post(`/api/group/`, data)
      router.refresh();
      
      toast.success("Group created!");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    
      <div>
                <Form  {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-10 px-20 w-full ">
                    <div>
                      <div>
                  <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                          Title
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter the name of your group"                                                 
                            {...field}
                          />
                          <FormMessage/>
                          </FormControl>
                          </FormItem>
                        )}
                      />
                      </div>
                      <div>
                  <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Title
                          </FormLabel>
                        <FormControl>
                        <Input
                          placeholder="Enter your password"
                          type="password"
  
                          {...field}
                        />
                        <FormMessage/>
                        </FormControl>
                        </FormItem>
                      )}
                      />
                  </div>
                </div>
                </form>
                </Form>
         </div>   
    
  );
 }
export default GroupForm;