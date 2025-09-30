import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpDown, ChevronDown, RefreshCw, ArrowUp, ArrowDown } from 'lucide-react';
import { getSortOptions } from '@/utils/appointmentSorting';

const AppointmentSort = ({
  sortBy = 'date-asc',
  onSortChange,
  isSorting = false,
  sortProgress = 0,
  isDropdownOpen = false,
  onDropdownToggle,
  className = ''
}) => {
  const dropdownRef = useRef(null);
  const sortOptions = getSortOptions();
  const selectedOption = sortOptions.find(option => option.value === sortBy) || sortOptions[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onDropdownToggle(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onDropdownToggle]);

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'ArrowUp':
        return ArrowUp;
      case 'ArrowDown':
        return ArrowDown;
      default:
        return ArrowUp;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`relative w-full sm:w-[200px] flex-shrink-0 ${className}`}
      ref={dropdownRef}
    >
      {/* Dropdown Trigger */}
      <button
        onClick={() => !isSorting && onDropdownToggle(!isDropdownOpen)}
        disabled={isSorting}
        className={`cursor-pointer flex items-center gap-2 sm:gap-3 bg-white border border-neutral-200 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 hover:border-neutral-300 hover:shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent group ${
          isSorting ? 'opacity-75 cursor-not-allowed' : ''
        }`}
      >
        <div className="flex items-center gap-1.5 sm:gap-2 flex-1 min-w-0">
          {isSorting ? (
            <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500 animate-spin flex-shrink-0" />
          ) : (
            <ArrowUpDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-500 group-hover:text-orange-500 transition-colors flex-shrink-0" />
          )}
          <div className="text-left min-w-0 flex-1">
            <div className="text-xs sm:text-sm font-medium text-neutral-700 truncate">
              {isSorting ? 'Sorting...' : selectedOption.label}
            </div>
          </div>
        </div>
        {!isSorting && (
          <ChevronDown
            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-400 transition-transform duration-200 flex-shrink-0 ${
              isDropdownOpen ? 'rotate-180' : ''
            }`}
          />
        )}
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-neutral-200 rounded-lg sm:rounded-xl shadow-lg z-50 overflow-hidden"
          >
            {sortOptions.map((option, index) => {
              const IconComponent = getIcon(option.icon);
              const isSelected = option.value === sortBy;

              return (
                <button
                  key={option.value}
                  onClick={() => onSortChange(option.value)}
                  className={`cursor-pointer w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 text-left hover:bg-neutral-50 transition-colors duration-150 ${
                    isSelected ? 'bg-orange-50 text-orange-700' : 'text-neutral-700'
                  } ${
                    index !== sortOptions.length - 1 ? 'border-b border-neutral-100' : ''
                  }`}
                >
                  <div className={`p-1 sm:p-1.5 rounded-md sm:rounded-lg ${
                    isSelected ? 'bg-orange-100' : 'bg-neutral-100'
                  }`}>
                    <IconComponent className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${
                      isSelected ? 'text-orange-600' : 'text-neutral-500'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-xs sm:text-sm font-medium truncate ${
                      isSelected ? 'text-orange-700' : 'text-neutral-700'
                    }`}>
                      {option.label}
                    </div>
                  </div>
                  {isSelected && (
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AppointmentSort;
