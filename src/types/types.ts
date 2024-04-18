import { Activity, Client, Project } from '@prisma/client'

export type NewActivityProps = {
	activity?: Activity | null
	clients: Client[]
	projects: Project[]
}

export type DailyActivitiesprops = {
	activities: Activity[]
	clients: Client[],
	projects: Project[]
}