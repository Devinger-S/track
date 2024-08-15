"use client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowRight, ArrowUpDown, Delete } from "lucide-react"
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
import { EditItemRow } from "./activity-item-row"
import { DeleteIcon } from "../ui/svg/DeleteIcon"
import { ButtonServerAction } from "../ui/ButtonServerAction"
import { deleteActivity } from "@/app/actions"
import { deleteClient } from "./actions"


export const columns: ColumnDef<any>[] = [

  {
    id: 'name',
    accessorKey: "Activity Name",
    header: "Activity Name",
    cell: ({ row }) => {
      return (
        <div>{row.original.name}</div>
      )
    },
  },

  {
    id: "date",
    accessorKey: "Date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="flex border-border gap-2 grow" >
        <span >
          {new Intl.DateTimeFormat(undefined, {
            hour: 'numeric',
            minute: 'numeric'
          }).format(row.original.startAt)}
        </span>
        <ArrowRight />
        <span className="">
          {new Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            minute: 'numeric'
          }).format(row.original.endAt || new Date())}
        </span>
      </div>
    ),
  },

  {
    id: 'clients',
    accessorKey: 'Clients',
    header: () => <div className="text-left">Clients</div>,
    cell: ({ row }) => {
      return (
        <>
          {row.original.clientId ? row.original.client.name : '-'}
        </>
      )
    }
  },

  {
    id: 'Project',
    accessorKey: 'Project',
    header: 'Project',
    cell: ({ row }) => {
      // console.log('from row.original projects', row.original)
      return (
        <>
          {row.original.projectId ? row.original.project.name : '-'}
        </>
      )
    }
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
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription asChild>
                  <>
                    <EditItemRow activity={row.original} />
                  </>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <ButtonServerAction onClick={() => deleteActivity(row.original.id)} size='sm' variant='destructive' className=" hover:scale-110 " ><DeleteIcon /></ButtonServerAction>
          {/* <Button size='sm' onClick={(id) => deleteActivity(id)} variant='destructive'><DeleteIcon /></Button> */}
          {/* <Dialog > */}
          {/*   <DialogTrigger asChild><Button size='sm' variant='destructive' className=" hover:scale-110 " ><DeleteIcon /></Button></DialogTrigger> */}
          {/*   <DialogContent className="max-w-full w-full"> */}
          {/*     <DialogHeader> */}
          {/*       <DialogTitle>Are you absolutely sure?</DialogTitle> */}
          {/*       <DialogDescription asChild> */}
          {/*         <> */}
          {/*           {/* <EditItemRow activity={row.original} /> */}
          {/*           <pre>{JSON.stringify(row.original, null, 2)}</pre> */}
          {/*         </> */}
          {/*       </DialogDescription> */}
          {/*     </DialogHeader> */}
          {/*   </DialogContent> */}
          {/* </Dialog> */}
        </span>
      )
    }
  }
]




