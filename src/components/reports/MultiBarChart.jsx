import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "January", desktop: 186, mobile: 80, Tablet: 100 },
  { month: "February", desktop: 305, mobile: 200, Tablet: 120 },
  { month: "March", desktop: 237, mobile: 120, Tablet: 140 },
  { month: "April", desktop: 73, mobile: 190, Tablet: 160 },
  { month: "May", desktop: 209, mobile: 130, Tablet: 180 },
  { month: "June", desktop: 214, mobile: 140, Tablet: 200 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--brand-orange)",
  },
  mobile: {
    label: "Tablet",
    color: "var(--brand-orange)",
  },
} 

export function MultiBarChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Multi Bar Chart</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="desktop" fill="var(--brand-orange)" radius={4} />
            <Bar dataKey="mobile" fill="var(--brand-orange)" radius={4} />
            <Bar dataKey="Tablet" fill="var(--brand-orange)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
