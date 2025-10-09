import React from 'react';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';

const HighestBidsCompactSkeleton = () => {
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

  return (
    <motion.div 
      className="mt-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
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
                  {/* Highest Bid Badge Skeleton */}
                  <div className="absolute top-3 left-3">
                    <Skeleton className="h-6 w-20 rounded-full" />
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
                      <div className="bg-orange-50 rounded-lg p-3">
                        <div className="flex items-center mb-1">
                          <Skeleton className="w-3.5 h-3.5 mr-1.5 rounded" />
                          <Skeleton className="h-3 w-16" />
                        </div>
                        <Skeleton className="h-4 w-12" />
                      </div>
                    </div>

                    {/* Highest Bid Amount Skeleton */}
                    <div className="bg-green-50 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Skeleton className="w-3.5 h-3.5 mr-1.5 rounded" />
                          <Skeleton className="h-3 w-16" />
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
  );
};

export default HighestBidsCompactSkeleton;
