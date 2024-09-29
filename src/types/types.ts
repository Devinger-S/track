import { User, Activity, Client, Project, Session } from '@prisma/client'

export type NewActivityProps = {
  activity?: Activity | null
  clients?: Client[]
  projects?: Project[]
  userId:string 
}


export type ActivityWithRelations = Activity & {
  client: Client | null;
  project: Project | null;
};
