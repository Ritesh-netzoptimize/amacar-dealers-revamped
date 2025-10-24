import React from 'react';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';

const ActiveCustomersSkeleton = () => {
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
      className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6"
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

      {/* Extra Large Desktop Table Skeleton (1600px+) */}
      <div className="hidden 2xl:block overflow-x-auto">
        <motion.div 
          className="w-full min-w-[1200px]"
          variants={itemVariants}
        >
          {/* Table Header Skeleton */}
          <div className="grid grid-cols-6 gap-4 mb-6 pb-4 border-b border-neutral-200">
            <Skeleton className="h-5 w-32 pl-6" />
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-16 ml-auto pr-6" />
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
                {/* Customer Name Column */}
                <div className="space-y-2 pl-6">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-3 w-36" />
                </div>
                
                {/* Vehicle Column */}
                <Skeleton className="h-4 w-24" />
                
                {/* Offer Column */}
                <Skeleton className="h-4 w-16" />
                
                {/* Address Column */}
                <Skeleton className="h-4 w-32" />
                
                {/* Join Date Column */}
                <Skeleton className="h-4 w-20" />
                
                {/* Actions Column */}
                <div className="flex justify-end pr-6">
                  <Skeleton className="h-8 w-8 rounded" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Large Laptop Table Skeleton (1280px - 1600px) */}
      <div className="hidden xl:block 2xl:hidden overflow-x-auto">
        <motion.div 
          className="w-full"
          variants={itemVariants}
        >
          {/* Table Header Skeleton */}
          <div className="grid grid-cols-6 gap-4 mb-6 pb-4 border-b border-neutral-200">
            <Skeleton className="h-4 w-20 pl-3 text-xs" />
            <Skeleton className="h-4 w-16 text-xs" />
            <Skeleton className="h-4 w-12 text-xs" />
            <Skeleton className="h-4 w-24 text-xs" />
            <Skeleton className="h-4 w-12 text-xs" />
            <Skeleton className="h-4 w-8 ml-auto pr-3 text-xs" />
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
                {/* Customer Column */}
                <div className="space-y-2 pl-3">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
                
                {/* Vehicle Column */}
                <Skeleton className="h-3 w-20" />
                
                {/* Offer Column */}
                <Skeleton className="h-3 w-12" />
                
                {/* Address Column */}
                <Skeleton className="h-3 w-28" />
                
                {/* Date Column */}
                <Skeleton className="h-3 w-12" />
                
                {/* Actions Column */}
                <div className="flex justify-end pr-3">
                  <Skeleton className="h-6 w-6 rounded" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Small Laptop Card Skeleton (1024px - 1280px) */}
      <div className="hidden xl:block 2xl:hidden space-y-3">
        {[...Array(4)].map((_, cardIndex) => (
          <motion.div
            key={cardIndex}
            className="bg-neutral-50 rounded-xl p-4 border border-neutral-200"
            variants={itemVariants}
            transition={{ delay: cardIndex * 0.1 }}
          >
            <div className="space-y-3">
              {/* Customer Header */}
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-40 mt-1" />
                </div>
                <Skeleton className="h-3 w-8" />
              </div>

              {/* Vehicle and Offer Row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Skeleton className="h-3 w-12 mb-1" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div>
                  <Skeleton className="h-3 w-16 mb-1" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>

              {/* Address and Date Row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="min-w-0">
                  <Skeleton className="h-3 w-12 mb-1" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <div>
                  <Skeleton className="h-3 w-16 mb-1" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>

              {/* Action Button */}
              <div className="flex justify-end pt-2 border-t border-neutral-200">
                <Skeleton className="h-8 w-8 rounded" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tablet Table Skeleton (768px - 1023px) */}
      <div className="hidden lg:block xl:hidden">
        <motion.div 
          className="w-full table-fixed"
          variants={itemVariants}
        >
          {/* Table Header Skeleton */}
          <div className="grid grid-cols-6 gap-4 mb-6 pb-4 border-b border-neutral-200">
            <Skeleton className="h-4 w-20 pl-4" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-6 ml-auto pr-4" />
          </div>

          {/* Table Rows Skeleton */}
          <div className="space-y-4">
            {[...Array(6)].map((_, rowIndex) => (
              <motion.div
                key={rowIndex}
                className="grid grid-cols-6 gap-4 py-3"
                variants={itemVariants}
                transition={{ delay: rowIndex * 0.1 }}
              >
                {/* Customer Column */}
                <div className="space-y-2 pl-4">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
                
                {/* Vehicle Column */}
                <Skeleton className="h-4 w-20" />
                
                {/* Offer Column */}
                <Skeleton className="h-4 w-12" />
                
                {/* Address Column */}
                <Skeleton className="h-4 w-24" />
                
                {/* Date Column */}
                <Skeleton className="h-4 w-8" />
                
                {/* Actions Column */}
                <div className="flex justify-end pr-4">
                  <Skeleton className="h-7 w-7 rounded" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Small Tablet Card Skeleton (640px - 767px) */}
      <div className="hidden sm:block lg:hidden space-y-3">
        {[...Array(4)].map((_, cardIndex) => (
          <motion.div
            key={cardIndex}
            className="bg-neutral-50 rounded-xl p-4 border border-neutral-200"
            variants={itemVariants}
            transition={{ delay: cardIndex * 0.1 }}
          >
            <div className="space-y-3">
              {/* Customer Header */}
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-40 mt-1" />
                </div>
                <Skeleton className="h-3 w-8" />
              </div>

              {/* Vehicle and Offer Row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Skeleton className="h-3 w-12 mb-1" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div>
                  <Skeleton className="h-3 w-16 mb-1" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>

              {/* Address and Date Row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="min-w-0">
                  <Skeleton className="h-3 w-12 mb-1" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <div>
                  <Skeleton className="h-3 w-16 mb-1" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>

              {/* Action Button */}
              <div className="flex justify-end pt-2 border-t border-neutral-200">
                <Skeleton className="h-8 w-8 rounded" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile Card Skeleton (below 640px) */}
      <div className="sm:hidden space-y-3">
        {[...Array(4)].map((_, cardIndex) => (
          <motion.div
            key={cardIndex}
            className="bg-neutral-50 rounded-xl p-4 border border-neutral-200"
            variants={itemVariants}
            transition={{ delay: cardIndex * 0.1 }}
          >
            <div className="space-y-3">
              {/* Customer Header */}
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-40 mt-1" />
                </div>
                <Skeleton className="h-3 w-8" />
              </div>

              {/* Vehicle and Offer Row */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Skeleton className="h-3 w-12" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="flex justify-between items-center">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>

              {/* Address and Date Row */}
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <Skeleton className="h-3 w-12" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <div className="flex justify-between items-center">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>

              {/* Action Button */}
              <div className="flex justify-end pt-2 border-t border-neutral-200">
                <Skeleton className="h-8 w-8 rounded" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ActiveCustomersSkeleton;
