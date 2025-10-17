import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ChevronDown, X, RefreshCw } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const ReportsGlobalFilter = ({
  startDate,
  endDate,
  onDateRangeChange,
  onApply,
  isLoading = false,
  className = "",
}) => {
  const [isStartDateOpen, setIsStartDateOpen] = useState(false);
  const [isEndDateOpen, setIsEndDateOpen] = useState(false);
  const [tempStartDate, setTempStartDate] = useState(startDate);
  const [tempEndDate, setTempEndDate] = useState(endDate);
  const [errors, setErrors] = useState({});

  // Format date for display
  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Format date for input (YYYY-MM-DD)
  const formatDateForInput = (date) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
  };

  // Validate date range
  const validateDateRange = (start, end) => {
    const errors = {};
    
    if (start && end && new Date(start) > new Date(end)) {
      errors.dateRange = "Start date must be before or equal to end date";
    }
    
    if (start && new Date(start) > new Date()) {
      errors.startDate = "Start date cannot be in the future";
    }
    
    if (end && new Date(end) > new Date()) {
      errors.endDate = "End date cannot be in the future";
    }

    return errors;
  };

  // Handle date selection
  const handleStartDateSelect = (date) => {
    if (date) {
      setTempStartDate(date);
      setErrors(validateDateRange(date, tempEndDate));
    }
    setIsStartDateOpen(false);
  };

  const handleEndDateSelect = (date) => {
    if (date) {
      setTempEndDate(date);
      setErrors(validateDateRange(tempStartDate, date));
    }
    setIsEndDateOpen(false);
  };

  // Handle apply button click
  const handleApply = () => {
    const validationErrors = validateDateRange(tempStartDate, tempEndDate);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    onDateRangeChange(tempStartDate, tempEndDate);
    onApply?.();
  };

  // Handle clear button click
  const handleClear = () => {
    setTempStartDate(null);
    setTempEndDate(null);
    setErrors({});
    onDateRangeChange(null, null);
  };

  // Reset temp dates when props change
  useEffect(() => {
    setTempStartDate(startDate);
    setTempEndDate(endDate);
  }, [startDate, endDate]);

  // Check if dates have changed
  const hasChanges = 
    tempStartDate !== startDate || 
    tempEndDate !== endDate;

  // Disable future dates
  const today = new Date();
  today.setHours(23, 59, 59, 999);

  const isDateDisabled = (date) => {
    return date > today;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn("mt-6 sm:mt-8", className)}
    >
      <div className=" bg-white rounded-lg border border-slate-200 p-4 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          {/* Filter Title */}
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-slate-600" />
           
          </div>

          {/* Date Range Selectors */}
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            {/* Start Date */}
            <div className="flex-1">
           
              <Popover open={isStartDateOpen} onOpenChange={setIsStartDateOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !tempStartDate && "text-slate-500"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {tempStartDate ? formatDate(tempStartDate) : "Start date"}
                    <ChevronDown className="ml-auto h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={tempStartDate}
                    onSelect={handleStartDateSelect}
                    disabled={isDateDisabled}
                    initialFocus
                    className="rounded-lg"
                    classNames={{
                      months: "flex flex-col space-y-4",
                      month: "space-y-4",
                      caption: "flex justify-center pt-1 relative items-center",
                      caption_label: "text-sm font-medium",
                      nav: "space-x-1 flex items-center",
                      nav_button: "h-8 w-8 bg-transparent p-0 opacity-50 hover:opacity-100",
                      nav_button_previous: "absolute left-1",
                      nav_button_next: "absolute right-1",
                      table: "w-full border-collapse space-y-1",
                      head_row: "flex",
                      head_cell: "text-slate-500 rounded-md w-8 font-normal text-[0.8rem]",
                      row: "flex w-full mt-2",
                      cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-slate-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md",
                      day: "h-8 w-8 p-0 font-normal aria-selected:opacity-100 hover:bg-slate-100 hover:text-slate-900 rounded-md",
                      day_selected: "bg-orange-500 text-white hover:bg-orange-600 hover:text-white focus:bg-orange-500 focus:text-white",
                      day_today: "bg-slate-100 text-slate-900",
                      day_outside: "text-slate-400 opacity-50",
                      day_disabled: "text-slate-400 opacity-50",
                      day_range_middle: "aria-selected:bg-slate-100 aria-selected:text-slate-900",
                      day_hidden: "invisible",
                    }}
                  />
                </PopoverContent>
              </Popover>
              {errors.startDate && (
                <p className="text-sm text-red-600 mt-1">{errors.startDate}</p>
              )}
            </div>

            {/* End Date */}
            <div className="flex-1">
        
              <Popover open={isEndDateOpen} onOpenChange={setIsEndDateOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !tempEndDate && "text-slate-500"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {tempEndDate ? formatDate(tempEndDate) : "End date"}
                    <ChevronDown className="ml-auto h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={tempEndDate}
                    onSelect={handleEndDateSelect}
                    disabled={isDateDisabled}
                    initialFocus
                    className="rounded-lg"
                    classNames={{
                      months: "flex flex-col space-y-4",
                      month: "space-y-4",
                      caption: "flex justify-center pt-1 relative items-center",
                      caption_label: "text-sm font-medium",
                      nav: "space-x-1 flex items-center",
                      nav_button: "h-8 w-8 bg-transparent p-0 opacity-50 hover:opacity-100",
                      nav_button_previous: "absolute left-1",
                      nav_button_next: "absolute right-1",
                      table: "w-full border-collapse space-y-1",
                      head_row: "flex",
                      head_cell: "text-slate-500 rounded-md w-8 font-normal text-[0.8rem]",
                      row: "flex w-full mt-2",
                      cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-slate-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md",
                      day: "h-8 w-8 p-0 font-normal aria-selected:opacity-100 hover:bg-slate-100 hover:text-slate-900 rounded-md",
                      day_selected: "bg-orange-500 text-white hover:bg-orange-600 hover:text-white focus:bg-orange-500 focus:text-white",
                      day_today: "bg-slate-100 text-slate-900",
                      day_outside: "text-slate-400 opacity-50",
                      day_disabled: "text-slate-400 opacity-50",
                      day_range_middle: "aria-selected:bg-slate-100 aria-selected:text-slate-900",
                      day_hidden: "invisible",
                    }}
                  />
                </PopoverContent>
              </Popover>
              {errors.endDate && (
                <p className="text-sm text-red-600 mt-1">{errors.endDate}</p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <Button
              onClick={handleApply}
              disabled={isLoading || !hasChanges || Object.keys(errors).length > 0}
              className="flex items-center gap-2"
            >
              {isLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Calendar className="w-4 h-4" />
              )}
              Apply Filter
            </Button>
            
            <Button
              variant="outline"
              onClick={handleClear}
              disabled={isLoading || (!tempStartDate && !tempEndDate)}
              className="flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Clear
            </Button>
          </div>
        </div>

        {/* Error Messages */}
        <AnimatePresence>
          {errors.dateRange && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md"
            >
              <p className="text-sm text-red-600">{errors.dateRange}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ReportsGlobalFilter;
