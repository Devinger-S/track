'use client'

import { useEffect, useState } from "react"
import { pad } from '@/utils/pad'


type Props = {
  startAt: string
}
const ActivityDuration = ({ startAt = '00:00:00' }: Props) => {
  const [elapsed, setElapsed] = useState(0)
  useEffect(() => {


    const interval = setInterval(() => {
      const now = new Date()
      const date = new Date(startAt) // transform startAt prop from string format to Date format
      const elapsed = now.getTime() - date.getTime()
      setElapsed(elapsed);

    }, 1000)

    return () => {
      clearInterval(interval)
    }
  })

  const hours = Math.floor(elapsed / 1000 / 60 / 60)
  const minutes = Math.floor((elapsed / 1000 / 60) % 60)
  const seconds = Math.floor((elapsed / 1000) % 60)




  return <div className="font-lg slashed-zero tabular-nums  ">
    {pad(hours)}:
    {pad(minutes)}:
    {pad(seconds)}
  </div>
}
export default ActivityDuration
