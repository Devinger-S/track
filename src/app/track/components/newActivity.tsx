"use client";
import { Input } from "@/components/ui/input";
import { Pause, Play } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { NewActivityProps } from "@/types/types";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { currentActivity, stopActivity, upsertActivity } from "@/app/actions";
import ActivityDuration from "./duration";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  createClient,
  createProject,
  getActivities,
  getClients,
  getCurrent,
  getProjects,
  postActivity,
} from "@/utils/api-calls";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Activity, Client, Project } from "@prisma/client";

const FormSchema = z.object({
  activity_name: z.string().min(1, "Username is required"),
  client: z.string().nullable(),
  project: z.string().nullable(),
  userId: z.string(),
  id: z.string().nullable(),
});

const NewActivity = ({ userId }: NewActivityProps) => {
  const { data: currentActivity } = useQuery<Activity>({
    queryKey: ["getCurrentActivity"],
    queryFn: getCurrent,
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      userId,
      id: null,
      activity_name: "",
      project: null,
      client: null,
    },
  });
  const { reset } = form;

  useEffect(() => {
    reset({
      userId: userId,
      id: currentActivity?.id === "" ? null : currentActivity?.id,
      activity_name:
        currentActivity?.id === "" ? "" : (currentActivity?.name as string),
      project: currentActivity?.projectId ?? null,
      client: currentActivity?.clientId ?? null,
    });
  }, [currentActivity, reset, userId]);

  const { data: projects } = useQuery<Project[]>({
    queryKey: ["getProjects"],
    queryFn: getProjects,
  });
  const { data: clients } = useQuery<Client[]>({
    queryKey: ["getClients"],
    queryFn: getClients,
  });
  const useAddNewActivity = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: postActivity,
      mutationKey: ["addActivity"],
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["getCurrentActivity"],
        });
        queryClient.invalidateQueries({
          queryKey: ["ActivitiesWhitRelations"],
        });
      },
    });
  };
  const { mutate: addNewActivity } = useAddNewActivity();

  const useAddNewClient = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: createClient,
      mutationKey: ["addClient"],
      onSuccess: () => {
        toast({
          title: "Client added successfully!",
        });
        queryClient.invalidateQueries({
          queryKey: ["getClients"],
        });
      },
      onError: () => {
        toast({
          title: "Failed to add client",
          variant: "destructive",
        });
      },
    });
  };
  const { mutate: addNewClient } = useAddNewClient();

  const useAddNewProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: createProject,
      mutationKey: ["addProject"],
      onSuccess: () => {
        toast({
          title: "Project added successfully!",
        });
        queryClient.invalidateQueries({
          queryKey: ["getProjects"],
        });
      },
      onError: () => {
        toast({
          title: "Failed to add project",
          variant: "destructive",
        });
      },
    });
  };
  const { mutate: addNewProject } = useAddNewProject();

  const router = useRouter();

  async function onSubmit(newActivity: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(newActivity, null, 2)}
          </code>
        </pre>
      ),
    });
    try {
      addNewActivity(newActivity);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }

  return (
    <div
      id="NewActivity_wrapper"
      className="sticky backdrop-blur-xl py-4  w-full px-2 md:pr-16 drop-shadow-md  "
    >
      <h2 className=" mb-2 text-lg md:p-2 hidden sm:block font-medium ">
        What are you working on?
      </h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col sm:flex-row gap-4"
        >
          <FormField
            name="activity_name"
            control={form.control}
            render={({ field }) => (
              <>
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Name your activity"
                      type="string"
                      name="activity_name"
                      autoFocus
                      value={field.value || (currentActivity?.name as string)}
                      // onChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              </>
            )}
          />
          <FormField
            name="userId"
            control={form.control}
            render={({ field }) => (
              <FormItem className="hidden">
                <FormControl>
                  <Input {...field} type="text" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="id"
            control={form.control}
            render={({ field }) => (
              <>
                <FormItem className="hidden">
                  <FormControl>
                    <Input {...field} type="text" value={currentActivity?.id} />
                  </FormControl>
                </FormItem>
              </>
            )}
          />
          <div id="clientprojectwrapper" className="flex gap-4 ">
            <FormField
              name="client"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || undefined}
                  >
                    <SelectTrigger
                      aria-label="Select Client"
                      className="inline-flex items-center justify-center rounded px-[15px] w-fit gap-5 leading-none shadow-[0_2px_10px] shadow-foreground/10 outline-none"
                    >
                      <span>
                        {(field.value &&
                          clients?.find((client) => client.id === field.value)
                            ?.name) ||
                          "Clients"}
                      </span>
                    </SelectTrigger>
                    <SelectContent className="z-100">
                      <div id="wrapperInputClient">
                        <Input
                          placeholder="add a new client"
                          type="text"
                          onKeyDown={(e) => {
                            e.stopPropagation();
                            if (e.key === "Enter") {
                              e.preventDefault();
                              const target = e.target as HTMLInputElement; // Type assertion
                              const newClientName = target.value;
                              console.log(newClientName, typeof newClientName);
                              if (newClientName) {
                                addNewClient({
                                  name: newClientName,
                                  userId: userId,
                                }); // Call the mutation function
                                target.value = ""; // Clear the input after adding
                              }
                            }
                          }}
                        />
                      </div>
                      <SelectItem value="none">None</SelectItem>
                      {clients?.map((client) => (
                        <SelectItem
                          className="z-100"
                          value={client.id}
                          key={client.id}
                        >
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              name="project"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange} // Update the form state when the value changes
                    value={field.value || "null"}
                  >
                    <SelectTrigger className="inline-flex items-center justify-center rounded px-[15px] w-fit gap-5 leading-none shadow-[0_2px_10px] shadow-foreground/10 outline-none">
                      <span>
                        {(field.value &&
                          projects?.find(
                            (project) => project.id === field.value
                          )?.name) ||
                          "Projects "}
                      </span>
                    </SelectTrigger>
                    <SelectContent>
                      <div id="wrapperProjectInput">
                        <Input
                          placeholder="add a new project"
                          type="text"
                          onKeyDown={(e) => {
                            e.stopPropagation();
                            if (e.key === "Enter") {
                              e.preventDefault();
                              const target = e.target as HTMLInputElement; // Type assertion
                              const newProjectName = target.value;
                              if (newProjectName) {
                                addNewProject({
                                  name: newProjectName,
                                  userId: userId,
                                });
                                target.value = "";
                              }
                            }
                          }}
                        />
                      </div>
                      <SelectItem value="null">None</SelectItem>
                      {projects &&
                        projects.map((project) => (
                          <SelectItem value={project.id} key={project.id}>
                            {project.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <Button type="submit">
              {currentActivity ? <Pause /> : <Play />}
            </Button>
          </div>
          <span className="grow font-bold font-sans  min-w-16 flex justify-center items-center">
            {currentActivity && currentActivity.startAt && (
              <ActivityDuration startAt={currentActivity.startAt} />
            )}
            {!currentActivity && ""}
          </span>
        </form>
        <DevTool control={form.control} />
      </Form>
    </div>
  );
};
export default NewActivity;
