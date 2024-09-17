import { auth } from "auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { DailyActivitiesprops, NewActivityProps } from "@/types/types";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import {
  BriefcaseBusiness,
  Building2,
  FolderOpenDot,
  Pause,
  Play,
} from "lucide-react";
import { DataTable } from "@/components/tanStackTable/data-table";
import { columns } from "@/components/tanStackTable/columnsTrack";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import SelectClient from "@/components/selectClient";
import { onCreateProject, stopActivity, upsertActivity } from "../actions";
import { redirect } from "next/navigation";
import { Client, Session, User } from "@prisma/client";
import SelectProjects from "@/components/selectProjects";
import { ActivityItemRow } from "@/components/tanStackTable/activity-item-row";
import NewActivity from "./components/newActivity";

export default async function Track() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    redirect("/");
  }

  const DailyActivity = ({
    activity,
    clients,
    projects,
  }: DailyActivitiesprops) => {
    return (
      <>
        <div className="flex flex-col overflow-y-auto ">
          <h2 className=" hidden text-lg sm:block font-medium mb-2 md:p-2 ">
            Here is what you`ve done today
          </h2>
          <DataTable
            clients={clients}
            projects={projects}
            columns={columns}
            data={activity}
          />
        </div>
      </>
    );
  };

  const currentActivity = await prisma.activity.findFirst({
    where: {
      endAt: null,
    },
  });
  const clients = await prisma.client.findMany({
    where: {
      userId,
    },
  });

  const projects = await prisma.project.findMany({
    where: {
      userId,
    },
  });

  const now = new Date();

  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  const endOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23,
    59,
    59
  );

  const dailyActivities = await prisma.activity.findMany({
    where: {
      userId,

      OR: [
        {
          startAt: {
            equals: startOfToday,
          },
        },
        {
          endAt: {
            lte: endOfToday,
          },
        },
      ],
    },
    include: {
      client: true, // Include the related Client if exists
      project: true, // Include the related Project if exists
    },
    orderBy: {
      startAt: "desc",
    },
  });

  return (
    <main
      id="TrackPage"
      className="  flex h-screen  flex-col  relative   gap-8 overflow-hidden"
    >
      <NewActivity
        activity={currentActivity}
        clients={clients}
        projects={projects}
        userId={userId}
      />
      {/* <DailyActivity clients={clients} projects={projects} activity={dailyActivities} /> */}
    </main>
  );
}
