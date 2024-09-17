'use client'
import { Client } from "@prisma/client";
import { Select,SelectValue, SelectTrigger,SelectContent,SelectGroup,SelectItem } from "./ui/select";
import { BriefcaseBusiness, Building2, CalendarIcon } from "lucide-react";
import { Input } from "./ui/input";
import { useEffect, useOptimistic } from "react";
import { onCreateClient } from "@/app/actions";
import { Button } from "./ui/button";
import { Popover, PopoverContent } from "./ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Calendar } from "./ui/calendar";
import { Card } from "./ui/card";


export default  function SelectClient({clients,userId}:{clients:Client[],userId:string | undefined}) {

   
  const [ optimisticClients, addOptimisticClient ] = useOptimistic(
    clients,
    (state:Client[], newClient:any) => {
        return [...state, newClient];
      }
    ) 
    // useEffect(()=>{console.log(optimisticClients)},[optimisticClients]) 
  return (
    <Select name="client">
      <SelectTrigger  className="inline-flex items-center justify-center rounded px-[15px] w-fit gap-5  leading-none   shadow-[0_2px_10px] shadow-foreground/10     outline-none"  
      >
        <BriefcaseBusiness size={32} className="w-auto"/>

      </SelectTrigger>
      <SelectContent>
         

          <SelectItem value="null">None</SelectItem>
          {optimisticClients.map((client: Client) => (
            <SelectItem value={client.id} key={client.id}>
              {client.name}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
}