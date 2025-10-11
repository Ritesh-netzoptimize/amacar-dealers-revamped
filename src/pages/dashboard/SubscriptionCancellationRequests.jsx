import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import SubscriptionCancellationRequestsContainer from "@/components/subscription-cancellation-requests/SubscriptionCancellationRequestsContainer";
import Pagination from "@/components/common/Pagination/Pagination";
import { MessageSquare, RefreshCw } from "lucide-react";
import api from "@/lib/api";
import { useSelector } from "react-redux";
import { getUserPermissions } from "@/utils/rolePermissions";

const SubscriptionCancellationRequests = () => {
  const [cancellationRequests, setCancellationRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});
  const [retryCount, setRetryCount] = useState(0);

  const { user } = useSelector((state) => state.user);
  const permissions = getUserPermissions(user?.role, user);

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
            data?.message || "You don't have permission to view cancellation requests";
          errorType = "permission";
          break;
        case 401:
          errorMessage = "Please log in to view cancellation requests";
          errorType = "auth";
          break;
        case 404:
          errorMessage = "Cancellation requests endpoint not found";
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
  const transformCancellationRequestData = (apiData) => {
    return apiData.map((item) => {
      return {
        dealer_id: item.dealer_id,
        dealer_name: item.dealer_name,
        dealer_email: item.dealer_email,
        dealership_name: item.dealership_name,
        phone: item.phone,
        cancellation_message: item.cancellation_message,
        request_date: item.request_date,
        status: item.status,
        subscription_status: item.subscription_status,
        formatted_request_date: item.formatted_request_date,
      };
    });
  };

  // Cancellation Requests API
  const getCancellationRequests = async (page = 1, perPage = 10) => {
    try {
      const response = await api.get("/subscription/cancellation-requests", {
        params: {
          page,
          per_page: perPage,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching cancellation requests:", error);
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

  // Fetch cancellation requests data from API
  const fetchCancellationRequests = useCallback(async (page = 1, perPage = 10, isRetry = false) => {
    try {
      setLoading(true);
      if (!isRetry) {
        setError(null);
        setRetryCount(0);
      }

      const response = await retryWithBackoff(() =>
        getCancellationRequests(page, perPage)
      );

      if (response.success) {
        const transformedData = transformCancellationRequestData(response.data);
        setCancellationRequests(transformedData);
        setPagination(response.pagination);
        setTotalPages(response.pagination.total_pages || 1);
        setTotalCount(parseInt(response.pagination.total) || 0);
        setRetryCount(0); // Reset retry count on success
      } else {
        throw new Error(response.message || "Failed to fetch cancellation requests");
      }
    } catch (error) {
      const errorInfo = handleApiError(error);
      setError(errorInfo);

      // Show appropriate toast based on error type
      const toastMessages = {
        permission:
          "Access denied. You don't have permission to view cancellation requests.",
        auth: "Please log in to continue.",
        network: "Network error. Please check your connection.",
        rateLimit: "Too many requests. Please wait a moment and try again.",
        server: "Server error. Please try again later.",
        notFound: "Cancellation requests endpoint not found.",
        error: "Failed to load cancellation requests. Please try again.",
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

  // Load cancellation requests data on component mount and when page changes
  useEffect(() => {
    fetchCancellationRequests(currentPage, itemsPerPage);
  }, [currentPage, fetchCancellationRequests]);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle cancellation request actions
  const handleViewRequest = (requestId) => {
    console.log("View cancellation request:", requestId);
    // Navigate to request details page or open modal
  };

  const handleApproveRequest = async (requestId) => {
    try {
      // API call to approve request
      await api.put(`/subscription/cancellation-requests/${requestId}/approve`);
      // Refresh the list
      fetchCancellationRequests(currentPage, itemsPerPage);
    } catch (error) {
      console.error("Error approving request:", error);
      throw error;
    }
  };

  const handleRejectRequest = async (requestId) => {
    try {
      // API call to reject request
      await api.put(`/subscription/cancellation-requests/${requestId}/reject`);
      // Refresh the list
      fetchCancellationRequests(currentPage, itemsPerPage);
    } catch (error) {
      console.error("Error rejecting request:", error);
      throw error;
    }
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
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-12 text-center">
          <div className="flex items-center justify-center space-x-2">
            <RefreshCw className="w-5 h-5 animate-spin text-blue-500" />
            <span className="text-neutral-600">Loading cancellation requests...</span>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="space-y-6 min-h-screen bg-gray-50 pt-10 md:pt-24 px-8 md:px-6"
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
                <MessageSquare className="w-5 h-5 text-orange-600" />
              </motion.div>
              <div>
                <h2 className="text-2xl font-semibold text-neutral-900">
                  Subscription Cancellation Requests
                </h2>
                <p className="text-sm text-neutral-600">
                  Manage subscription cancellation requests from dealers
                </p>
              </div>
            </div>
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
                    Contact your administrator to request access to cancellation
                    request management
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
                    onClick={() => fetchCancellationRequests(currentPage, itemsPerPage)}
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
                    onClick={() => fetchCancellationRequests(currentPage, itemsPerPage)}
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
                    Error Loading Cancellation Requests
                  </div>
                  <div className="text-red-400 text-sm mb-4">
                    {error.message}
                  </div>
                  <button
                    onClick={() => fetchCancellationRequests(currentPage, itemsPerPage)}
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Try Again
                  </button>
                </>
              )}
            </div>
          ) : permissions.canAccessSubscriptionCancellationRequest ? (
            <>
              <SubscriptionCancellationRequestsContainer
                cancellationRequests={cancellationRequests}
                currentPage={currentPage}
                totalPages={totalPages}
                totalCount={totalCount}
                onPageChange={handlePageChange}
                onViewRequest={handleViewRequest}
                onApproveRequest={handleApproveRequest}
                onRejectRequest={handleRejectRequest}
                onRefresh={() => fetchCancellationRequests(currentPage, itemsPerPage)}
              />
            </>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-12 text-center">
              <div className="text-neutral-500 text-lg mb-2">
                You are not authorized to view cancellation requests
              </div>
              <div className="text-neutral-400 text-sm">
                Please contact your administrator to request access to
                cancellation request management
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
      </motion.div>
    </AnimatePresence>
  );
};

export default SubscriptionCancellationRequests;