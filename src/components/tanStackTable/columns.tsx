"use client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowRight, ArrowUpDown, MoreHorizontal } from "lucide-react"
import { deleteActivity, updateActivity, updateActivityName } from "./actions"
import { useState} from 'react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
 Dialog,
 DialogContent,
 DialogDescription,
 DialogHeader,
 DialogTitle,
 DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "../ui/button"
import { ButtonServerAction } from "../ui/ButtonServerAction"
import { Input } from "../ui/input"
import { cn } from "@/lib/utils"
import { EditIcon } from "../ui/svg/EditICon"
import { EditItemRow } from "./activity-item-row"
import { DeleteIcon } from "../ui/svg/DeleteIcon"


export const columns: ColumnDef<any>[] = [
	{
		id: 'name',
		accessorKey: "Activity Name",
		header: "Activity Name",
  
		cell: ({ row }) => (
   <div>{row.original.name}</div>
			// <form action={async (data) => updateActivityName(data)}>
   //  <Input    name='activityName' defaultValue={row.original.name}/>
   //  <Input type='hidden' name='activityId' defaultValue={row.original.id}/>
			// </form>
		),
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
		id: 'Clients',
		accessorKey: 'Clients',
		header: () => <div className="text-left">Clients</div>,
		cell: ({ row }) => {

			const { client } = row.original
			
			return (
				<>
    {client ? client : '-'}
						{/* <form 
      action={() => console.log('all cells ***',row.getAllCells())}
      >
       <Input defaultValue={!client?.name ? '-' : client.name} />
       </form> */}
				</>
			)
		}
	},
	{
		id: 'Project',
		accessorKey: 'Project',
		header: 'Project',
		cell: ({ row }) => {
   // console.log(row.original)
   
			const {project} = row.original
			return (
				<>
					{project ? project : '-'}
				</>
			)
		}
	},
	{
		id: "actions",
  accessorKey:'Actions',
  header:'Actions',
		cell: ({ row }) => {
   return (
    <span className="flex">
     <Dialog >
  <DialogTrigger asChild><Button variant='ghost'><EditIcon/></Button></DialogTrigger>
  <DialogContent className="max-w-full w-full">
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription asChild>
       <>
       <EditItemRow activity={row.original} />
        <pre>{JSON.stringify(row.original,null,2)}</pre>
      </>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
<Dialog >
  <DialogTrigger asChild><Button className="hover:bg-red-500 hover:scale-110 " variant='ghost'><DeleteIcon/></Button></DialogTrigger>
  <DialogContent className="max-w-full w-full">
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription asChild>
       <>
       {/* <EditItemRow activity={row.original} /> */}
        <pre>{JSON.stringify(row.original,null,2)}</pre>
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

			

	
