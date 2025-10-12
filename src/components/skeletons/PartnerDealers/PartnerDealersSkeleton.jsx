import React from "react";
import { motion } from "framer-motion";

const PartnerDealersSkeleton = () => {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
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
        {/* Header Skeleton */}
        <motion.div className="mb-8" variants={cardVariants}>
          <div className="h-8 bg-gray-200 rounded w-48 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-96 animate-pulse"></div>
        </motion.div>

        {/* Stats Cards Skeleton */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" variants={cardVariants}>
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-16"></div>
                </div>
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Search and Filter Skeleton */}
        <motion.div className="mb-6" variants={cardVariants}>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="h-10 bg-gray-200 rounded w-80 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
          </div>
        </motion.div>

        {/* Table Header Skeleton (Desktop) */}
        <motion.div className="hidden lg:block mb-4" variants={cardVariants}>
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4">
              <div className="grid grid-cols-6 gap-4">
                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Table Rows Skeleton (Desktop) */}
        <motion.div className="hidden lg:block space-y-2" variants={cardVariants}>
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div className="flex-1 grid grid-cols-5 gap-4">
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-32 mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-24"></div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-40"></div>
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                  <div className="h-6 bg-gray-200 rounded w-16"></div>
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </div>
                <div className="w-8 h-8 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Mobile Cards Skeleton */}
        <motion.div className="lg:hidden space-y-4" variants={cardVariants}>
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div>
                    <div className="h-5 bg-gray-200 rounded w-32 mb-1"></div>
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-6 bg-gray-200 rounded w-16"></div>
                  <div className="w-8 h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-48"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Pagination Skeleton */}
        <motion.div className="flex justify-center mt-8" variants={cardVariants}>
          <div className="h-10 bg-gray-200 rounded w-64 animate-pulse"></div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PartnerDealersSkeleton;
