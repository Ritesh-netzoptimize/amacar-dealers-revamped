import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import PartnerDealersContainer from "@/components/partner-dealers/PartnerDealersContainer";
import Pagination from "@/components/common/Pagination/Pagination";
import CreateDealershipModal from "@/components/ui/CreateDealershipModal";
import PartnerDealersSkeleton from "@/components/skeletons/PartnerDealers/PartnerDealersSkeleton";
import { Building2, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/lib/api";
import { getUserPermissions } from "@/utils/rolePermissions";
import { useSearch } from "@/context/SearchContext";
import DealershipSkeleton from "@/components/skeletons/Dealership/DealershipSkeleton";

const PartnerDealers = () => {
  const [dealerships, setDealerships] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});
  const [retryCount, setRetryCount] = useState(0);
  const [isCreateDealershipModalOpen, setIsCreateDealershipModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { user } = useSelector((state) => state.user);
  const { debouncedSearchQuery } = useSearch();

  const itemsPerPage = 10;
  const maxRetries = 3;

  const userRole = user?.role;
  const permissions = getUserPermissions(userRole, user);
  const { canAccessPartnerDealers } = permissions;

  // Error handling utility
  const handleApiError = useCallback((error) => {
    console.error("API Error:", error);

    let errorMessage = "An unexpected error occurred";
    let errorType = "error";

    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 403:
          errorMessage =
            data?.message ||
            "You don't have permission to view partner dealers";
          errorType = "permission";
          break;
        case 401:
          errorMessage = "You are not authorized to view partner dealers";
          errorType = "auth";
          break;
        case 404:
          errorMessage = "Partner dealers not found";
          errorType = "not_found";
          break;
        case 429:
          errorMessage = "Too many requests. Please try again later.";
          errorType = "rate_limit";
          break;
        case 500:
          errorMessage = "Server error. Please try again later.";
          errorType = "server";
          break;
        default:
          errorMessage =
            data?.message || "Failed to fetch partner dealers";
      }
    } else if (error.request) {
      errorMessage = "Network error. Please check your connection.";
      errorType = "network";
    }

    setError(errorMessage);
    toast.error(errorMessage);

    return { errorMessage, errorType };
  }, []);

  // Fetch dealerships from API
  const fetchDealerships = useCallback(async (page = 1, search = "") => {
    if (!canAccessPartnerDealers) {
      setError("You don't have permission to view partner dealers");
      setLoading(false);
      return;
    }

    try {
      setError(null);
      setLoading(true);

      const params = {
        page,
        per_page: itemsPerPage,
      };

      if (search && search.trim()) {
        params.search = search.trim();
      }

      const response = await api.get("/dealerships/created", { params });

      if (response.data.success) {
        const { data, pagination: paginationData } = response.data;
        
        setDealerships(data || []);
        setPagination(paginationData || {});
        setTotalPages(paginationData?.total_pages || 1);
        setTotalCount(paginationData?.total || 0);
        setRetryCount(0); // Reset retry count on success
      } else {
        throw new Error(response.data.message || "Failed to fetch dealerships");
      }
    } catch (error) {
      console.error("Error fetching dealerships:", error);
      
      const { errorType } = handleApiError(error);
      
      // Only retry for network errors and server errors
      if (
        (errorType === "network" || errorType === "server") &&
        retryCount < maxRetries
      ) {
        console.log(`Retrying fetch (attempt ${retryCount + 1}/${maxRetries})`);
        setRetryCount(prev => prev + 1);
        setTimeout(() => {
          fetchDealerships(page, search);
        }, 1000 * Math.pow(2, retryCount)); // Exponential backoff
      } else {
        setDealerships([]);
        setPagination({});
        setTotalPages(1);
        setTotalCount(0);
      }
    } finally {
      setLoading(false);
    }
  }, [canAccessPartnerDealers, itemsPerPage, retryCount, handleApiError]);

  // Handle page change
  const handlePageChange = useCallback(
    (page) => {
      setCurrentPage(page);
      fetchDealerships(page, debouncedSearchQuery);
    },
    [fetchDealerships, debouncedSearchQuery]
  );

  // Handle search
  const handleSearchChange = useCallback(
    (e) => {
      const query = e.target.value;
      setSearchQuery(query);
      setCurrentPage(1);
      fetchDealerships(1, query);
    },
    [fetchDealerships]
  );

  // Handle dealership creation success
  const handleDealershipCreated = useCallback(() => {
    toast.success("Dealership created successfully!");
    fetchDealerships(currentPage, debouncedSearchQuery);
  }, [fetchDealerships, currentPage, debouncedSearchQuery]);

  // Handle view dealership
  const handleViewDealership = useCallback((dealership) => {
    console.log("View dealership:", dealership);
    // TODO: Implement view dealership functionality
    toast("View dealership functionality coming soon", {
      icon: "ℹ️",
    });
  }, []);

  // Handle edit dealership
  const handleEditDealership = useCallback((dealership) => {
    console.log("Edit dealership:", dealership);
    // TODO: Implement edit dealership functionality
    toast("Edit dealership functionality coming soon", {
      icon: "ℹ️",
    });
  }, []);

  // Handle delete dealership
  const handleDeleteDealership = useCallback((dealership) => {
    console.log("Delete dealership:", dealership);
    // TODO: Implement delete dealership functionality
    toast("Delete dealership functionality coming soon", {
      icon: "ℹ️",
    });
  }, []);

  // Initial data fetch
  useEffect(() => {
    fetchDealerships(1, debouncedSearchQuery);
  }, [fetchDealerships, debouncedSearchQuery]);

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

  if (!canAccessPartnerDealers) {
    return (
      <motion.div
        className="min-h-screen bg-gray-50 pt-10 md:pt-24 px-4 md:px-6 flex items-center justify-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Building2 className="w-12 h-12 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Access Denied
          </h2>
          <p className="text-gray-600">
            You don't have permission to view partner dealers.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gray-50 pt-10 md:pt-24 px-4 md:px-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {loading ? (
        <DealershipSkeleton  />
      ) : (
        <div className="px-4 md:px-6">
          {/* Header Section */}
          <motion.div className="mb-8" variants={headerVariants}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <motion.h1
                  className="text-3xl font-bold text-neutral-900 mb-2"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Partner Dealers
                </motion.h1>
                <motion.p
                  className="text-neutral-600"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  Manage your partner dealerships and their information.
                </motion.p>
              </div>
              <motion.div
                className="mt-4 sm:mt-0"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Button
                  onClick={() => setIsCreateDealershipModalOpen(true)}
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Dealership
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Search and Filter Section
          <motion.div className="mb-6" variants={statsVariants}>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search dealerships..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="pl-10"
                />
              </div>
              <div className="text-sm text-gray-600">
                {totalCount} dealership{totalCount !== 1 ? "s" : ""} found
              </div>
            </div>
          </motion.div> */}

          {/* Error State */}
          {error && (
            <motion.div
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
              variants={statsVariants}
            >
              <p className="text-red-600 text-center">{error}</p>
            </motion.div>
          )}

          {/* Dealerships List */}
          <motion.div className="mb-8" variants={statsVariants}>
            <PartnerDealersContainer
              dealerships={dealerships}
              loading={loading}
              onView={handleViewDealership}
              onEdit={handleEditDealership}
              onDelete={handleDeleteDealership}
              canDeleteUpdate={permissions.canDeleteUpdateDealerships}
            />
          </motion.div>

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              className="flex justify-center"
              variants={statsVariants}
            >
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                className="w-full max-w-md"
              />
            </motion.div>
          )}

          {/* Create Dealership Modal */}
          <CreateDealershipModal
            isOpen={isCreateDealershipModalOpen}
            onClose={() => setIsCreateDealershipModalOpen(false)}
            onSuccess={handleDealershipCreated}
          />
        </div>
      )}
    </motion.div>
  );
};

export default PartnerDealers;