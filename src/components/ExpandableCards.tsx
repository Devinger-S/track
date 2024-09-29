"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/lib/useOutsideClick";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";

import { ActivityWithRelations } from "@/types/types";
import { getActivities } from "@/utils/api-calls";
import { Badge } from "./ui/badge";
import { useBreakpoint } from "@/utils/useBreakpoints";
import { Span } from "next/dist/trace";
import { useMediaQuery } from "@/utils/useMediaQuery";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { cn } from "@/lib/utils";
import ActivityModal from "./ActivityModal";

export function ExpandableCards() {
  // const { width } = useBreakpoint();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { data } = useQuery<ActivityWithRelations[]>({
    queryKey: ["ActivitiesWhitRelations"],
    queryFn: getActivities,
  });

  const [active, setActive] = useState<ActivityWithRelations | boolean | null>(
    null
  );
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));
  function formatDate(date: Date | undefined | null) {
    if (!date) {
      return "Invalid Date";
    }

    try {
      return new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
      }).format(new Date(date));
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid Date";
    }
  }

  return (
    <>
      {/* <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-red-500/80 h-full w-full z-10"
          />
        )}
      </AnimatePresence> */}
      <AnimatePresence>
        {active && typeof active === "object" && (
          <ActivityModal activity={active} />
        )}
      </AnimatePresence>
      <ul className="max-w-4xl mx-auto w-full gap-4">
        {data &&
          data.map((activity, i) => (
            <motion.div
              layoutId={`card-${activity.name}-${id}`}
              key={`card-${activity.name}-${activity.id}`}
              className="p-4 flex  justify-between  items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
            >
              <motion.h3
                layoutId={`title-${activity.name}-${i}`}
                className="font-medium w-1/3  underline text-blue-500  text-center md:text-left"
                onClick={(e) => {
                  if (e.currentTarget === e.target) {
                    setActive(activity);
                  }
                }}
                // onClick={() => setActive(activity)}
              >
                {activity.name}
              </motion.h3>

              <motion.div className="flex border-border gap-2 w-1/3 ">
                <span>
                  {formatDate(activity.startAt)}
                  {/* {new Intl.DateTimeFormat(undefined, {
                        hour: "numeric",
                        minute: "numeric",
                      }).format(activity.startAt)} */}
                </span>
                <ArrowRight />
                <span className="">
                  {formatDate(activity.endAt)}
                  {/* {new Intl.DateTimeFormat("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                      }).format(activity.endAt || new Date())} */}
                </span>
              </motion.div>

              <div className="flex gap-4 w-1/3">
                <motion.div
                  layoutId={`button-${activity.name}-${id}`}
                  className="px-4 py-2  text-sm rounded-full font-bold     w-full mt-4 md:mt-0"
                >
                  {activity.client?.name && (
                    <Badge variant="outline">{activity.client.name}</Badge>
                  )}
                  {activity.project?.name && (
                    <Badge variant="outline">{activity.project.name}</Badge>
                  )}
                </motion.div>
              </div>
            </motion.div>
          ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};
