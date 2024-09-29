import { auth } from "auth";
import { redirect } from "next/navigation";
import NewActivity from "./components/newActivity";
import { ExpandableCards } from "@/components/ExpandableCards";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { HydrationBoundary } from "@tanstack/react-query";
import { getActivities } from "@/utils/api-calls";

export default async function Track() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    redirect("/");
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["serverActivities"],
    queryFn: getActivities,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <main
      id="TrackPage"
      className="  flex h-screen  flex-col  relative   gap-8 overflow-hidden"
    >
      <HydrationBoundary state={dehydratedState}>
        <NewActivity userId={userId} />
        <div className="flex flex-col overflow-y-auto ">
          <h2 className=" hidden text-lg sm:block font-medium mb-2 md:p-2 ">
            Here is what you`ve done today
          </h2>
          <ExpandableCards />
        </div>
      </HydrationBoundary>
    </main>
  );
}
