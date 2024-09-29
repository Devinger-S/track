import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/utils/useMediaQuery";
import { useEffect } from "react";
import { Drawer, DrawerTrigger, DrawerContent } from "./ui/drawer";
import { Sheet, SheetTrigger, SheetContent } from "./ui/sheet";
import { Button } from "./ui/button";

export default function ActivityModal({
  activity,
  className,
}: {
  activity: any;
  className?: string;
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  useEffect(() => {
    console.log(activity);
  }, [activity]);
  const button = (
    <Button
      size="sm"
      variant="outline"
      className="h-6 rounded-[6px] border bg-transparent px-2 text-xs text-foreground shadow-none hover:bg-muted dark:text-foreground"
    >
      View Code
    </Button>
  );

  //   const content = (
  //     <>
  //       <div className="chart-wrapper hidden sm:block [&>div]:rounded-none [&>div]:border-0 [&>div]:border-b [&>div]:shadow-none [&_[data-chart]]:mx-auto [&_[data-chart]]:max-h-[35vh]">
  //         <span>children</span>
  //       </div>
  //     </>
  //   );
  if (!isDesktop) {
    return (
      <Drawer defaultOpen={true}>
        <DrawerTrigger className="hidden" asChild>
          {button}
        </DrawerTrigger>
        <DrawerContent
          className={cn(
            "flex max-h-[80vh] flex-col sm:max-h-[90vh] [&>div.bg-muted]:shrink-0",
            className
          )}
        >
          <div className="flex h-full flex-col overflow-auto">
            <pre className="z-50">{JSON.stringify(activity, null, 2)}</pre>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Sheet defaultOpen={true}>
      <SheetTrigger className="hidden" asChild>
        {button}
      </SheetTrigger>
      <SheetContent
        side="right"
        className={cn(
          "flex flex-col gap-0 border-l-0 p-0 dark:border-l sm:max-w-sm md:w-[700px] md:max-w-[700px]",
          className
        )}
      >
        <pre className="z-50">{JSON.stringify(activity, null, 2)}</pre>
      </SheetContent>
    </Sheet>
  );
  return (
    <>
      <div className="fixed inset-0 bg-background/80 grid place-items-center z-[100]">
        <pre className="z-50">{JSON.stringify(activity, null, 2)}</pre>
      </div>
    </>
  );
}
