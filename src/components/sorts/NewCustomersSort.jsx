import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  RefreshCw, 
  ArrowUp, 
  ArrowDown, 
  Calendar, 
  User, 
  DollarSign, 
  Gauge, 
  Car 
} from 'lucide-react';
import { 
  getSortFieldOptions, 
  getSortDirectionOptions, 
  parseSortConfig, 
  parseSortValue 
} from '@/utils/newCustomersSorting';

const NewCustomersSort = ({
  sortBy = 'join-date-desc',
  onSortChange,
  isSorting = false,
  className = ''
}) => {
  const dropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const fieldOptions = getSortFieldOptions();
  const directionOptions = getSortDirectionOptions();
  
  const { field: currentField, direction: currentDirection } = parseSortValue(sortBy);
  const selectedField = fieldOptions.find(option => option.value === currentField) || fieldOptions[0];
  const currentDirectionOption = directionOptions[currentDirection] || directionOptions.desc;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getFieldIcon = (iconName) => {
    switch (iconName) {
      case 'Calendar':
        return Calendar;
      case 'User':
        return User;
      case 'DollarSign':
        return DollarSign;
      case 'Gauge':
        return Gauge;
      case 'Car':
        return Car;
      default:
        return Calendar;
    }
  };

  const handleFieldChange = (fieldValue) => {
    const newSortBy = parseSortConfig(fieldValue, currentDirection);
    onSortChange(newSortBy);
    setIsDropdownOpen(false);
  };

  const handleDirectionToggle = () => {
    const newDirection = currentDirection === 'asc' ? 'desc' : 'asc';
    const newSortBy = parseSortConfig(currentField, newDirection);
    onSortChange(newSortBy);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`flex items-center gap-2 ${className}`}
    >
      {/* Field Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => !isSorting && setIsDropdownOpen(!isDropdownOpen)}
          disabled={isSorting}
          className={`flex items-center gap-2 bg-white border border-neutral-200 rounded-lg px-3 py-2.5 hover:border-neutral-300 hover:shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent group ${
            isSorting ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
          <div className="flex items-center gap-2">
            {isSorting ? (
              <RefreshCw className="w-4 h-4 text-orange-500 animate-spin" />
            ) : (
              (() => {
                const FieldIcon = getFieldIcon(selectedField.icon);
                return <FieldIcon className="w-4 h-4 text-neutral-500 group-hover:text-orange-500 transition-colors" />;
              })()
            )}
            <span className="text-sm font-medium text-neutral-700">
              {isSorting ? 'Sorting...' : selectedField.label}
            </span>
          </div>
          {!isSorting && (
            <ChevronDown
              className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${
                isDropdownOpen ? 'rotate-180' : ''
              }`}
            />
          )}
        </button>

        {/* Field Dropdown Menu */}
        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute top-full left-0 mt-2 bg-white border border-neutral-200 rounded-lg shadow-lg z-50 overflow-hidden min-w-[140px]"
            >
              {fieldOptions.map((option, index) => {
                const FieldIcon = getFieldIcon(option.icon);
                const isSelected = option.value === currentField;

                return (
                  <button
                    key={option.value}
                    onClick={() => handleFieldChange(option.value)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-neutral-50 transition-colors duration-150 ${
                      isSelected ? 'bg-orange-50 text-orange-700' : 'text-neutral-700'
                    } ${
                      index !== fieldOptions.length - 1 ? 'border-b border-neutral-100' : ''
                    }`}
                  >
                    <FieldIcon className={`w-4 h-4 ${
                      isSelected ? 'text-orange-600' : 'text-neutral-500'
                    }`} />
                    <span className={`text-sm font-medium ${
                      isSelected ? 'text-orange-700' : 'text-neutral-700'
                    }`}>
                      {option.label}
                    </span>
                    {isSelected && (
                      <div className="w-2 h-2 bg-orange-500 rounded-full ml-auto"></div>
                    )}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Direction Toggle Button */}
      <button
        onClick={handleDirectionToggle}
        disabled={isSorting}
        className={`flex items-center justify-center w-10 h-10 bg-white border border-neutral-200 rounded-lg hover:border-neutral-300 hover:shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent group ${
          isSorting ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer'
        }`}
        title={`Sort ${currentDirectionOption.label}`}
      >
        {isSorting ? (
          <RefreshCw className="w-4 h-4 text-orange-500 animate-spin" />
        ) : currentDirection === 'asc' ? (
          <ArrowUp className="w-4 h-4 text-neutral-500 group-hover:text-orange-500 transition-colors" />
        ) : (
          <ArrowDown className="w-4 h-4 text-neutral-500 group-hover:text-orange-500 transition-colors" />
        )}
      </button>
    </motion.div>
  );
};

export default NewCustomersSort;
