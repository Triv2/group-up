"use client";
import { useState, useEffect } from "react";
import React from "react";
import {
  Button,
  Select,
  SelectItem,
  Switch,
  Divider,
  Textarea,
} from "@nextui-org/react";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Group } from "@prisma/client";
import { FileUpload } from "@/components/file-upload";

interface CreateThreadProps {
  groups: Group[];
  onClose: () => void;
}

const formSchema = z.object({
  title: z.string().min(1),
  openThread: z.boolean().default(false),
  content: z.string().min(1),
  imageUrl: z.string().default(""),
  groupId: z.string(),
});

export type CreateThreadValues = z.infer<typeof formSchema>;

const CreateThread: React.FC<CreateThreadProps> = ({ groups, onClose }) => {
  const router = useRouter();
  const params = useParams();

  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [upload, setUpload] = useState(false);
  const [postGroup, setPostGroup] = useState("");
  const [openThread, setOpenThread] = useState(false);

  const form = useForm<CreateThreadValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      openThread: false,
      imageUrl: "",
      content: "",
      groupId: groups[0].id,
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const onSubmit = async (data: CreateThreadValues) => {
    try {
      setLoading(true);

      data.openThread = openThread;
      data.groupId = postGroup;
      console.log("onSubmit", data);
      await axios.post(`/api/thread`, data);

      onClose();
      toast.success("Thread created!");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
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
  const handleOpenThread = () => {
    if (openThread) {
      setOpenThread(false);
    } else {
      setOpenThread(true);
    }
  };
  const handleSelectionChange = (e: any) => {
    setPostGroup(e.target.value);
  };

  return (
    <>
      <div className="h-auto w-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 bg-zinc-200 dark:bg-zinc-700 p-5 px-10  h-auto w-full "
          >
            <div>
              <div>
                <div className="flex items-center justify-center flex-col gap-1 sm:gap-5">
                  <div className="flex  justify-center flex-col md:flex-row gap-5">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold">Title</FormLabel>
                          <FormControl>
                            <Input
                              type="name"
                              placeholder="Please enter a thread name"
                              className="text-black dark:text-white rounded-md h-[25px]"
                              disabled={loading}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="groupId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Select a Group</FormLabel>
                          <FormControl>
                            <Select
                              size="sm"
                              items={groups}
                              aria-label="group selector"
                              placeholder="Please select a group"
                              className="text-black dark:text-white rounded-md "
                              selectedKeys={[postGroup]}
                              onChange={handleSelectionChange}
                            >
                              {groups.map((group) => (
                                <SelectItem
                                  className="hover:bg-zinc-500 z-30 pointer-events-auto"
                                  key={group.id}
                                  value={group.id}
                                >
                                  {group.name}
                                </SelectItem>
                              ))}
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Divider />
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Post</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter your post to create the thread"
                            className="max-w-xs text-black dark:text-white"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Divider />

                  <div className="w-full flex items-center justify-center">
                    <Switch
                      defaultSelected
                      size="sm"
                      onClick={() => handleOpenThread()}
                    >
                      {openThread ? (
                        <p className="text-muted-foreground text-xs">
                          Thread is set to be{" "}
                          <span className="font-bold text-sm dark:text-white">
                            Public
                          </span>
                        </p>
                      ) : (
                        <p className="text-muted-foreground text-xs">
                          Thread is set to be{" "}
                          <span className="font-bold text-sm dark:text-white">
                            Private
                          </span>
                        </p>
                      )}
                    </Switch>
                  </div>
                  <Divider />
                  <div className="flex items-center flex-col justify-center">
                    <Switch
                      defaultSelected
                      size="sm"
                      onClick={() => handleClick()}
                    >
                      <p className="text-xs">Upload Image?</p>
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

                  <Button
                    className="shadow-md hover:scale-105 transition-all bg-emerald-700 text-white hover:bg-emerald-500"
                    type="submit"
                  >
                    Create
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};
export default CreateThread;
