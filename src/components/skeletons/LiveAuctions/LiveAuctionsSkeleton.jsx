import React from 'react';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';

const LiveAuctionsSkeleton = () => {
  // Animation variants
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

  const itemVariants = {
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
      className="min-h-screen bg-gray-50 pt-10 md:pt-24 px-4 md:px-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="px-4 md:px-6">
        {/* Header Section Skeleton */}
        <motion.div 
          className="mb-8"
          variants={headerVariants}
        >
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-96" />
        </motion.div>

        {/* Statistics Cards Skeleton */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8"
          variants={statsVariants}
        >
          {[...Array(5)].map((_, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <Skeleton className="h-12 w-12 rounded-xl" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-6 w-20 mb-2" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </motion.div>

        {/* Filter Tabs and Results Count Skeleton */}
        <motion.div 
          className="mt-8 flex items-center justify-between"
          variants={statsVariants}
        >
          <div className="flex flex-wrap gap-3">
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} className="h-12 w-24 rounded-2xl" />
            ))}
          </div>
          
          {/* Results Count Skeleton */}
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="h-4 w-48" />
          </div>
        </motion.div>

        {/* Live Auctions Grid Skeleton */}
        <motion.div 
          className="mt-8"
          variants={statsVariants}
        >
          <div className="w-full">
            {/* Grid Layout for Maximum Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
              {[...Array(8)].map((_, vehicleIndex) => (
                <motion.div
                  key={vehicleIndex}
                  variants={itemVariants}
                  className="bg-white rounded-xl border border-neutral-200 overflow-hidden"
                >
                  {/* Compact Card Layout Skeleton */}
                  <div className="flex flex-col h-full">
                    {/* Image Gallery Skeleton */}
                    <div className="relative h-48 bg-gradient-to-br from-neutral-50 to-neutral-100">
                      <Skeleton className="w-full h-full rounded-none" />
                      {/* Status Badge Skeleton */}
                      <div className="absolute top-3 left-3">
                        <Skeleton className="h-6 w-12 rounded-full" />
                      </div>
                    </div>

                    {/* Vehicle Information Skeleton */}
                    <div className="p-4 flex flex-col flex-grow">
                      <div className="space-y-3">
                        <div>
                          <Skeleton className="h-5 w-40 mb-1" />
                          <Skeleton className="h-4 w-32" />
                        </div>

                        {/* Compact Info Grid Skeleton */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-neutral-50 rounded-lg p-3">
                            <div className="flex items-center mb-1">
                              <Skeleton className="w-3.5 h-3.5 mr-1.5 rounded" />
                              <Skeleton className="h-3 w-16" />
                            </div>
                            <Skeleton className="h-4 w-12" />
                          </div>
                          <div className="bg-green-50 rounded-lg p-3">
                            <div className="flex items-center mb-1">
                              <Skeleton className="w-3.5 h-3.5 mr-1.5 rounded" />
                              <Skeleton className="h-3 w-16" />
                            </div>
                            <Skeleton className="h-4 w-12" />
                          </div>
                        </div>

                        {/* Time Remaining Skeleton */}
                        <div className="bg-orange-50 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Skeleton className="w-3.5 h-3.5 mr-1.5 rounded" />
                              <Skeleton className="h-3 w-12" />
                            </div>
                            <Skeleton className="h-4 w-20" />
                          </div>
                        </div>
                      </div>

                      {/* CTA Buttons Skeleton */}
                      <div className="flex gap-2 pt-4 mt-auto">
                        <Skeleton className="flex-1 h-9 rounded-lg" />
                        <Skeleton className="flex-1 h-9 rounded-lg" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Pagination Skeleton */}
        <motion.div 
          className="flex justify-center mt-8"
          variants={statsVariants}
        >
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-10 rounded-md" />
            <Skeleton className="h-10 w-10 rounded-md" />
            <Skeleton className="h-10 w-10 rounded-md" />
            <Skeleton className="h-10 w-10 rounded-md" />
            <Skeleton className="h-10 w-10 rounded-md" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LiveAuctionsSkeleton;
