import { User, Activity, Client, Project, Session } from '@prisma/client'

export type NewActivityProps = {
  activity?: Activity | null
  clients: Client[]
  projects: Project[]
  userId:string 
}

export type DailyActivitiesprops = {
  activity: Activity[]
  clients: Client[],
  projects: Project[]
}
