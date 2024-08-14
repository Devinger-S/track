import { User, Activity, Client, Project } from '@prisma/client'

export type NewActivityProps = {
  activity?: Activity | null
  clients: Client[]
  projects: Project[]
  user:User
}

export type DailyActivitiesprops = {
  activity: Activity[]
  clients: Client[],
  projects: Project[]
}
