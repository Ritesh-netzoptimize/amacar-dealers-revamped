import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
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
import { getAppointmentsReport } from "@/lib/api"

const chartConfig = {
  count: {
    label: "Vehicle Count",
    color: "var(--brand-orange)",
  },
  total_amount: {
    label: "Total Amount",
    color: "var(--chart-2)",
  },
} 

export function AppointmentBreakdownChart({ startDate, endDate }) {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVehiclesData = async () => {
      try {
        setIsLoading(true);
        
        // Use default date range if not provided
        const dateFrom = startDate || '2024-01-01';
        const dateTo = endDate || '2024-12-31';
        
        const response = await getAppointmentsReport(dateFrom, dateTo);
        
        if (response.success && response.summary) {
          const summary = response.summary;
          
          // Create bar chart data from vehicle summary
          const transformedData = [
            {
              category: "Auction Vehicles",
              count: summary.auction_vehicles || 0,
              total_amount: 0 // Vehicles don't have amounts in this API
            },
            {
              category: "Appraised Vehicles", 
              count: summary.appraised_vehicles || 0,
              total_amount: 0
            }
          ];
          
          setChartData(transformedData);
        }
      } catch (error) {
        console.error('Error fetching vehicles data:', error);
        setChartData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVehiclesData();
  }, [startDate, endDate]);
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Vehicle Activity</CardTitle>
          <CardDescription>Loading vehicle data...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] bg-gray-100 animate-pulse rounded"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vehicle Activity</CardTitle>
        <CardDescription>
          {startDate && endDate 
            ? `${startDate} - ${endDate}` 
            : 'Vehicle breakdown by type'
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
              formatter={(value, name) => {
                return [value, 'Vehicle Count'];
              }}
            />
            <Bar dataKey="count" fill="var(--brand-orange)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Vehicle activity trends <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing vehicle breakdown by auction and appraised types
        </div>
      </CardFooter>
    </Card>
  )
}
