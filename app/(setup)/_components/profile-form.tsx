'use client'
import { Profile } from '@prisma/client';
import {useState, useEffect} from'react'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import * as z from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/alert-modal";

interface ProfileFormProps {
  initialData: Profile;
}



const formSchema= z.object({
  
  name: z.string().min(1),
  imageUrl: z.string().default(""),
  interests: z.array(z.string()),
  group: z.string().min(1),
  items: z.array(z.string()),
});

export type ProfileFormValues = z.infer<typeof formSchema>

const ProfileForm:React.FC<ProfileFormProps> = ({
  initialData,
}) => {
  const router=useRouter();

const [open, setOpen] = useState(false);
const [isMounted, setIsMounted] = useState(false);
const [loading, setLoading] = useState(false);

const [interests, setInterests]=useState([""]);
const [interest, setinterest]=useState("");

const [items, setItems]=useState([""]);
const [item, setItem]=useState("");



const form = useForm<ProfileFormValues>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    name: "",
    interests: [""],
    items: [""],
    group: "",
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
    await axios.post(`/api/entry/`, data)
    router.refresh();
    router.push(`/entry`);
    toast.success("Entry created!");
  } catch (error) {
    toast.error("Something went wrong.");
  } finally {
    setLoading(false);
  }
};

  return (
    <>
    <AlertModal
    isOpen={open}
    onClose={()=> setOpen(false)}
    onConfirm={()=>{}}
    loading={loading}
      />
    <div>
      ProfileForm
    </div>
    </>
  );
}
export default ProfileForm;