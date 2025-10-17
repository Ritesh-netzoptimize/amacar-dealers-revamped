import { useState, useEffect } from "react"
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { TrendingUp } from "lucide-react"

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
import { getUserActivityReport } from "@/lib/api"

export const description = "User engagement monitoring"

const chartConfig = {
  active_users: {
    label: "Active Users",
    color: "#4F46E5",
  },
  total_sessions: {
    label: "Total Sessions",
    color: "#15A9D8",
  },
}

export default function UserActivityChart({ startDate, endDate }) {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        
        // Use default date range if not provided
        const dateFrom = startDate || '2024-01-01';
        const dateTo = endDate || '2024-12-31';
        
        const response = await getUserActivityReport(dateFrom, dateTo);
        
        if (response.success && response.data) {
          // Transform API data to chart format
          const transformedData = response.data.map(item => ({
            period: item.period,
            active_users: item.active_users || 0,
            total_sessions: item.total_sessions || 0
          }));
          
          setChartData(transformedData);
        }
      } catch (error) {
        console.error('Error fetching user activity data:', error);
        setChartData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [startDate, endDate]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>User Activity</CardTitle>
          <CardDescription>Loading user data...</CardDescription>
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
        <CardTitle>User Activity Monitoring</CardTitle>
        <CardDescription>
          {startDate && endDate 
            ? `${startDate} - ${endDate}` 
            : 'User engagement over time'
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="period"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
              }}
            />
            <YAxis />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <Line
              dataKey="active_users"
              type="monotone"
              stroke="#4F46E5"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="total_sessions"
              type="monotone"
              stroke="#15A9D8"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
