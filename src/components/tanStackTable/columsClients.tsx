
"use client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowRight, ArrowUpDown } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "../ui/button"
import { EditIcon } from "../ui/svg/EditICon"
import { EditClient } from "@/components/tanStackTable/Edit_client_Popup"
import { DeleteIcon } from "../ui/svg/DeleteIcon"
import { ButtonServerAction } from "../ui/ButtonServerAction"
import { deleteClient } from "./actions"
import { Input } from "../ui/input"


export const columnsClients: ColumnDef<any>[] = [
  {
    id: 'name',
    accessorKey: "Client Name",
    header: "Client Name",

    cell: ({ row }) => (
      <div>{row.original.name}</div>
    ),
  },

  
  {
    id: "actions",
    accessorKey: 'Actions',
    header: 'Actions',
    cell: ({ row }) => {
      return (
        <span className="flex">
          <Dialog >
            <DialogTrigger asChild><Button size='sm' variant='ghost'><EditIcon /></Button></DialogTrigger>
            <DialogContent className="max-w-full w-full">
              <DialogHeader>
                <DialogTitle>Rename {row.original.name}</DialogTitle>
                <DialogDescription asChild>
                  <>
                    <EditClient client={row.original} />
                  </>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Dialog >
            <DialogTrigger asChild>
              <>
              <form action={async data => {
                const id = data.get('id') as string
                await deleteClient(id)
              }}>
                <Input name='id' type='text' className='hidden' defaultValue={row.original.id || null} />
              <Button   variant='destructive' size='sm'><DeleteIcon /></Button>
              </form>
              </>
             
                  </DialogTrigger>
            <DialogContent className="max-w-full w-full">
              <DialogHeader>
                <DialogTitle>You are deleting client {row.original.name}</DialogTitle>
                <DialogDescription asChild>
                  <>
                    {/* <EditItemRow activity={row.original} /> */}
                    <pre>{JSON.stringify(row.original, null, 2)}</pre>
                  </>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </span>
      )
    }
  }
]




