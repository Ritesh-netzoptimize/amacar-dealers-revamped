import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const VehicleFilterTabs = ({ activeFilter, onFilterChange, className = '', isLoading = false }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loadingTabId, setLoadingTabId] = useState(null);

  const filters = [
    { id: 'all', label: 'All Vehicles', count: null },
    { id: 'honda', label: 'Honda', count: null },
    { id: 'toyota', label: 'Toyota', count: null },
    { id: 'ford', label: 'Ford', count: null },
    { id: 'bmw', label: 'BMW', count: null },
    { id: 'mercedes', label: 'Mercedes', count: null },
    { id: 'audi', label: 'Audi', count: null },
    { id: 'nissan', label: 'Nissan', count: null }
  ];

  const handleFilterChange = async (filterId) => {
    if (isTransitioning || isLoading) return;
    
    setIsTransitioning(true);
    setLoadingTabId(filterId);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Update filter first
    onFilterChange(filterId);
    
    // Small delay to ensure the color change happens before spinner disappears
    await new Promise(resolve => setTimeout(resolve, 0));
    
    setIsTransitioning(false);
    setLoadingTabId(null);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className={`flex flex-wrap gap-3 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {filters.map((filter) => (
        <motion.button
          key={filter.id}
          onClick={() => handleFilterChange(filter.id)}
          disabled={isLoading || isTransitioning}
          className={`
            relative px-6 py-3 rounded-2xl font-semibold text-sm transition-all duration-300 cursor-pointer
            border-2 min-w-[120px] flex items-center justify-center gap-2
            disabled:opacity-50 disabled:cursor-not-allowed
            ${activeFilter === filter.id 
              ? 'bg-[var(--brand-orange)]  text-white border-[var(--brand-orange)] shadow-lg' 
              : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 border-orange-200 hover:border-orange-300'
            }
          `}
          variants={tabVariants}
          whileHover={!isLoading && !isTransitioning ? { 
            scale: 1.02,
            y: -2,
            transition: { duration: 0.2 }
          } : {}}
          whileTap={!isLoading && !isTransitioning ? { 
            scale: 0.98,
            transition: { duration: 0.1 }
          } : {}}
        >
          {/* Loading Spinner */}
          {(isLoading || isTransitioning) && loadingTabId === filter.id && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="w-4 h-4"
            >
              <Loader2 className="w-4 h-4 animate-spin text-[var(--brand-orange)]" />
            </motion.div>
          )}
          
          {/* Filter Label */}
          <span className={`
            transition-all duration-300
            ${(isLoading || isTransitioning) && loadingTabId === filter.id ? 'opacity-70' : 'opacity-100'}
          `}>
            {filter.label}
          </span>

          {/* Count Badge (for future API integration) */}
          {filter.count !== null && (
            <motion.span
              className={`
                px-2 py-0.5 text-xs rounded-full font-medium
                ${activeFilter === filter.id 
                  ? 'bg-white/20 text-white' 
                  : 'bg-orange-100 text-orange-600'
                }
              `}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2, delay: 0.2 }}
            >
              {filter.count}
            </motion.span>
          )}
        </motion.button>
      ))}
    </motion.div>
  );
};

export default VehicleFilterTabs;
