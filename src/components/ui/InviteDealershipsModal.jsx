import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { UserPlus, Mail, Building2, Hash, User, CheckCircle, AlertCircle } from "lucide-react";
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

const InviteDealershipsModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    dealer_email: "",
    dealership_name: "",
    dealer_code: "",
    first_name: "",
    last_name: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // For dealer_code, only allow numeric input
    if (name === 'dealer_code') {
      const numericValue = value.replace(/[^0-9]/g, '');
      setFormData((prev) => ({
        ...prev,
        [name]: numericValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      // Validate required fields
      const requiredFields = [
        "dealer_email",
        "dealership_name",
        "dealer_code",
        "first_name",
        "last_name",
      ];

      const newErrors = {};
      let hasErrors = false;

      for (const field of requiredFields) {
        if (!formData[field].trim()) {
          newErrors[field] = `${field.replace("_", " ")} is required`;
          hasErrors = true;
        }
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (formData.dealer_email && !emailRegex.test(formData.dealer_email)) {
        newErrors.dealer_email = "Please enter a valid email address";
        hasErrors = true;
      }

      // Validate dealer code is numeric
      if (formData.dealer_code && !/^[0-9]+$/.test(formData.dealer_code)) {
        newErrors.dealer_code = "Dealer code must contain only numbers";
        hasErrors = true;
      }

      if (hasErrors) {
        setErrors(newErrors);
        setLoading(false);
        return;
      }

      // Make API call to invite dealership
      const response = await api.post('/dealers/invite', {
        dealer_email: formData.dealer_email,
        dealership_name: formData.dealership_name,
        dealer_code: formData.dealer_code,
        first_name: formData.first_name,
        last_name: formData.last_name,
      });

      if (response.data.success) {
        setSuccess(true);
        toast.success(response.data.message || "Dealership invitation sent successfully!");
        
        // Auto-close modal after 2 seconds
        setTimeout(() => {
          setFormData({
            dealer_email: "",
            dealership_name: "",
            dealer_code: "",
            first_name: "",
            last_name: "",
          });
          setErrors({});
          setSuccess(false);
          onClose();
        }, 2000);
      } else {
        throw new Error(response.data.message || "Failed to send invitation");
      }
    } catch (error) {
      console.error("Error sending invitation:", error);
      
      // Handle different types of errors
      if (error.response) {
        const { status, data } = error.response;
        
        switch (status) {
          case 400:
            toast.error(data?.message || "Invalid data provided. Please check your inputs.");
            break;
          case 401:
            toast.error("You are not authorized to send invitations.");
            break;
          case 403:
            toast.error("You don't have permission to invite dealerships.");
            break;
          case 409:
            toast.error("A dealership with this email already exists.");
            break;
          case 422:
            // Handle validation errors from server
            if (data?.errors) {
              setErrors(data.errors);
            } else {
              toast.error(data?.message || "Validation failed. Please check your inputs.");
            }
            break;
          case 429:
            toast.error("Too many requests. Please wait a moment and try again.");
            break;
          case 500:
            toast.error("Server error. Please try again later.");
            break;
          default:
            toast.error(data?.message || "Failed to send invitation. Please try again.");
        }
      } else if (error.request) {
        toast.error("Network error. Please check your connection and try again.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading && !success) {
      setFormData({
        dealer_email: "",
        dealership_name: "",
        dealer_code: "",
        first_name: "",
        last_name: "",
      });
      setErrors({});
      setSuccess(false);
      onClose();
    }
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
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <DialogTitle className="text-xl font-semibold text-neutral-900">
                Invite Dealership
              </DialogTitle>
              <DialogDescription className="text-neutral-600">
                Send an invitation to a new dealership partner
              </DialogDescription>
            </div>
          </motion.div>
        </DialogHeader>

        {success ? (
          <motion.div
            className="text-center py-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <CheckCircle className="w-8 h-8 text-green-500" />
            </motion.div>
            <motion.h3
              className="text-lg font-semibold text-green-600 mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Invitation Sent Successfully!
            </motion.h3>
            <motion.p
              className="text-sm text-green-500"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              The dealership invitation has been sent to {formData.dealer_email}
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Dealer Email
              </label>
              <input
                type="email"
                name="dealer_email"
                value={formData.dealer_email}
                onChange={handleInputChange}
                placeholder="dealer@example.com"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                  errors.dealer_email ? 'border-red-500' : 'border-neutral-300'
                }`}
                disabled={loading}
                required
              />
              {errors.dealer_email && (
                <motion.p
                  className="text-red-500 text-xs flex items-center gap-1"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <AlertCircle className="w-3 h-3" />
                  {errors.dealer_email}
                </motion.p>
              )}
            </div>

            {/* Dealership Name Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Dealership Name
              </label>
              <input
                type="text"
                name="dealership_name"
                value={formData.dealership_name}
                onChange={handleInputChange}
                placeholder="ABC Motors"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                  errors.dealership_name ? 'border-red-500' : 'border-neutral-300'
                }`}
                disabled={loading}
                required
              />
              {errors.dealership_name && (
                <motion.p
                  className="text-red-500 text-xs flex items-center gap-1"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <AlertCircle className="w-3 h-3" />
                  {errors.dealership_name}
                </motion.p>
              )}
            </div>

            {/* Dealer Code Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                <Hash className="w-4 h-4" />
                Dealer Code
              </label>
              <input
                type="text"
                name="dealer_code"
                value={formData.dealer_code}
                onChange={handleInputChange}
                placeholder="12345"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                  errors.dealer_code ? 'border-red-500' : 'border-neutral-300'
                }`}
                disabled={loading}
                required
                pattern="[0-9]*"
                inputMode="numeric"
              />
              {errors.dealer_code && (
                <motion.p
                  className="text-red-500 text-xs flex items-center gap-1"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <AlertCircle className="w-3 h-3" />
                  {errors.dealer_code}
                </motion.p>
              )}
            </div>

            {/* Name Fields Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  First Name
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  placeholder="John"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                    errors.first_name ? 'border-red-500' : 'border-neutral-300'
                  }`}
                  disabled={loading}
                  required
                />
                {errors.first_name && (
                  <motion.p
                    className="text-red-500 text-xs flex items-center gap-1"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <AlertCircle className="w-3 h-3" />
                    {errors.first_name}
                  </motion.p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Last Name
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  placeholder="Doe"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                    errors.last_name ? 'border-red-500' : 'border-neutral-300'
                  }`}
                  disabled={loading}
                  required
                />
                {errors.last_name && (
                  <motion.p
                    className="text-red-500 text-xs flex items-center gap-1"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <AlertCircle className="w-3 h-3" />
                    {errors.last_name}
                  </motion.p>
                )}
              </div>
            </div>
          </motion.div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={loading}
              className="flex-1 sm:flex-none"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 sm:flex-none bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <motion.div
                  className="flex items-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending Invitation...
                </motion.div>
              ) : (
                <div className="flex items-center gap-2">
                  <UserPlus className="w-4 h-4" />
                  Send Invitation
                </div>
              )}
            </Button>
          </DialogFooter>
        </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default InviteDealershipsModal;
