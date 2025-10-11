import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  FileText,
  Hash,
  Building2,
  Loader2,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Lock,
  Send
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

const CreateDealershipUserModal = ({ 
  isOpen, 
  onClose, 
  onSuccess 
}) => {
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
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
    dealer_code: "",
    dealership_name: "",
    notes: "",
    password: "",
    send_welcome_email: true,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const debouncedZipcode = useDebounce(formData.zip, 500);
  const totalSteps = 4;

  const steps = [
    {
      number: 1,
      title: "Personal Information",
      description: "Basic user details",
      icon: User,
    },
    {
      number: 2,
      title: "Contact & Address",
      description: "Contact information and location",
      icon: MapPin,
    },
    {
      number: 3,
      title: "Business Details",
      description: "Dealership and business information",
      icon: Building2,
    },
    {
      number: 4,
      title: "Account Setup",
      description: "Password and preferences",
      icon: Lock,
    },
  ];

  // Fetch location data based on zipcode
  useEffect(() => {
    const fetchLocationData = async () => {
      if (debouncedZipcode && debouncedZipcode.length === 5 && /^\d{5}$/.test(debouncedZipcode)) {
        try {
          console.log("Fetching location data for ZIP:", debouncedZipcode);
          const result = await dispatch(fetchCityStateByZip(debouncedZipcode));
          console.log("Location fetch result:", result);
          
          if (fetchCityStateByZip.fulfilled.match(result)) {
            console.log("Location data fetched successfully:", result.payload);
            setFormData(prev => ({
              ...prev,
              city: result.payload.city || '',
              state: result.payload.state || ''
            }));
          } else {
            console.log("Failed to fetch location data:", result.payload);
            // Clear city and state if fetch failed
            setFormData(prev => ({
              ...prev,
              city: '',
              state: ''
            }));
          }
        } catch (error) {
          console.error("Error fetching location data:", error);
          // Clear city and state on error
          setFormData(prev => ({
            ...prev,
            city: '',
            state: ''
          }));
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
    
    // For dealer_code, only allow alphanumeric input
    if (name === 'dealer_code') {
      const alphanumericValue = value.replace(/[^a-zA-Z0-9]/g, '');
      setFormData((prev) => ({
        ...prev,
        [name]: alphanumericValue,
      }));
    } else if (name === 'zip') {
      // For ZIP code, only allow numeric input and limit to 5 digits
      const numericValue = value.replace(/\D/g, '').slice(0, 5);
      setFormData((prev) => ({
        ...prev,
        [name]: numericValue,
      }));
    } else if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
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

  const validateStep = (step) => {
    const newErrors = {};
    let hasErrors = false;

    switch (step) {
      case 1: // Personal Information
        if (!formData.first_name.trim()) {
          newErrors.first_name = "First name is required";
          hasErrors = true;
        } else if (formData.first_name.length < 2 || formData.first_name.length > 50) {
          newErrors.first_name = "First name must be 2-50 characters";
          hasErrors = true;
        }
        
        if (!formData.last_name.trim()) {
          newErrors.last_name = "Last name is required";
          hasErrors = true;
        } else if (formData.last_name.length < 2 || formData.last_name.length > 50) {
          newErrors.last_name = "Last name must be 2-50 characters";
          hasErrors = true;
        }
        break;

      case 2: // Contact & Address
        if (!formData.email.trim()) {
          newErrors.email = "Email is required";
          hasErrors = true;
        } else {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
            hasErrors = true;
          }
        }

        if (!formData.phone.trim()) {
          newErrors.phone = "Phone is required";
          hasErrors = true;
        } else {
          const phoneDigits = formData.phone.replace(/\D/g, '');
          if (phoneDigits.length < 10) {
            newErrors.phone = "Phone must have at least 10 digits";
            hasErrors = true;
          }
        }

        if (!formData.city.trim()) {
          newErrors.city = "City is required";
          hasErrors = true;
        }

        if (!formData.state.trim()) {
          newErrors.state = "State is required";
          hasErrors = true;
        }

        if (!formData.zip.trim()) {
          newErrors.zip = "ZIP code is required";
          hasErrors = true;
        } else {
          const zipRegex = /^\d{5}$/;
          if (!zipRegex.test(formData.zip)) {
            newErrors.zip = "Please enter a valid 5-digit ZIP code";
            hasErrors = true;
          }
        }
        break;

      case 3: // Business Details
        if (!formData.dealership_name.trim()) {
          newErrors.dealership_name = "Dealership name is required";
          hasErrors = true;
        }

        if (formData.website && formData.website.trim()) {
          const websiteRegex = /^https?:\/\/.+\..+/;
          if (!websiteRegex.test(formData.website)) {
            newErrors.website = "Please enter a valid website URL (e.g., https://example.com)";
            hasErrors = true;
          }
        }
        break;

      case 4: // Account Setup
        if (!formData.password.trim()) {
          newErrors.password = "Password is required";
          hasErrors = true;
        } else if (formData.password.length < 8) {
          newErrors.password = "Password must be at least 8 characters";
          hasErrors = true;
        }
        break;
    }

    setErrors(newErrors);
    return !hasErrors;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      // Make API call to create dealership user
      const response = await api.post('/dealership-users', formData);

      if (response.data.success) {
        setSuccess(true);
        toast.success(response.data.message || "Dealership user created successfully!");
        
        // Call success callback if provided
        if (onSuccess) {
          onSuccess();
        }
        
        // Auto-close modal after 2 seconds
        setTimeout(() => {
          handleClose();
        }, 2000);
      } else {
        throw new Error(response.data.message || "Failed to create dealership user");
      }
    } catch (error) {
      console.error("Error creating dealership user:", error);
      
      // Handle different types of errors
      if (error.response) {
        const { status, data } = error.response;
        
        switch (status) {
          case 400:
            toast.error(data?.message || "Invalid data provided. Please check your inputs.");
            break;
          case 401:
            toast.error("You are not authorized to create dealership users.");
            break;
          case 403:
            toast.error("You don't have permission to create dealership users.");
            break;
          case 409:
            toast.error("A user with this email already exists.");
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
            toast.error(data?.message || "Failed to create dealership user. Please try again.");
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
        address: "",
        city: "",
        state: "",
        zip: "",
        country: "US",
        website: "",
        dealer_code: "",
        dealership_name: "",
        notes: "",
        password: "",
        send_welcome_email: true,
      });
      setErrors({});
      setSuccess(false);
      setCurrentStep(1);
      onClose();
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: // Personal Information
        return (
          <div className="space-y-4">
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
                />
                {errors.first_name && (
                  <p className="text-sm text-red-500">{errors.first_name}</p>
                )}
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
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                    errors.last_name ? 'border-red-500' : 'border-neutral-300'
                  }`}
                  disabled={loading}
                  required
                />
                {errors.last_name && (
                  <p className="text-sm text-red-500">{errors.last_name}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 2: // Contact & Address
        return (
          <div className="space-y-4">
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
                  placeholder="john@example.com"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                    errors.email ? 'border-red-500' : 'border-neutral-300'
                  }`}
                  disabled={loading}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
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
                  placeholder="+1234567890"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                    errors.phone ? 'border-red-500' : 'border-neutral-300'
                  }`}
                  disabled={loading}
                />
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone}</p>
                )}
              </div>
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
                maxLength={5}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                  errors.zip ? 'border-red-500' : 'border-neutral-300'
                }`}
                disabled={loading}
              />
              {errors.zip && (
                <p className="text-sm text-red-500">{errors.zip}</p>
              )}
              <p className="text-xs text-neutral-500">
                Enter ZIP code to automatically fill city and state
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="123 Main Street"
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                disabled={loading}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-gray-200 cursor-not-allowed ${
                    errors.city ? 'border-red-500' : 'border-neutral-300'
                  }`}
                  disabled={loading || true}
                />
                {errors.city && (
                  <p className="text-sm text-red-500">{errors.city}</p>
                )}
                <p className="text-xs text-neutral-500">
                  Auto-filled from ZIP code
                </p>
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
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-gray-200 cursor-not-allowed ${
                    errors.state ? 'border-red-500' : 'border-neutral-300'
                  }`}
                  disabled={loading || true}
                />
                {errors.state && (
                  <p className="text-sm text-red-500">{errors.state}</p>
                )}
                <p className="text-xs text-neutral-500">
                  Auto-filled from ZIP code
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Country
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                disabled={loading}
              >
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="MX">Mexico</option>
                <option value="GB">United Kingdom</option>
                <option value="AU">Australia</option>
              </select>
            </div>
          </div>
        );

      case 3: // Business Details
        return (
          <div className="space-y-4">
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
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                  errors.dealership_name ? 'border-red-500' : 'border-neutral-300'
                }`}
                disabled={loading}
              />
              {errors.dealership_name && (
                <p className="text-sm text-red-500">{errors.dealership_name}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  placeholder="ABC123"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  disabled={loading}
                />
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
                  placeholder="https://example.com"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                    errors.website ? 'border-red-500' : 'border-neutral-300'
                  }`}
                  disabled={loading}
                />
                {errors.website && (
                  <p className="text-sm text-red-500">{errors.website}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Additional notes about the user..."
                rows={3}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 resize-none"
                disabled={loading}
              />
            </div>
          </div>
        );

      case 4: // Account Setup
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password *
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter a secure password"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                  errors.password ? 'border-red-500' : 'border-neutral-300'
                }`}
                disabled={loading}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
              <p className="text-xs text-neutral-500">
                Password must be at least 8 characters long
              </p>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="send_welcome_email"
                  checked={formData.send_welcome_email}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                  disabled={loading}
                />
                <span className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Send welcome email to user
                </span>
              </label>
              <p className="text-xs text-neutral-500 ml-6">
                The user will receive an email with login instructions
              </p>
            </div>
          </div>
        );

      default:
        return null;
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
                {success ? "User Created!" : "Create New Dealership User"}
              </DialogTitle>
              <DialogDescription className="text-neutral-600">
                {success 
                  ? "The dealership user has been created successfully."
                  : "Fill in the details to create a new dealership user account."
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
              User Created Successfully!
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
            {/* Step Progress */}
            <div className="flex items-center justify-between mb-6">
              {steps.map((step, index) => {
                const StepIcon = step.icon;
                const isActive = currentStep === step.number;
                const isCompleted = currentStep > step.number;
                
                return (
                  <div key={step.number} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${
                          isActive
                            ? "bg-orange-500 border-orange-500 text-white"
                            : isCompleted
                            ? "bg-green-500 border-green-500 text-white"
                            : "bg-white border-neutral-300 text-neutral-400"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <StepIcon className="w-5 h-5" />
                        )}
                      </div>
                      <div className="mt-2 text-center">
                        <p className={`text-xs font-medium ${
                          isActive ? "text-orange-600" : isCompleted ? "text-green-600" : "text-neutral-400"
                        }`}>
                          {step.title}
                        </p>
                        <p className="text-xs text-neutral-500">{step.description}</p>
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-16 h-0.5 mx-2 ${
                        isCompleted ? "bg-green-500" : "bg-neutral-300"
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Step Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>
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
              
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={loading}
                  className="flex-1 sm:flex-none"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
              )}
              
              {currentStep < totalSteps ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={loading}
                  className="flex-1 sm:flex-none bg-orange-500 hover:bg-orange-600 text-white"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
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
                      Creating User...
                    </motion.div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Create User
                    </div>
                  )}
                </Button>
              )}
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDealershipUserModal;
