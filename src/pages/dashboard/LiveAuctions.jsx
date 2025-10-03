import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardStats from '@/components/dashboard/DashboardStats/DashboardStats';
import LiveAuctionsContainer from '@/components/live-auctions/LiveAuctionsContainer';
import LiveAuctionsSkeleton from '@/components/skeletons/LiveAuctions/LiveAuctionsSkeleton';
import Pagination from '@/components/common/Pagination/Pagination';
import FilterTabs from '@/components/filters/LiveAuctionFilterTabs';

const LiveAuctions = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterLoading, setIsFilterLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState('allTime');
  const itemsPerPage = 4; // Show 4 vehicles per page

  // Static data for now - will replace with API later
  const liveAuctions = [
    { 
      id: 1,
      name: "2014 Jeep Grand Cherokee",
      images: [
        "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?w=600&h=400&fit=crop&auto=format&q=80",
        "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?w=600&h=400&fit=crop&auto=format&q=80"
      ],
      make: "Jeep",
      model: "Grand Cherokee",
      year: 2014,
      mileage: 100000,
      VIN: "12345678901234567",
      cashOffer: "$7,725",
      highestBid: "$8,200",
      endsAt: "Oct 30, 2025 14:00",
      timeLeft: "2h 15m"
    },
    { 
      id: 2,
      name: "2020 Lexus RX 350",
      images: [
        "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&h=400&fit=crop&auto=format&q=80"
      ],
      make: "Lexus",
      model: "RX 350",
      year: 2020,
      mileage: 200000,
      VIN: "12345678901234567",
      cashOffer: "$35,000",
      highestBid: "$36,500",
      endsAt: "Oct 31, 2025 16:00",
      timeLeft: "1d 4h"
    },
    { 
      id: 3,
      name: "2019 BMW X5",
      images: [
        "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&h=400&fit=crop&auto=format&q=80",
        "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&h=400&fit=crop&auto=format&q=80"
      ],
      make: "BMW",
      model: "X5",
      year: 2019,
      mileage: 300000,
      VIN: "12345678901234567",
      cashOffer: "$42,500",
      highestBid: "$44,000",
      endsAt: "Nov 1, 2025 10:00",
      timeLeft: "2d 8h"
    },
    { 
      id: 4,
      name: "2021 Mercedes-Benz C-Class",
      images: [
        "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop&auto=format&q=80"
      ],
      make: "Mercedes-Benz",
      model: "C-Class",
      year: 2021,
      mileage: 400000,
      VIN: "12345678901234567",
      cashOffer: "$28,500",
      highestBid: "$29,200",
      endsAt: "Nov 2, 2025 12:00",
      timeLeft: "3d 10h"
    },
    { 
      id: 5,
      name: "2022 Audi A4",
      images: [
        "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?w=600&h=400&fit=crop&auto=format&q=80"
      ],
      make: "Audi",
      model: "A4",
      year: 2022,
      mileage: 500000,
      VIN: "12345678901234567",
      cashOffer: "$32,000",
      highestBid: "$33,500",
      endsAt: "Nov 3, 2025 15:00",
      timeLeft: "4d 13h"
    },
    { 
      id: 6,
      name: "2020 Tesla Model 3",
      images: [
        "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&h=400&fit=crop&auto=format&q=80"
      ],
      make: "Tesla",
      model: "Model 3",
      year: 2020,
      mileage: 600000,
      VIN: "12345678901234567",
      cashOffer: "$38,000",
      highestBid: "$39,800",
      endsAt: "Nov 4, 2025 11:00",
      timeLeft: "5d 9h"
    }
  ];

  // Filter auctions based on active filter
  const getFilteredAuctions = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const thisWeek = new Date(today.getTime() - (today.getDay() * 24 * 60 * 60 * 1000));
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    return liveAuctions.filter(auction => {
      const auctionDate = new Date(auction.endsAt);
      
      switch (activeFilter) {
        case 'today':
          return auctionDate >= today && auctionDate < new Date(today.getTime() + 24 * 60 * 60 * 1000);
        case 'thisWeek':
          return auctionDate >= thisWeek && auctionDate < new Date(thisWeek.getTime() + 7 * 24 * 60 * 60 * 1000);
        case 'thisMonth':
          return auctionDate >= thisMonth && auctionDate < new Date(thisMonth.getTime() + 30 * 24 * 60 * 60 * 1000);
        case 'passed':
          return auctionDate < now;
        case 'allTime':
        default:
          return true;
      }
    });
  };

  const filteredAuctions = getFilteredAuctions();

  // Calculate pagination
  const totalPages = Math.ceil(filteredAuctions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAuctions = filteredAuctions.slice(startIndex, endIndex);

  // Handle filter change with loading simulation
  const handleFilterChange = async (filterId) => {
    if (isFilterLoading) return;
    
    setIsFilterLoading(true);
    setCurrentPage(1);
    
    // Simulate API call for filter change
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setActiveFilter(filterId);
    setIsFilterLoading(false);
  };

  // Simulate data loading with 500ms timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
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
          className="min-h-screen bg-gray-50 pt-20 px-4 md:px-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="p-6">
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
                  Showing {filteredAuctions.length} auction{filteredAuctions.length !== 1 ? 's' : ''}
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

            {/* Live Auctions Grid */}
            <motion.div 
              className="mt-8"
              variants={statsVariants}
            >
              <LiveAuctionsContainer auctions={currentAuctions} />
            </motion.div>

            {/* Pagination */}
            <motion.div 
              className="flex justify-center mt-8"
              variants={statsVariants}
            >
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                className="w-full max-w-md mt-6 mb-4"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default LiveAuctions;