import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardStats from '@/components/dashboard/DashboardStats/DashboardStats';
import LiveAuctionsContainer from '@/components/live-auctions/LiveAuctionsContainer';
import LiveAuctionsSkeleton from '@/components/skeletons/LiveAuctions/LiveAuctionsSkeleton';
import Pagination from '@/components/common/Pagination/Pagination';
import FilterTabs from '@/components/filters/LiveAuctionFilterTabs';
import api from '@/lib/api';

const LiveAuctions = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterLoading, setIsFilterLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState('allTime');
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

  // Live Auctions API function using the imported api instance
  const getLiveAuctions = async (page = 1, perPage = 4, filters = {}) => {
    try {
      const response = await api.get('/live-auctions', {
        params: {
          page,
          per_page: perPage
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching live auctions:', error);
      throw error;
    }
  };

  // Transform API data to match component expectations
  const transformAuctionData = (apiData) => {
    return apiData.map(auction => ({
      id: auction.id,
      name: auction.title,
      images: auction.images?.map(img => img.url) || [],
      make: auction.make,
      model: auction.model,
      year: parseInt(auction.year),
      mileage: parseInt(auction.mileage),
      VIN: auction.vin,
      cashOffer: `$${auction.cash_offer?.toLocaleString() || '0'}`,
      highestBid: auction.highest_bid ? `$${auction.highest_bid.toLocaleString()}` : 'No bids',
      endsAt: new Date(auction.ends_at).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      timeLeft: auction.time_remaining,
      auctionStatus: auction.auction_status,
      createdAt: auction.created_at,
      updatedAt: auction.updated_at
    }));
  };

  // Fetch auctions from API
  const fetchAuctions = async (page = 1, filter = 'allTime') => {
    try {
      setError(null);
      const filters = {};
      
      // Add filter parameters based on active filter
      // Note: The API might not support all these filters, so we'll handle them client-side if needed
      if (filter !== 'allTime') {
        // Map frontend filter names to API parameters
        switch (filter) {
          case 'today':
            // For today's auctions, we might need to filter by date
            break;
          case 'thisWeek':
            // For this week's auctions
            break;
          case 'thisMonth':
            // For this month's auctions
            break;
          case 'passed':
            // For passed auctions - might need to check auction_status
            filters.status = 'passed';
            break;
          default:
            break;
        }
      }
      
      const response = await getLiveAuctions(page, itemsPerPage, filters);
      
      if (response.success) {
        let transformedData = transformAuctionData(response.data);
        
        // Apply client-side filtering if API doesn't support it
        if (filter !== 'allTime' && filter !== 'passed') {
          transformedData = applyClientSideFilter(transformedData, filter);
        }
        
        setAuctions(transformedData);
        setPagination(response.pagination);
      } else {
        throw new Error('Failed to fetch auctions');
      }
    } catch (err) {
      console.error('Error fetching auctions:', err);
      setError(err.message);
      setAuctions([]);
    }
  };

  // Apply client-side filtering for date-based filters
  const applyClientSideFilter = (data, filter) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const thisWeek = new Date(today.getTime() - (today.getDay() * 24 * 60 * 60 * 1000));
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    return data.filter(auction => {
      const auctionDate = new Date(auction.endsAt);
      
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
  };

  // Handle filter change
  const handleFilterChange = async (filterId) => {
    if (isFilterLoading) return;
    
    setIsFilterLoading(true);
    setCurrentPage(1);
    setActiveFilter(filterId);
    
    await fetchAuctions(1, filterId);
    setIsFilterLoading(false);
  };

  // Handle page change
  const handlePageChange = async (page) => {
    setCurrentPage(page);
    await fetchAuctions(page, activeFilter);
  };

  // Initial data load
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await fetchAuctions(1, activeFilter);
      setIsLoading(false);
    };

    loadData();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const statsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
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
            <motion.div 
              className="mb-8"
              variants={headerVariants}
            >
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
                Monitor and participate in live vehicle auctions. Place your bids and track real-time activity.
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
              <FilterTabs 
                activeFilter={activeFilter}
                onFilterChange={handleFilterChange}
                isLoading={isFilterLoading}
                className=""
              />
              
              {/* Results Count */}
              <motion.div 
                className="flex items-center justify-between mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <p className="text-sm text-neutral-600">
                  Showing {pagination.total} auction{pagination.total !== 1 ? 's' : ''}
                  {activeFilter !== 'allTime' && (
                    <span className="ml-1 text-neutral-500">
                      ({activeFilter === 'today' ? 'today' : 
                        activeFilter === 'thisWeek' ? 'this week' : 
                        activeFilter === 'thisMonth' ? 'this month' : 
                        'passed'})
                    </span>
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
              <motion.div 
                className="mt-8"
                variants={statsVariants}
              >
                <LiveAuctionsContainer auctions={auctions} />
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