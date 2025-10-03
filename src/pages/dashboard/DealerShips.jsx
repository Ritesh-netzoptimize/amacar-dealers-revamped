import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DealershipContainer from '@/components/dealership/DealershipContainer';
import DealershipSkeleton from '@/components/skeletons/Dealership/DealershipSkeleton';
import { dealershipsData } from '@/data/dealershipsData';
import Pagination from '@/components/common/Pagination/Pagination';

const DealerShips = () => {
  const [dealerships, setDealerships] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 10;

  // Animation variants
  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };


  // Load dealerships data
  useEffect(() => {
    const loadDealerships = () => {
      setLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedData = dealershipsData.slice(startIndex, endIndex);
        
        setDealerships(paginatedData);
        setTotalCount(dealershipsData.length);
        setTotalPages(Math.ceil(dealershipsData.length / itemsPerPage));
        setLoading(false);
      }, 500);
    };

    loadDealerships();
  }, [currentPage]);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle dealership actions
  const handleViewDealership = (dealershipId) => {
    console.log('View dealership:', dealershipId);
    // Navigate to dealership details page
  };

  const handleEditDealership = (dealershipId) => {
    console.log('Edit dealership:', dealershipId);
    // Open edit modal or navigate to edit page
  };

  const handleDeleteDealership = (dealershipId) => {
    console.log('Delete dealership:', dealershipId);
    // Show confirmation dialog and delete
  };

  const handleContactDealership = (dealershipId) => {
    console.log('Contact dealership:', dealershipId);
    // Open contact modal or initiate contact
  };


  const handleActivateDealership = (dealershipId) => {
    console.log('Activate dealership:', dealershipId);
    // Update dealership status to active
  };

  const handleDeactivateDealership = (dealershipId) => {
    console.log('Deactivate dealership:', dealershipId);
    // Update dealership status to inactive
  };

  if (loading) {
    return (
      <motion.div
        className="space-y-6 min-h-screen bg-gray-50 pt-28 px-8 md:px-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <DealershipSkeleton />
      </motion.div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        className="space-y-6   min-h-screen bg-gray-50 pt-28 px-8 md:px-12"
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        key={currentPage}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <DealershipContainer
            dealerships={dealerships}
            currentPage={currentPage}
            totalPages={totalPages}
            totalCount={totalCount}
            onPageChange={handlePageChange}
            onViewDealership={handleViewDealership}
            onEditDealership={handleEditDealership}
            onDeleteDealership={handleDeleteDealership}
            onContactDealership={handleContactDealership}
            onActivateDealership={handleActivateDealership}
            onDeactivateDealership={handleDeactivateDealership}
          />
        </motion.div>
        
        <AnimatePresence>
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                className="w-full max-w-md mb-4"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default DealerShips;  