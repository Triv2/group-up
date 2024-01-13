"use client";
import { Message } from "@prisma/client";
import React, { useState, useEffect } from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button, Textarea } from "@nextui-org/react";
import * as z from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

// import { Textarea } from '@/components/ui/textarea';

interface EditMessageFormProps {
  message: Message | null;
  onClose: () => void;
}

const formSchema = z.object({
  content: z.string(),
});

export type EditMessageFormValues = z.infer<typeof formSchema>;

const EditMessageForm = ({ message, onClose }: EditMessageFormProps) => {
  const router = useRouter();
  const params = useParams();
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [upload, setUpload] = useState(false);

  const form = useForm<EditMessageFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: message?.content || "",
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  if (!message) {
    return null;
  }

  const onSubmit = async (data: EditMessageFormValues) => {
    try {
      setLoading(true);

      await axios.patch(`/api/message/${message.id}`, data);

      toast.success("Message updated!");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      onClose();
      router.refresh();
      setLoading(false);
    }
  };

  const handleClick = () => {
    if (upload) {
      setUpload(false);
    } else {
      setUpload(true);
    }
  };

  return (
    <>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 bg-zinc-200 dark:bg-zinc-700 rounded-md p-5 w-full "
          >
            <div className="flex items-center flex-col justify-center  gap-5">
              <div className="flex items-center flex-col md:flex-row gap-2">
                <div className="flex gap-2 flex-col md:flex-row w-full">
                  <div className="w-full">
                    <FormField
                      control={form.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="font-bold">Post</FormLabel>
                          <FormLabel className="text-xs text-muted-foreground flex justify-between px-2">
                            Current Message:{" "}
                            <p className="font-semibold text-emerald-800 dark:text-emerald-500 pl-2">
                              {" "}
                              {message?.content}
                            </p>
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter your description"
                              className="max-w-xs"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              <Button
                className="flex items-center justify-center px-2 py-2 gap-1 hover:scale-105 rounded-md bg-emerald-800 text-white hover:bg-emerald-500 transition-all text-sm shadow-md"
                type="submit"
              >
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};
export default EditMessageForm;
