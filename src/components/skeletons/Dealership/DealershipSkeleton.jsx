import React from 'react';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';

const DealershipSkeleton = () => {
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
      className="bg-white rounded-2xl shadow-sm border border-neutral-200 pt-10 md:pt-24 px-4 md:px-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Skeleton */}
      <motion.div 
        className="flex items-center justify-between mb-6"
        variants={itemVariants}
      >
        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
        <Skeleton className="h-4 w-40" />
      </motion.div>

      {/* Search Skeleton */}
      <motion.div 
        className="mb-6"
        variants={itemVariants}
      >
        <Skeleton className="h-12 w-full rounded-lg" />
      </motion.div>

      {/* Desktop Table Skeleton */}
      <div className="hidden lg:block overflow-x-auto">
        <motion.div 
          className="w-full min-w-[1000px]"
          variants={itemVariants}
        >
          {/* Table Header Skeleton */}
          <div className="grid grid-cols-6 gap-4 mb-6 pb-4 border-b border-neutral-200">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-20 ml-auto" />
          </div>

          {/* Table Rows Skeleton */}
          <div className="space-y-4">
            {[...Array(6)].map((_, rowIndex) => (
              <motion.div
                key={rowIndex}
                className="grid grid-cols-6 gap-4 py-4"
                variants={itemVariants}
                transition={{ delay: rowIndex * 0.1 }}
              >
                {/* User Column */}
                <div className="flex items-center space-x-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
                
                {/* Phone Column */}
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-20" />
                </div>
                
                {/* Location Column */}
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-24" />
                </div>
                
                {/* Email Column */}
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-28" />
                </div>
                
                {/* Status Column */}
                <Skeleton className="h-6 w-16 rounded-full" />
                
                {/* Actions Column */}
                <div className="flex justify-end">
                  <Skeleton className="h-8 w-8 rounded" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Helper Text Skeleton */}
        <motion.div 
          className="mt-3 text-xs text-neutral-500 flex items-center gap-1"
          variants={itemVariants}
        >
          <Skeleton className="w-4 h-4 rounded" />
          <Skeleton className="h-4 w-32" />
        </motion.div>
      </div>

      {/* Mobile Card Skeleton */}
      <div className="lg:hidden space-y-4">
        {[...Array(4)].map((_, cardIndex) => (
          <motion.div
            key={cardIndex}
            className="bg-neutral-50 rounded-xl p-4 border border-neutral-200"
            variants={itemVariants}
            transition={{ delay: cardIndex * 0.1 }}
          >
            <div className="space-y-3">
              {/* User Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <Skeleton className="h-4 w-8" />
              </div>

              {/* Contact Info */}
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-40" />
                </div>
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-28" />
                </div>
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>

              {/* Business Info */}
              <div className="space-y-1">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-3 w-32" />
              </div>

              {/* Status */}
              <Skeleton className="h-6 w-16 rounded-full" />

              {/* Action Buttons */}
              <div className="flex gap-2 pt-3">
                <Skeleton className="h-10 w-10 rounded-lg" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default DealershipSkeleton;
