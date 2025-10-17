import { TrendingUp } from "lucide-react"
import { Pie, PieChart, Sector } from "recharts"
import { useState, useEffect } from "react"
import { useReportDataContext } from "@/hooks/useReportDataContext"

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

export const description = "Dynamic data distribution"

const chartConfig = {
  count: {
    label: "Count",
  },
  new_customers: {
    label: "New Customers",
    color: "var(--chart-1)",
  },
  repeat_customers: {
    label: "Repeat Customers",
    color: "var(--chart-2)",
  },
  completed_appointments: {
    label: "Completed Appointments",
    color: "var(--chart-3)",
  },
  pending_appointments: {
    label: "Pending Appointments",
    color: "var(--chart-4)",
  },
}

export default function DynamicPieChartContainer({ startDate, endDate, title = "Data Distribution" }) {
  const { chartData, isChartLoading, activeKPI } = useReportDataContext();
  const [chartDataState, setChartDataState] = useState([]);

  useEffect(() => {
    if (chartData.pie) {
      // Process the dynamic data based on the active KPI
      const processedData = processChartData(chartData.pie, activeKPI);
      setChartDataState(processedData);
    }
  }, [chartData.pie, activeKPI]);

  const processChartData = (data, kpi) => {
    // Default processing - can be customized based on KPI
    if (Array.isArray(data)) {
      return data.map((item, index) => ({
        category: item.category || `Category ${index + 1}`,
        count: item.count || item.value || 0,
        fill: `var(--chart-${(index % 4) + 1})`
      }));
    }
    
    // If data is an object, convert to array format
    return Object.entries(data).map(([key, value], index) => ({
      category: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      count: typeof value === 'number' ? value : 0,
      fill: `var(--chart-${(index % 4) + 1})`
    }));
  };

  if (isChartLoading) {
    return (
      <Card className="flex flex-col h-full">
        <CardHeader className="items-center pb-0">
          <CardTitle>{title}</CardTitle>
          <CardDescription>Loading chart data...</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <div className="h-[400px] bg-gray-100 animate-pulse rounded"></div>
        </CardContent>
      </Card>
    );
  }

  if (!chartData.pie || chartDataState.length === 0) {
    return (
      <Card className="flex flex-col h-full">
        <CardHeader className="items-center pb-0">
          <CardTitle>{title}</CardTitle>
          <CardDescription>No data available</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <div className="h-[400px] flex items-center justify-center text-gray-500">
            Click a KPI card to load data
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {activeKPI ? `Data for ${activeKPI}` : 'Click a KPI card to view data'}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[400px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
              formatter={(value, name) => [value, name]}
            />
            <Pie
              data={chartDataState}
              dataKey="count"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={0}
              activeShape={({
                outerRadius = 0,
                ...props
              }) => (
                <Sector {...props} outerRadius={outerRadius + 10} />
              )}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Dynamic data visualization <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          {activeKPI ? `Showing data for ${activeKPI}` : 'Select a KPI to view detailed data'}
        </div>
      </CardFooter>
    </Card>
  )
}
