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

const CreateSalesManagersModal = ({ 
  isOpen, 
  onClose, 
  onSuccess 
}) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    zip: "",
    password: "",
    confirm_password: "",
    send_welcome_email: true,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Debounce zipcode for API calls
  const debouncedZipcode = useDebounce(formData.zip, 500);

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
    
    // Special handling for ZIP code - only allow numbers and hyphens
    if (name === 'zip') {
      const zipValue = value.replace(/[^0-9-]/g, '');
      setFormData((prev) => ({
        ...prev,
        [name]: zipValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
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
        "first_name",
        "email",
        "phone",
        "zip",
        "password",
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

      // Validate last name length if provided
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
      if (formData.phone && !/^\d{10,}$/.test(formData.phone.replace(/\D/g, ''))) {
        newErrors.phone = "Phone number must contain at least 10 digits";
        hasErrors = true;
      }

      // Validate ZIP code format
      if (formData.zip && !/^\d{5}(-\d{4})?$/.test(formData.zip)) {
        newErrors.zip = "Please enter a valid ZIP code (e.g., 12345 or 12345-6789)";
        hasErrors = true;
      }

      // Validate password
      if (formData.password && formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters long";
        hasErrors = true;
      }

      // Validate password confirmation
      if (formData.password !== formData.confirm_password) {
        newErrors.confirm_password = "Passwords do not match";
        hasErrors = true;
      }

      // Check if city and state are populated (should be auto-filled from ZIP)
      if (formData.zip && (!formData.city || !formData.state)) {
        newErrors.zip = "Please enter a valid ZIP code to auto-fill city and state";
        hasErrors = true;
      }

      if (hasErrors) {
        setErrors(newErrors);
        setLoading(false);
        return;
      }

      // Prepare data for API call
      const apiData = {
        first_name: formData.first_name,
        last_name: formData.last_name || "",
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        password: formData.password,
        send_welcome_email: formData.send_welcome_email,
      };

      // Make API call to create sales manager
      const response = await api.post('/sales-managers', apiData);

      if (response.data.success) {
        setSuccess(true);
        toast.success(response.data.message || "Sales manager created successfully!");
        
        // Call success callback if provided
        if (onSuccess) {
          onSuccess();
        }
        
        // Auto-close modal after 2 seconds
        setTimeout(() => {
          handleClose();
        }, 2000);
      } else {
        throw new Error(response.data.message || "Failed to create sales manager");
      }
    } catch (error) {
      console.error("Error creating sales manager:", error);
      
      // Handle different types of errors
      if (error.response) {
        const { status, data } = error.response;
        
        switch (status) {
          case 400:
            toast.error(data?.message || "Invalid data provided. Please check your inputs.");
            break;
          case 401:
            toast.error("You are not authorized to create sales managers.");
            break;
          case 403:
            toast.error("You don't have permission to create sales managers.");
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
            toast.error(data?.message || "Failed to create sales manager. Please try again.");
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
        city: "",
        state: "",
        zip: "",
        password: "",
        confirm_password: "",
        send_welcome_email: true,
      });
      setErrors({});
      setSuccess(false);
      setShowPassword(false);
      setShowConfirmPassword(false);
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
                <User className="w-8 h-8 text-orange-600" />
              )}
            </motion.div>
            <div>
              <DialogTitle className="text-xl font-semibold text-neutral-900">
                {success ? "Sales Manager Created!" : "Create New Sales Manager"}
              </DialogTitle>
              <DialogDescription className="text-neutral-600">
                {success 
                  ? "The sales manager has been created successfully."
                  : "Fill in the details to create a new sales manager account."
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
              Sales Manager Created Successfully!
            </motion.h3>
            <motion.p
              className="text-sm text-green-500"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {formData.first_name} {formData.last_name} has been created and is ready to use.
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

              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                    errors.email ? 'border-red-500' : 'border-neutral-300'
                  }`}
                  disabled={loading}
                  required
                />
                {errors.email && (
                  <motion.p
                    className="text-red-500 text-xs flex items-center gap-1"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <AlertCircle className="w-3 h-3" />
                    {errors.email}
                  </motion.p>
                )}
              </div>

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
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    placeholder="10001"
                    maxLength="10"
                    pattern="[0-9]{5}(-[0-9]{4})?"
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
                    placeholder="Auto-filled from ZIP"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg bg-neutral-100 text-neutral-600 cursor-not-allowed"
                    disabled
                    title="City is automatically filled from ZIP code"
                  />
                  <p className="text-xs text-neutral-500">
                    Auto-filled from ZIP
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
                    placeholder="Auto-filled from ZIP"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg bg-neutral-100 text-neutral-600 cursor-not-allowed"
                    disabled
                    title="State is automatically filled from ZIP code"
                  />
                  <p className="text-xs text-neutral-500">
                    Auto-filled from ZIP
                  </p>
                </div>
              </div>
            </div>

            {/* Account Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-neutral-800 flex items-center gap-2">
                <User className="w-5 h-5 text-orange-600" />
                Account Information
              </h3>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter a secure password"
                    className={`w-full px-3 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                      errors.password ? 'border-red-500' : 'border-neutral-300'
                    }`}
                    disabled={loading}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-neutral-700"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
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
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Confirm Password *
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirm_password"
                    value={formData.confirm_password}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    className={`w-full px-3 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                      errors.confirm_password ? 'border-red-500' : 'border-neutral-300'
                    }`}
                    disabled={loading}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-neutral-700"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.confirm_password && (
                  <motion.p
                    className="text-red-500 text-xs flex items-center gap-1"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <AlertCircle className="w-3 h-3" />
                    {errors.confirm_password}
                  </motion.p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="send_welcome_email"
                  checked={formData.send_welcome_email}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
                  disabled={loading}
                />
                <label className="text-sm text-neutral-700">
                  Send welcome email to the new sales manager
                </label>
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
                    Creating Sales Manager...
                  </motion.div>
                ) : (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Create Sales Manager
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

export default CreateSalesManagersModal;
