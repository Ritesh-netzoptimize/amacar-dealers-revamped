import { useState, useEffect } from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
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
import { getDealerPerformanceReport } from "@/lib/api"

export const description = "Multi-dealer comparison"

const chartConfig = {
  performance_score: {
    label: "Performance Score",
    color: "#2E93E1",
  },
}

export default function DealerPerformanceChart({ startDate, endDate }) {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDealerData = async () => {
      try {
        setIsLoading(true);
        
        // Use default date range if not provided
        const dateFrom = startDate || '2024-01-01';
        const dateTo = endDate || '2024-12-31';
        
        const response = await getDealerPerformanceReport(dateFrom, dateTo);
        
        if (response.success && response.data) {
          // Transform API data to chart format
          const transformedData = response.data.map(item => ({
            dealer: item.dealer_name || 'Dealer',
            performance_score: item.performance_score || 0
          }));
          
          setChartData(transformedData);
        }
      } catch (error) {
        console.error('Error fetching dealer performance data:', error);
        setChartData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDealerData();
  }, [startDate, endDate]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Dealer Performance</CardTitle>
          <CardDescription>Loading dealer data...</CardDescription>
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
        <CardTitle>Dealer Performance Comparison</CardTitle>
        <CardDescription>
          {startDate && endDate 
            ? `${startDate} - ${endDate}` 
            : 'Multi-dealer performance analysis'
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="dealer"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 8)}
            />
            <YAxis />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <Bar dataKey="performance_score" fill="#2E93E1" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
