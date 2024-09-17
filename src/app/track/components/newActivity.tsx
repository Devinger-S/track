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

const FormSchema = z.object({
  activity_name: z.string().nullable(),
  client: z.string().nullable(),
  project: z.string().nullable(),
  userId: z.string(),
  id: z.string().nullable(),
});

const NewActivity = ({
  activity,
  clients,
  projects,
  userId,
}: NewActivityProps) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      userId: userId,
      id: activity?.id,
      activity_name: activity?.name || null,
      project: null,
      client: null,
    },
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    try {
      // Send the form data to a backend API endpoint
      const response = await fetch("/api/activity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Handle the response
      if (response.ok) {
        const result = await response.json();
        console.log("Success:", result);
        // Optionally display a success message or handle the result
      } else {
        console.error("Error:", response.statusText);
        // Optionally display an error message
      }
    } catch (error) {
      console.error("Fetch error:", error);
      // Optionally display an error message
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
          // action={activity ? stopActivity : upsertActivity}
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex gap-4"
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
                      autoComplete="name your activity"
                      value={activity?.name || ""}
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
              <>
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      className="hidden"
                      type="text"
                      name="userId"
                    />
                  </FormControl>
                </FormItem>
              </>
            )}
          />
          <FormField
            name="id"
            control={form.control}
            render={({ field }) => (
              <>
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      className="hidden"
                      type="text"
                      name="id"
                      value={field.value || ""}
                    />
                  </FormControl>
                </FormItem>
              </>
            )}
          />

          <FormField
            name="client"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={field.onChange} // Update the form state when the value changes
                    value={field.value || "null"}
                  >
                    <SelectTrigger className="inline-flex items-center justify-center rounded px-[15px] w-fit gap-5 leading-none shadow-[0_2px_10px] shadow-foreground/10 outline-none">
                      {/* <BriefcaseBusiness size={32} className="w-auto" /> */}
                      <span>{field.value || "Clients"}</span>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="null">None</SelectItem>
                      {clients.map((client) => (
                        <SelectItem value={client.name} key={client.id}>
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="project"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={field.onChange} // Update the form state when the value changes
                    value={field.value || "null"}
                  >
                    <SelectTrigger className="inline-flex items-center justify-center rounded px-[15px] w-fit gap-5 leading-none shadow-[0_2px_10px] shadow-foreground/10 outline-none">
                      {/* <BriefcaseBusiness size={32} className="w-auto" /> */}
                      <span>{field.value || "Project"}</span>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="null">None</SelectItem>
                      {projects.map((project) => (
                        <SelectItem value={project.name} key={project.id}>
                          {project.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">{activity ? <Pause /> : <Play />}</Button>
          <span className="grow font-bold font-sans  min-w-16 flex justify-center items-center">
            {activity && (
              <ActivityDuration startAt={activity.startAt.toString()} />
            )}
            {!activity && ""}
          </span>
        </form>
        <DevTool control={form.control} />
      </Form>
    </div>
  );
};
export default NewActivity;
