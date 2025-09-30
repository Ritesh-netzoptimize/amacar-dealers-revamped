import { useState, useMemo } from 'react';
import { filterAppointmentsByStatus } from '@/utils/appointmentFilters';
import { sortAppointments } from '@/utils/appointmentSorting';

export const useAppointmentFilters = (appointments = []) => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date-asc');
  const [isFiltering, setIsFiltering] = useState(false);
  const [isSorting, setIsSorting] = useState(false);
  const [filterProgress, setFilterProgress] = useState(0);
  const [sortProgress, setSortProgress] = useState(0);
  const [filteringTab, setFilteringTab] = useState(null);

  // Filter and sort appointments based on selected options
  const filteredAndSortedAppointments = useMemo(() => {
    if (!appointments || appointments.length === 0) return [];

    // First filter by status
    const filteredAppointments = filterAppointmentsByStatus(appointments, statusFilter);

    // Then sort the filtered appointments
    return sortAppointments(filteredAppointments, sortBy);
  }, [appointments, sortBy, statusFilter]);

  // Handle status filter selection with loading animation
  const handleStatusFilter = (value) => {
    if (value === statusFilter) return;

    setIsFiltering(true);
    setFilterProgress(0);
    setFilteringTab(value);

    // Simulate filtering process with random delay and progress
    const randomDelay = Math.random() * 800 + 400; // 400-1200ms
    const progressInterval = 50; // Update progress every 50ms

    const progressTimer = setInterval(() => {
      setFilterProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressTimer);
          return 90;
        }
        return prev + Math.random() * 15;
      });
    }, progressInterval);

    setTimeout(() => {
      clearInterval(progressTimer);
      setFilterProgress(100);
      setStatusFilter(value);

      // Reset after a short delay
      setTimeout(() => {
        setIsFiltering(false);
        setFilterProgress(0);
        setFilteringTab(null);
      }, 200);
    }, randomDelay);
  };

  // Handle sort selection with loading animation
  const handleSortSelect = (value) => {
    if (value === sortBy) return;

    setIsSorting(true);
    setSortProgress(0);

    // Simulate sorting process with random delay and progress
    const randomDelay = Math.random() * 1000 + 500; // 500-1500ms
    const progressInterval = 50; // Update progress every 50ms

    const progressTimer = setInterval(() => {
      setSortProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressTimer);
          return 90;
        }
        return prev + Math.random() * 15;
      });
    }, progressInterval);

    setTimeout(() => {
      clearInterval(progressTimer);
      setSortProgress(100);
      setSortBy(value);

      // Reset after a short delay
      setTimeout(() => {
        setIsSorting(false);
        setSortProgress(0);
      }, 200);
    }, randomDelay);
  };

  return {
    // State
    statusFilter,
    sortBy,
    isFiltering,
    isSorting,
    filterProgress,
    sortProgress,
    filteringTab,
    filteredAndSortedAppointments,
    
    // Actions
    handleStatusFilter,
    handleSortSelect,
    setStatusFilter,
    setSortBy,
  };
};
