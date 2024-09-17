 'use client'

import { Controller, useForm } from "react-hook-form";
import {DevTool} from "@hookform/devtools"
import { useToast } from "../../../components/ui/use-toast";
import { Button } from "../../../components/ui/button";
import { Client } from "@prisma/client";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@radix-ui/react-select";
import { BriefcaseBusiness } from "lucide-react";

let renderCount = 0
 
 const FormExample = () => {
  const form = useForm()
  const {register,control,handleSubmit} = form
  renderCount++
  const { toast } = useToast()
  const clients = [
    {
      id: Math.random(),
      name: 'client1'
    },
    {
      id: Math.random(),
      name: 'client2'
    },
  ]
 const onSubmit = (data:any) => {
    const { username, client } = data;
    toast({
      title: "Form Submitted",
      description: `${JSON.stringify(data,null,2)}`,
    });
  };
  return (
    <div>
      <h1>YouTube Form {renderCount / 2}</h1>

      <form
      onSubmit={handleSubmit(onSubmit)}
        action={(data) => {
          const username = data.get("username");
          const client = data.get("client");
          // toast({
          //   title: "Scheduled: Catch up",
          // description: `formData: ${ JSON.stringify(data,null,2)} ${client}` ,
          // });
        }}
        className="flex flex-col"
      >
        <label htmlFor="username">Username</label>
        <input type="text" id="username" {...register("username")} />

        <label htmlFor="email">E-mail</label>
        <input type="email" id="email" {...register("email")} />

        <label htmlFor="channel">Channel</label>
        <input type="text" id="channel" {...register("channel")} />
        <div>

          <Controller
            name="client"  // The name under which this field's value will be stored in form data
            control={control}
            render={({ field }) => (
              <Select
                // onValueChange={(value) => field.onChange(value)} // Set the form value when selection changes
                onValueChange={field.onChange}  // Update the form state when the value changes
                value={field.name}  // Set the value from the form state
              >
                <SelectTrigger className="inline-flex items-center justify-center rounded px-[15px] w-fit gap-5 leading-none shadow-[0_2px_10px] shadow-foreground/10 outline-none">
                  <BriefcaseBusiness size={32} className="w-auto" />
                  <span>{field.value || "Select a client"}</span>
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
            )}
          />
</div>

        <Button className="mt-32">Submit</Button>
      </form>
      <DevTool control={control} />
    </div>
  );
};
export default FormExample