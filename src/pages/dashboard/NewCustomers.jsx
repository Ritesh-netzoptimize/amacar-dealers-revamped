import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Pagination from "@/components/common/Pagination/Pagination";
import NewCustomersContainer from "@/components/new-customers/NewCustomersContainer";
import NewCustomersSort from "@/components/sorts/NewCustomersSort";
import { sortNewCustomers } from "@/utils/newCustomersSorting";
import NewCustomersSkeleton from "@/components/skeletons/NewCustomers/NewCustomersSkeleton";
import api from "@/lib/api";
import toast from "react-hot-toast";

const NewCustomers = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("join-date-desc");
  const [isSorting, setIsSorting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 10,
    total: 0,
    total_pages: 0,
    has_next: false,
    has_prev: false
  });
  const [error, setError] = useState(null);
  const itemsPerPage = 10;

  // Fetch new customers from API
  const fetchNewCustomers = async (page = 1, perPage = 10) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await api.get('/new-customers', {
        params: {
          page,
          per_page: perPage
        }
      });

      if (response.data.success) {
        setCustomers(response.data.data);
        setPagination(response.data.pagination);
      } else {
        throw new Error('Failed to fetch new customers');
      }
    } catch (error) {
      console.error('Error fetching new customers:', error);
      setError(error.message || 'Failed to fetch new customers');
      toast.error('Failed to load new customers. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data on component mount and when page changes
  useEffect(() => {
    fetchNewCustomers(currentPage, itemsPerPage);
  }, [currentPage]);

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 },
    },
  };

  const headerVariants = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut", delay: 0.2 },
    },
  };

  const paginationVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  // Transform API data to match component expectations
  const transformedCustomers = useMemo(() => {
    return customers.map(customer => ({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      avatar: customer.avatar,
      address: customer.location?.address || 'Address not available',
      distance: `${Math.round(customer.distance)} miles`,
      vehicle: customer.vehicle?.title || 'Vehicle not available',
      year: customer.vehicle?.year || '',
      make: customer.vehicle?.make || '',
      model: customer.vehicle?.model || '',
      vin: customer.vehicle?.vin || '',
      mileage: customer.vehicle?.mileage || '0',
      offer: `$${customer.vehicle?.cash_offer?.toLocaleString() || '0'}`,
      images: customer.vehicle?.images || [],
      primaryImage: customer.vehicle?.primary_image || '',
      joinDate: customer.created_at,
      lastActivity: customer.last_activity,
      lat: customer.location?.lat,
      lon: customer.location?.lon
    }));
  }, [customers]);

  // Sort customers (client-side sorting for now)
  const sortedCustomers = useMemo(() => {
    return sortNewCustomers(transformedCustomers, sortBy);
  }, [transformedCustomers, sortBy]);

  // Handler functions
  const handleViewCustomer = (customerId) => {
    console.log("View customer:", customerId);
    navigate(`/customers/${customerId}`);
  };

  const handleViewVehicle = (customerId) => {
    console.log("View vehicle for customer:", customerId);
    navigate(`/vehicles/${customerId}`);
  };

  const handleScheduleAppointment = (customerId) => {
    console.log("Schedule appointment for customer:", customerId);
    navigate(`/appointments/schedule?customerId=${customerId}`);
  };

  const handleContact = (customerId) => {
    console.log("Contact customer:", customerId);
    // Open contact modal or initiate call
  };

  const handlePageChange = (page) => {
    // Add a small delay for smooth transition
    setTimeout(() => {
      setCurrentPage(page);
      // Scroll to top when page changes
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  const handleSortChange = (newSortBy) => {
    if (newSortBy !== sortBy) {
      setIsSorting(true);
      setSortBy(newSortBy);
      setCurrentPage(1); // Reset to first page when sorting changes

      // Simulate sorting delay for better UX
      setTimeout(() => {
        setIsSorting(false);
      }, 300);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-50 pt-10 md:pt-24 px-4 md:px-6"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="max-w-8xl px-4 md:px-6">
        {/* Header Section */}
        {!isLoading && (
          <motion.div className="mb-6" variants={headerVariants}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-neutral-900">
                  New Customers
                </h1>
                <p className="text-neutral-600 mt-1">
                  Manage and view all new customer offers and details
                </p>
              </div>
              <div className="flex items-center gap-3">
                <NewCustomersSort
                  sortBy={sortBy}
                  onSortChange={handleSortChange}
                  isSorting={isSorting}
                  className="w-full sm:w-auto"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Content Section */}
        <motion.div
          variants={contentVariants}
          key={currentPage} // Re-animate when page changes
        >
          {isLoading || isSorting ? (
            <NewCustomersSkeleton />
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Failed to load customers
                </h3>
                <p className="text-gray-600 mb-4">{error}</p>
                <button
                  onClick={() => fetchNewCustomers(currentPage, itemsPerPage)}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : (
            <NewCustomersContainer
              customers={sortedCustomers}
              currentPage={currentPage}
              totalPages={pagination.total_pages}
              totalCount={pagination.total}
              onPageChange={handlePageChange}
              onViewCustomer={handleViewCustomer}
              onViewVehicle={handleViewVehicle}
              onScheduleAppointment={handleScheduleAppointment}
              onContact={handleContact}
            />
          )}
        </motion.div>

        {/* Pagination */}
        <AnimatePresence mode="wait">
          {!isLoading && !isSorting && !error && pagination.total_pages > 1 && (
            <motion.div
              className="flex justify-center mt-8 pt-6 border-t border-neutral-100"
              variants={paginationVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Pagination
                currentPage={currentPage}
                totalPages={pagination.total_pages}
                onPageChange={handlePageChange}
                className="w-full max-w-md mb-4"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default NewCustomers;
