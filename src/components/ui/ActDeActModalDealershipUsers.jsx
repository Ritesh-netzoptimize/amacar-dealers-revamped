import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Loader2,
  UserCheck,
  UserX
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

const ActDeActModalDealershipUsers = ({ 
  isOpen, 
  onClose, 
  action, // 'activate' or 'deactivate'
  userId, 
  userName,
  onSuccess 
}) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [sendNotificationEmail, setSendNotificationEmail] = useState(true);

  const isActivate = action === 'activate';
  const actionText = isActivate ? 'Activate' : 'Deactivate';
  const actionTextPast = isActivate ? 'Activated' : 'Deactivated';
  const actionTextPresent = isActivate ? 'Activating' : 'Deactivating';

  const handleConfirm = async () => {
    setLoading(true);

    try {
      // Make API call to activate/deactivate dealership user
      const endpoint = isActivate 
        ? `/dealership-users/${userId}/activate` 
        : `/dealership-users/${userId}/deactivate`;
      
      const requestBody = {
        send_notification_email: sendNotificationEmail
      };
      
      const response = await api.post(endpoint, requestBody);

      if (response.data.success) {
        setSuccess(true);
        toast.success(
          `${userName} has been ${actionTextPast.toLowerCase()} successfully!`
        );
        
        // Call success callback if provided
        if (onSuccess) {
          onSuccess(userId, isActivate);
        }
        
        // Auto-close modal after 2 seconds
        setTimeout(() => {
          handleClose();
        }, 2000);
      } else {
        throw new Error(response.data.message || `Failed to ${actionText.toLowerCase()} dealership user`);
      }
    } catch (error) {
      console.error(`Error ${actionText.toLowerCase()}ing dealership user:`, error);
      
      // Handle different types of errors
      if (error.response) {
        const { status, data } = error.response;
        
        switch (status) {
          case 400:
            toast.error(data?.message || `Invalid request to ${actionText.toLowerCase()} dealership user.`);
            break;
          case 401:
            toast.error("You are not authorized to perform this action.");
            break;
          case 403:
            toast.error(`You don't have permission to ${actionText.toLowerCase()} dealership users.`);
            break;
          case 404:
            toast.error("Dealership user not found.");
            break;
          case 409:
            toast.error(`Dealership user is already ${isActivate ? 'active' : 'inactive'}.`);
            break;
          case 422:
            toast.error(data?.message || `Validation failed. Cannot ${actionText.toLowerCase()} dealership user.`);
            break;
          case 429:
            toast.error("Too many requests. Please wait a moment and try again.");
            break;
          case 500:
            toast.error("Server error. Please try again later.");
            break;
          default:
            toast.error(data?.message || `Failed to ${actionText.toLowerCase()} dealership user. Please try again.`);
        }
      } else if (error.request) {
        toast.error("Network error. Please check your connection and try again.");
      } else {
        toast.error(`An unexpected error occurred while ${actionText.toLowerCase()}ing dealership user.`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading && !success) {
      setSuccess(false);
      onClose();
    }
  };

  const getIcon = () => {
    if (success) {
      return isActivate ? (
        <UserCheck className="w-8 h-8 text-green-500" />
      ) : (
        <UserX className="w-8 h-8 text-red-500" />
      );
    }
    return isActivate ? (
      <CheckCircle className="w-8 h-8 text-green-500" />
    ) : (
      <XCircle className="w-8 h-8 text-red-500" />
    );
  };

  const getIconBgColor = () => {
    if (success) {
      return isActivate ? "bg-green-100" : "bg-red-100";
    }
    return isActivate ? "bg-green-100" : "bg-red-100";
  };

  const getTitleColor = () => {
    if (success) {
      return isActivate ? "text-green-600" : "text-red-600";
    }
    return isActivate ? "text-green-600" : "text-red-600";
  };

  const getDescriptionColor = () => {
    if (success) {
      return isActivate ? "text-green-500" : "text-red-500";
    }
    return isActivate ? "text-green-500" : "text-red-500";
  };

  const getButtonColor = () => {
    return isActivate 
      ? "bg-green-500 hover:bg-green-600 text-white" 
      : "bg-red-500 hover:bg-red-600 text-white";
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <motion.div
            className="flex items-center gap-3 mb-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className={`w-12 h-12 ${getIconBgColor()} rounded-full flex items-center justify-center`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            >
              {getIcon()}
            </motion.div>
            <div>
              <DialogTitle className={`text-xl font-semibold ${getTitleColor()}`}>
                {success ? `${actionTextPast} Successfully!` : `${actionText} Dealership User`}
              </DialogTitle>
              <DialogDescription className="text-neutral-600">
                {success 
                  ? `The dealership user has been ${actionTextPast.toLowerCase()}.`
                  : `Are you sure you want to ${actionText.toLowerCase()} this dealership user?`
                }
              </DialogDescription>
            </div>
          </motion.div>
        </DialogHeader>

        {success ? (
          <motion.div
            className="text-center py-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.h3
              className={`text-lg font-semibold ${getTitleColor()} mb-2`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {userName} has been {actionTextPast.toLowerCase()}!
            </motion.h3>
            <motion.p
              className={`text-sm ${getDescriptionColor()}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {isActivate 
                ? "The dealership user can now access the platform and manage their activities."
                : "The dealership user has been deactivated and cannot access the platform."
              }
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
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            {/* Dealership User Info */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className={`w-4 h-4 ${isActivate ? 'text-green-500' : 'text-red-500'}`} />
                <span className="font-medium text-gray-900">Dealership User Details</span>
              </div>
              <div className="text-sm text-gray-600">
                <p><strong>Name:</strong> {userName}</p>
                <p><strong>ID:</strong> {userId}</p>
              </div>
            </div>

            {/* Notification Email Option */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-blue-500" />
                <span className="font-medium text-blue-900">Notification Settings</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="send-notification"
                  checked={sendNotificationEmail}
                  onChange={(e) => setSendNotificationEmail(e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor="send-notification" className="text-sm text-blue-800">
                  Send notification email to dealership user
                </label>
              </div>
            </div>

            {/* Warning Message */}
            <div className={`p-4 rounded-lg border-l-4 ${
              isActivate 
                ? 'bg-green-50 border-green-400' 
                : 'bg-red-50 border-red-400'
            }`}>
              <div className="flex items-start gap-2">
                <AlertTriangle className={`w-5 h-5 mt-0.5 ${
                  isActivate ? 'text-green-500' : 'text-red-500'
                }`} />
                <div className="text-sm">
                  <p className={`font-medium ${
                    isActivate ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {isActivate ? 'Activation' : 'Deactivation'} Warning
                  </p>
                  <p className={`mt-1 ${
                    isActivate ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {isActivate 
                      ? "Activating this dealership user will grant them full access to the platform. They will be able to manage their dealership, view auctions, and participate in bidding activities."
                      : "Deactivating this dealership user will immediately revoke their access to the platform. They will not be able to log in or perform any actions."
                    }
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <DialogFooter className="gap-2">
          {!success && (
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={loading}
              className="flex-1 sm:flex-none"
            >
              Cancel
            </Button>
          )}
          {!success && (
            <Button
              type="button"
              onClick={handleConfirm}
              disabled={loading}
              className={`flex-1 sm:flex-none ${getButtonColor()} disabled:opacity-70 disabled:cursor-not-allowed`}
            >
              {loading ? (
                <motion.div
                  className="flex items-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {actionTextPresent}...
                </motion.div>
              ) : (
                <div className="flex items-center gap-2">
                  {isActivate ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <XCircle className="w-4 h-4" />
                  )}
                  {actionText} Dealership User
                </div>
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ActDeActModalDealershipUsers;
