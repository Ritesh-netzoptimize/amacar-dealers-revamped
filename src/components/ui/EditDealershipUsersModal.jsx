import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import {
  Users,
  Mail,
  Phone,
  MapPin,
  Loader2,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  Building2,
  Globe,
  FileText,
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

const EditDealershipUsersModal = ({
  isOpen,
  onClose,
  dealershipUserData,
  onSuccess,
}) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    zip: "",
    city: "",
    state: "",
    country: "US",
    website: "",
    dealer_code: "",
    dealership_name: "",
    notes: "",
    password: "",
    send_notification_email: true,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Debounce zipcode for API calls
  const debouncedZipcode = useDebounce(formData.zip, 500);

  // Populate form data when dealership user data changes
  useEffect(() => {
    if (dealershipUserData && isOpen) {
      setFormData({
        first_name: dealershipUserData.first_name || "",
        last_name: dealershipUserData.last_name || "",
        email: dealershipUserData.email || "",
        phone: dealershipUserData.phone || "",
        address: dealershipUserData.address?.street || "",
        zip: dealershipUserData.address?.zip || "",
        city: dealershipUserData.address?.city || "",
        state: dealershipUserData.address?.state || "",
        country: dealershipUserData.address?.country || "US",
        website: dealershipUserData.business?.website || "",
        dealer_code: dealershipUserData.business?.dealer_code || "",
        dealership_name: dealershipUserData.business?.dealership_name || "",
        notes: dealershipUserData.business?.notes || "",
        password: "",
        send_notification_email: true,
      });
      setErrors({});
      setSuccess(false);
      setShowPassword(false);
    }
  }, [dealershipUserData, isOpen]);

  // Fetch city and state when zipcode changes
  useEffect(() => {
    const fetchLocationData = async () => {
      if (
        debouncedZipcode &&
        debouncedZipcode.length === 5 &&
        /^\d{5}$/.test(debouncedZipcode)
      ) {
        try {
          const result = await dispatch(fetchCityStateByZip(debouncedZipcode));
          if (fetchCityStateByZip.fulfilled.match(result)) {
            setFormData((prev) => ({
              ...prev,
              city: result.payload.city,
              state: result.payload.state,
            }));
          } else {
            // console.log("Failed to fetch location data:", result.payload);
          }
        } catch (error) {
          // console.error("Error fetching location data:", error);
        }
      } else if (debouncedZipcode && debouncedZipcode.length < 5) {
        // Clear city and state when zipcode is incomplete
        setFormData((prev) => ({
          ...prev,
          city: "",
          state: "",
        }));
      }
    };

    fetchLocationData();
  }, [debouncedZipcode, dispatch]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
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
        "phone",
        "address",
        "zip",
        "dealer_code",
        "dealership_name",
      ];

      const newErrors = {};
      let hasErrors = false;

      for (const field of requiredFields) {
        if (!formData[field].trim()) {
          newErrors[field] = `${field.replace("_", " ")} is required`;
          hasErrors = true;
        }
      }

      // Validate phone format (minimum 10 digits)
      if (formData.phone && !/^[\d\s\-()+\s]+$/.test(formData.phone)) {
        newErrors.phone = "Please enter a valid phone number";
        hasErrors = true;
      }

      // Validate phone length (minimum 10 digits)
      const phoneDigits = formData.phone.replace(/\D/g, "");
      if (formData.phone && phoneDigits.length < 10) {
        newErrors.phone = "Phone number must have at least 10 digits";
        hasErrors = true;
      }

      // Validate ZIP code format
      if (formData.zip && !/^\d{5}(-\d{4})?$/.test(formData.zip)) {
        newErrors.zip =
          "Please enter a valid ZIP code (e.g., 12345 or 12345-6789)";
        hasErrors = true;
      }

      // Check if city and state are populated (should be auto-filled from ZIP)
      if (formData.zip && (!formData.city || !formData.state)) {
        newErrors.zip =
          "Please enter a valid ZIP code to auto-fill city and state";
        hasErrors = true;
      }

      // Validate website URL format if provided
      if (formData.website && formData.website.trim()) {
        const urlRegex = /^https?:\/\/.+\..+/;
        if (!urlRegex.test(formData.website)) {
          newErrors.website =
            "Please enter a valid website URL (e.g., https://example.com)";
          hasErrors = true;
        }
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
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        country: formData.country,
        website: formData.website,
        dealer_code: formData.dealer_code,
        dealership_name: formData.dealership_name,
        notes: formData.notes,
        send_notification_email: formData.send_notification_email,
      };

      // Only include password if it's provided
      if (formData.password) {
        requestBody.password = formData.password;
      }

      // Make API call to update dealership user
      const response = await api.put(
        `/dealership-users/${dealershipUserData.id}`,
        requestBody
      );

      if (response.data.success) {
        setSuccess(true);
        toast.success(
          response.data.message || "Dealership user updated successfully!"
        );

        // Call success callback if provided
        if (onSuccess) {
          onSuccess();
        }

        // Auto-close modal after 2 seconds
        setTimeout(() => {
          handleClose();
        }, 2000);
      } else {
        throw new Error(
          response.data.message || "Failed to update dealership user"
        );
      }
    } catch (error) {
      console.error("Error updating dealership user:", error);

      // Handle different types of errors
      if (error.response) {
        const { status, data } = error.response;

        switch (status) {
          case 400:
            toast.error(
              data?.message ||
                "Invalid data provided. Please check your inputs."
            );
            break;
          case 401:
            toast.error("You are not authorized to update dealership users.");
            break;
          case 403:
            toast.error(
              "You don't have permission to update dealership users."
            );
            break;
          case 404:
            toast.error("Dealership user not found.");
            break;
          case 409:
            toast.error(
              "A dealership user with this information already exists."
            );
            break;
          case 422:
            // Handle validation errors from server
            if (data?.errors) {
              setErrors(data.errors);
            } else {
              toast.error(
                data?.message || "Validation failed. Please check your inputs."
              );
            }
            break;
          case 429:
            toast.error(
              "Too many requests. Please wait a moment and try again."
            );
            break;
          case 500:
            toast.error("Server error. Please try again later.");
            break;
          default:
            toast.error(
              data?.message ||
                "Failed to update dealership user. Please try again."
            );
        }
      } else if (error.request) {
        toast.error(
          "Network error. Please check your connection and try again."
        );
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
        zip: "",
        city: "",
        state: "",
        country: "US",
        website: "",
        dealer_code: "",
        dealership_name: "",
        notes: "",
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
                <Users className="w-8 h-8 text-orange-600" />
              )}
            </motion.div>
            <div>
              <DialogTitle className="text-xl font-semibold text-neutral-900">
                {success ? "Dealership User Updated!" : "Edit Dealership User"}
              </DialogTitle>
              <DialogDescription className="text-neutral-600">
                {success
                  ? "The dealership user has been updated successfully."
                  : "Update the dealership user information below."}
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
              Dealership User Updated Successfully!
            </motion.h3>
            <motion.p
              className="text-sm text-green-500"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {formData.first_name} {formData.last_name} has been updated
              successfully.
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
                <Users className="w-5 h-5 text-orange-600" />
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Name - Disabled */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    First Name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg bg-neutral-100 text-neutral-600 cursor-not-allowed"
                    disabled
                    title="First name cannot be changed"
                  />
                  <p className="text-xs text-neutral-500">
                    First name cannot be modified
                  </p>
                </div>

                {/* Last Name - Disabled */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg bg-neutral-100 text-neutral-600 cursor-not-allowed"
                    disabled
                    title="Last name cannot be changed"
                  />
                  <p className="text-xs text-neutral-500">
                    Last name cannot be modified
                  </p>
                </div>
              </div>

              {/* Email - Disabled */}
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
                    errors.phone ? "border-red-500" : "border-neutral-300"
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

              {/* Address */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Street Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="123 Main Street"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                    errors.address ? "border-red-500" : "border-neutral-300"
                  }`}
                  disabled={loading}
                  required
                />
                {errors.address && (
                  <motion.p
                    className="text-red-500 text-xs flex items-center gap-1"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <AlertCircle className="w-3 h-3" />
                    {errors.address}
                  </motion.p>
                )}
              </div>

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
                    placeholder="90210"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                      errors.zip ? "border-red-500" : "border-neutral-300"
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

                {/* City - Disabled */}
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
                    Auto-filled from ZIP code
                  </p>
                </div>

                {/* State - Disabled */}
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
                    Auto-filled from ZIP code
                  </p>
                </div>
              </div>
            </div>

            {/* Business Information */}
            {/* <div className="space-y-4">
              <h3 className="text-lg font-semibold text-neutral-800 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-orange-600" />
                Business Information
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

                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    Dealer Code *
                  </label>
                  <input
                    type="text"
                    name="dealer_code"
                    value={formData.dealer_code}
                    onChange={handleInputChange}
                    placeholder="ABC123"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                      errors.dealer_code ? 'border-red-500' : 'border-neutral-300'
                    }`}
                    disabled={loading}
                    required
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
                  <motion.p
                    className="text-red-500 text-xs flex items-center gap-1"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <AlertCircle className="w-3 h-3" />
                    {errors.website}
                  </motion.p>
                )}
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
                  placeholder="Additional notes about this dealership user..."
                  rows={3}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 resize-none"
                  disabled={loading}
                />
              </div>
            </div> */}
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
                    Updating Dealership User...
                  </motion.div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Update Dealership User
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

export default EditDealershipUsersModal;
