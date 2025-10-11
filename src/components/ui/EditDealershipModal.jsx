import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Loader2,
  CheckCircle,
  AlertCircle,
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

const EditDealershipModal = ({
  isOpen,
  onClose,
  dealershipData,
  onSuccess,
  onRefresh = () => {}, // Add refresh callback
}) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    dealership_name: "",
    phone: "",
    zip: "",
    city: "",
    state: "",
    website: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [zipLoading, setZipLoading] = useState(false);

  // Debounce zipcode for API calls
  const debouncedZipcode = useDebounce(formData.zip, 500);

  // Populate form data when dealership data changes
  useEffect(() => {
    if (dealershipData && isOpen) {
      setFormData({
        email: dealershipData.email || "",
        dealership_name: dealershipData.name || "",
        phone: dealershipData.phone || "",
        zip: dealershipData.zip || "",
        city: dealershipData.city || "",
        state: dealershipData.state || "",
        website: dealershipData.website || "",
        notes: dealershipData.notes || "",
      });
      setErrors({});
      setSuccess(false);
    }
  }, [dealershipData, isOpen]);

  // Fetch city and state when zipcode changes
  useEffect(() => {
    const fetchLocationData = async () => {
      if (
        debouncedZipcode &&
        debouncedZipcode.length === 5 &&
        /^\d{5}$/.test(debouncedZipcode)
      ) {
        setZipLoading(true);
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
        } finally {
          setZipLoading(false);
        }
      } else if (debouncedZipcode && debouncedZipcode.length < 5) {
        // Clear city and state when zipcode is incomplete
        setFormData((prev) => ({
          ...prev,
          city: "",
          state: "",
        }));
        setZipLoading(false);
      } else {
        setZipLoading(false);
      }
    };

    fetchLocationData();
  }, [debouncedZipcode, dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
      const requiredFields = ["phone", "zip"];

      const newErrors = {};
      let hasErrors = false;

      for (const field of requiredFields) {
        if (!formData[field].trim()) {
          newErrors[field] = `${field.replace("_", " ")} is required`;
          hasErrors = true;
        }
      }

      // Validate email format (even though it's disabled, we should still validate)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (formData.email && !emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
        hasErrors = true;
      }

      // Validate phone format
      if (formData.phone && !/^[\d\s\-()]+$/.test(formData.phone)) {
        newErrors.phone = "Please enter a valid phone number";
        hasErrors = true;
      }

      // Validate ZIP code format - more lenient since we auto-fill city/state
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

      if (hasErrors) {
        setErrors(newErrors);
        setLoading(false);
        return;
      }

      // Make API call to update dealership
      console.log("before calling update ninofr api");
      const response = await api.put(
        `/dealerships/${dealershipData.id}/update-info`,
        {
          phone: formData.phone,
          zip: formData.zip,
          city: formData.city,
          state: formData.state,
          website: formData.website,
          notes: formData.notes,
        }
      );

      if (response.data.success) {
        setSuccess(true);
        toast.success(
          response.data.message || "Dealership updated successfully!"
        );

        // Call refresh callback to update the data
        onRefresh();

        // Call success callback if provided
        if (onSuccess) {
          onSuccess();
        }

        // Auto-close modal after 2 seconds
        setTimeout(() => {
          handleClose();
        }, 2000);
      } else {
        throw new Error(response.data.message || "Failed to update dealership");
      }
    } catch (error) {
      console.error("Error updating dealership:", error);

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
            toast.error("You are not authorized to update dealerships.");
            break;
          case 403:
            toast.error("You don't have permission to update dealerships.");
            break;
          case 404:
            toast.error("Dealership not found.");
            break;
          case 409:
            toast.error("A dealership with this information already exists.");
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
              data?.message || "Failed to update dealership. Please try again."
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
        email: "",
        dealership_name: "",
        phone: "",
        zip: "",
        city: "",
        state: "",
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
                {success ? "Dealership Updated!" : "Edit Dealership"}
              </DialogTitle>
              <DialogDescription className="text-neutral-600">
                {success
                  ? "The dealership has been updated successfully."
                  : "Update the dealership information below."}
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
              Dealership Updated Successfully!
            </motion.h3>
            <motion.p
              className="text-sm text-green-500"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {formData.dealership_name} has been updated successfully.
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

              {/* Email Field - Disabled and Prefilled */}
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

              {/* Dealership Name - Disabled and Prefilled */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Dealership Name
                </label>
                <input
                  type="text"
                  name="dealership_name"
                  value={formData.dealership_name}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg bg-neutral-100 text-neutral-600 cursor-not-allowed"
                  disabled
                  title="Dealership name cannot be changed"
                />
                <p className="text-xs text-neutral-500">
                  Dealership name cannot be modified
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
                  placeholder="555-123-4567"
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* ZIP Code */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    ZIP Code *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="zip"
                      value={formData.zip}
                      onChange={handleInputChange}
                      placeholder="10001"
                      className={`w-full px-3 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                        errors.zip ? "border-red-500" : "border-neutral-300"
                      }`}
                      disabled={loading}
                      required
                    />
                    {zipLoading && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <Loader2 className="w-4 h-4 animate-spin text-orange-500" />
                      </div>
                    )}
                  </div>
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
                  <p className="text-xs text-neutral-500">
                    Enter ZIP code to automatically fill city and state
                  </p>
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
                    placeholder="Auto-filled from ZIP code"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg bg-neutral-100 text-neutral-600 cursor-not-allowed"
                    disabled
                    title="City is automatically filled from ZIP code"
                  />
                  <p className="text-xs text-neutral-500">
                    City is automatically filled
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
                    State is automatically filled
                  </p>
                </div>
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
                    Updating Dealership...
                  </motion.div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    Update Dealership
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

export default EditDealershipModal;
