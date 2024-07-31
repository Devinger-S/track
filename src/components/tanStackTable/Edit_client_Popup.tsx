
'use client'
import { Input } from "../ui/input"
import { Client } from "@prisma/client"
import { deleteActivity, updataClientName } from "./actions"


import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "../ui/button"


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
        await updataClientName(data) //server action
        // onSave() //this is client side execution
      }} >
      <Input className='w-0' type="hidden" name="id" defaultValue={client.id} />
      <Input autoFocus className='w-full' type="text" name="name" defaultValue={client.name || ""} />
      <span className="flex-grow"></span>
      <Button type="submit">Save</Button>

    </form>
  )

}
// type ReadItemRowProps = Props & {
//   edit: () => void,
//   onDelete: (id: string) => void,
// }
// const ReadItemRow = ({ activity, edit, onDelete }: ReadItemRowProps) => {
//   return (
//
//     <li key={activity.id} id="read_only" className=" flex gap-4 relative  w-full items-center">
//       <div id='name' className='text-bold text-xl break-words'>
//         {activity.name}
//       </div>
//       <div className="flex border-border gap-2 grow" id="">
//         <span >
//           {new Intl.DateTimeFormat(undefined, {
//             hour: 'numeric',
//             minute: 'numeric'
//           }).format(activity.startAt)}
//         </span>
//         <ArrowRight />
//         <span className="bg-red-400">
//           {new Intl.DateTimeFormat('en-US', {
//             hour: 'numeric',
//             minute: 'numeric'
//           }).format(activity.endAt || new Date())}
//         </span>
//       </div>
//       <span className="flex-grow"></span>
//
//       <span className="">
//         <Button onClick={edit} variant='outline'>Edit</Button>
//         <Button onClick={async () => onDelete(activity.id)}
//           variant='destructive'>Delete</Button>
//       </span>
//     </li>
//   )
// }
export const EditClientRow = ({ client }: Props) => {
  return (

    <EditClient client={client} />
  )
}
