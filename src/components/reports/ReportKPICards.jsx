import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Users, Gavel, Calendar, DollarSign } from "lucide-react"
import { getDashboardSummaryReport } from "@/lib/api"

export default function ReportKPICards({ startDate, endDate }) {
  const [kpiData, setKpiData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchKPIData = async () => {
      try {
        setIsLoading(true);
        
        // Use default date range if not provided
        const dateFrom = startDate || '2024-01-01';
        const dateTo = endDate || '2024-12-31';
        
        const response = await getDashboardSummaryReport(dateFrom, dateTo);
        
        if (response.success) {
          setKpiData(response);
        }
      } catch (error) {
        console.error('Error fetching KPI data:', error);
        setKpiData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchKPIData();
  }, [startDate, endDate]);

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
              <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded animate-pulse w-16 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded animate-pulse w-20"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!kpiData) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">No Data Available</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">--</div>
            <p className="text-xs text-muted-foreground">Unable to load data</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const kpiCards = [
    {
      title: "Auctions Joined",
      value: kpiData.auctions?.auctions_joined || 0,
      icon: Gavel,
      color: "text-[#4F46E5]",
      bgColor: "bg-[#4F46E5]/10",
      description: "Total auctions participated"
    },
    {
      title: "Win Rate",
      value: `${kpiData.auctions?.win_rate || 0}%`,
      icon: TrendingUp,
      color: "text-[#15A9D8]",
      bgColor: "bg-[#15A9D8]/10",
      description: "Auction success rate"
    },
    {
      title: "Total Customers",
      value: kpiData.customers?.total_customers || 0,
      icon: Users,
      color: "text-[#2E93E1]",
      bgColor: "bg-[#2E93E1]/10",
      description: "Active customers"
    },
    {
      title: "Bids Placed",
      value: kpiData.bidding?.bids_placed || 0,
      icon: Calendar,
      color: "text-[#4F46E5]",
      bgColor: "bg-[#4F46E5]/10",
      description: "Total bids made"
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {kpiCards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <div className={`p-2 rounded-lg ${card.bgColor}`}>
                <Icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">{card.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
