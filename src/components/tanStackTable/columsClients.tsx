
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


export const columnsClients: ColumnDef<any>[] = [
  {
    id: 'name',
    accessorKey: "Client Name",
    header: "Client Name",

    cell: ({ row }) => (
      <div>{row.original.name}</div>
    ),
  },

  // {
  //   id: "date",
  //   accessorKey: "Date",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Date
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     )
  //   },
  //   cell: ({ row }) => (
  //     <div className="flex border-border gap-2 grow" >
  //       <span >
  //         {new Intl.DateTimeFormat(undefined, {
  //           hour: 'numeric',
  //           minute: 'numeric'
  //         }).format(row.original.startAt)}
  //       </span>
  //       <ArrowRight />
  //       <span className="">
  //         {new Intl.DateTimeFormat('en-US', {
  //           hour: 'numeric',
  //           minute: 'numeric'
  //         }).format(row.original.endAt || new Date())}
  //       </span>
  //     </div>
  //   ),
  // },

  // {
  //   id: 'Clients',
  //   accessorKey: 'Clients',
  //   header: () => <div className="text-left">Clients</div>,
  //   cell: ({ row }) => {
  //
  //     const { client } = row.original
  //
  //     return (
  //       <>
  //         {client ? client : '-'}
  //         {/* <form 
  //     action={() => console.log('all cells ***',row.getAllCells())}
  //     >
  //      <Input defaultValue={!client?.name ? '-' : client.name} />
  //      </form> */}
  //       </>
  //     )
  //   }
  // },
  // {
  //   id: 'Project',
  //   accessorKey: 'Project',
  //   header: 'Project',
  //   cell: ({ row }) => {
  //     // console.log(row.original)
  //
  //     const { project } = row.original
  //     return (
  //       <>
  //         {project ? project : '-'}
  //       </>
  //     )
  //   }
  // },
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
              <ButtonServerAction onClick={() => deleteClient(row.original.id)} size='sm' variant='destructive' className=" hover:scale-110 " 
                >
                  <DeleteIcon />
                  </ButtonServerAction>
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




