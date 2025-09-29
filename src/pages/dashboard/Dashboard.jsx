import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DashboardStats from "@/components/common/DashboardStats/DashboardStats";
import RecentVehiclesSection from "../../components/dashboard/RecentVehiclesSection/RecentVehiclesSection";
import RecentCustomers from "@/components/dashboard/RecentCustomers/RecentCustomers";
import QuickActions from "@/components/dashboard/QuickActions/QuickActions";
import DashboardSkeleton from "@/components/skeletons/dashboard/DashboardSkeleton";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate data loading - replace with actual API calls
  useEffect(() => {
    const loadDashboardData = async () => {
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
          new Promise(resolve => setTimeout(resolve, 800)),
          // Simulate vehicles loading
          new Promise(resolve => setTimeout(resolve, 1200)),
          // Simulate customers loading
          new Promise(resolve => setTimeout(resolve, 1000)),
          // Simulate quick actions loading
          new Promise(resolve => setTimeout(resolve, 600))
        ]);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  // Show skeleton while loading
  if (isLoading) {
    return <DashboardSkeleton />;
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const statsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gray-50 pt-20 px-4 md:px-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="p-6">
        <motion.div 
          className="mb-8"
          variants={headerVariants}
        >
          <motion.h1 
            className="text-3xl font-bold text-neutral-900 mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Dashboard Overview
          </motion.h1>
          <motion.p 
            className="text-neutral-600"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Welcome to your dealer portal. Here's a summary of your auction
            activity.
          </motion.p>
        </motion.div>

         {/* Statistics Cards */}
         <motion.div variants={statsVariants}>
           <DashboardStats />
         </motion.div>

         {/* Recent Vehicles Section */}
         <motion.div 
           className="mt-12"
           variants={statsVariants}
         >
           <RecentVehiclesSection />
         </motion.div>

         {/* Recent Customers Section */}
         <motion.div 
           className="mt-12"
           variants={statsVariants}
         >
           <RecentCustomers />
         </motion.div>

         {/* Quick Actions Section */}
         <motion.div 
           className="mt-12"
           variants={statsVariants}
         >
           <QuickActions />
         </motion.div>
       </div>
     </motion.div>
   );
 };

export default Dashboard;
