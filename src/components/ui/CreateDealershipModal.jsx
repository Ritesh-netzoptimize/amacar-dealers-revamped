import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { 
  Building2, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  FileText,
  Hash,
  Loader2,
  CheckCircle
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

const CreateDealershipModal = ({ 
  isOpen, 
  onClose, 
  onSuccess 
}) => {
  const [formData, setFormData] = useState({
    dealership_name: "",
    dealer_code: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "US",
    website: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // For dealer_code, only allow alphanumeric input
    if (name === 'dealer_code') {
      const alphanumericValue = value.replace(/[^a-zA-Z0-9]/g, '');
      setFormData((prev) => ({
        ...prev,
        [name]: alphanumericValue,
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
      // Validate required fields - only show red border, no error messages
      const requiredFields = [
        "dealership_name",
        "dealer_code",
        "first_name",
        "last_name",
        "email",
        "phone",
        "address",
        "city",
        "state",
        "zip",
        "country",
      ];

      const newErrors = {};
      let hasErrors = false;

      for (const field of requiredFields) {
        if (!formData[field].trim()) {
          newErrors[field] = "required"; // Just mark as required for red border
          hasErrors = true;
        }
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (formData.email && !emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
        hasErrors = true;
      }

      // Validate website format if provided
      if (formData.website && formData.website.trim()) {
        const websiteRegex = /^https?:\/\/.+\..+/;
        if (!websiteRegex.test(formData.website)) {
          newErrors.website = "Please enter a valid website URL (e.g., https://example.com)";
          hasErrors = true;
        }
      }

      // Validate phone format
      if (formData.phone && !/^[\d\s\-()]+$/.test(formData.phone)) {
        newErrors.phone = "Please enter a valid phone number";
        hasErrors = true;
      }

      if (hasErrors) {
        setErrors(newErrors);
        setLoading(false);
        return;
      }

      // Make API call to create dealership
      const response = await api.post('/dealerships/create', formData);

      if (response.data.success) {
        setSuccess(true);
        toast.success(response.data.message || "Dealership created successfully!");
        
        // Call success callback if provided
        if (onSuccess) {
          onSuccess();
        }
        
        // Auto-close modal after 2 seconds
        setTimeout(() => {
          handleClose();
        }, 2000);
      } else {
        throw new Error(response.data.message || "Failed to create dealership");
      }
    } catch (error) {
      console.error("Error creating dealership:", error);
      
      // Handle different types of errors
      if (error.response) {
        const { status, data } = error.response;
        
        switch (status) {
          case 400:
            toast.error(data?.message || "Invalid data provided. Please check your inputs.");
            break;
          case 401:
            toast.error("You are not authorized to create dealerships.");
            break;
          case 403:
            toast.error("You don't have permission to create dealerships.");
            break;
          case 409:
            toast.error("A dealership with this email or dealer code already exists.");
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
            toast.error(data?.message || "Failed to create dealership. Please try again.");
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
        dealership_name: "",
        dealer_code: "",
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        country: "US",
        website: "",
        notes: "",
      });
      setErrors({});
      setSuccess(false);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <motion.div
            className="flex items-center gap-3 mb-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            >
              {success ? (
                <CheckCircle className="w-8 h-8 text-green-500" />
              ) : (
                <Building2 className="w-8 h-8 text-orange-600" />
              )}
            </motion.div>
            <div>
              <DialogTitle className="text-xl font-semibold text-neutral-900">
                {success ? "Dealership Created!" : "Create New Dealership"}
              </DialogTitle>
              <DialogDescription className="text-neutral-600">
                {success 
                  ? "The dealership has been created successfully."
                  : "Fill in the details to create a new dealership."
                }
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
            <motion.h3
              className="text-lg font-semibold text-green-600 mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Dealership Created Successfully!
            </motion.h3>
            <motion.p
              className="text-sm text-green-500"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {formData.dealership_name} has been created and is ready to use.
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
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            {/* Dealership Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-neutral-800 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-orange-600" />
                Dealership Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    Dealership Name *
                  </label>
                  <input
                    type="text"
                    name="dealership_name"
                    value={formData.dealership_name}
                    onChange={handleInputChange}
                    placeholder="ABC Motors"
                    title="Dealership name is required"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                      errors.dealership_name ? 'border-red-500' : 'border-neutral-300'
                    }`}
                    disabled={loading}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                    <Hash className="w-4 h-4" />
                    Dealer Code *
                  </label>
                  <input
                    type="text"
                    name="dealer_code"
                    value={formData.dealer_code}
                    onChange={handleInputChange}
                    placeholder="ABC123"
                    title="Dealer code is required (alphanumeric only)"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                      errors.dealer_code ? 'border-red-500' : 'border-neutral-300'
                    }`}
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Website
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="https://abcmotors.com"
                  title="Enter a valid website URL (optional)"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                    errors.website ? 'border-red-500' : 'border-neutral-300'
                  }`}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-neutral-800 flex items-center gap-2">
                <User className="w-5 h-5 text-orange-600" />
                Contact Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    placeholder="John"
                    title="First name is required"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                      errors.first_name ? 'border-red-500' : 'border-neutral-300'
                    }`}
                    disabled={loading}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    placeholder="Doe"
                    title="Last name is required"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                      errors.last_name ? 'border-red-500' : 'border-neutral-300'
                    }`}
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@abcmotors.com"
                    title="Email address is required"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                      errors.email ? 'border-red-500' : 'border-neutral-300'
                    }`}
                    disabled={loading}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="555-123-4567"
                    title="Phone number is required"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                      errors.phone ? 'border-red-500' : 'border-neutral-300'
                    }`}
                    disabled={loading}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-neutral-800 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-orange-600" />
                Address Information
              </h3>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="123 Main Street"
                  title="Street address is required"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                    errors.address ? 'border-red-500' : 'border-neutral-300'
                  }`}
                  disabled={loading}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="New York"
                    title="City is required"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                      errors.city ? 'border-red-500' : 'border-neutral-300'
                    }`}
                    disabled={loading}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="NY"
                    title="State is required"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                      errors.state ? 'border-red-500' : 'border-neutral-300'
                    }`}
                    disabled={loading}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    name="zip"
                    value={formData.zip}
                    onChange={handleInputChange}
                    placeholder="10001"
                    title="ZIP code is required"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                      errors.zip ? 'border-red-500' : 'border-neutral-300'
                    }`}
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Country *
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  title="Country is required"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                    errors.country ? 'border-red-500' : 'border-neutral-300'
                  }`}
                  disabled={loading}
                  required
                >
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="MX">Mexico</option>
                  <option value="GB">United Kingdom</option>
                  <option value="AU">Australia</option>
                </select>
              </div>
            </div>

            {/* Additional Notes */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-neutral-800 flex items-center gap-2">
                <FileText className="w-5 h-5 text-orange-600" />
                Additional Information
              </h3>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Additional notes about the dealership..."
                  title="Optional additional information"
                  rows={3}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 resize-none ${
                    errors.notes ? 'border-red-500' : 'border-neutral-300'
                  }`}
                  disabled={loading}
                />
              </div>
            </div>
          </motion.div>
        )}

        <DialogFooter className="gap-2">
          {!success && (
            <>
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
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 sm:flex-none bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <motion.div
                    className="flex items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating Dealership...
                  </motion.div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    Create Dealership
                  </div>
                )}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDealershipModal;
