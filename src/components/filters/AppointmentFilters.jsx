import React from "react";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { getStatusFilterOptions } from "@/utils/appointmentFilters";

const AppointmentFilters = ({
  appointments = [],
  statusFilter = "all",
  onStatusFilterChange,
  isFiltering = false,
  filterProgress = 0,
  filteringTab = null,
  className = "",
}) => {
  const statusFilterOptions = getStatusFilterOptions(appointments);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`mb-6 sm:mb-8 ${className}`}
    >
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {statusFilterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onStatusFilterChange(option.value)}
            disabled={isFiltering}
            className={`relative px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-medium transition-all duration-200 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm ${
              statusFilter === option.value
                ? "bg-orange-500 text-white shadow-md shadow-orange-500/25"
                : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 hover:border-slate-300"
            } ${
              isFiltering && filteringTab === option.value
                ? "opacity-75 cursor-not-allowed"
                : "cursor-pointer"
            }`}
          >
            {isFiltering && filteringTab === option.value && (
              <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
            )}
            <span className="truncate">{option.label}</span>
            <span
              className={`px-1.5 sm:px-2 py-0.5 text-xs rounded-full flex-shrink-0 ${
                statusFilter === option.value
                  ? "bg-white/20 text-white"
                  : option.color
              }`}
            >
              {option.count}
            </span>
            {isFiltering && filteringTab === option.value && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30 rounded-b-lg sm:rounded-b-xl overflow-hidden">
                <div
                  className="h-full bg-white/60 transition-all duration-100 ease-out"
                  style={{ width: `${filterProgress}%` }}
                />
              </div>
            )}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default AppointmentFilters;
