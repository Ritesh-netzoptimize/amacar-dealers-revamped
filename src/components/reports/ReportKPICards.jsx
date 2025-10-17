import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Users, Gavel, Calendar, DollarSign } from "lucide-react"
import { getDashboardSummaryReport } from "@/lib/api"
import { useSelector } from "react-redux"
import { 
  canAccessDealerReports, 
  canAccessSalesManagerReports, 
  canAccessAdminReports 
} from "@/utils/rolePermissions"

export default function ReportKPICards({ startDate, endDate, onKPIClick, isChartLoading, activeKPI }) {
  const [kpiData, setKpiData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useSelector((state) => state.user);
  const userRole = user?.role;

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
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
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

  // Define all possible KPI cards with access levels
  const allKpiCards = [
    {
      id: "auctions-joined",
      title: "Auctions Joined",
      value: kpiData?.auctions?.auctions_joined || 0,
      icon: Gavel,
      color: "text-[#4F46E5]",
      bgColor: "bg-[#4F46E5]/10",
      description: "Total auctions participated",
      accessLevel: "dealer"
    },
    {
      id: "win-rate",
      title: "Win Rate",
      value: `${kpiData?.auctions?.win_rate || 0}%`,
      icon: TrendingUp,
      color: "text-[#15A9D8]",
      bgColor: "bg-[#15A9D8]/10",
      description: "Auction success rate",
      accessLevel: "dealer"
    },
    {
      id: "total-customers",
      title: "Total Customers",
      value: kpiData?.customers?.total_customers || 0,
      icon: Users,
      color: "text-[#2E93E1]",
      bgColor: "bg-[#2E93E1]/10",
      description: "Active customers",
      accessLevel: "dealer"
    },
    {
      id: "bids-placed",
      title: "Bids Placed",
      value: kpiData?.bidding?.bids_placed || 0,
      icon: Calendar,
      color: "text-[#4F46E5]",
      bgColor: "bg-[#4F46E5]/10",
      description: "Total bids made",
      accessLevel: "dealer"
    },
    {
      id: "appointments",
      title: "Appointments",
      value: kpiData?.appointments?.total_appointments || 0,
      icon: Calendar,
      color: "text-[#15A9D8]",
      bgColor: "bg-[#15A9D8]/10",
      description: "Total appointments",
      accessLevel: "dealer"
    },
    {
      id: "estimated-revenue",
      title: "Estimated Revenue",
      value: `$${(kpiData?.revenue?.estimated_revenue || 0).toLocaleString()}`,
      icon: DollarSign,
      color: "text-[#2E93E1]",
      bgColor: "bg-[#2E93E1]/10",
      description: "Revenue estimate",
      accessLevel: "dealer"
    }
  ];

  // Filter KPI cards based on user role
  const kpiCards = allKpiCards.filter(card => {
    switch (card.accessLevel) {
      case "dealer":
        return canAccessDealerReports(userRole);
      case "sales_manager":
        return canAccessSalesManagerReports(userRole);
      case "admin":
        return canAccessAdminReports(userRole);
      default:
        return false;
    }
  });

  // Handle KPI card click
  const handleCardClick = (card) => {
    if (onKPIClick && !isChartLoading) {
      onKPIClick(card);
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-6 lg:grid-cols-6">
      {kpiCards.map((card, index) => {
        const Icon = card.icon;
        const isActive = activeKPI === card.id;
        const isCardLoading = isChartLoading && isActive;
        
        return (
          <Card 
            key={index}
            className={`cursor-pointer transition-all duration-200 ${
              isCardLoading 
                ? 'opacity-75 cursor-not-allowed' 
                : 'hover:shadow-lg hover:scale-105'
            } ${
              isActive 
                ? 'ring-2 ring-[#4F46E5] ring-opacity-50 bg-[#4F46E5]/5' 
                : ''
            }`}
            onClick={() => handleCardClick(card)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <div className={`p-2 rounded-lg ${card.bgColor} ${isCardLoading ? 'animate-pulse' : ''}`}>
                <Icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center gap-2">
                {isCardLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#4F46E5]"></div>
                    <span className="text-sm text-gray-500">Loading...</span>
                  </>
                ) : (
                  card.value
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {isCardLoading ? 'Fetching chart data...' : card.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
