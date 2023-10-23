'use client'
import { Group, Profile } from '@prisma/client';
import React, {useState, useEffect} from'react'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Button, useDisclosure, Checkbox, Input, Link, Textarea, Switch, Select, SelectItem} from "@nextui-org/react";
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

interface GroupEditFormProps {
  
  group: Group | null;
  initData: Group[];
}


const formSchema= z.object({
  
  imageUrl: z.string().default(""),
  group: z.string().min(1),
  inviteCode: z.string().min(1),
});

export type GroupEditFormValues = z.infer<typeof formSchema>

const GroupEditForm = ({

  group,
  initData,
}:GroupEditFormProps) => {
  const router=useRouter();
  const params = useParams();
const [isMounted, setIsMounted] = useState(false);
const [loading, setLoading] = useState(false);
const [upload,setUpload] = useState(false);
const [value, setValue] = React.useState(new Set([""]));




const form = useForm<GroupEditFormValues>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    imageUrl: "",
    group: "",
    inviteCode: "",
  },
});

useEffect(() => {
setIsMounted(true);
}, []);

if (!isMounted) {
return null;
}

const onSubmit = async (data:GroupEditFormValues) => {
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 p-5 w-full ">
            <div className="flex items-center flex-col justify-center  gap-5">
            
            <div className="flex items-center flex-col md:flex-row gap-2">
            <div className='flex items-center justify-center flex-col gap-5 w-full'>

              <div className="flex gap-2 flex-col md:flex-row w-full">
          
        <FormField
          control={form.control}
          name="group"
          render={({ field }) => (
            <FormItem  className="flex flex-col">
              <FormLabel className="font-bold">
                Group
              </FormLabel>
              <FormLabel className="text-xs text-muted-foreground flex justify-between px-2">
                Current Group: <p className="font-semibold text-emerald-800">{group?.name}</p>
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
                      {initData && 
                        (initData.map((group) => (
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
        
       
        </div>

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
        </div>
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
        </div>
        <Button type="submit">Submit</Button>
        
            </div>
            </form>
           </Form>
         </div>  
    </>
  );
}
export default GroupEditForm;