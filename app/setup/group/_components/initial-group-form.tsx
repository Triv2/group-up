"use client";
import { useState, useEffect } from "react";
import React from "react";
import { Button, Switch, Divider } from "@nextui-org/react";

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

import { FileUpload } from "@/components/file-upload";

interface InitialGroupFormProps {}

const formSchema = z.object({
  name: z.string().min(1),
  openGroup: z.boolean().default(false),
  imageUrl: z.string().default(""),
});

export type InitialGroupFormValues = z.infer<typeof formSchema>;

const InitialGroupForm: React.FC<InitialGroupFormProps> = ({}) => {
  const router = useRouter();
  const params = useParams();

  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [upload, setUpload] = useState(false);
  const [openGroup, setOpenGroup] = useState(false);

  const form = useForm<InitialGroupFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      openGroup: false,
      imageUrl: "",
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const onSubmit = async (data: InitialGroupFormValues) => {
    try {
      setLoading(true);

      data.openGroup = openGroup;
      await axios.post(`/api/group/`, data);
      router.push(`/dashboard/`);

      toast.success("Group created!");
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
  const handleOpenGroup = () => {
    if (openGroup) {
      setOpenGroup(false);
    } else {
      setOpenGroup(true);
    }
  };

  return (
    <>
      <div className="h-auto w-auto mt-[35px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 px-5 w-full "
          >
            <div>
              <div>
                <div className="flex items-center justify-center flex-col px-4 bg-zinc-200 dark:bg-slate-900 rounded-md   py-3 gap-4">
                  <div className="flex items-center justify-center flex-col px-4 py-3 bg-zinc-100 dark:bg-slate-800 shadow-md rounded-md p-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold">Name</FormLabel>
                          <FormControl>
                            <Input
                              type="name"
                              placeholder="Please enter a group name"
                              className="text-black dark:text-white rounded-md h-[25px]"
                              disabled={loading}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Divider />
                    <div className="w-full">
                      <Switch
                        defaultSelected
                        size="sm"
                        onClick={() => handleOpenGroup()}
                      >
                        {" "}
                        {openGroup ? (
                          <p className="text-muted-foreground text-xs">
                            Group is set to be{" "}
                            <span className="font-bold text-sm dark:text-white">
                              Public
                            </span>
                          </p>
                        ) : (
                          <p className="text-muted-foreground text-xs">
                            Group is set to be{" "}
                            <span className="font-bold text-sm dark:text-white">
                              Private
                            </span>
                          </p>
                        )}
                      </Switch>
                    </div>
                    <Divider />

                    <div className="flex items-center flex-col justify-center gap-2 w-full">
                      <div className="w-full">
                        <Switch
                          defaultSelected
                          size="sm"
                          onClick={() => handleClick()}
                        >
                          {" "}
                          <p className="text-xs">Change Group Avatar?</p>
                        </Switch>
                      </div>
                      <Divider />
                      <p className="text-muted-foreground text-xs">
                        Default image will be your avatar image.
                      </p>
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
                    className="flex items-center justify-center px-2 py-2 gap-1 hover:scale-105 rounded-md bg-sky-700 text-white hover:bg-sky-500 transition-all text-sm shadow-lg"
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
export default InitialGroupForm;
