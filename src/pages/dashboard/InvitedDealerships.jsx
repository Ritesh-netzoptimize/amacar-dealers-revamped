import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import DealershipContainer from "@/components/dealership/DealershipContainer";
import DealershipSkeleton from "@/components/skeletons/Dealership/DealershipSkeleton";
import Pagination from "@/components/common/Pagination/Pagination";
import InviteDealershipsModal from "@/components/ui/InviteDealershipsModal";
import ResendAndCancelInvitationModal from "@/components/ui/ResendAndCancelInvitationModal";
import { Building2, UserPlus, Mail, Clock, CheckCircle, XCircle } from "lucide-react";
import { getInvitations, resendInvitation, cancelInvitation } from "@/lib/api";
import { useSelector } from "react-redux";

const InvitedDealerships = () => {
  const [invitations, setInvitations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});
  const [retryCount, setRetryCount] = useState(0);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  
  // Confirmation modal state
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState(null); // 'resend' or 'cancel'
  const [selectedInvitation, setSelectedInvitation] = useState(null);
  const [isActionLoading, setIsActionLoading] = useState(false);

  const { user } = useSelector((state) => state.user);

  const itemsPerPage = 20;
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
            data?.message || "You don't have permission to view invitations";
          errorType = "permission";
          break;
        case 401:
          errorMessage = "Please log in to view invitations";
          errorType = "auth";
          break;
        case 404:
          errorMessage = "Invitations endpoint not found";
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
  const transformInvitationData = (apiData) => {
    return apiData.map((item) => {
      const fullName = `${item.first_name || ''} ${item.last_name || ''}`.trim() || 'N/A';
      const isExpired = new Date(item.expires_at) < new Date();
      
      return {
        id: item.id,
        name: item.dealership_name || 'N/A',
        email: item.email || "N/A",
        firstName: item.first_name || 'N/A',
        lastName: item.last_name || 'N/A',
        phone: "N/A", // Not provided in API
        city: "N/A", // Not provided in API
        state: "N/A", // Not provided in API
        zip: "N/A", // Not provided in API
        street: "N/A", // Not provided in API
        status: isExpired ? "Expired" : (item.status === "pending" ? "Pending" : item.status === "accepted" ? "Accepted" : item.status === "cancelled" ? "Cancelled": "Unknown"),
        role: "Invited Dealer",
        salesManager: fullName,
        joinDate: item.created_at,
        address: "Address not provided", // Not provided in API
        totalSales: 0, // Not applicable for invitations
        vehiclesInStock: 0, // Not applicable for invitations
        rating: 0, // Not applicable for invitations
        latitude: null,
        longitude: null,
        userId: item.sales_manager_id || null,
        updatedAt: item.created_at,
        // Additional invitation-specific fields
        dealerCode: item.dealer_code || 'N/A',
        expiresAt: item.expires_at,
        acceptedAt: item.accepted_at,
        isExpired: isExpired,
        invitationId: item.id,
        token: item.token // Add token field for API calls
      };
    });
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

  // Fetch invitations data from API
  const fetchInvitations = useCallback(async (page = 1, perPage = 20, isRetry = false) => {
    try {
      setLoading(true);
      if (!isRetry) {
        setError(null);
        setRetryCount(0);
      }

      const response = await retryWithBackoff(() =>
        getInvitations(page, perPage)
      );

      if (response.success) {
        const transformedData = transformInvitationData(response.data);
        setInvitations(transformedData);
        setPagination(response.pagination);
        setTotalPages(response.pagination.total_pages || 1);
        setTotalCount(parseInt(response.pagination.total) || 0);
        setRetryCount(0); // Reset retry count on success
      } else {
        throw new Error(response.message || "Failed to fetch invitations");
      }
    } catch (error) {
      const errorInfo = handleApiError(error);
      setError(errorInfo);

      // Show appropriate toast based on error type
      const toastMessages = {
        permission:
          "Access denied. You don't have permission to view invitations.",
        auth: "Please log in to continue.",
        network: "Network error. Please check your connection.",
        rateLimit: "Too many requests. Please wait a moment and try again.",
        server: "Server error. Please try again later.",
        notFound: "Invitations endpoint not found.",
        error: "Failed to load invitations. Please try again.",
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

  // Load invitations data on component mount and when page changes
  useEffect(() => {
    fetchInvitations(currentPage, itemsPerPage);
  }, [currentPage, fetchInvitations]);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle invitation actions
  const handleViewInvitation = (invitationId) => {
    console.log("View invitation:", invitationId);
    // Navigate to invitation details page
  };

  const handleResendInvitation = (invitationId) => {
    const invitation = invitations.find(inv => inv.invitationId === invitationId);
    if (invitation) {
      setSelectedInvitation(invitation);
      setConfirmationAction('resend');
      setIsConfirmationModalOpen(true);
    }
  };

  const handleCancelInvitation = (invitationId) => {
    const invitation = invitations.find(inv => inv.invitationId === invitationId);
    if (invitation) {
      setSelectedInvitation(invitation);
      setConfirmationAction('cancel');
      setIsConfirmationModalOpen(true);
    }
  };

  const handleConfirmAction = async () => {
    if (!selectedInvitation || !confirmationAction) return;

    setIsActionLoading(true);
    try {
      let response;
      if (confirmationAction === 'resend') {
        response = await resendInvitation(selectedInvitation.token);
      } else {
        response = await cancelInvitation(selectedInvitation.token);
      }

      if (response.success) {
        const actionText = confirmationAction === 'resend' ? 'resent' : 'canceled';
        toast.success(`Invitation ${actionText} successfully!`);
        fetchInvitations(currentPage, itemsPerPage);
        handleCloseConfirmationModal();
      } else {
        const actionText = confirmationAction === 'resend' ? 'resend' : 'cancel';
        toast.error(response.message || `Failed to ${actionText} invitation`);
      }
    } catch (error) {
      console.error(`Error ${confirmationAction}ing invitation:`, error);
      const actionText = confirmationAction === 'resend' ? 'resend' : 'cancel';
      toast.error(`Failed to ${actionText} invitation. Please try again.`);
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleCloseConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
    setConfirmationAction(null);
    setSelectedInvitation(null);
    setIsActionLoading(false);
  };

  const handleOpenInviteModal = () => {
    setIsInviteModalOpen(true);
  };

  const handleCloseInviteModal = () => {
    setIsInviteModalOpen(false);
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
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <motion.div
              className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Mail className="w-5 h-5 text-orange-600" />
            </motion.div>
            <div>
              <h2 className="text-2xl font-semibold text-neutral-900">
                Invited Dealerships
              </h2>
              <p className="text-sm text-neutral-600">
                Pending dealership invitations and status
              </p>
            </div>
          </motion.div>
          <motion.button
            onClick={handleOpenInviteModal}
            className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <UserPlus className="w-4 h-4" />
            Invite Dealership
          </motion.button>
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
                    <XCircle className="w-8 h-8 text-red-500" />
                  </div>
                  <div className="text-red-500 text-lg mb-2 font-semibold">
                    Access Denied
                  </div>
                  <div className="text-red-400 text-sm mb-4">
                    {error.message}
                  </div>
                  <div className="text-gray-500 text-xs mb-6">
                    Contact your administrator to request access to invitation
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
                    <Clock className="w-8 h-8 text-yellow-500" />
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
                    <Building2 className="w-8 h-8 text-blue-500" />
                  </div>
                  <div className="text-blue-500 text-lg mb-2 font-semibold">
                    Connection Error
                  </div>
                  <div className="text-blue-400 text-sm mb-4">
                    {error.message}
                  </div>
                  <button
                    onClick={() => fetchInvitations(currentPage, itemsPerPage)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Try Again
                  </button>
                </>
              ) : error.type === "rateLimit" ? (
                <>
                  <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Clock className="w-8 h-8 text-yellow-500" />
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
                    onClick={() => fetchInvitations(currentPage, itemsPerPage)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                  >
                    Try Again
                  </button>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                    <XCircle className="w-8 h-8 text-red-500" />
                  </div>
                  <div className="text-red-500 text-lg mb-2 font-semibold">
                    Error Loading Invitations
                  </div>
                  <div className="text-red-400 text-sm mb-4">
                    {error.message}
                  </div>
                  <button
                    onClick={() => fetchInvitations(currentPage, itemsPerPage)}
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Try Again
                  </button>
                </>
              )}
            </div>
          ) : invitations.length > 0 ? (
            <>
              {user?.role == "admin" || user?.role == "sales_manager" ? (
                <DealershipContainer
                  dealerships={invitations}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalCount={totalCount}
                  onPageChange={handlePageChange}
                  onViewDealership={handleViewInvitation}
                  onEditDealership={() => {}} // Not applicable for invitations
                  onDeleteDealership={handleCancelInvitation}
                  onContactDealership={() => {}} // Not applicable for invitations
                  onActivateDealership={() => {}} // Not applicable for invitations
                  onDeactivateDealership={() => {}} // Not applicable for invitations
                  // Custom actions for invitations
                  onResendInvitation={handleResendInvitation}
                  onCancelInvitation={handleCancelInvitation}
                  isInvitationView={true}
                />
              ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-12 text-center">
                  <div className="text-neutral-500 text-lg mb-2">
                    You are not authorized to view invitations
                  </div>
                  <div className="text-neutral-400 text-sm">
                    Please contact your administrator to request access to
                    invitation management
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Mail className="w-8 h-8 text-gray-400" />
              </div>
              <div className="text-neutral-500 text-lg mb-2">
                No invitations found
              </div>
              <div className="text-neutral-400 text-sm mb-4">
                No dealership invitations have been sent yet
              </div>
              <button
                onClick={handleOpenInviteModal}
                className="cursor-pointer px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                Send First Invitation
              </button>
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
          onSuccess={() => {
            handleCloseInviteModal();
            fetchInvitations(currentPage, itemsPerPage);
          }}
        />

        {/* Confirmation Modal */}
        <ResendAndCancelInvitationModal
          isOpen={isConfirmationModalOpen}
          onClose={handleCloseConfirmationModal}
          onConfirm={handleConfirmAction}
          actionType={confirmationAction}
          dealershipName={selectedInvitation?.name || ''}
          isLoading={isActionLoading}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default InvitedDealerships;