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
        
        if (response.success && response.data) {
          const data = response.data;
          const summary = response.summary;
          
          // Calculate totals from the data array
          const totalNewCustomers = data.reduce((sum, item) => sum + (item.new_customers || 0), 0);
          const totalRepeatCustomers = data.reduce((sum, item) => sum + ((item.total_customers || 0) - (item.new_customers || 0)), 0);
          const totalAppointments = data.reduce((sum, item) => sum + (item.total_appointments || 0), 0);
          const completedAppointments = data.reduce((sum, item) => sum + (item.completed_appointments || 0), 0);
          
          // Create pie chart data from the data array
          const transformedData = [
            { 
              category: "New Customers", 
              count: totalNewCustomers, 
              fill: "var(--chart-1)" 
            },
            { 
              category: "Repeat Customers", 
              count: totalRepeatCustomers, 
              fill: "var(--chart-2)" 
            },
            { 
              category: "Completed Appointments", 
              count: completedAppointments, 
              fill: "var(--chart-3)" 
            },
            { 
              category: "Pending Appointments", 
              count: totalAppointments - completedAppointments, 
              fill: "var(--chart-4)" 
            }
          ];
          
          setChartData(transformedData);
        }
      } catch (error) {
        console.error('Error fetching customers data:', error);
        // Fallback data
        setChartData([
          { category: "New Customers", count: 0, fill: "var(--chart-1)" },
          { category: "Repeat Customers", count: 0, fill: "var(--chart-2)" },
          { category: "Completed Appointments", count: 0, fill: "var(--chart-3)" },
          { category: "Pending Appointments", count: 0, fill: "var(--chart-4)" },
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
              formatter={(value, name) => [value, name]}
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
          Showing customer activity and appointment distribution
        </div>
      </CardFooter>
    </Card>
  )
}
