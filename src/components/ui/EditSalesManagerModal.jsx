import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Loader2,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff
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
import useDebounce from "@/hooks/useDebounce";
import { fetchCityStateByZip } from "@/redux/slices/userSlice";

const EditSalesManagerModal = ({ 
  isOpen, 
  onClose, 
  salesManagerData,
  onSuccess 
}) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    zip: "",
    city: "",
    state: "",
    password: "",
    send_notification_email: true,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Debounce zipcode for API calls
  const debouncedZipcode = useDebounce(formData.zip, 500);

  // Populate form data when sales manager data changes
  useEffect(() => {
    if (salesManagerData && isOpen) {
      setFormData({
        first_name: salesManagerData.first_name || "",
        last_name: salesManagerData.last_name || "",
        email: salesManagerData.email || "",
        phone: salesManagerData.phone || "",
        zip: salesManagerData.address?.zip || "",
        city: salesManagerData.address?.city || "",
        state: salesManagerData.address?.state || "",
        password: "",
        send_notification_email: true,
      });
      setErrors({});
      setSuccess(false);
      setShowPassword(false);
    }
  }, [salesManagerData, isOpen]);

  // Fetch city and state when zipcode changes
  useEffect(() => {
    const fetchLocationData = async () => {
      if (debouncedZipcode && debouncedZipcode.length === 5 && /^\d{5}$/.test(debouncedZipcode)) {
        try {
          const result = await dispatch(fetchCityStateByZip(debouncedZipcode));
          if (fetchCityStateByZip.fulfilled.match(result)) {
            setFormData(prev => ({
              ...prev,
              city: result.payload.city,
              state: result.payload.state
            }));
          } else {
            // console.log("Failed to fetch location data:", result.payload);
          }
        } catch (error) {
          // console.error("Error fetching location data:", error);
        }
      } else if (debouncedZipcode && debouncedZipcode.length < 5) {
        // Clear city and state when zipcode is incomplete
        setFormData(prev => ({
          ...prev,
          city: '',
          state: ''
        }));
      }
    };

    fetchLocationData();
  }, [debouncedZipcode, dispatch]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    
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
        "first_name",
        "last_name",
        "phone",
      ];

      const newErrors = {};
      let hasErrors = false;

      for (const field of requiredFields) {
        if (!formData[field].trim()) {
          newErrors[field] = `${field.replace("_", " ")} is required`;
          hasErrors = true;
        }
      }

      // Validate first name length
      if (formData.first_name && (formData.first_name.length < 2 || formData.first_name.length > 50)) {
        newErrors.first_name = "First name must be between 2 and 50 characters";
        hasErrors = true;
      }

      // Validate last name length
      if (formData.last_name && (formData.last_name.length < 2 || formData.last_name.length > 50)) {
        newErrors.last_name = "Last name must be between 2 and 50 characters";
        hasErrors = true;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (formData.email && !emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
        hasErrors = true;
      }

      // Validate phone format (minimum 10 digits)
      if (formData.phone && !/^[\d\s\-()+\s]+$/.test(formData.phone)) {
        newErrors.phone = "Please enter a valid phone number";
        hasErrors = true;
      }

      // Validate phone length (minimum 10 digits)
      const phoneDigits = formData.phone.replace(/\D/g, '');
      if (formData.phone && phoneDigits.length < 10) {
        newErrors.phone = "Phone number must have at least 10 digits";
        hasErrors = true;
      }

      // Validate ZIP code format
      if (formData.zip && !/^\d{5}(-\d{4})?$/.test(formData.zip)) {
        newErrors.zip = "Please enter a valid ZIP code (e.g., 12345 or 12345-6789)";
        hasErrors = true;
      }

      // Check if city and state are populated (should be auto-filled from ZIP)
      if (formData.zip && (!formData.city || !formData.state)) {
        newErrors.zip = "Please enter a valid ZIP code to auto-fill city and state";
        hasErrors = true;
      }

      // Validate password if provided (minimum 8 characters)
      if (formData.password && formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters long";
        hasErrors = true;
      }

      if (hasErrors) {
        setErrors(newErrors);
        setLoading(false);
        return;
      }

      // Prepare request body with only provided fields
      const requestBody = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone: formData.phone,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        send_notification_email: formData.send_notification_email,
      };

      // Only include password if it's provided
      if (formData.password) {
        requestBody.password = formData.password;
      }

      // Make API call to update sales manager
      const response = await api.put(`/sales-managers/${salesManagerData.id}`, requestBody);

      if (response.data.success) {
        setSuccess(true);
        toast.success(response.data.message || "Sales manager updated successfully!");
        
        // Call success callback if provided
        if (onSuccess) {
          onSuccess();
        }
        
        // Auto-close modal after 2 seconds
        setTimeout(() => {
          handleClose();
        }, 2000);
      } else {
        throw new Error(response.data.message || "Failed to update sales manager");
      }
    } catch (error) {
      console.error("Error updating sales manager:", error);
      
      // Handle different types of errors
      if (error.response) {
        const { status, data } = error.response;
        
        switch (status) {
          case 400:
            toast.error(data?.message || "Invalid data provided. Please check your inputs.");
            break;
          case 401:
            toast.error("You are not authorized to update sales managers.");
            break;
          case 403:
            toast.error("You don't have permission to update sales managers.");
            break;
          case 404:
            toast.error("Sales manager not found.");
            break;
          case 409:
            toast.error("A sales manager with this email already exists.");
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
            toast.error(data?.message || "Failed to update sales manager. Please try again.");
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
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        zip: "",
        city: "",
        state: "",
        password: "",
        send_notification_email: true,
      });
      setErrors({});
      setSuccess(false);
      setShowPassword(false);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
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
                <User className="w-8 h-8 text-orange-600" />
              )}
            </motion.div>
            <div>
              <DialogTitle className="text-xl font-semibold text-neutral-900">
                {success ? "Sales Manager Updated!" : "Edit Sales Manager"}
              </DialogTitle>
              <DialogDescription className="text-neutral-600">
                {success 
                  ? "The sales manager has been updated successfully."
                  : "Update the sales manager information below."
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
              Sales Manager Updated Successfully!
            </motion.h3>
            <motion.p
              className="text-sm text-green-500"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {formData.first_name} {formData.last_name} has been updated successfully.
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
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-neutral-800 flex items-center gap-2">
                <User className="w-5 h-5 text-orange-600" />
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Name */}
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

                {/* Last Name */}
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
                    placeholder="Smith"
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

              {/* Email - Disabled and Prefilled */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg bg-neutral-100 text-neutral-600 cursor-not-allowed"
                  disabled
                  title="Email address cannot be changed"
                />
                <p className="text-xs text-neutral-500">
                  Email address cannot be modified
                </p>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1234567890"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                    errors.phone ? 'border-red-500' : 'border-neutral-300'
                  }`}
                  disabled={loading}
                  required
                />
                {errors.phone && (
                  <motion.p
                    className="text-red-500 text-xs flex items-center gap-1"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <AlertCircle className="w-3 h-3" />
                    {errors.phone}
                  </motion.p>
                )}
              </div>
            </div>

            {/* Location Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-neutral-800 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-orange-600" />
                Location Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* City */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    placeholder="Auto-filled from ZIP code"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg bg-neutral-100 text-neutral-600 cursor-not-allowed"
                    disabled
                    title="City is automatically filled from ZIP code"
                  />
                  <p className="text-xs text-neutral-500">
                    City is automatically filled from ZIP code
                  </p>
                </div>

                {/* State */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    placeholder="Auto-filled from ZIP code"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg bg-neutral-100 text-neutral-600 cursor-not-allowed"
                    disabled
                    title="State is automatically filled from ZIP code"
                  />
                  <p className="text-xs text-neutral-500">
                    State is automatically filled from ZIP code
                  </p>
                </div>
              </div>

              {/* ZIP Code */}
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
                  placeholder="90210"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                    errors.zip ? 'border-red-500' : 'border-neutral-300'
                  }`}
                  disabled={loading}
                  required
                />
                {errors.zip && (
                  <motion.p
                    className="text-red-500 text-xs flex items-center gap-1"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <AlertCircle className="w-3 h-3" />
                    {errors.zip}
                  </motion.p>
                )}
              </div>
            </div>

            {/* Security Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-neutral-800 flex items-center gap-2">
                <User className="w-5 h-5 text-orange-600" />
                Security Information
              </h3>
              
              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  New Password (Optional)
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Leave blank to keep current password"
                    className={`w-full px-3 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                      errors.password ? 'border-red-500' : 'border-neutral-300'
                    }`}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors duration-200"
                    disabled={loading}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <motion.p
                    className="text-red-500 text-xs flex items-center gap-1"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <AlertCircle className="w-3 h-3" />
                    {errors.password}
                  </motion.p>
                )}
                <p className="text-xs text-neutral-500">
                  Leave blank to keep the current password. Must be at least 8 characters if provided.
                </p>
              </div>

              {/* Notification Email */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="send_notification_email"
                    checked={formData.send_notification_email}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
                    disabled={loading}
                  />
                  <label className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Send notification email about changes
                  </label>
                </div>
                <p className="text-xs text-neutral-500">
                  The sales manager will be notified via email about the changes made to their account.
                </p>
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
                    Updating Sales Manager...
                  </motion.div>
                ) : (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Update Sales Manager
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

export default EditSalesManagerModal;
