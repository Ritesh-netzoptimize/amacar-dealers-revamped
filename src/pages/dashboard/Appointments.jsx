import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Eye } from "lucide-react";
import { useAppointmentFilters } from "@/hooks/useAppointmentFilters";
import AppointmentFilters from "@/components/filters/AppointmentFilters";
import AppointmentSort from "@/components/sorts/AppointmentSort";
import AppointmentList from "@/components/appointments/AppointmentList";
import Pagination from "@/components/common/Pagination/Pagination";
import AppointmentsSkeleton from "@/components/skeletons/Appointments/AppointmentsSkeleton";
import AppointmentsSortSkeleton from "@/components/skeletons/Appointments/AppointmentsSortSkeleton";
import api from "@/lib/api";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 5,
    total: 0,
    total_pages: 1,
    has_next: false,
    has_prev: false
  });
  const itemsPerPage = 5;

  // Appointments API function using the imported api instance
  const getAppointments = async (page = 1, perPage = 5) => {
    try {
      const response = await api.get('/appointments', {
        params: {
          page,
          per_page: perPage
        }
      });
      console.log("response.data", response.data)
      console.log("response", response)
      console.log("response.data.data", response.data.data)
      return response.data;
    } catch (error) {
      console.error('Error fetching appointments:', error);
      throw error;
    }
  };

  // Transform API data to match component expectations
  const transformAppointmentsData = (apiData) => {
    console.log("apiData", apiData);
    return apiData.map(appointment => ({
      id: appointment.id,
      dealer_id: appointment.dealer_id,
      dealer_name: appointment.customer?.name || 'Unknown Customer',
      dealer_email: appointment.customer?.email || '',
      dealer_phone: appointment.customer?.phone || '',
      start_time: appointment.start_time,
      end_time: appointment.end_time,
      duration: appointment.duration,
      status: appointment.status,
      reschedule_url: `https://dealer.amacar.ai/my-account/customer-appointments/?dealer_id=${appointment.dealer_id}`,
      is_pending: appointment.status === 'pending',
      formatted_date: appointment.formatted_date,
      formatted_time: appointment.formatted_time,
      formatted_status: appointment.formatted_status,
      created_at: appointment.created_at,
      updated_at: appointment.updated_at,
      notes: appointment.notes || '',
      location: 'Location not specified', // API doesn't provide location
      meeting_type: 'in-person', // Default to in-person
      user_metadata: {
        phone: appointment.customer?.phone || '',
        city: 'Unknown',
        state: 'Unknown'
      },
      customer: appointment.customer,
      title: appointment.title
    }));
  };

  // Use custom hooks
  const {
    statusFilter,
    sortBy,
    isFiltering,
    isSorting,
    filterProgress,
    sortProgress,
    filteringTab,
    filteredAndSortedAppointments,
    handleStatusFilter,
    handleSortSelect,
  } = useAppointmentFilters(appointments);

  // Calculate pagination - use API pagination for total pages
  const totalPages = pagination.total_pages;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedAppointments = filteredAndSortedAppointments.slice(
    startIndex,
    endIndex
  );

  // Fetch appointments from API
  const fetchAppointments = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await getAppointments(page, itemsPerPage);
      
      if (response.success) {
        console.log("inside response.success");
        console.log("response", response)
        console.log("response.data", response.data)
        const transformedData = transformAppointmentsData(response.data);
        console.log("transformedData", transformedData);
        setAppointments(transformedData);
        setPagination(response.pagination);
      } else {
        throw new Error('Failed to fetch appointments');
      }
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setError(err.message || 'Failed to load appointments');
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, sortBy]);

  // Initial data load
  useEffect(() => {
    fetchAppointments(1);
  }, []);

  // Handle page change
  const handlePageChange = async (page) => {
    setCurrentPage(page);
    await fetchAppointments(page);
  };

  // Handle view details
  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
    // You can implement modal or navigation here
    console.log("View details for appointment:", appointment.id);
  };

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
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // Show loading state
  if (loading) {
    return <AppointmentsSkeleton />;
  }

  // Show error state
  if (error) {
  return (
      <div className="min-h-screen bg-gradient-hero p-8">
        <div className="max-w-8xl mx-auto">
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-12 h-12 text-red-500" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-800 mb-2">
              Error Loading Appointments
            </h3>
            <p className="text-neutral-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero pt-10 md:pt-24 px-4 md:px-6">
      <div className="max-w-8xl mx-auto px-4 md:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-6 sm:mb-8"
        >
          <motion.h1
            variants={itemVariants}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-800 mb-2"
          >
            My Appointments
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base text-neutral-600"
          >
            Manage your scheduled appointments with dealers.
          </motion.p>
        </motion.div>

        {/* Status Filter Tabs */}
        <AppointmentFilters
          appointments={appointments}
          statusFilter={statusFilter}
          onStatusFilterChange={handleStatusFilter}
          isFiltering={isFiltering}
          filterProgress={filterProgress}
          filteringTab={filteringTab}
        />

        {/* Sorting Section */}
        {!loading && !error && appointments.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-4 sm:mb-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h2 className="text-base sm:text-lg font-semibold text-neutral-800 mb-1 truncate">
                  {statusFilter === "all"
                    ? "All Appointments"
                    : statusFilter === "pending"
                    ? "Pending Appointments"
                    : statusFilter === "confirmed"
                    ? "Confirmed Appointments"
                    : statusFilter === "cancelled"
                    ? "Cancelled Appointments"
                    : "Appointments"}
                </h2>
                <p className="text-xs sm:text-sm text-neutral-600">
                  {pagination.total}{" "}
                  {statusFilter === "all" ? "scheduled" : statusFilter}{" "}
                  appointments
                </p>
              </div>

              <AppointmentSort
                sortBy={sortBy}
                onSortChange={handleSortSelect}
                isSorting={isSorting}
                sortProgress={sortProgress}
                isDropdownOpen={isDropdownOpen}
                onDropdownToggle={setIsDropdownOpen}
              />
            </div>
          </motion.div>
        )}

        {/* Appointments List */}
        {!loading && !error && appointments.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* Show loading state during sorting/filtering */}
            {(isSorting || isFiltering) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <AppointmentsSortSkeleton />
              </motion.div>
            )}

            {/* Show appointments when not sorting/filtering */}
            {!isSorting && !isFiltering && (
              <AppointmentList
                appointments={paginatedAppointments}
                onViewDetails={handleViewDetails}
              />
            )}
          </motion.div>
        )}

        {/* Pagination */}
        {!loading &&
          !error &&
          appointments.length > 0 &&
          totalPages > 1 &&
          !isSorting &&
          !isFiltering && (
            <motion.div
              variants={itemVariants}
              className="flex justify-center mt-8"
            >
              <Pagination
                currentPage={pagination.current_page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                className="w-full max-w-md"
              />
            </motion.div>
          )}

        {/* Empty State */}
        {!loading && !error && filteredAndSortedAppointments.length === 0 && (
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center min-h-[50vh] sm:min-h-[60vh] px-4"
          >
            <div className="text-center max-w-sm sm:max-w-md mx-auto">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative mb-4"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto shadow-soft border border-primary-200">
                  <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-primary-500" />
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="space-y-3 sm:space-y-4"
              >
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-800 font-display">
                  {statusFilter === "all"
                    ? "No Appointments"
                    : statusFilter === "pending"
                    ? "No Pending Appointments"
                    : statusFilter === "confirmed"
                    ? "No Confirmed Appointments"
                    : statusFilter === "cancelled"
                    ? "No Cancelled Appointments"
                    : "No Appointments"}
                </h3>
                <p className="text-neutral-600 text-sm sm:text-base lg:text-lg leading-relaxed">
                  {statusFilter === "all"
                    ? "You don't have any scheduled appointments at the moment."
                    : statusFilter === "pending"
                    ? "You don't have any pending appointments."
                    : statusFilter === "confirmed"
                    ? "You don't have any confirmed appointments."
                    : statusFilter === "cancelled"
                    ? "You don't have any cancelled appointments."
                    : "You don't have any appointments in this category."}
                </p>
              </motion.div>

              {statusFilter === "all" && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8"
                >
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="cursor-pointer w-full sm:w-60 px-4 h-12 sm:h-16 group relative bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:shadow-xl hover:shadow-primary-500/25 focus:outline-none focus:ring-4 focus:ring-primary-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <div className="flex items-center justify-center sm:justify-between gap-2">
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:scale-110" />
                      <span className="text-sm sm:text-base">
                        Schedule Appointment
                      </span>
                    </div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="cursor-pointer w-full sm:w-60 px-4 h-12 sm:h-16 group relative overflow-hidden bg-white hover:bg-neutral-50 text-neutral-700 font-semibold py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 border-neutral-200 hover:border-neutral-300 transition-all duration-300 transform hover:shadow-lg hover:shadow-neutral-500/10 focus:outline-none focus:ring-4 focus:ring-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                      <Eye className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:scale-110" />
                      <span className="text-sm sm:text-base">
                        View Dashboard
                      </span>
                    </div>
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Appointments;
