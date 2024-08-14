'use client'
import { Client, User } from "@prisma/client";
import { Select, SelectTrigger,SelectContent,SelectGroup,SelectItem } from "./ui/select";
import { Building2 } from "lucide-react";
import { Input } from "./ui/input";
import { useOptimistic } from "react";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { onCreateClient } from "@/app/actions";


export default  function SelectUser({clients,user}:{clients:Client[],user:User}) {

   

   

  const [optimisticClients, addOptimisticClient] = useOptimistic(
    clients,
    (state, newClient: Client) => {
      return [...state, newClient];
    }
  );
  return (
    <Select name="client">
      <SelectTrigger className=" flex items-center justify-around w-fit min-w-16 max-w-24   md:py-4">
        <Building2 size={32} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <form 
          action={onCreateClient}>
            <Input type="hidden" name="id" defaultValue={user?.id || ''} />
            <Input placeholder="Add a client" name="name" type="text" />
          </form>
          <SelectItem value="null">None</SelectItem>
          {optimisticClients.map((client: Client) => (
            <SelectItem value={client.id} key={client.id}>
              {client.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}