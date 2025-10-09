import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Target, 
  Calendar, 
  AlertCircle, 
  Trophy,
  Lightbulb,
  DollarSign,
  Users,
  BarChart3
} from 'lucide-react';
import { getSummaryReport, getBidsReport } from '@/lib/api';

const SmartInsights = ({ startDate, endDate }) => {
  const [insights, setInsights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInsightsData = async () => {
      try {
        setIsLoading(true);
        
        // Use default date range if not provided
        const dateFrom = startDate || '2024-01-01';
        const dateTo = endDate || '2024-12-31';
        
        const [summaryResponse, bidsResponse] = await Promise.all([
          getSummaryReport(dateFrom, dateTo),
          getBidsReport(dateFrom, dateTo)
        ]);
        
        if (summaryResponse.success) {
          const sales = summaryResponse.sales || {};
          const bids = summaryResponse.bids || {};
          const customers = summaryResponse.customers || {};
          const vehicles = summaryResponse.vehicles || {};
          const bidsData = bidsResponse.success ? bidsResponse.data : [];
          
          // Calculate insights from API data
          const totalSales = sales.total_sales || 0;
          const vehiclesSold = sales.vehicles_sold || 0;
          const averageSale = sales.average_sale || 0;
          const totalBids = bids.total_bids || 0;
          const winRate = bids.win_rate || 0;
          const totalCustomers = customers.total_customers || 0;
          const totalVehicles = vehicles.total_vehicles || 0;
          
          // Calculate bid range from bids data
          const minBid = bidsData.length > 0 ? Math.min(...bidsData.map(b => b.total_amount / b.count)) : 0;
          const maxBid = bidsData.length > 0 ? Math.max(...bidsData.map(b => b.total_amount / b.count)) : 0;
          
          setInsights([
            {
              id: 1,
              type: 'range',
              icon: DollarSign,
              title: 'Sales Performance',
              description: `Total sales of $${totalSales.toLocaleString()} with ${vehiclesSold} vehicles sold.`,
              value: `$${totalSales.toLocaleString()}`,
              color: 'text-blue-600',
              bgColor: 'bg-blue-50',
              iconColor: 'text-blue-600',
              borderColor: 'border-blue-200'
            },
            {
              id: 2,
              type: 'achievement',
              icon: Target,
              title: 'Bidding Success',
              description: `You have placed ${totalBids} total bids with a ${winRate.toFixed(1)}% win rate.`,
              value: `${winRate.toFixed(1)}% win rate`,
              color: 'text-green-600',
              bgColor: 'bg-green-50',
              iconColor: 'text-green-600',
              borderColor: 'border-green-200'
            },
            {
              id: 3,
              type: 'engagement',
              icon: Users,
              title: 'Customer Base',
              description: `You have ${totalCustomers} total customers in your database.`,
              value: `${totalCustomers} customers`,
              color: 'text-purple-600',
              bgColor: 'bg-purple-50',
              iconColor: 'text-purple-600',
              borderColor: 'border-purple-200'
            },
            {
              id: 4,
              type: 'improvement',
              icon: AlertCircle,
              title: 'Average Sale Analysis',
              description: `Your average sale amount is $${averageSale.toLocaleString()}. Consider optimizing your pricing strategy.`,
              value: `$${averageSale.toLocaleString()}`,
              color: 'text-orange-600',
              bgColor: 'bg-orange-50',
              iconColor: 'text-orange-600',
              borderColor: 'border-orange-200'
            },
            {
              id: 5,
              type: 'success',
              icon: Trophy,
              title: 'Vehicle Portfolio',
              description: `You have ${totalVehicles} total vehicles: ${vehicles.auction_vehicles || 0} auction and ${vehicles.appraised_vehicles || 0} appraised.`,
              value: `${totalVehicles} vehicles`,
              color: 'text-emerald-600',
              bgColor: 'bg-emerald-50',
              iconColor: 'text-emerald-600',
              borderColor: 'border-emerald-200'
            }
          ]);
        }
      } catch (error) {
        console.error('Error fetching insights data:', error);
        // Fallback to default insights
        setInsights([
          {
            id: 1,
            type: 'range',
            icon: DollarSign,
            title: 'Sales Performance',
            description: 'Unable to load sales data.',
            value: 'N/A',
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
            iconColor: 'text-blue-600',
            borderColor: 'border-blue-200'
          },
          {
            id: 2,
            type: 'achievement',
            icon: Target,
            title: 'Bidding Success',
            description: 'Unable to load bidding data.',
            value: 'N/A',
            color: 'text-green-600',
            bgColor: 'bg-green-50',
            iconColor: 'text-green-600',
            borderColor: 'border-green-200'
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInsightsData();
  }, [startDate, endDate]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const getInsightIcon = (type) => {
    switch (type) {
      case 'range':
        return <BarChart3 className="w-5 h-5" />;
      case 'achievement':
        return <Target className="w-5 h-5" />;
      case 'engagement':
        return <Users className="w-5 h-5" />;
      case 'improvement':
        return <AlertCircle className="w-5 h-5" />;
      case 'success':
        return <Trophy className="w-5 h-5" />;
      default:
        return <Lightbulb className="w-5 h-5" />;
    }
  };

  if (isLoading) {
    return (
      <motion.div
        className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl">
            <Lightbulb className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-neutral-900">Smart Insights</h3>
            <p className="text-sm text-neutral-600">Loading insights...</p>
          </div>
        </div>
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 rounded-xl h-20"></div>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div 
        className="flex items-center gap-3 mb-6"
        variants={cardVariants}
      >
        <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl">
          <Lightbulb className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-neutral-900">Smart Insights</h3>
          <p className="text-sm text-neutral-600">AI-powered analysis of your auction performance</p>
        </div>
      </motion.div>

      {/* Insights Grid */}
      <div className="space-y-4">
        {insights.map((insight, index) => (
          <motion.div
            key={insight.id}
            variants={cardVariants}
            className={`
              px-4 py-2 rounded-xl border-2 transition-all duration-300 hover:shadow-md hover:scale-[1.02]
              ${insight.bgColor} ${insight.borderColor}
            `}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className={`
                p-2 rounded-lg ${insight.bgColor} ${insight.iconColor}
                flex-shrink-0 mt-0.5
              `}>
                {getInsightIcon(insight.type)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-neutral-900 text-sm">
                    {insight.title}
                  </h4>
                  <span className={`
                    px-2 py-1 rounded-full text-xs font-medium
                    ${insight.color} ${insight.bgColor}
                  `}>
                    {insight.value}
                  </span>
                </div>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  {insight.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

    </motion.div>
  );
};

export default SmartInsights;
