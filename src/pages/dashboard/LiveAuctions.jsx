import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import DashboardStats from "@/components/dashboard/DashboardStats/DashboardStats";
import LiveAuctionsContainer from "@/components/live-auctions/LiveAuctionsContainer";
import LiveAuctionsSkeleton from "@/components/skeletons/LiveAuctions/LiveAuctionsSkeleton";
import LiveAuctionsCompactSkeleton from "@/components/skeletons/LiveAuctions/LiveAuctionsCompactSkeleton";
import Pagination from "@/components/common/Pagination/Pagination";
import VehicleFilterTabs from "@/components/filters/VehicleFilterTabs";
import api from "@/lib/api";
import { useSearch } from "@/context/SearchContext";

const LiveAuctions = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterLoading, setIsFilterLoading] = useState(false);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState("all");
  const [auctions, setAuctions] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 4,
    total: 0,
    total_pages: 1,
    has_next: false,
    has_prev: false,
  });
  const [error, setError] = useState(null);
  const itemsPerPage = 4; // Show 4 vehicles per page

  // Search context
  const { searchQuery, isSearching, debouncedSearchQuery, clearSearch } = useSearch();

  // Live Auctions API function using the imported api instance
  const getLiveAuctions = useCallback(async (page = 1, perPage = 4, search = '', make = '') => {
    try {
      const params = {
        page,
        per_page: perPage,
      };
      
      // Add search parameter if provided
      if (search && search.trim()) {
        params.search = search.trim();
      }
      
      // Add make filter if provided and not 'all'
      if (make && make !== 'all') {
        params.make = make;
      }
      
      const response = await api.get("/live-auctions", { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching live auctions:", error);
      throw error;
    }
  }, []);

  // Transform API data to match component expectations
  const transformAuctionData = useCallback((apiData) => {
    return apiData.map((auction) => ({
      id: auction.id,
      name: auction.title,
      images: auction.images?.map((img) => img.url) || [],
      make: auction.make,
      model: auction.model,
      year: parseInt(auction.year),
      mileage: parseInt(auction.mileage),
      VIN: auction.vin,
      cashOffer: `$${auction.cash_offer?.toLocaleString() || "0"}`,
      highestBid: auction.highest_bid,
      endsAt: new Date(auction.ends_at).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      timeLeft: auction.time_remaining,
      auctionStatus: auction.auction_status,
      is_passed: auction.is_passed, // Include the is_passed field
      createdAt: auction.created_at,
      updatedAt: auction.updated_at,
    }));
  }, []);


  // Fetch auctions from API
  const fetchAuctions = useCallback(
    async (page = 1, filter = "all", search = '') => {
      try {
        setError(null);

        const response = await getLiveAuctions(page, itemsPerPage, search, filter);

        if (response.success) {
          const transformedData = transformAuctionData(response.data);
          setAuctions(transformedData);
          setPagination(response.pagination);
        } else {
          throw new Error("Failed to fetch auctions");
        }
      } catch (err) {
        console.error("Error fetching auctions:", err);
        setError(err.message);
        setAuctions([]);
      }
    },
    [getLiveAuctions, itemsPerPage, transformAuctionData]
  );

  // Handle filter change
  const handleFilterChange = async (filterId) => {
    if (isFilterLoading) return;

    setIsFilterLoading(true);
    setCurrentPage(1);
    setActiveFilter(filterId);

    await fetchAuctions(1, filterId, debouncedSearchQuery);
    setIsFilterLoading(false);
  };

  // Handle page change
  const handlePageChange = async (page) => {
    setCurrentPage(page);
    await fetchAuctions(page, activeFilter, debouncedSearchQuery);
  };

  // Handle pass/unpass success - refresh data
  const handlePassUnpassSuccess = async () => {
    console.log("Pass/Unpass operation successful, refreshing data...");
    await fetchAuctions(currentPage, activeFilter, debouncedSearchQuery);
  };

  // Handle data fetching for search and filter changes
  useEffect(() => {
    const fetchData = async () => {
      setIsSearchLoading(false);
      setIsLoading(true);
      
      // Reset to page 1 when search or filter changes
      setCurrentPage(1);
      await fetchAuctions(1, activeFilter, debouncedSearchQuery);
      setIsLoading(false);
    };

    // Only fetch when debouncedSearchQuery or activeFilter changes, not when isSearching changes
    fetchData();
  }, [debouncedSearchQuery, activeFilter, fetchAuctions]);

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
    <>
      {isLoading ? (
        <LiveAuctionsSkeleton />
      ) : (
        <motion.div
          className="min-h-screen bg-gray-50 pt-10 md:pt-24 px-4 md:px-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="px-4 md:px-6">
            {/* Header Section */}
            <motion.div className="mb-8" variants={headerVariants}>
              <motion.h1
                className="text-3xl font-bold text-neutral-900 mb-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Live Auctions
              </motion.h1>
              <motion.p
                className="text-neutral-600"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Monitor and participate in live vehicle auctions. Place your
                bids and track real-time activity.
              </motion.p>
            </motion.div>

            {/* Statistics Cards */}
            <motion.div variants={statsVariants}>
              <DashboardStats />
            </motion.div>

            {/* Filter Tabs */}
            <motion.div
              className="mt-8 flex items-center justify-between"
              variants={statsVariants}
            >
              {/* <VehicleFilterTabs
                activeFilter={activeFilter}
                onFilterChange={handleFilterChange}
                isLoading={isFilterLoading}
                className=""
              /> */}

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
                      {activeFilter !== "all" && (
                        <span className="ml-1 text-neutral-500">
                          ({activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)})
                        </span>
                      )}
                    </>
                  ) : (
                    <>
                      Showing {pagination.total} auction
                      {pagination.total !== 1 ? "s" : ""}
                      {activeFilter !== "all" && (
                        <span className="ml-1 text-neutral-500">
                          ({activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)})
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
                  Error loading auctions: {error}
                </p>
              </motion.div>
            )}

            {/* Live Auctions Grid */}
            {!error && (
              <motion.div className="mt-8" variants={statsVariants}>
                {isSearchLoading || isFilterLoading ? (
                  <LiveAuctionsCompactSkeleton />
                ) : auctions.length > 0 ? (
                  <LiveAuctionsContainer
                    auctions={auctions}
                    onPassUnpassSuccess={handlePassUnpassSuccess}
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
                      {searchQuery ? `No results found for "${searchQuery}"` : "No auctions available"}
                    </h3>
                    <p className="text-neutral-500 text-center max-w-md">
                      {searchQuery 
                        ? "Try adjusting your search terms or browse all available auctions."
                        : "There are currently no live auctions. Check back later for new opportunities."
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
        </motion.div>
      )}
    </>
  );
};

export default LiveAuctions;
