
'use client'
import { Input } from "../ui/input"
import { Client } from "@prisma/client"
import { deleteActivity, updateClientName } from "./actions"


import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "../ui/button"
import { revalidatePath } from "next/cache"


type Props = {
  client: Client
}
type EditItemRowProps = Props & {
  onSave?: () => void
}

export const EditClient = ({ client, onSave }: EditItemRowProps) => {
  return (

    // <li id='editable_row' key={activity.id} className="py-2">
    <form
      key={client.id}
      className="flex items-center space-x-2"
      action={async (data) => {
        
        await updateClientName(data) //server action
        // onSave() //this is client side execution
      }} >
      <Input className='w-0' type="hidden" name="id" defaultValue={client.id} />
      <Input autoFocus className='w-full' type="text" name="name" defaultValue={client.name || ""} />
      <span className="flex-grow"></span>
      <Button type="submit">Save</Button>

    </form>
  )

}

export const EditClientRow = ({ client }: Props) => {
  return (

    <EditClient client={client} />
  )
}
