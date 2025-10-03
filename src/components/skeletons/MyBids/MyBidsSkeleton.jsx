import React from 'react';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';

const MyBidsSkeleton = () => {
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
      className="min-h-screen bg-gray-50 pt-10 px-4 md:px-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="">
        {/* Header Section Skeleton */}
        <motion.div 
          className="mb-8"
          variants={headerVariants}
        >
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-80" />
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

        {/* Filter Tabs Skeleton */}
        <motion.div 
          className="mt-8"
          variants={statsVariants}
        >
          <div className="flex flex-wrap gap-3 mb-6">
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} className="h-12 w-24 rounded-2xl" />
            ))}
          </div>
          
          {/* Results Count Skeleton */}
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="h-4 w-48" />
          </div>
        </motion.div>

        {/* Won Auctions Grid Skeleton */}
        <motion.div 
          className="mt-8"
          variants={statsVariants}
        >
          <div className="w-full">
      {/* Full Width Rows Layout Skeleton */}
      <div className="space-y-6">
        {[...Array(4)].map((_, vehicleIndex) => (
          <motion.div
            key={vehicleIndex}
            variants={itemVariants}
            className="bg-white rounded-3xl shadow-sm border border-neutral-100 overflow-hidden"
          >
            {/* Mobile Layout Skeleton: Stacked */}
            <div className="lg:hidden flex flex-col min-h-full">
              {/* Image Gallery Skeleton */}
              <div className="relative h-56 bg-gradient-to-br from-neutral-50 to-neutral-100">
                <Skeleton className="w-full h-full rounded-none" />
              </div>

              {/* Vehicle Information Skeleton */}
              <div className="p-5 flex flex-col flex-grow">
                <div className="space-y-4">
                  <div>
                    <Skeleton className="h-6 w-48 mb-2" />
                    <Skeleton className="h-4 w-32" />
                  </div>

                  <div className="space-y-3">
                    {/* Cash Offer Skeleton */}
                    <div className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg">
                      <div className="flex items-center">
                        <Skeleton className="w-4 h-4 mr-2 rounded" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                      <Skeleton className="h-5 w-16" />
                    </div>
                    
                    {/* Final Price Skeleton */}
                    <div className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg">
                      <div className="flex items-center">
                        <Skeleton className="w-4 h-4 mr-2 rounded" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                      <Skeleton className="h-5 w-16" />
                    </div>
                    
                    {/* Won By Skeleton */}
                    <div className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg">
                      <div className="flex items-center">
                        <Skeleton className="w-4 h-4 mr-2 rounded" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                      <Skeleton className="h-4 w-20" />
                    </div>
                    
                    {/* Accepted On Skeleton */}
                    <div className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg">
                      <div className="flex items-center">
                        <Skeleton className="w-4 h-4 mr-2 rounded" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                </div>

                {/* CTA Buttons Skeleton */}
                <div className="space-y-3 pt-5 mt-auto">
                  <div className="flex gap-3">
                    <Skeleton className="flex-1 h-12 rounded-xl" />
                    <Skeleton className="flex-1 h-12 rounded-xl" />
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Layout Skeleton: Full Width Row */}
            <div className="hidden lg:flex max-h-[160px] bg-white/90 backdrop-blur-sm rounded-xl shadow-sm">
              {/* Left Section - Image Gallery Skeleton (1/8 width) */}
              <div className="w-56 rounded-xl relative bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-l-xl overflow-hidden">
                <Skeleton className="w-full h-full rounded-xl" />
              </div>

              {/* Right Section - Vehicle Information Skeleton (7/8 width) */}
              <div className="w-7/8 px-8 py-4 flex flex-col justify-between">
                {/* Header with Vehicle Title and CTA Buttons Skeleton */}
                <div className="flex items-start justify-between">
                  <div>
                    <Skeleton className="h-5 w-48 mb-2" />
                    <Skeleton className="h-4 w-32" />
                  </div>

                  {/* CTA Buttons Skeleton */}
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-24 rounded-md" />
                    <Skeleton className="h-8 w-24 rounded-md" />
                  </div>
                </div>

                {/* Auction Details Grid Skeleton - Bottom */}
                <div className="grid grid-cols-5 gap-3 justify-end">
                  {/* Cash Offer Skeleton */}
                  <div className="flex flex-col p-3 rounded-lg">
                    <div className="flex items-center mb-1">
                      <Skeleton className="w-3.5 h-3.5 mr-1 rounded" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                    <Skeleton className="h-4 w-12" />
                  </div>
                  
                  {/* Won By Skeleton */}
                  <div className="flex flex-col p-3 rounded-lg">
                    <div className="flex items-center mb-1">
                      <Skeleton className="w-3.5 h-3.5 mr-1 rounded" />
                      <Skeleton className="h-3 w-12" />
                    </div>
                    <Skeleton className="h-4 w-16" />
                  </div>
                  
                  {/* VIN Skeleton */}
                  <div className="flex flex-col p-3 rounded-lg">
                    <div className="flex items-center mb-1">
                      <Skeleton className="w-3.5 h-3.5 mr-1 rounded" />
                      <Skeleton className="h-3 w-8" />
                    </div>
                    <Skeleton className="h-4 w-20" />
                  </div>
                  
                  {/* Highest Bid Skeleton */}
                  <div className="flex flex-col items-end p-3 rounded-lg">
                    <div className="flex items-center mb-1">
                      <Skeleton className="w-3.5 h-3.5 mr-1 rounded" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                    <Skeleton className="h-4 w-12" />
                  </div>
                  
                  {/* Accepted On Skeleton */}
                  <div className="flex flex-col items-end p-3 rounded-lg">
                    <div className="flex items-center mb-1">
                      <Skeleton className="w-3.5 h-3.5 mr-1 rounded" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                    <Skeleton className="h-4 w-20" />
                  </div>
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

export default MyBidsSkeleton;
