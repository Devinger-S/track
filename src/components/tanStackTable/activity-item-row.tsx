'use client'
import { Input } from "../ui/input"
import { Activity } from "@prisma/client"
import { ArrowRight, CalendarIcon, Delete, Edit, Edit2, TimerIcon } from "lucide-react"
import { useState } from "react"
import { deleteActivity, updateActivity } from "./actions"

import { pad } from "@/utils/pad"
import { Calendar } from "@/components/ui/calendar"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "../ui/button"
import { useBreakpoint } from "@/utils/useBreakpoints"


type Props = {
  activity: Activity
}
type EditItemRowProps = Props & {
  onSave?: () => void
}
type EditDateTimeProps = {
  name?: string,
  value: Date,
  onChange?: (date: Date) => void
}
const EditDateTime = ({ name, value, onChange }: EditDateTimeProps) => {
  const [date, setDate] = useState(value)
  const onDate = (d: Date | undefined) => {
    if (!d) return
    d.setHours(date.getHours())
    d.setMinutes(date.getMinutes())
    d.setSeconds(date.getSeconds())
    setDate(d)
    onChange && onChange(d)

  }
  return (
    <div className="">
      <div className="relative flex items-center">
        <input type="hidden" name={name} defaultValue={date.toISOString()} />
        <Input type="time"
          className="pr-8 "
          value={`${pad(date.getHours())}:${pad(date.getMinutes())}`}
          onChange={(e) => {
            const [hours, minutes] = e.target.value.split(':')
            const newDate = new Date(date)
            newDate.setHours(parseInt(hours) | 0)
            newDate.setMinutes(parseInt(minutes) | 0)
            setDate(newDate)
            onChange && onChange(newDate)
          }}
        />
        <Popover>
          <PopoverTrigger className='absolute right-2'>
            <CalendarIcon size={16} />
          </PopoverTrigger>
          <PopoverContent>
            <Calendar
              className=''
              mode="single"
              selected={date}
              onSelect={onDate}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

export const EditItemRow = ({ activity, onSave }: EditItemRowProps) => {
  return (

    // <li id='editable_row' key={activity.id} className="py-2">
    <form
      key={activity.id}
      className="flex items-center space-x-2"
      action={async (data) => {
        await updateActivity(data) //server action
        // onSave() //this is client side execution
      }} >
      <Input className='w-0' type="hidden" name="id" defaultValue={activity.id} />
      <Input autoFocus className='w-full' type="text" name="name" defaultValue={activity.name || ""} />
      <EditDateTime name='startAt' value={activity.startAt} />
      <EditDateTime name='endAt' value={activity.endAt || new Date()} />
      <span className="flex-grow"></span>
      <Button type="submit">Save</Button>

    </form>
    // </li>
  )

}
type ReadItemRowProps = Props & {
  edit: () => void,
  onDelete: (id: string) => void,
}
const ReadItemRow = ({ activity, edit, onDelete }: ReadItemRowProps) => {
  const {width} = useBreakpoint()
  return (
    <li
      key={activity.id}
      id="read_only"
      className="  group flex gap-4 relative bg-muted p-4  w-full items-center"
    >
      <div
        id="name"
        className="text-bold   text-2xl min-w-[33%] break-words"
      >
        {activity.name}
      </div>
      <div className="flex   text-2xl border-border gap-2" id="time">
        {width > 640 ? (
          <>
            <span>
              {new Intl.DateTimeFormat(undefined, {
                hour: "numeric",
                minute: "numeric",
              }).format(activity.startAt)}
            </span >
            <span className="flex justify-center items-center">
            <ArrowRight />

            </span>
            <span className="">
              {new Intl.DateTimeFormat("en-US", {
                hour: "numeric",
                minute: "numeric",
              }).format(activity.endAt || new Date())}
            </span>
          </>
        ) : (
          <TimerIcon />
        )}
      </div>
      <span className="flex-grow"></span>

      <span className=" invisible group-hover:visible ">
        <Button onClick={edit} variant="ghost">
          {width > 768 ? "Edit" : <Edit />}
        </Button>

        <Button
          onClick={async () => onDelete(activity.id)}
          variant="destructive"
        >
          {width > 768 ? "Delete" : <Delete />}
        </Button>
      </span>
    </li>
  );
}
export const ActivityItemRow = ({ activity }: Props) => {
  console.log('activity',activity )
  const [isEditing, setIsEditing] = useState(false)
  return isEditing ? (
    <EditItemRow activity={activity} onSave={() => setIsEditing(false)} />
  ) : (
    <ReadItemRow
      activity={activity}
      edit={() => setIsEditing(true)}
      onDelete={deleteActivity}
    />
  )
}
