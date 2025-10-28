import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import DealershipContainer from "@/components/dealership/DealershipContainer";
import DealershipSkeleton from "@/components/skeletons/Dealership/DealershipSkeleton";
import Pagination from "@/components/common/Pagination/Pagination";
import InviteDealershipsModal from "@/components/ui/InviteDealershipsModal";
import ActivateDeactivateModal from "@/components/ui/ActivateDeactivateModal";
import CreateDealershipModal from "@/components/ui/CreateDealershipModal";
import { Building2, UserPlus } from "lucide-react";
import api from "@/lib/api";
import { useSelector } from "react-redux";

const DealerShips = () => {
  const [dealerships, setDealerships] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});
  const [retryCount, setRetryCount] = useState(0);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isActivateDeactivateModalOpen, setIsActivateDeactivateModalOpen] = useState(false);
  const [isCreateDealershipModalOpen, setIsCreateDealershipModalOpen] = useState(false);
  const [selectedDealership, setSelectedDealership] = useState(null);
  const [modalAction, setModalAction] = useState(null); // 'activate' or 'deactivate'

  const { user } = useSelector((state) => state.user);

  const itemsPerPage = 10;
  const maxRetries = 3;

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
            data?.message || "You don't have permission to view dealerships";
          errorType = "permission";
          break;
        case 401:
          errorMessage = "Please log in to view dealerships";
          errorType = "auth";
          break;
        case 404:
          errorMessage = "Dealerships endpoint not found";
          errorType = "notFound";
          break;
        case 500:
          errorMessage = "Server error. Please try again later";
          errorType = "server";
          break;
        case 429:
          errorMessage =
            "Too many requests. Please wait a moment and try again";
          errorType = "rateLimit";
          break;
        default:
          errorMessage =
            data?.message || `Request failed with status ${status}`;
      }
    } else if (error.request) {
      errorMessage = "Network error. Please check your connection";
      errorType = "network";
    } else {
      errorMessage = error.message || "An unexpected error occurred";
    }

    return { message: errorMessage, type: errorType };
  }, []);

  // Transform API data to match component expectations
   setTimeout(() => {
    console.log(dealerships);
    
  }, 2000);
  const transformDealershipData = (apiData) => {
    return apiData.map((item) => {
      return {
        id: item.id,
        name: item.name,
        email: item.contact?.email || "N/A",
        phone: item.contact?.phone || "N/A",
        city: item.address?.city || "N/A",
        state: item.address?.state || "N/A",
        zip: item.address?.zip || "N/A",
        street: item.address?.street || "N/A",
        status:
          item.status === "active"
            ? "Active"
            : item.status === "pending"
            ? "Pending"
            : item.status === "inactive"
            ? "Inactive"
            : "Unknown",
        role: "Dealer", // Default role since API doesn't provide this
        salesManager: item.invited_by_sales_manager?.name || "Not Assigned",
        joinDate: item.created_at,
        address:
          [
            item.address?.street,
            item.address?.city,
            item.address?.state,
            item.address?.zip,
          ]
            .filter(Boolean)
            .join(", ") || "Address not provided",
        totalSales: 0, // Not provided in API
        vehiclesInStock: 0, // Not provided in API
        rating: 0, // Not provided in API
        latitude: item.address?.latitude || null,
        longitude: item.address?.longitude || null,
        userId: item.user?.id || null,
        updatedAt: item.updated_at,
      };
    });
  };

  // Dealerships API
  const getDealerships = async (page = 1, perPage = 10) => {
    try {
      const response = await api.get("/dealerships", {
        params: {
          page,
          per_page: perPage,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching dealerships:", error);
      throw error;
    }
  };

  // Retry function with exponential backoff
  const retryWithBackoff = useCallback(async (fn, retries = maxRetries) => {
    try {
      return await fn();
    } catch (error) {
      if (
        retries > 0 &&
        (error.response?.status >= 500 || error.code === "NETWORK_ERROR")
      ) {
        const delay = Math.pow(2, maxRetries - retries) * 1000; // Exponential backoff
        console.log(
          `Retrying in ${delay}ms... (${
            maxRetries - retries + 1
          }/${maxRetries})`
        );

        await new Promise((resolve) => setTimeout(resolve, delay));
        return retryWithBackoff(fn, retries - 1);
      }
      throw error;
    }
  }, [maxRetries]);

  // Fetch dealerships data from API
  const fetchDealerships = useCallback(async (page = 1, perPage = 10, isRetry = false) => {
    try {
      setLoading(true);
      if (!isRetry) {
        setError(null);
        setRetryCount(0);
      }

      const response = await retryWithBackoff(() =>
        getDealerships(page, perPage)
      );

      if (response.success) {
        const transformedData = transformDealershipData(response.data);
        setDealerships(transformedData);
        setPagination(response.pagination);
        setTotalPages(response.pagination.total_pages || 1);
        setTotalCount(parseInt(response.pagination.total) || 0);
        setRetryCount(0); // Reset retry count on success
      } else {
        throw new Error(response.message || "Failed to fetch dealerships");
      }
    } catch (error) {
      const errorInfo = handleApiError(error);
      setError(errorInfo);

      // Show appropriate toast based on error type
      const toastMessages = {
        permission:
          "Access denied. You don't have permission to view dealerships.",
        auth: "Please log in to continue.",
        network: "Network error. Please check your connection.",
        rateLimit: "Too many requests. Please wait a moment and try again.",
        server: "Server error. Please try again later.",
        notFound: "Dealerships endpoint not found.",
        error: "Failed to load dealerships. Please try again.",
      };

      toast.error(toastMessages[errorInfo.type] || toastMessages.error);
    } finally {
      setLoading(false);
    }
  }, [retryWithBackoff, handleApiError]);

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

  // Load dealerships data on component mount and when page changes
  useEffect(() => {
    fetchDealerships(currentPage, itemsPerPage);
  }, [currentPage, fetchDealerships]);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle dealership actions
  const handleViewDealership = (dealershipId) => {
    console.log("View dealership:", dealershipId);
    // Navigate to dealership details page
  };

  const handleEditDealership = (dealershipId) => {
    console.log("Edit dealership:", dealershipId);
    // Open edit modal or navigate to edit page
  };

  const handleDeactivateDealership = (dealershipId) => {
    const dealership = dealerships.find(d => d.id === dealershipId);
    if (dealership) {
      setSelectedDealership(dealership);
      setModalAction('deactivate');
      setIsActivateDeactivateModalOpen(true);
    }
  };

  const handleContactDealership = (dealershipId) => {
    console.log("Contact dealership:", dealershipId);
    // Open contact modal or initiate contact
  };

  const handleActivateDealership = (dealershipId) => {
    const dealership = dealerships.find(d => d.id === dealershipId);
    if (dealership) {
      setSelectedDealership(dealership);
      setModalAction('activate');
      setIsActivateDeactivateModalOpen(true);
    }
  };



  const handleOpenInviteModal = () => {
    setIsInviteModalOpen(true);
  };

  const handleCloseInviteModal = () => {
    setIsInviteModalOpen(false);
  };

  const handleOpenCreateDealershipModal = () => {
    setIsCreateDealershipModalOpen(true);
  };

  const handleCloseCreateDealershipModal = () => {
    setIsCreateDealershipModalOpen(false);
  };

  const handleCreateDealershipSuccess = () => {
    // Refresh the dealerships list after successful creation
    fetchDealerships(currentPage, itemsPerPage);
  };

  const handleCloseActivateDeactivateModal = () => {
    setIsActivateDeactivateModalOpen(false);
    setSelectedDealership(null);
    setModalAction(null);
  };

  const handleActivateDeactivateSuccess = (dealershipId, isActivated) => {
    // Update the dealership status in the local state
    setDealerships(prevDealerships => 
      prevDealerships.map(dealership => 
        dealership.id === dealershipId 
          ? { ...dealership, status: isActivated ? 'Active' : 'Inactive' }
          : dealership
      )
    );
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
        className="space-y-6   min-h-screen bg-gray-50 pt-10 md:pt-24 px-8 md:px-6"
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        key={currentPage}
      >
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="flex items-center justify-between w-full"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <div className="flex items-center gap-3">
              <motion.div
                className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Building2 className="w-5 h-5 text-orange-600" />
              </motion.div>
              <div>
                <h2 className="text-2xl font-semibold text-neutral-900">
                  Dealerships
                </h2>
                <p className="text-sm text-neutral-600">
                  All dealership partners and details
                </p>
              </div>
            </div>
            
            {/* Create Dealership Button - Only for dealers with active subscription */}
            {user?.role === 'dealer' && (user?.subscription_details?.is_active || user?.subscription_status === "active") && (
              <motion.button
                onClick={handleOpenCreateDealershipModal}
                className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <UserPlus className="w-4 h-4" />
                Create Dealership
              </motion.button>
            )}
          </motion.div>
        
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {error ? (
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-12 text-center">
              {error.type === "permission" ? (
                <>
                  <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m0 0v2m0-2h2m-2 0H10m2-7V9a2 2 0 00-2-2H9a2 2 0 00-2 2v1m4 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v1m4 0h2a2 2 0 012 2v1a2 2 0 01-2 2h-2m-4 0H9a2 2 0 01-2-2v-1a2 2 0 012-2h2m-4 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v1m4 0h2a2 2 0 012 2v1a2 2 0 01-2 2h-2"
                      />
                    </svg>
                  </div>
                  <div className="text-red-500 text-lg mb-2 font-semibold">
                    Access Denied
                  </div>
                  <div className="text-red-400 text-sm mb-4">
                    {error.message}
                  </div>
                  <div className="text-gray-500 text-xs mb-6">
                    Contact your administrator to request access to dealership
                    management
                  </div>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors mr-2"
                  >
                    Refresh Page
                  </button>
                </>
              ) : error.type === "auth" ? (
                <>
                  <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-yellow-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <div className="text-yellow-600 text-lg mb-2 font-semibold">
                    Authentication Required
                  </div>
                  <div className="text-yellow-500 text-sm mb-4">
                    {error.message}
                  </div>
                  <button
                    onClick={() => (window.location.href = "/login")}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                  >
                    Go to Login
                  </button>
                </>
              ) : error.type === "network" ? (
                <>
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
                      />
                    </svg>
                  </div>
                  <div className="text-blue-500 text-lg mb-2 font-semibold">
                    Connection Error
                  </div>
                  <div className="text-blue-400 text-sm mb-4">
                    {error.message}
                  </div>
                  <button
                    onClick={() => fetchDealerships(currentPage, itemsPerPage)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Try Again
                  </button>
                </>
              ) : error.type === "rateLimit" ? (
                <>
                  <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-yellow-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="text-yellow-600 text-lg mb-2 font-semibold">
                    Rate Limit Exceeded
                  </div>
                  <div className="text-yellow-500 text-sm mb-4">
                    {error.message}
                  </div>
                  <div className="text-gray-500 text-xs mb-6">
                    Please wait a moment before trying again
                  </div>
                  <button
                    onClick={() => fetchDealerships(currentPage, itemsPerPage)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                  >
                    Try Again
                  </button>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="text-red-500 text-lg mb-2 font-semibold">
                    Error Loading Dealerships
                  </div>
                  <div className="text-red-400 text-sm mb-4">
                    {error.message}
                  </div>
                  <button
                    onClick={() => fetchDealerships(currentPage, itemsPerPage)}
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Try Again
                  </button>
                </>
              )}
            </div>
          ) : dealerships.length > 0 ? (
            <>
              {user?.role == "administrator" || user?.role == "sales_manager" ? (
                <DealershipContainer
                  dealerships={dealerships}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalCount={totalCount}
                  onPageChange={handlePageChange}
                  onViewDealership={handleViewDealership}
                  onEditDealership={handleEditDealership}
                  onDeactivateDealership={handleDeactivateDealership}
                  onContactDealership={handleContactDealership}
                  onActivateDealership={handleActivateDealership}
                  onRefresh={() => fetchDealerships(currentPage, itemsPerPage)}
                />
              ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-12 text-center">
                  <div className="text-neutral-500 text-lg mb-2">
                    You are not authorized to view dealerships
                  </div>
                  <div className="text-neutral-400 text-sm">
                    Please contact your administrator to request access to
                    dealership management
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-12 text-center">
              <div className="text-neutral-500 text-lg mb-2">
                No dealerships found
              </div>
              <div className="text-neutral-400 text-sm">
                Try refreshing the page or check back later
              </div>
            </div>
          )}
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

        {/* Invite Dealership Modal */}
        <InviteDealershipsModal
          isOpen={isInviteModalOpen}
          onClose={handleCloseInviteModal}
        />

        {/* Create Dealership Modal */}
        <CreateDealershipModal
          isOpen={isCreateDealershipModalOpen}
          onClose={handleCloseCreateDealershipModal}
          onSuccess={handleCreateDealershipSuccess}
        />

        {/* Activate/Deactivate Dealership Modal */}
        <ActivateDeactivateModal
          isOpen={isActivateDeactivateModalOpen}
          onClose={handleCloseActivateDeactivateModal}
          action={modalAction}
          dealershipId={selectedDealership?.id}
          dealershipName={selectedDealership?.name}
          onSuccess={handleActivateDeactivateSuccess}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default DealerShips;
