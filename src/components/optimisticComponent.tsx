"use client";

import { deleteClient, onCreateClient } from "@/app/actions";
import { useEffect, useOptimistic } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { DataTable } from "./tanStackTable/data-table";
import { columnsClients } from "./tanStackTable/columsClients";
import { Separator } from "./ui/separator";
import {  DeleteIcon, Loader } from "lucide-react";
import { useFormStatus } from "react-dom";

export const OptimisticComponent = ({ clients, session }: any) => {
  const [optimisticClients, setOptimisticClients] = useOptimistic(
    clients,
    (state, newClient:any) => {
        
      return [  ...state,newClient];
       
            
    }
  );

  useEffect(() => {console.log(optimisticClients)},[optimisticClients])

  
  return (
    <>
      <form
        action={ async (data) => {
          const id = data.get("id");
          const name = data.get("name");
          setOptimisticClients({
            id:Math.floor(Math.random() * 1000) ,
            name,
          });
          
          await onCreateClient(data);
          
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
            name="userId"
            defaultValue={session.user.id}
            className="hidden"
          />
         
        </div>
        <Button className="w-full sm:w-fit" type="submit">
          Create
        </Button>
      </form>
      <table >
        <thead>
          <th scope="col">
            
            <h2>Clients</h2>
          </th>
        </thead>
        <Separator />
        <tbody >
          {optimisticClients.map((item: any) => {
            return (
              <>
                <tr key={`${item.name}-${Math.random()}`} className="group">
                  <td className="group-hover:scale-110">
                    <form className="flex">
                        <Input type='color' name='color' defaultValue={item.color} className={`bg-${item.color} h-8 p-0 aspect-square`}></Input>
                        
                        <Input type='text' name='text' defaultValue={item.name} disabled />
                    </form>
                    {item.name}
                    </td>
                  {/* <td className="group-hover:scale-110">
                    <form
                      className="flex  group"
                      action={async data => {
                          const clientId = data.get('clientId') as string
                            await deleteClient(clientId)
                        }
                      }
                   
                    >
                      <Input
                        className="hidden"
                        defaultValue={item.id}
                        name="clientId"
                      />
                      <Button className=' invisible group-hover:visible'>hello</Button>
                      
                     <Button  className=' invisible group-hover:visible' size="sm" variant="destructive">
                        <DeleteIcon />
                        </Button>
                     
                     
                    </form>
                  </td> */}
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
