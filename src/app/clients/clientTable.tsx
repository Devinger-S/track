"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Activity, Client, Project } from "@prisma/client";
import {
  AwaitedReactNode,
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useMemo,
  useOptimistic,
} from "react";
import { onCreateClient } from "../actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PieChart, TrendingUp } from "lucide-react";
import { Pie, Label } from "recharts";
import { Badge } from "@/components/ui/badge";

type ClientInclude = Client & {
  project: Project[];
  activity: Activity[];
};

type ClientTableProps = {
  clients: ClientInclude[];
};
export const ClientTable: React.FC<ClientTableProps> = ({ clients }) => {
  
  const chartConfig = {
    Total: {
      label: "hours",
    },
    chrome: {
      label: "Chrome",
      color: "hsl(var(--chart-1))",
    },
    safari: {
      label: "Safari",
      color: "hsl(var(--chart-2))",
    },
    firefox: {
      label: "Firefox",
      color: "hsl(var(--chart-3))",
    },
    edge: {
      label: "Edge",
      color: "hsl(var(--chart-4))",
    },
    other: {
      label: "Other",
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig;

  const chartData = [
    { browser: "chrome", visitors: 275, fill: "rgb(0 0 0)" },
    { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
    { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
    { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
    { browser: "other", visitors: 190, fill: "var(--color-other)" },
  ];

  const totalVisitors = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  return (
    <>
      <div className="mx-auto container py-4">
        <h2 className="text-lg font-medium mb-2">Create a new client</h2>
        <form action={onCreateClient} className="flex items-center gap-4">
          <Input
            type="color"
            name="color"
            placeholder="Color"
            className="w-12"
          />
          <Input className="hidden" type="text" name="userId" />
          <Input
            type="text"
            name="name"
            placeholder="Client name"
            className="w-full"
          />
          <Button>Create</Button>
        </form>
      </div>

      <Card className="flex justify-around grow items-center gap-8">
        <CardTitle>Clients</CardTitle>
        <CardTitle>Activities</CardTitle>
        <CardTitle>Projects</CardTitle>
      </Card>
      <Accordion type="single" collapsible className="w-full">
        {clients.map((client: any) => (
          <>
            <AccordionItem value={client.id}>
              <AccordionTrigger>
                <div className="flex justify-around grow items-center gap-8">
                  <Badge variant="default" className="">
                    {client.name}{" "}
                  </Badge>
                  <div id='project-wrapper' className="">
                    {client.project.length ? (
                      client.project.map((project: Project) => (
                        <Badge variant="secondary" key={project.id}>
                          {project.name}
                        </Badge>
                      ))
                    ) : (
                      <Badge variant="outline">-</Badge>
                    )}
                  </div>
                  <div>
                  {client.activity.length ? (
                    client.activity.map((activity: Activity) => (
                      <Badge variant='outline' key={activity.id}>{activity.name}</Badge>
                    ))
                  ) : (
                    <Badge variant="outline">-</Badge>
                  )}
</div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <Card className="flex flex-col">
                  <CardHeader className="items-center pb-0">
                    <CardTitle>Pie Chart - Donut with Text</CardTitle>
                    <CardDescription>January - June 2024</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 pb-0">
                    <ChartContainer
                      config={chartConfig}
                      className="mx-auto aspect-square max-h-[250px]"
                    >
                      <PieChart>
                        <ChartTooltip
                          cursor={false}
                          content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                          data={chartData}
                          dataKey="visitors"
                          nameKey="browser"
                          innerRadius={60}
                          strokeWidth={5}
                        >
                          <Label
                            content={({ viewBox }) => {
                              if (
                                viewBox &&
                                "cx" in viewBox &&
                                "cy" in viewBox
                              ) {
                                return (
                                  <text
                                    x={viewBox.cx}
                                    y={viewBox.cy}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                  >
                                    <tspan
                                      x={viewBox.cx}
                                      y={viewBox.cy}
                                      className="fill-foreground text-3xl font-bold"
                                    >
                                      {totalVisitors.toLocaleString()}
                                    </tspan>
                                    <tspan
                                      x={viewBox.cx}
                                      y={(viewBox.cy || 0) + 24}
                                      className="fill-muted-foreground"
                                    >
                                      Visitors
                                    </tspan>
                                  </text>
                                );
                              }
                            }}
                          />
                        </Pie>
                      </PieChart>
                    </ChartContainer>
                  </CardContent>
                  <CardFooter className="flex-col gap-2 text-sm">
                    <div className="flex items-center gap-2 font-medium leading-none">
                      Trending up by 5.2% this month{" "}
                      <TrendingUp className="h-4 w-4" />
                    </div>
                    <div className="leading-none text-muted-foreground">
                      Showing total visitors for the last 6 months
                    </div>
                  </CardFooter>
                </Card>
              </AccordionContent>
            </AccordionItem>
          </>
        ))}
      </Accordion>
    </>
  );
};
