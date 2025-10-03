import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Pagination from "@/components/common/Pagination/Pagination";
import NewCustomersContainer from "@/components/new-customers/NewCustomersContainer";
import NewCustomersSort from "@/components/sorts/NewCustomersSort";
import { sortNewCustomers } from "@/utils/newCustomersSorting";
import NewCustomersSkeleton from "@/components/skeletons/NewCustomers/NewCustomersSkeleton";

const NewCustomers = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("join-date-desc");
  const [isSorting, setIsSorting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 10;

  // Simulate loading with 500ms timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

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

  // Extended dummy customer data for pagination testing
  const allCustomers = [
    {
      id: 1,
      name: "Neeraj Kumar",
      vehicle: "Jeep Grand Cherokee",
      distance: "520 miles",
      offer: "$7,725",
      email: "neeraj@example.com",
      phone: "+1 (555) 123-4567",
      address: "123 Main St, New York, NY 10001",
      joinDate: "2024-01-15T09:30:00",
    },
    {
      id: 2,
      name: "Ritesh",
      vehicle: "Jeep Grand Cherokee",
      distance: "20,000 miles",
      offer: "$7,725",
      email: "ritesh@example.com",
      phone: "+1 (555) 234-5678",
      address: "456 Oak Ave, Los Angeles, CA 90210",
      joinDate: "2024-01-14T14:15:00",
    },
    {
      id: 3,
      name: "random email",
      vehicle: "Jeep Grand Cherokee",
      distance: "25,600 miles",
      offer: "$7,725",
      email: "random@example.com",
      phone: "+1 (555) 345-6789",
      address: "789 Pine Rd, Chicago, IL 60601",
      joinDate: "2024-01-13T16:45:00",
    },
    {
      id: 4,
      name: "KL rahul",
      vehicle: "Jeep Grand Cherokee",
      distance: "2,500 miles",
      offer: "$7,725",
      email: "kl.rahul@example.com",
      phone: "+1 (555) 456-7890",
      address: "321 Elm St, Houston, TX 77001",
      joinDate: "2024-01-12T11:20:00",
    },
    {
      id: 5,
      name: "ritesh chopra",
      vehicle: "Jeep Grand Cherokee",
      distance: "25,000 miles",
      offer: "$7,725",
      email: "ritesh.chopra@example.com",
      phone: "+1 (555) 567-8901",
      address: "654 Maple Dr, Phoenix, AZ 85001",
      joinDate: "2024-01-11T08:45:00",
    },
    {
      id: 6,
      name: "Sarah Johnson",
      vehicle: "BMW X5",
      distance: "15,200 miles",
      offer: "$12,500",
      email: "sarah.j@example.com",
      phone: "+1 (555) 678-9012",
      address: "987 Cedar Ln, Philadelphia, PA 19101",
      joinDate: "2024-01-10T10:00:00",
    },
    {
      id: 7,
      name: "Michael Chen",
      vehicle: "Audi Q7",
      distance: "8,900 miles",
      offer: "$15,200",
      email: "m.chen@example.com",
      phone: "+1 (555) 789-0123",
      address: "147 Birch St, San Antonio, TX 78201",
      joinDate: "2024-01-09T10:00:00",
    },
    {
      id: 8,
      name: "Emily Rodriguez",
      vehicle: "Mercedes GLE",
      distance: "12,300 miles",
      offer: "$18,750",
      email: "emily.r@example.com",
      phone: "+1 (555) 890-1234",
      address: "258 Willow Way, San Diego, CA 92101",
      joinDate: "2024-01-08T10:00:00",
    },
    {
      id: 9,
      name: "David Kim",
      vehicle: "Lexus RX",
      distance: "6,500 miles",
      offer: "$14,300",
      email: "d.kim@example.com",
      phone: "+1 (555) 901-2345",
      address: "369 Spruce Ave, Dallas, TX 75201",
      joinDate: "2024-01-07T10:00:00",
    },
    {
      id: 10,
      name: "Lisa Thompson",
      vehicle: "Cadillac Escalade",
      distance: "18,700 miles",
      offer: "$22,100",
      email: "lisa.t@example.com",
      phone: "+1 (555) 012-3456",
      address: "741 Poplar Blvd, San Jose, CA 95101",
      joinDate: "2024-01-06T10:00:00",
    },
    {
      id: 11,
      name: "James Wilson",
      vehicle: "Ford F-150",
      distance: "30,200 miles",
      offer: "$9,800",
      email: "j.wilson@example.com",
      phone: "+1 (555) 123-4567",
      address: "852 Ash St, Austin, TX 78701",
      joinDate: "2024-01-05T10:00:00",
    },
    {
      id: 12,
      name: "Maria Garcia",
      vehicle: "Honda Pilot",
      distance: "22,100 miles",
      offer: "$11,200",
      email: "maria.g@example.com",
      phone: "+1 (555) 234-5678",
      address: "963 Hickory Rd, Jacksonville, FL 32201",
      joinDate: "2024-01-04T10:00:00",
    },
  ];

  // Sort and paginate customers
  const sortedCustomers = useMemo(() => {
    return sortNewCustomers(allCustomers, sortBy);
  }, [allCustomers, sortBy]);

  const totalPages = Math.ceil(sortedCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCustomers = sortedCustomers.slice(startIndex, endIndex);

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
      }, 500);
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
          ) : (
            <NewCustomersContainer
              customers={currentCustomers}
              currentPage={currentPage}
              totalPages={totalPages}
              totalCount={allCustomers.length}
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
          {!isLoading && !isSorting && totalPages > 1 && (
            <motion.div
              className="flex justify-center mt-8 pt-6 border-t border-neutral-100"
              variants={paginationVariants}
              initial="initial"
              animate="animate"
              exit="exit"
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
      </div>
    </motion.div>
  );
};

export default NewCustomers;
