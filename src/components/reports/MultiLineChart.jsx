import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
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
import { getBidsReport } from "@/lib/api"

export const description = "Bids trend over time"

const chartConfig = {
  count: {
    label: "Bid Count",
    color: "var(--brand-orange)",
  },
  amount: {
    label: "Total Amount",
    color: "var(--chart-2)",
  },
} 

export function MultiLineChart({ startDate, endDate }) {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBidsData = async () => {
      try {
        setIsLoading(true);
        
        // Use default date range if not provided
        const dateFrom = startDate || '2024-01-01';
        const dateTo = endDate || '2024-12-31';
        
        const response = await getBidsReport(dateFrom, dateTo);
        
        if (response.success && response.data) {
          // Transform API data to chart format
          const transformedData = response.data.map(item => ({
            period: item.period,
            count: item.count,
            amount: Math.round(item.total_amount / 1000) // Convert to thousands for better readability
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
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Bids Trend</CardTitle>
          <CardDescription>Loading bid data...</CardDescription>
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
        <CardTitle>Bids Trend</CardTitle>
        <CardDescription>
          {startDate && endDate 
            ? `${startDate} - ${endDate}` 
            : 'Bid activity over time'
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
                if (name === 'amount') {
                  return [`$${value.toLocaleString()}K`, 'Total Amount'];
                }
                return [value, 'Bid Count'];
              }}
            />
            <Line
              dataKey="count"
              type="monotone"
              stroke="var(--brand-orange)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="amount"
              type="monotone"
              stroke="var(--chart-2)"
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
              Bid activity trends <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              Showing bid count and total amount over time
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
