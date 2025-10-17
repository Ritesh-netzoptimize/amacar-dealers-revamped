import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { canAccessBidPerformanceReport } from "@/utils/rolePermissions"

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
import { getBidPerformanceReport } from "@/lib/api"

export const description = "Bids trend over time"

const chartConfig = {
  total_bids: {
    label: "Total Bids",
    color: "#4F46E5",
  },
  total_bid_amount: {
    label: "Total Bid Amount",
    color: "#15A9D8",
  },
} 

export default function BidPerformanceChart({ startDate, endDate }) {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useSelector((state) => state.user);
  const userRole = user?.role;

  useEffect(() => {
    const fetchBidsData = async () => {
      try {
        setIsLoading(true);
        
        // Use default date range if not provided
        const dateFrom = startDate || '2024-01-01';
        const dateTo = endDate || '2024-12-31';
        
        const response = await getBidPerformanceReport(dateFrom, dateTo);
        
        if (response.success && response.data) {
          // Transform API data to chart format
          const transformedData = response.data.map(item => ({
            period: item.period,
            total_bids: item.total_bids || 0,
            total_bid_amount: Math.round((item.total_bid_amount || 0) / 1000) // Convert to thousands for better readability
          }));
          
          setChartData(transformedData);
        }
      } catch (error) {
        console.error('Error fetching bids data:', error);
        setChartData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBidsData();
  }, [startDate, endDate]);

  // Check if user has access to this chart
  if (!canAccessBidPerformanceReport(userRole)) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Bid Performance Trend</CardTitle>
          <CardDescription>Access Denied</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[300px] text-gray-500">
            <div className="text-center">
              <div className="text-4xl mb-2">🔒</div>
              <p>You don't have permission to view this report</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Bid Performance Trend</CardTitle>
          <CardDescription>Loading bid data...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] bg-gray-100 animate-pulse rounded flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4F46E5] mx-auto mb-2"></div>
              <p className="text-sm text-gray-600">Loading chart data...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bid Performance Trend</CardTitle>
        <CardDescription>
          {startDate && endDate 
            ? `${startDate} - ${endDate}` 
            : 'Bid activity and amount over time'
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
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
            <ChartTooltip 
              cursor={false} 
              content={<ChartTooltipContent />}
              formatter={(value, name) => {
                if (name === 'total_bid_amount') {
                  return [`$${value.toLocaleString()}K`, 'Total Bid Amount'];
                }
                return [value, 'Total Bids'];
              }}
            />
            <Line
              dataKey="total_bids"
              type="monotone"
              stroke="#4F46E5"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="total_bid_amount"
              type="monotone"
              stroke="#15A9D8"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Bid performance trends <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              Showing total bids and bid amounts over time
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
