"use client";

import { onCreateClient } from "@/app/actions";
import { useOptimistic } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { DataTable } from "./tanStackTable/data-table";
import { columnsClients } from "./tanStackTable/columsClients";

export const OptimisticComponent = ({ clients, session }: any) => {
  const [optimisticClients, addOptimisticClient] = useOptimistic(
    clients,
    (state, newClient) => {
      return [...state, newClient];
    }
  );
  return (
    <>
      <form
        action={async (formData) => {
          const color = formData.get("color");
          const name = formData.get("name");
          addOptimisticClient({
            id: Math.random(),
            name: name,
            color: color,
          });
          await onCreateClient(formData);
        }}
        className="flex flex-col sm:flex-row w-full items-center gap-4"
      >
        <div className="flex w-full  place-self-start ">
          <Input
            type="text"
            name="name"
            placeholder="Client name"
            className="grow"
          />

          <Input
            type="color"
            name="color"
            placeholder="Color"
            className="w-12"
          />
          <Input
            type="text"
            name="id"
            defaultValue={session.user.id}
            className="hidden"
          />
        </div>
        <Button className="w-full sm:w-fit" type="submit">
          Create
        </Button>
      </form>
      <DataTable columns={columnsClients} clients={optimisticClients} />
    </>
  );
};
