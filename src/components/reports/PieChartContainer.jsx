import { TrendingUp } from "lucide-react"
import { Pie, PieChart, Sector } from "recharts"
import { useState, useEffect } from "react"

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
import { getCustomersReport } from "@/lib/api"

export const description = "Customer activity distribution"

const chartConfig = {
  count: {
    label: "Customer Count",
  },
  active: {
    label: "Active Customers",
    color: "var(--chart-1)",
  },
  new: {
    label: "New Customers",
    color: "var(--chart-2)",
  },
  returning: {
    label: "Returning Customers",
    color: "var(--chart-3)",
  },
}

export default function PieChartContainer({ startDate, endDate }) {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCustomersData = async () => {
      try {
        setIsLoading(true);
        
        // Use default date range if not provided
        const dateFrom = startDate || '2024-01-01';
        const dateTo = endDate || '2024-12-31';
        
        const response = await getCustomersReport(dateFrom, dateTo);
        
        if (response.success && response.summary) {
          const summary = response.summary;
          
          // Create pie chart data from customer summary
          const transformedData = [
            { 
              category: "With Vehicles", 
              count: summary.customers_with_vehicles || 0, 
              fill: "var(--chart-1)" 
            },
            { 
              category: "Without Vehicles", 
              count: summary.customers_without_vehicles || 0, 
              fill: "var(--chart-2)" 
            }
          ];
          
          setChartData(transformedData);
        }
      } catch (error) {
        console.error('Error fetching customers data:', error);
        // Fallback data
        setChartData([
          { category: "With Vehicles", count: 0, fill: "var(--chart-1)" },
          { category: "Without Vehicles", count: 0, fill: "var(--chart-2)" },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomersData();
  }, [startDate, endDate]);
  if (isLoading) {
    return (
      <Card className="flex flex-col h-full">
        <CardHeader className="items-center pb-0">
          <CardTitle>Customer Distribution</CardTitle>
          <CardDescription>Loading customer data...</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <div className="h-[400px] bg-gray-100 animate-pulse rounded"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Customer Distribution</CardTitle>
        <CardDescription>
          {startDate && endDate 
            ? `${startDate} - ${endDate}` 
            : 'Customer activity breakdown'
          }
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
              formatter={(value, name) => [value, 'Customers']}
            />
            <Pie
              data={chartData}
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
          Customer activity distribution <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing customer breakdown by vehicle ownership
        </div>
      </CardFooter>
    </Card>
  )
}
