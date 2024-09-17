'use client'

import { Client, User } from "@prisma/client"
import { useEffect, useOptimistic } from "react";
import { ClientCard } from "./ClientCard";
type Props = {
    clients: Client[] 
}

export const ClientRows = ({clients}:{clients:any}) => {
    // const { client, project } = user;
    // console.log(client)
    
    
  const [ optimisticClients, addOptimisticClient ] = useOptimistic(
    clients,
    (state:Client[], newClient:any) => {
        return [...state, newClient];
      }
    ) 
    // useEffect(()=>{console.log(optimisticClients)},[optimisticClients]) 
    return (
        <>
        <section className="w-full bg-red-50 mt-40 h-full">
            {optimisticClients.map(client => {
                return (
                    <div key={client.id} className="client">
                        <ClientCard client={client} />
                    </div>
                )
            })}
            
        </section>

        

        </>
    )
}