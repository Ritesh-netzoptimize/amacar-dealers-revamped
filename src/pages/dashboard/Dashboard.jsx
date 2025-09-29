import React from "react";
import { motion } from "framer-motion";
import DashboardStats from "../../components/dashboard/DashboardStats/DashboardStats";

const Dashboard = () => {
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
      </div>
    </motion.div>
  );
};

export default Dashboard;
