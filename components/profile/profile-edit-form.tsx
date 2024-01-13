"use client";
import { Profile } from "@prisma/client";
import React, { useState, useEffect } from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button, Input, Textarea, Switch } from "@nextui-org/react";
import * as z from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import { FileUpload } from "@/components/file-upload";
// import { Textarea } from '@/components/ui/textarea';

interface ProfileEditFormProps {
  profile: Profile | null;
  onClose: () => void;
}

const formSchema = z.object({
  name: z.string().min(1).max(25),
  imageUrl: z.string().default(""),
  content: z.string(),
});

export type ProfileFormValues = z.infer<typeof formSchema>;

const ProfileEditForm = ({ profile, onClose }: ProfileEditFormProps) => {
  const router = useRouter();
  const params = useParams();
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [upload, setUpload] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: profile?.name || "",
      content: profile?.content || "",
      imageUrl: profile?.imageUrl,
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      setLoading(true);

      await axios.patch(`/api/profile/${params.profileId}`, data);

      toast.success("Profile updated!");
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
            className="space-y-2 bg-zinc-200 dark:bg-slate-900 rounded-md p-5 w-full "
          >
            <div className="flex items-center flex-col justify-center  gap-5">
              <div className="flex items-center flex-col md:flex-row gap-2">
                <div className="flex items-center justify-center flex-col gap-5 w-full">
                  <div className="flex gap-2 flex-col md:flex-row w-full">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="font-bold">Name</FormLabel>
                          <FormLabel className="text-xs text-muted-foreground flex justify-between px-2">
                            Current Name:{" "}
                            <p className="font-semibold text-sky-800 dark:text-sky-500">
                              {profile?.name}
                            </p>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="name"
                              placeholder="Please enter a name"
                              className="text-black rounded-md dark:text-white"
                              disabled={loading}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="w-full">
                    <FormField
                      control={form.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="font-bold">Interests</FormLabel>
                          <FormLabel className="text-xs text-muted-foreground flex justify-between px-2">
                            Current Interests:{" "}
                            <p className="font-semibold text-sky-800 dark:text-sky-500 pl-2">
                              {" "}
                              {profile?.content}
                            </p>
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter your description"
                              className="max-w-xs "
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex items-center flex-col justify-center">
                  <Switch
                    defaultSelected
                    size="sm"
                    onClick={() => handleClick()}
                  >
                    <p className="text-xs">Change Avatar?</p>
                  </Switch>
                  {upload && (
                    <FormField
                      control={form.control}
                      name="imageUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Image</FormLabel>
                          <FormControl>
                            <FileUpload
                              endpoint="serverImage"
                              value={field.value}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              </div>
              <Button
                className="flex items-center justify-center px-2 py-2 gap-1 hover:scale-105 rounded-md bg-sky-800 text-white hover:bg-sky-500 transition-all text-sm shadow-md"
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
export default ProfileEditForm;
