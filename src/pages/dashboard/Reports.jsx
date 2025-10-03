import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ReportStats from "@/components/reports/ReportStats";
import PieChartContainer from "@/components/reports/PieChartContainer";
import AverageBarChartContainer from "@/components/reports/AverageBarChartContainer";
import { DealerVsMarketAvgBid } from "@/components/reports/DealerVsMarketAvgBid";
import SmartInsights from "@/components/reports/SmartInsights";
import { MultiLineChart } from "@/components/reports/MultiLineChart";
import { MultiBarChart } from "@/components/reports/MultiBarChart";

const Reports = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate data loading - replace with actual API calls
  useEffect(() => {
    const loadReportsData = async () => {
      try {
        // TODO: Replace with actual API calls
        // Example:
        // const [statsData, vehiclesData, customersData] = await Promise.all([
        //   fetchStats(),
        //   fetchRecentVehicles(),
        //   fetchRecentCustomers()
        // ]);

        // Simulate API calls for different sections
        await Promise.all([
          // Simulate stats loading
          new Promise((resolve) => setTimeout(resolve, 800)),
          // Simulate vehicles loading
          new Promise((resolve) => setTimeout(resolve, 1200)),
          // Simulate customers loading
          new Promise((resolve) => setTimeout(resolve, 1000)),
          // Simulate quick actions loading
          new Promise((resolve) => setTimeout(resolve, 600)),
        ]);

        setIsLoading(false);
      } catch (error) {
        console.error("Error loading Reports data:", error);
        setIsLoading(false);
      }
    };

    loadReportsData();
  }, []);

  // Show skeleton while loading
  //   if (isLoading) {
  //     return <ReportsSkeleton />;
  //   }

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
      className="min-h-screen bg-gray-50 pt-20 px-4 md:px-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="p-6">
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

        {/* Statistics Cards */}
        <motion.div variants={statsVariants}>
          <ReportStats />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 md:gap-6">
          {/* Pie chart section */}
          <motion.div className="mt-12" variants={statsVariants}>
            <PieChartContainer />
          </motion.div>

       

           {/* Multi Bar Chart section */}
           <motion.div className="mt-4" variants={statsVariants}>
            <MultiBarChart />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 md:gap-6">
          {/* Line chart section */}
          <motion.div className="mt-4" variants={statsVariants}>
            <MultiLineChart />
          </motion.div>

          {/* smart insights section */}
          <motion.div className="mt-4" variants={statsVariants}>
            <SmartInsights />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 md:gap-6">
          {/* Horizontal bar chart section */}
          <motion.div className="mt-4" variants={statsVariants}>
            <DealerVsMarketAvgBid />
          </motion.div>

            {/* Average bar chart section */}
            <motion.div className="mt-12" variants={statsVariants}>
            <AverageBarChartContainer />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Reports;
