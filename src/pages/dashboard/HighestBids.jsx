import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import DashboardStats from "@/components/dashboard/DashboardStats/DashboardStats";
import HighestBidsContainer from "@/components/highest-bids/HighestBidsContainer";
import Pagination from "@/components/common/Pagination/Pagination";
import FilterTabs from "@/components/filters/LiveAuctionFilterTabs";
import HighestBidsSkeleton from "@/components/skeletons/HighestBids/HighestBidsSkeleton";
import api from "@/lib/api";

const HighestBids = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterLoading, setIsFilterLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState("allTime");
  const [highestBids, setHighestBids] = useState([]);
  const [pagination, setPagination] = useState({});
  const [error, setError] = useState(null);
  const itemsPerPage = 4; // Show 4 vehicles per page

  // Transform API data to match component expectations
  const transformApiData = (apiData) => {
    return apiData.map((item) => {
      const vehicle = item.vehicle;
      const highestBid = item.highest_bid;

      return {
        id: vehicle.id,
        name: vehicle.title,
        images: vehicle.images?.map((img) => img.url) || [],
        make: vehicle.make,
        model: vehicle.model,
        year: vehicle.year,
        offer: `$${vehicle.cash_offer?.toLocaleString() || "0"}`,
        offerStatus: "Accepted",
        highestBid: highestBid?.amount
          ? `$${highestBid.amount.toLocaleString()}`
          : "No bids",
        highestBidder: highestBid?.bidder?.name || "No bidder",
        finalPrice: highestBid?.amount
          ? `$${highestBid.amount.toLocaleString()}`
          : "No bids",
        VIN: vehicle.vin || "N/A",
        auctionEnds: vehicle.ends_at
          ? new Date(vehicle.ends_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          : "N/A",
        auctionStatus: item.auction_status === "ended" ? "Ended" : "Active",
        bidPercentage: "85%", // This might need to be calculated from API data
        timeLeft: "0",
        totalBids: item.total_bids || 0,
        bidDate: highestBid?.bid_date || null,
        bidderId: highestBid?.bidder?.id || null,
      };
    });
  };

  // Highest Bids API
  const getHighestBids = async (page = 1, perPage = 4) => {
    try {
      const response = await api.get('/highest-bids', {
        params: {
          page,
          per_page: perPage
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching highest bids:', error);
      throw error;
    }
  };

  // Fetch highest bids data from API
  const fetchHighestBids = async (page = 1, perPage = 4) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await getHighestBids(page, perPage);

      if (response.success) {
        const transformedData = transformApiData(response.data);
        setHighestBids(transformedData);
        setPagination(response.pagination);
      } else {
        throw new Error("Failed to fetch highest bids");
      }
    } catch (error) {
      console.error("Error fetching highest bids:", error);
      setError(error.message || "Failed to fetch highest bids");
      toast.error("Failed to load highest bids. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Filter auctions based on active filter
  const getFilteredAuctions = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const thisWeek = new Date(
      today.getTime() - today.getDay() * 24 * 60 * 60 * 1000
    );
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    return highestBids.filter((auction) => {
      const auctionDate = new Date(auction.auctionEnds);

      switch (activeFilter) {
        case "today":
          return (
            auctionDate >= today &&
            auctionDate < new Date(today.getTime() + 24 * 60 * 60 * 1000)
          );
        case "thisWeek":
          return (
            auctionDate >= thisWeek &&
            auctionDate < new Date(thisWeek.getTime() + 7 * 24 * 60 * 60 * 1000)
          );
        case "thisMonth":
          return (
            auctionDate >= thisMonth &&
            auctionDate <
              new Date(thisMonth.getTime() + 30 * 24 * 60 * 60 * 1000)
          );
        case "passed":
          return auctionDate < now;
        case "allTime":
        default:
          return true;
      }
    });
  };

  const filteredAuctions = getFilteredAuctions();

  // Use API pagination instead of client-side pagination
  const totalPages = pagination.total_pages || 1;
  const currentAuctions = highestBids;

  // Handle filter change with loading simulation
  const handleFilterChange = async (filterId) => {
    if (isFilterLoading) return;

    setIsFilterLoading(true);
    setCurrentPage(1);

    // Simulate API call for filter change
    await new Promise((resolve) => setTimeout(resolve, 500));

    setActiveFilter(filterId);
    setIsFilterLoading(false);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchHighestBids(page, itemsPerPage);
  };

  // Load data on component mount and when page changes
  useEffect(() => {
    fetchHighestBids(currentPage, itemsPerPage);
  }, [currentPage]);

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
      {!isLoading ? (
        <div className="px-4 md:px-6">
          {/* Header Section */}
          <motion.div className="mb-8" variants={headerVariants}>
            <motion.h1
              className="text-3xl font-bold text-neutral-900 mb-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Highest Bids
            </motion.h1>
            <motion.p
              className="text-neutral-600"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              View your highest bids and track their status.
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
          </motion.div>

          {/* Highest Bids Grid */}
          <motion.div className="mt-8" variants={statsVariants}>
            {error ? (
              <div className="text-center py-12">
                <div className="text-red-500 text-lg mb-2">
                  Error loading highest bids
                </div>
                <div className="text-red-400 text-sm">{error}</div>
                <button
                  onClick={() => fetchHighestBids(currentPage, itemsPerPage)}
                  className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : currentAuctions.length > 0 ? (
              <HighestBidsContainer auctions={currentAuctions} />
            ) : (
              <div className="text-center py-12">
                <div className="text-neutral-500 text-lg mb-2">
                  No highest bids found
                </div>
                <div className="text-neutral-400 text-sm">
                  Try adjusting your filters or check back later
                </div>
              </div>
            )}
          </motion.div>

          {/* Pagination */}
          <motion.div
            className="flex justify-center mt-8"
            variants={statsVariants}
          >
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              className="w-full max-w-md mt-6 mb-4"
            />
          </motion.div>
        </div>
      ) : (
        <HighestBidsSkeleton />
      )}
    </motion.div>
  );
};

export default HighestBids;
