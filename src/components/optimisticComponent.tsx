'use client'

import { useOptimistic } from "react"

export const OptimisticComponent = ({clients}:any) => {
const [optimisticClients, addOptimisticClient] = useOptimistic(
    clients,
    (state, newClient) => {
      return [...state, newClient];
    }
  );
    return (
        <>
        {optimisticClients.map( (item:any) => (
            <div key={item.id}>{item.name}</div>
        ))}


        </>
    )
}