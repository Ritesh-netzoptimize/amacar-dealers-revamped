import React from 'react';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';

const NewCustomersSkeleton = () => {
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

      {/* Desktop Table Skeleton */}
      <div className="hidden lg:block">
        <motion.div 
          className="w-full min-w-[1000px]"
          variants={itemVariants}
        >
          {/* Table Header Skeleton */}
          <div className="grid grid-cols-7 gap-4 mb-6 pb-4 border-b border-neutral-200">
            {[...Array(7)].map((_, index) => (
              <Skeleton
                key={index}
                className={`h-5 ${index === 6 ? 'w-16 ml-auto' : 'w-24'}`}
              />
            ))}
          </div>

          {/* Table Rows Skeleton */}
          <div className="space-y-4">
            {[...Array(6)].map((_, rowIndex) => (
              <motion.div
                key={rowIndex}
                className="grid grid-cols-7 gap-4 py-5"
                variants={itemVariants}
                transition={{ delay: rowIndex * 0.1 }}
              >
                {/* Dealership Name Column */}
                <div className="space-y-2">
                  <Skeleton className="h-5 w-28" />
                  <Skeleton className="h-4 w-36" />
                </div>
                
                {/* Phone Column */}
                <Skeleton className="h-5 w-24" />
                
                {/* City Column */}
                <Skeleton className="h-5 w-20" />
                
                {/* Status Column */}
                <Skeleton className="h-7 w-16 rounded-full" />
                
                {/* Role Column */}
                <Skeleton className="h-5 w-16" />
                
                {/* Sales Manager Column */}
                <Skeleton className="h-5 w-24" />
                
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
          className="mt-4 flex items-center gap-2"
          variants={itemVariants}
        >
          <Skeleton className="w-4 h-4 rounded" />
          <Skeleton className="h-4 w-32" />
        </motion.div>
      </div>

      {/* Mobile Card Skeleton */}
      <div className="lg:hidden space-y-5">
        {[...Array(4)].map((_, cardIndex) => (
          <motion.div
            key={cardIndex}
            className="bg-neutral-50 rounded-xl p-5 border border-neutral-200"
            variants={itemVariants}
            transition={{ delay: cardIndex * 0.1 }}
          >
            <div className="space-y-4">
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-8" />
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-4 w-28" />
              </div>

              {/* Status and Role */}
              <div className="flex gap-2">
                <Skeleton className="h-7 w-16 rounded-full" />
                <Skeleton className="h-7 w-16 rounded-full" />
              </div>

              {/* Stats */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-5 w-24" />
                </div>
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-5 w-8" />
                </div>
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-12" />
                  <div className="flex items-center gap-1">
                    <Skeleton className="w-4 h-4 rounded" />
                    <Skeleton className="h-5 w-6" />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4">
                <Skeleton className="flex-1 h-10 rounded-lg" />
                <Skeleton className="flex-1 h-10 rounded-lg" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default NewCustomersSkeleton;
