import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { 
  AlertTriangle, 
  XCircle, 
  Loader2,
  MessageSquare
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import { Button } from "./Button";
import api from "@/lib/api";

const CancelSubscriptionModal = ({ 
  isOpen, 
  onClose, 
  onSuccess,
  mode = "request", // "request" or "status"
  cancellationStatus: propCancellationStatus = null,
  subscription = null
}) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [cancellationStatus, setCancellationStatus] = useState(null);

  // Use prop cancellation status or fetch when modal opens in status mode
  useEffect(() => {
    if (isOpen && mode === "status") {
      if (propCancellationStatus) {
        setCancellationStatus(propCancellationStatus);
      } else {
        fetchCancellationStatus();
      }
    }
  }, [isOpen, mode, propCancellationStatus]);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    // Clear error when user starts typing
    if (error) {
      setError("");
    }
  };

  // Fetch cancellation status
  const fetchCancellationStatus = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.get('/subscription/cancellation-status');
      
      if (response.data.success) {
        setCancellationStatus(response.data.cancellation_status);
      } else {
        throw new Error(response.data.message || "Failed to fetch cancellation status");
      }
    } catch (error) {
      console.error("Error fetching cancellation status:", error);
      
      if (error.response) {
        const { status, data } = error.response;
        
        switch (status) {
          case 401:
            toast.error("You are not authorized to view cancellation status.");
            break;
          case 403:
            toast.error("You don't have permission to view cancellation status.");
            break;
          case 404:
            toast.error("No cancellation request found.");
            break;
          case 500:
            toast.error("Server error. Please try again later.");
            break;
          default:
            toast.error(data?.message || "Failed to fetch cancellation status. Please try again.");
        }
      } else if (error.request) {
        toast.error("Network error. Please check your connection and try again.");
      } else {
        toast.error("An unexpected error occurred while fetching cancellation status.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!message.trim()) {
      setError("Please provide a reason for cancelling your subscription");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Make API call to cancel subscription
      const response = await api.post('/subscription/cancel-request', {
        message: message.trim(),
      });

      if (response.data.success) {
        setSuccess(true);
        toast.success(response.data.message || "Cancellation request submitted successfully!");
        
        // Call success callback if provided
        if (onSuccess) {
          onSuccess();
        }
        
        // Auto-close modal after 2 seconds
        setTimeout(() => {
          handleClose();
        }, 2000);
      } else {
        throw new Error(response.data.message || "Failed to submit cancellation request");
      }
    } catch (error) {
      console.error("Error cancelling subscription:", error);
      
      // Handle different types of errors
      if (error.response) {
        const { status, data } = error.response;
        
        switch (status) {
          case 400:
            toast.error(data?.message || "Invalid request to submit cancellation request.");
            break;
          case 401:
            toast.error("You are not authorized to submit cancellation requests.");
            break;
          case 403:
            toast.error("You don't have permission to submit cancellation requests.");
            break;
          case 404:
            toast.error("Subscription not found.");
            break;
          case 409:
            toast.error("Cancellation request already submitted.");
            break;
          case 422:
            toast.error(data?.message || "Validation failed. Cannot submit cancellation request.");
            break;
          case 429:
            toast.error("Too many requests. Please wait a moment and try again.");
            break;
          case 500:
            toast.error("Server error. Please try again later.");
            break;
          default:
            toast.error(data?.message || "Failed to submit cancellation request. Please try again.");
        }
      } else if (error.request) {
        toast.error("Network error. Please check your connection and try again.");
      } else {
        toast.error("An unexpected error occurred while cancelling subscription.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading && !success) {
      setMessage("");
      setError("");
      setSuccess(false);
      setCancellationStatus(null);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <motion.div
            className="flex items-center gap-3 mb-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="w-16 h-12 bg-red-100 rounded-full flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            >
              {success ? (
                <XCircle className="w-8 h-8 text-red-500" />
              ) : (
                <AlertTriangle className="w-8 h-8 text-red-500" />
              )}
            </motion.div>
            <div>
              <DialogTitle className="text-xl font-semibold text-red-600">
                {mode === "status" 
                  ? "Cancellation Status" 
                  : success 
                    ? "Cancellation Request Submitted!" 
                    : "Are you sure you want to cancel this subscription?"
                }
              </DialogTitle>
              <DialogDescription className="text-neutral-600">
                {mode === "status"
                  ? "View the status of your cancellation request."
                  : success 
                    ? "Your cancellation request has been submitted successfully."
                    : ""
                }
              </DialogDescription>
            </div>
          </motion.div>
        </DialogHeader>

        {mode === "status" ? (
          // Status Mode Content
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
                <span className="ml-2 text-neutral-600">Loading status...</span>
              </div>
            ) : cancellationStatus ? (
              <div className="space-y-4">
                {(cancellationStatus.status === 'cancelled' || cancellationStatus.status === 'canceled') ? (
                  // Cancelled Status - Show Restart Subscription Option
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <XCircle className="w-8 h-8 text-red-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-red-600 mb-2">
                      Subscription Cancelled
                    </h3>
                    <p className="text-sm text-gray-600 mb-6">
                      Your subscription has been cancelled. You can restart your subscription to regain access to all features.
                    </p>
                    
                     {/* Request Details */}
                     <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-6">
                       <h4 className="font-semibold text-gray-900 mb-3">Cancellation Details</h4>
                       <div className="space-y-2 text-sm">
                         <div className="flex justify-between">
                           <span className="text-gray-600">Cancelled At:</span>
                           <span className="font-medium">
                             {cancellationStatus.requested_at 
                               ? new Date(cancellationStatus.requested_at).toLocaleString()
                               : 'N/A'
                             }
                           </span>
                         </div>
                         <div className="flex justify-between">
                           <span className="text-gray-600">Amount:</span>
                           <span className="font-medium text-right">
                             ${(subscription?.trial_amount || 0) * (subscription?.quantity || 1)}
                           </span>
                         </div>
                       </div>
                     </div>
                  </div>
                ) : (
                  // Pending/Other Status - Show Status Card and Details
                  <>
                    {/* Status Card */}
                    <div className={`p-4 rounded-lg border-l-4 ${
                      cancellationStatus.status === 'pending' 
                        ? 'bg-yellow-50 border-yellow-400' 
                        : cancellationStatus.status === 'approved'
                        ? 'bg-green-50 border-green-400'
                        : 'bg-red-50 border-red-400'
                    }`}>
                      <div className="flex items-start gap-2">
                        <AlertTriangle className={`w-5 h-5 mt-0.5 ${
                          cancellationStatus.status === 'pending' 
                            ? 'text-yellow-500' 
                            : cancellationStatus.status === 'approved'
                            ? 'text-green-500'
                            : 'text-red-500'
                        }`} />
                        <div className="text-sm">
                          <p className={`font-medium ${
                            cancellationStatus.status === 'pending' 
                              ? 'text-yellow-800' 
                              : cancellationStatus.status === 'approved'
                              ? 'text-green-800'
                              : 'text-red-800'
                          }`}>
                            Status: {cancellationStatus.status?.charAt(0).toUpperCase() + cancellationStatus.status?.slice(1)}
                          </p>
                          <p className={`mt-1 ${
                            cancellationStatus.status === 'pending' 
                              ? 'text-yellow-700' 
                              : cancellationStatus.status === 'approved'
                              ? 'text-green-700'
                              : 'text-red-700'
                          }`}>
                            {cancellationStatus.status === 'pending' 
                              ? 'Your cancellation request is being reviewed by our team.'
                              : cancellationStatus.status === 'approved'
                              ? 'Your cancellation request has been approved.'
                              : 'Your cancellation request has been processed.'
                            }
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Request Details */}
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-3">Request Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Requested At:</span>
                          <span className="font-medium">
                            {cancellationStatus.requested_at 
                              ? new Date(cancellationStatus.requested_at).toLocaleString()
                              : 'N/A'
                            }
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Message:</span>
                          <span className="font-medium text-right max-w-48">
                            {cancellationStatus.message || 'No message provided'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-neutral-600">No cancellation request found</p>
              </div>
            )}
          </motion.div>
        ) : success ? (
          // Success Mode Content (Request submitted)
          <motion.div
            className="text-center py-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.h3
              className="text-lg font-semibold text-red-600 mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Cancellation Request Submitted Successfully!
            </motion.h3>
            <motion.p
              className="text-sm text-red-500"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Your cancellation request has been submitted and will be reviewed by our team.
            </motion.p>
            <motion.p
              className="text-xs text-gray-500 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              This dialog will close automatically...
            </motion.p>
          </motion.div>
        ) : (
          // Request Mode Content (Form)
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            {/* Warning Message */}
            <div className="p-4 rounded-lg border-l-4 bg-red-50 border-red-400">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 mt-0.5 text-red-500" />
                <div className="text-sm">
                  <p className="font-medium text-red-800">
                    Cancellation Warning
                  </p>
                  <p className="mt-1 text-red-700">
                    Submitting a cancellation request will be reviewed by our team. 
                    Your subscription will remain active until the request is processed and approved.
                  </p>
                </div>
              </div>
            </div>

            {/* Message Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Reason for Cancellation
              </label>
              <textarea
                value={message}
                onChange={handleInputChange}
                placeholder="Please tell us why you're cancelling your subscription..."
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 resize-none ${
                  error ? 'border-red-500' : 'border-neutral-300'
                }`}
                rows={4}
                disabled={loading}
                required
              />
              {error && (
                <motion.p
                  className="text-red-500 text-xs flex items-center gap-1"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <AlertTriangle className="w-3 h-3" />
                  {error}
                </motion.p>
              )}
            </div>
          </motion.div>
        )}

        <DialogFooter className="gap-2">
          {mode === "status" ? (
            // Status mode - close button and restart button for cancelled status
            <>
              <button
                type="button"
                onClick={handleClose}
                disabled={loading}
                className="btn-secondary flex-1 sm:flex-none"
              >
                Close
              </button>
              {(cancellationStatus?.status === 'cancelled' || cancellationStatus?.status === 'canceled') && (
                <button
                  type="button"
                  onClick={() => {
                    // TODO: Implement restart subscription functionality
                    toast.success("Restart subscription functionality will be implemented soon!");
                    handleClose();
                  }}
                  className="btn-primary flex-1 sm:flex-none"
                >
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Restart Subscription
                  </div>
                </button>
              )}
            </>
          ) : !success ? (
            // Request mode - close and submit buttons
            <>
              <button
                type="button"
                onClick={handleClose}
                disabled={loading}
                className="btn-secondary flex-1 sm:flex-none"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="btn-primary flex-1 sm:flex-none disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <motion.div
                    className="flex items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting Request...
                  </motion.div>
                ) : (
                  <div className="flex items-center gap-2">
                    <XCircle className="w-4 h-4" />
                    Submit Cancellation Request
                  </div>
                )}
              </button>
            </>
          ) : null}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CancelSubscriptionModal;
