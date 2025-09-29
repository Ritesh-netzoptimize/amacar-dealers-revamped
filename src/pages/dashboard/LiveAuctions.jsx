import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardStats from '@/components/common/DashboardStats/DashboardStats';
import LiveAuctionsContainer from '@/components/live-auctions/LiveAuctionsContainer';
import Pagination from '@/components/common/Pagination';

const LiveAuctions = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Show 4 vehicles per page

  // Static data for now - will replace with API later
  const liveAuctions = [
    { 
      id: 1,
      name: "2014 Jeep Grand Cherokee",
      images: [
        "https://images.unsplash.com/photo-1549317336-206569e8475c?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1549317336-206569e8475c?w=600&h=400&fit=crop&auto=format&q=80",
        "https://images.unsplash.com/photo-1549317336-206569e8475c?w=600&h=400&fit=crop&auto=format&q=80"
      ],
      make: "Jeep",
      model: "Grand Cherokee",
      year: 2014,
      cashOffer: "$7,725",
      highestBid: "$8,200",
      endsAt: "Oct 30, 2025 14:00"
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
      cashOffer: "$35,000",
      highestBid: "$36,500",
      endsAt: "Oct 31, 2025 16:00"
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
      cashOffer: "$42,500",
      highestBid: "$44,000",
      endsAt: "Nov 1, 2025 10:00"
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
      cashOffer: "$28,500",
      highestBid: "$29,200",
      endsAt: "Nov 2, 2025 12:00"
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
      cashOffer: "$32,000",
      highestBid: "$33,500",
      endsAt: "Nov 3, 2025 15:00"
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
      cashOffer: "$38,000",
      highestBid: "$39,800",
      endsAt: "Nov 4, 2025 11:00"
    }
  ];

  // Calculate pagination
  const totalPages = Math.ceil(liveAuctions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAuctions = liveAuctions.slice(startIndex, endIndex);

  // Simulate data loading - replace with actual API calls
  useEffect(() => {
    const loadLiveAuctionsData = async () => {
      try {
        // TODO: Replace with actual API calls
        // Example:
        // const [statsData, auctionsData] = await Promise.all([
        //   fetchLiveAuctionsStats(),
        //   fetchLiveAuctions()
        // ]);
        
        // Simulate API calls for different sections
        await Promise.all([
          // Simulate stats loading
          new Promise(resolve => setTimeout(resolve, 800)),
          // Simulate auctions loading
          new Promise(resolve => setTimeout(resolve, 1200))
        ]);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading live auctions data:', error);
        setIsLoading(false);
      }
    };

    loadLiveAuctionsData();
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

        {/* Live Auctions Grid */}
        <motion.div 
          className="mt-12"
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
  );
};

export default LiveAuctions;