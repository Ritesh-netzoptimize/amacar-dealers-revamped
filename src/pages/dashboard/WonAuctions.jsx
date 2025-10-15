import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import DashboardStats from "@/components/dashboard/DashboardStats/DashboardStats";
import WonAuctionsContainer from "@/components/won-auctions/WonAuctionsContainer";
import WonAuctionsSkeleton from "@/components/skeletons/WonAuctions/WonAuctionsSkeleton";
import WonAuctionsCompactSkeleton from "@/components/skeletons/WonAuctions/WonAuctionsCompactSkeleton";
import Pagination from "@/components/common/Pagination/Pagination";
import FilterTabs from "@/components/filters/LiveAuctionFilterTabs";
import ScheduleAppointmentModal from "@/components/appointments/ScheduleAppointmentModal";
import api from "@/lib/api";
import toast from "react-hot-toast";
import { useSearch } from "@/context/SearchContext";

const WonAuctions = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterLoading, setIsFilterLoading] = useState(false);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState("allTime");
  const [auctions, setAuctions] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 4,
    total: 0,
    total_pages: 1,
    has_next: false,
    has_prev: false
  });
  const [error, setError] = useState(null);
  const itemsPerPage = 4; // Show 4 vehicles per page

  // Get user role from Redux store
  const { user } = useSelector((state) => state.user);
  const userRole = user?.role;

  // Search context
  const { searchQuery, isSearching, debouncedSearchQuery, clearSearch } = useSearch();

  // Appointment modal state
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [selectedAuctionForAppointment, setSelectedAuctionForAppointment] = useState(null);

  // Won Auctions API function using the imported api instance
  const getWonAuctions = useCallback(async (page = 1, perPage = 4, search = '') => {
    try {
      const params = {
        page,
        per_page: perPage
      };
      
      // Add search parameter if provided
      if (search && search.trim()) {
        params.search = search.trim();
      }
      
      const response = await api.get('/won-auctions', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching won auctions:', error);
      throw error;
    }
  }, []);

  // Transform API data to match component expectations
  const transformWonAuctionData = useCallback((apiData) => {
    return apiData.map(auction => ({
      id: auction.id,
      name: auction.title,
      appointmentScheduled: auction.appointment_scheduled,
      images: auction.images?.map(img => img.url) || [],
      make: auction.make,
      model: auction.model,
      year: parseInt(auction.year),
      mileage: parseInt(auction.mileage),
      VIN: auction.vin,
      cashOffer: `$${auction.cash_offer?.toLocaleString() || '0'}`,
      highestBid: auction.winning_bid?.amount ? `$${auction.winning_bid.amount.toLocaleString()}` : 'No bid',
      finalPrice: auction.winning_bid?.amount ? `$${auction.winning_bid.amount.toLocaleString()}` : 'No bid',
      wonBy: auction.customer?.name || 'Unknown', // This will be overridden based on user role
      bidderDisplayName: auction.winning_bid?.bidder_display_name || null, // Add bidder display name from winning_bid
      dealershipName: auction.winning_bid?.dealership_name || null, // Add dealership name from winning_bid
      acceptedOn: new Date(auction.won_at).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      timeLeft: "0", // Won auctions don't have time left
      status: auction.status,
      customer: auction.customer,
      winningBid: auction.winning_bid,
      createdAt: auction.created_at,
      updatedAt: auction.updated_at
    }));
  }, []);

 

  // Apply client-side filtering for date-based filters
  const applyClientSideFilter = useCallback((data, filter) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const thisWeek = new Date(today.getTime() - (today.getDay() * 24 * 60 * 60 * 1000));
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    return data.filter(auction => {
      const auctionDate = new Date(auction.acceptedOn);
      
      switch (filter) {
        case 'today':
          return auctionDate >= today && auctionDate < new Date(today.getTime() + 24 * 60 * 60 * 1000);
        case 'thisWeek':
          return auctionDate >= thisWeek && auctionDate < new Date(thisWeek.getTime() + 7 * 24 * 60 * 60 * 1000);
        case 'thisMonth':
          return auctionDate >= thisMonth && auctionDate < new Date(thisMonth.getTime() + 30 * 24 * 60 * 60 * 1000);
        default:
          return true;
      }
    });
  }, []);

   // Fetch won auctions from API
   const fetchWonAuctions = useCallback(async (page = 1, filter = 'allTime', search = '') => {
    try {
      setError(null);
      
      const response = await getWonAuctions(page, itemsPerPage, search);
      
      if (response.success) {
        let transformedData = transformWonAuctionData(response.data);
        
        // Apply client-side filtering for all filters since API doesn't support them
        if (filter !== 'allTime') {
          transformedData = applyClientSideFilter(transformedData, filter);
        }
        
        setAuctions(transformedData);
        setPagination(response.pagination);
      } else {
        throw new Error('Failed to fetch won auctions');
      }
    } catch (err) {
      console.error('Error fetching won auctions:', err);
      setError(err.message);
      setAuctions([]);
    }
  }, [getWonAuctions, itemsPerPage, transformWonAuctionData, applyClientSideFilter]);

  // Handle filter change
  const handleFilterChange = useCallback(async (filterId) => {
    if (isFilterLoading) return;
    
    setIsFilterLoading(true);
    setCurrentPage(1);
    setActiveFilter(filterId);
    
    await fetchWonAuctions(1, filterId, debouncedSearchQuery);
    setIsFilterLoading(false);
  }, [isFilterLoading, fetchWonAuctions, debouncedSearchQuery]);

  // Handle page change
  const handlePageChange = useCallback(async (page) => {
    setCurrentPage(page);
    await fetchWonAuctions(page, activeFilter, debouncedSearchQuery);
  }, [fetchWonAuctions, activeFilter, debouncedSearchQuery]);

  // Handle schedule appointment
  const handleScheduleAppointment = (auction) => {
    console.log("Schedule appointment for auction:", auction);
    setSelectedAuctionForAppointment(auction);
    setIsAppointmentModalOpen(true);
  };

  const handleCloseAppointmentModal = () => {
    setIsAppointmentModalOpen(false);
    setSelectedAuctionForAppointment(null);
  };

  const handleAppointmentSubmit = (appointmentData) => {
    console.log("Appointment submitted:", appointmentData);
    // Handle appointment submission success
    toast.success("Appointment scheduled successfully!");
    handleCloseAppointmentModal();
  };

  // Handle data fetching for search and filter changes
  useEffect(() => {
    const fetchData = async () => {
      setIsSearchLoading(false);
      setIsLoading(true);
      
      // Reset to page 1 when search or filter changes
      setCurrentPage(1);
      await fetchWonAuctions(1, activeFilter, debouncedSearchQuery);
      setIsLoading(false);
    };

    fetchData();
  }, [debouncedSearchQuery, activeFilter, fetchWonAuctions]);

  // Handle search loading state separately
  useEffect(() => {
    if (isSearching) {
      setIsSearchLoading(true);
    } else {
      setIsSearchLoading(false);
    }
  }, [isSearching]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const statsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-50 pt-10 md:pt-24 px-4 md:px-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {isLoading ? (
        <WonAuctionsSkeleton />
      ) : (
        <div className="px-4 md:px-6">
          {/* Header Section */}
          <motion.div className="mb-8" variants={headerVariants}>
            <motion.h1
              className="text-3xl font-bold text-neutral-900 mb-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Won Auctions
            </motion.h1>
            <motion.p
              className="text-neutral-600"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              View your won auctions and track their status.
            </motion.p>
          </motion.div>

          {/* Statistics Cards */}
          <motion.div variants={statsVariants}>
            <DashboardStats />
          </motion.div>

          {/* Filter Tabs */}
          <motion.div className="mt-8" variants={statsVariants}>
            <FilterTabs
              activeFilter={activeFilter}
              onFilterChange={handleFilterChange}
              isLoading={isFilterLoading}
              className="mb-6"
            />

            {/* Results Count */}
            <motion.div
              className="flex items-center justify-between mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <p className="text-sm text-neutral-600">
                {searchQuery ? (
                  <>
                    Showing {pagination.total} result{pagination.total !== 1 ? "s" : ""} for "{searchQuery}"
                    {activeFilter !== "allTime" && (
                      <span className="ml-1 text-neutral-500">
                        (
                        {activeFilter === "today"
                          ? "today"
                          : activeFilter === "thisWeek"
                          ? "this week"
                          : activeFilter === "thisMonth"
                          ? "this month"
                          : "passed"}
                        )
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    Showing {pagination.total} auction
                    {pagination.total !== 1 ? "s" : ""}
                    {activeFilter !== "allTime" && (
                      <span className="ml-1 text-neutral-500">
                        (
                        {activeFilter === "today"
                          ? "today"
                          : activeFilter === "thisWeek"
                          ? "this week"
                          : activeFilter === "thisMonth"
                          ? "this month"
                          : "passed"}
                        )
                      </span>
                    )}
                  </>
                )}
              </p>
            </motion.div>
          </motion.div>
          {/* Error State */}
          {error && (
            <motion.div 
              className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg"
              variants={statsVariants}
            >
              <p className="text-red-600 text-center">
                Error loading won auctions: {error}
              </p>
            </motion.div>
          )}

          {/* Won Auctions Grid */}
          {!error && (
            <motion.div className="mt-8" variants={statsVariants}>
              {isSearchLoading ? (
                <WonAuctionsCompactSkeleton />
              ) : auctions.length > 0 ? (
                <WonAuctionsContainer 
                  auctions={auctions} 
                  onScheduleAppointment={handleScheduleAppointment}
                  userRole={userRole}
                />
              ) : (
                /* Empty State */
                <div className="flex flex-col items-center justify-center py-16 px-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-full flex items-center justify-center mb-6">
                    <svg 
                      className="w-12 h-12 text-neutral-400" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={1.5} 
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                    {searchQuery ? `No results found for "${searchQuery}"` : "No won auctions available"}
                  </h3>
                  <p className="text-neutral-500 text-center max-w-md">
                    {searchQuery 
                      ? "Try adjusting your search terms or browse all won auctions."
                      : "You haven't won any auctions yet. Keep bidding to see your wins here!"
                    }
                  </p>
                  {searchQuery && (
                    <button
                      onClick={clearSearch}
                      className="mt-4 px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200"
                    >
                      Clear Search
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {/* Pagination */}
          {!error && pagination.total_pages > 1 && (
            <motion.div
              className="flex justify-center mt-8"
              variants={statsVariants}
            >
              <Pagination
                currentPage={pagination.current_page}
                totalPages={pagination.total_pages}
                onPageChange={handlePageChange}
                className="w-full max-w-md mt-6 mb-4"
              />
            </motion.div>
          )}
        </div>
      )}

      {/* Schedule Appointment Modal */}
      {selectedAuctionForAppointment && (
        <ScheduleAppointmentModal
          isOpen={isAppointmentModalOpen}
          onClose={handleCloseAppointmentModal}
          onAppointmentSubmit={handleAppointmentSubmit}
          dealerName={selectedAuctionForAppointment.customer?.name || "Customer"}
          dealerId={selectedAuctionForAppointment.customer?.id || selectedAuctionForAppointment.id}
          dealerEmail={selectedAuctionForAppointment.customer?.email || "customer@example.com"}
          vehicleInfo={`${selectedAuctionForAppointment.year} ${selectedAuctionForAppointment.make} ${selectedAuctionForAppointment.model}`}
          title="Schedule Appointment"
          description="Choose your preferred date and time to meet with this customer"
        />
      )}
    </motion.div>
  );
};

export default WonAuctions;
