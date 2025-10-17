import { useReportData } from "@/hooks/useReportData";
import ReportKPICards from "@/components/reports/ReportKPICards";
import CustomerDistributionChart from "@/components/reports/CustomerDistributionChart";
import CustomerEngagementChart from "@/components/reports/CustomerEngagementChart";
import AppointmentTrendsChart from "@/components/reports/AppointmentTrendsChart";
import AuctionActivityChart from "@/components/reports/AuctionActivityChart";
import BidPerformanceChart from "@/components/reports/BidPerformanceChart";
import DealerPerformanceChart from "@/components/reports/DealerPerformanceChart";
import UserActivityChart from "@/components/reports/UserActivityChart";
import SubscriptionRevenueChart from "@/components/reports/SubscriptionRevenueChart";
import DynamicSmartInsights from "@/components/reports/DynamicSmartInsights";
import ReportsGlobalFilter from "@/components/filters/ReportsGlobalFilter";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";


// Inner component that uses the hook
const ReportsContent = () => {
    const [isFilterLoading, setIsFilterLoading] = useState(false);
    const [dateRange, setDateRange] = useState({
      startDate: null,
      endDate: null,
    });
    
    // Use the updated hook
    const {
      stats,
      chartData,
      isLoading,
      isChartLoading,
      activeKPI,
      error,
      handleKPIClick,
      resetActiveKPI,
      fetchChartData,
      getAvailableReports
    } = useReportData(dateRange.startDate, dateRange.endDate);
  
    // Data loading is now handled by the useReportData hook
  
    // Handle date range changes
    const handleDateRangeChange = (startDate, endDate) => {
      setDateRange({ startDate, endDate });
    };
  
    // Handle filter apply
    const handleFilterApply = async () => {
      setIsFilterLoading(true);
      try {
        // Reset active KPI when applying new filters
        resetActiveKPI();
        
        console.log("Filtering reports with date range:", dateRange);
        
        // Optional: Add a small delay to show loading state
        await new Promise((resolve) => setTimeout(resolve, 500));
        
      } catch (error) {
        console.error("Error applying date filter:", error);
      } finally {
        setIsFilterLoading(false);
      }
    };
  
    // Handle KPI click - now uses the hook's function
    const handleKPIClickWrapper = (kpi) => {
      console.log("KPI clicked:", kpi);
      handleKPIClick(kpi.id, kpi.title);
    };
  
    // Show loading state
    if (isLoading) {
      return (
        <div className="min-h-screen bg-gray-50 pt-10 md:pt-24 px-4 md:px-6 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4F46E5] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading reports...</p>
          </div>
        </div>
      );
    }

    // Show error state
    if (error) {
      return (
        <div className="min-h-screen bg-gray-50 pt-10 md:pt-24 px-4 md:px-6 flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Reports</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-[#4F46E5] text-white rounded-lg hover:bg-[#2E93E1] transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }
  
    // Animation variants
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration: 0.6,
          staggerChildren: 0.2,
        },
      },
    };
  
    const headerVariants = {
      hidden: { opacity: 0, y: -30 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          ease: "easeOut",
        },
      },
    };
  
    const statsVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          ease: "easeOut",
        },
      },
    };
  
    return (
      <motion.div
        className="min-h-screen bg-gray-50 pt-10 md:pt-24 px-4 md:px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="px-4 md:px-6">
          <motion.div className="mb-8" variants={headerVariants}>
            <motion.h1
              className="text-3xl font-bold text-neutral-900 mb-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Reports
            </motion.h1>
            <motion.p
              className="text-neutral-600"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Welcome to your dealer portal. Here's a report of your auction
              activity.
            </motion.p>
          </motion.div>
  
           {/* KPI Cards */}
           <motion.div variants={statsVariants}>
            <ReportKPICards 
              startDate={dateRange.startDate}
              endDate={dateRange.endDate}
            />
          </motion.div>
  
          {/* Global Date Range Filter */}
          <motion.div variants={statsVariants}>
            <ReportsGlobalFilter
              startDate={dateRange.startDate}
              endDate={dateRange.endDate}
              onDateRangeChange={handleDateRangeChange}
              onApply={handleFilterApply}
              isLoading={isFilterLoading}
            />
          </motion.div>
  
         
  
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 md:gap-6">
            {/* Customer Distribution Chart */}
            <motion.div className="mt-12" variants={statsVariants}>
              <CustomerDistributionChart 
                startDate={dateRange.startDate}
                endDate={dateRange.endDate}
              />
            </motion.div>
  
            {/* Customer Engagement Chart */}
            <motion.div className="mt-12" variants={statsVariants}>
              <CustomerEngagementChart 
                startDate={dateRange.startDate}
                endDate={dateRange.endDate}
              />
            </motion.div>
          </div>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 md:gap-6">
            {/* Bid Performance Chart */}
            <motion.div className="mt-4" variants={statsVariants}>
              <BidPerformanceChart 
                startDate={dateRange.startDate}
                endDate={dateRange.endDate}
              />
            </motion.div>
  
            {/* Appointment Trends Chart */}
            <motion.div className="mt-4" variants={statsVariants}>
              <AppointmentTrendsChart 
                startDate={dateRange.startDate}
                endDate={dateRange.endDate}
              />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 md:gap-6">
            {/* Auction Activity Chart */}
            <motion.div className="mt-4" variants={statsVariants}>
              <AuctionActivityChart 
                startDate={dateRange.startDate}
                endDate={dateRange.endDate}
              />
            </motion.div>
  
            {/* User Activity Chart */}
            <motion.div className="mt-4" variants={statsVariants}>
              <UserActivityChart 
                startDate={dateRange.startDate}
                endDate={dateRange.endDate}
              />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 md:gap-6">
            {/* Dealer Performance Chart */}
            <motion.div className="mt-4" variants={statsVariants}>
              <DealerPerformanceChart 
                startDate={dateRange.startDate}
                endDate={dateRange.endDate}
              />
            </motion.div>
  
            {/* Subscription Revenue Chart */}
            <motion.div className="mt-4" variants={statsVariants}>
              <SubscriptionRevenueChart 
                startDate={dateRange.startDate}
                endDate={dateRange.endDate}
              />
            </motion.div>
          </div>

          {/* Smart Insights */}
          <motion.div className="mt-8" variants={statsVariants}>
            <DynamicSmartInsights 
              startDate={dateRange.startDate}
              endDate={dateRange.endDate}
            />
          </motion.div>
  
        </div>
      </motion.div>
    );
  };

  export default ReportsContent;