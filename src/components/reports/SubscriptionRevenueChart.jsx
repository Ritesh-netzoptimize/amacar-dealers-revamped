import { useState, useEffect } from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { TrendingUp, DollarSign } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { getSubscriptionRevenueReport } from "@/lib/api"

export const description = "Financial performance tracking"

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "#4F46E5",
  },
}

export default function SubscriptionRevenueChart({ startDate, endDate }) {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        setIsLoading(true);
        
        // Use default date range if not provided
        const dateFrom = startDate || '2024-01-01';
        const dateTo = endDate || '2024-12-31';
        
        const response = await getSubscriptionRevenueReport(dateFrom, dateTo);
        
        if (response.success && response.data) {
          // Transform API data to chart format
          const transformedData = response.data.map(item => ({
            period: item.period,
            revenue: Math.round((item.revenue || 0) / 1000) // Convert to thousands
          }));
          
          setChartData(transformedData);
        }
      } catch (error) {
        console.error('Error fetching revenue data:', error);
        setChartData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRevenueData();
  }, [startDate, endDate]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Subscription Revenue</CardTitle>
          <CardDescription>Loading revenue data...</CardDescription>
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
        <CardTitle>Subscription Revenue Tracking</CardTitle>
        <CardDescription>
          {startDate && endDate 
            ? `${startDate} - ${endDate}` 
            : 'Financial performance over time'
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="period"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
              }}
            />
            <YAxis />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent 
                formatter={(value) => [`$${value.toLocaleString()}K`, 'Revenue']}
              />}
            />
            <Bar dataKey="revenue" fill="#4F46E5" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
