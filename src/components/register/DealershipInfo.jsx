import { motion } from 'framer-motion';
import { Building2, Globe, Users, Hash, Briefcase, Mail, MapPin, Building, Map, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCityStateByZip, clearLocation } from '@/redux/slices/userSlice';
import { toast } from 'react-hot-toast';
import useDebounce from '@/hooks/useDebounce';
import ReusableTooltip from '@/components/common/Tooltip/ReusableTooltip';

const DealershipInfo = ({ formData, updateFormData, errors, isInvitedUser, invitationData, emailValidation, shouldResetEmailValidation, setShouldResetEmailValidation }) => {
  const dispatch = useDispatch();
  const { locationStatus, locationError, location } = useSelector((state) => state.user);
  const timeoutRef = useRef(null);
  const previousErrorsRef = useRef({});
  const [inlineErrors, setInlineErrors] = useState({});

  // Debounced ZIP code lookup
  const debouncedZipLookup = useCallback((zip) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (zip && zip.length === 5 && /^\d{5}$/.test(zip)) {
        console.log("Dispatching ZIP lookup for:", zip);
        dispatch(fetchCityStateByZip(zip));
      } else if (zip.length === 0 || zip.length < 5) {
        // Clear location when ZIP is empty or less than 5 digits
        dispatch(clearLocation());
        updateFormData('city', '');
        updateFormData('state', '');
      }
    }, 500);
  }, [dispatch, updateFormData]);

  // Handle ZIP code lookup results
  useEffect(() => {
    if (locationStatus === 'succeeded' && location) {
      updateFormData('city', location.city || '');
      updateFormData('state', location.state || '');
    } else if (locationStatus === 'failed' || (locationStatus === 'succeeded' && !location)) {
      // Clear city and state if lookup failed or returned no results
      updateFormData('city', '');
      updateFormData('state', '');
    }
  }, [locationStatus, location, updateFormData]);


  // Debounce errors with 800ms delay
  const debouncedErrors = useDebounce(errors, 800);

  // Show toast notifications for new errors
  useEffect(() => {
    if (!debouncedErrors) return;

    const currentErrors = debouncedErrors;
    const previousErrors = previousErrorsRef.current;

    // Check each field for new errors
    Object.keys(currentErrors).forEach((fieldName) => {
      const currentError = currentErrors[fieldName];
      const previousError = previousErrors[fieldName];

      // Errors are now only shown inline, no toast notifications
    });

    // Update previous errors reference
    previousErrorsRef.current = currentErrors;
  }, [debouncedErrors]);

  // Handle location errors and clear city/state if zip code not found
  useEffect(() => {
    if (locationError) {
      // Check if error is about zip code not found
      const errorLower = locationError.toLowerCase();
      if (errorLower.includes('not found') || errorLower.includes('zip code not found') || errorLower.includes('invalid zip')) {
        // Clear city and state when zip code not found
        updateFormData('city', '');
        updateFormData('state', '');
      }
      // Location error is shown inline below the city field, no toast notification
    }
  }, [locationError, errors.city, updateFormData]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.15,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };


  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 "
    >
      <div className="text-left mb-6">
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            variants={itemVariants}
            className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center shadow-soft"
          >
            <Building2 className="w-6 h-6 text-primary-600" />
          </motion.div>
          <div>
            <motion.h2 variants={itemVariants} className="text-xl font-bold text-neutral-900">
              Dealership Information
            </motion.h2>
            <motion.p variants={itemVariants} className="text-neutral-600 text-sm">
              Tell us about your dealership to get started
            </motion.p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Basic Dealership Information */}
        <div>
          <h3 className="text-lg font-semibold text-neutral-800 mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Dealer Code */}
            <motion.div variants={itemVariants} className="space-y-2">
              <label className="block text-sm text-neutral-700 font-semibold">
                Dealer Code *
                {isInvitedUser && (
                  <span className="text-xs text-green-600 ml-2">(Pre-filled from invitation)</span>
                )}
              </label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  maxLength={10}
                  value={formData.dealerCode}
                  onChange={(e) => {
                    // Convert to uppercase and remove spaces/special characters (keep only A-Z and 0-9)
                    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
                    updateFormData('dealerCode', value);
                    // Clear inline error when user starts typing
                    if (inlineErrors.dealerCode) {
                      setInlineErrors(prev => ({ ...prev, dealerCode: '' }));
                    }
                  }}
                  onBlur={(e) => {
                    const value = e.target.value;
                    if (value && !/^[A-Z0-9]+$/.test(value)) {
                      const errorMsg = 'Dealer code must contain only capital letters and digits';
                      setInlineErrors(prev => ({ ...prev, dealerCode: errorMsg }));
                    } else if (value && value.includes(' ')) {
                      const errorMsg = 'Dealer code must be a single word (no spaces)';
                      setInlineErrors(prev => ({ ...prev, dealerCode: errorMsg }));
                    } else {
                      setInlineErrors(prev => ({ ...prev, dealerCode: '' }));
                    }
                  }}
                  disabled={isInvitedUser}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border ${(errors.dealerCode || inlineErrors.dealerCode) ? 'border-error focus:ring-error/20' : 'border-neutral-200 focus:ring-primary-200'
                    } ${isInvitedUser
                      ? 'bg-neutral-50 text-neutral-600 cursor-not-allowed'
                      : 'bg-white text-neutral-900'
                    } placeholder-neutral-400 focus:outline-none focus:ring-4 focus:border-primary-500 transition-all duration-300 hover:border-neutral-300`}
                  placeholder="ABC123"
                />
              </div>
              {(errors.dealerCode || inlineErrors.dealerCode) && (
                <p className="text-sm text-error">{errors.dealerCode || inlineErrors.dealerCode}</p>
              )}
            </motion.div>

            {/* Dealership Name */}
            <motion.div variants={itemVariants} className="space-y-2">
              <label className="block text-sm font-semibold text-neutral-700">
                Dealership Name *
                {isInvitedUser && (
                  <span className="text-xs text-green-600 ml-2">(Pre-filled from invitation)</span>
                )}
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  value={formData.dealershipName}
                  onChange={(e) => updateFormData('dealershipName', e.target.value)}
                  disabled={isInvitedUser}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border ${errors.dealershipName ? 'border-error focus:ring-error/20' : 'border-neutral-200 focus:ring-primary-200'
                    } ${isInvitedUser
                      ? 'bg-neutral-50 text-neutral-600 cursor-not-allowed'
                      : 'bg-white text-neutral-900'
                    } placeholder-neutral-400 focus:outline-none focus:ring-4 focus:border-primary-500 transition-all duration-300 hover:border-neutral-300`}
                  placeholder="Enter dealership name"
                />
              </div>
              {errors.dealershipName && (
                <p className="text-sm text-error">{errors.dealershipName}</p>
              )}
            </motion.div>

            {/* Website */}
            <motion.div variants={itemVariants} className="space-y-2">
              <label className="block text-sm font-semibold text-neutral-700">
                Website <span className="text-neutral-400 font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => {
                    const value = e.target.value;
                    updateFormData('website', value);
                    // Clear inline error when input becomes valid
                    const domainPattern = /^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
                    const urlPattern = /^https?:\/\/(([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}|localhost)/;
                    if (!value || value.trim() === '' || domainPattern.test(value) || urlPattern.test(value)) {
                      setInlineErrors(prev => ({ ...prev, website: '' }));
                    }
                  }}
                  onBlur={(e) => {
                    const value = e.target.value;
                    // Improved validation: accepts domains like google.com, www.google.com, or https://www.google.com
                    const domainPattern = /^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
                    const urlPattern = /^https?:\/\/(([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}|localhost)/;

                    if (value && !domainPattern.test(value) && !urlPattern.test(value)) {
                      const errorMsg = 'Please enter a valid website (e.g., google.com or https://google.com)';
                      setInlineErrors(prev => ({ ...prev, website: errorMsg }));
                    } else {
                      setInlineErrors(prev => ({ ...prev, website: '' }));
                    }
                  }}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border ${(errors.website || inlineErrors.website) ? 'border-error focus:ring-error/20' : 'border-neutral-200 focus:ring-primary-200'
                    } bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-4 focus:border-primary-500 transition-all duration-300 hover:border-neutral-300`}
                  placeholder="https://yourdealership.com"
                />
              </div>
              {(errors.website || inlineErrors.website) && (
                <p className="text-sm text-error">{errors.website || inlineErrors.website}</p>
              )}
            </motion.div>

            {/* Dealer Group */}
            <motion.div variants={itemVariants} className="space-y-2">
              <label className="block text-sm font-semibold text-neutral-700">
                Dealer Group *
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <select
                  value={formData.dealerGroup}
                  onChange={(e) => updateFormData('dealerGroup', e.target.value)}
                  className={`w-full pl-10 pr-10 py-3 rounded-xl border ${errors.dealerGroup ? 'border-error focus:ring-error/20' : 'border-neutral-200 focus:ring-primary-200'
                    } bg-white text-neutral-900 focus:outline-none focus:ring-4 focus:border-primary-500 transition-all duration-300 hover:border-neutral-300 appearance-none`}
                >
                  <option value="">Select dealer group</option>
                  <option value="independent">Independent Dealer</option>
                  <option value="franchise">Franchise Dealer</option>
                  <option value="group">Dealer Group</option>
                  <option value="other">Other</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {errors.dealerGroup && (
                <p className="text-sm text-error">{errors.dealerGroup}</p>
              )}
            </motion.div>
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-lg font-semibold text-neutral-800 mb-4">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Job Position */}
            <motion.div variants={itemVariants} className="space-y-2">
              <label className="block text-sm font-semibold text-neutral-700">
                Job Position *
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <select
                  value={formData.jobPosition}
                  onChange={(e) => updateFormData('jobPosition', e.target.value)}
                  className={`w-full pl-10 pr-10 py-3 rounded-xl border ${errors.jobPosition ? 'border-error' : 'border-neutral-200'
                    } bg-white text-neutral-900 focus:outline-none focus:ring-4 focus:ring-primary-200 focus:border-primary-500 transition-all duration-200 appearance-none`}
                >
                  <option value="">Select your position</option>
                  <option value="owner">Owner</option>
                  <option value="general-manager">General Manager</option>
                  <option value="sales-manager">Sales Manager</option>
                  <option value="buyer">Buyer</option>
                  <option value="inventory-manager">Inventory Manager</option>
                  <option value="other">Other</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {errors.jobPosition && (
                <p className="text-sm text-error">{errors.jobPosition}</p>
              )}
            </motion.div>

            {/* Business Email */}
            <motion.div variants={itemVariants} className="space-y-2">
              <label className="block text-sm font-semibold text-neutral-700">
                Business Email *
                {emailValidation.isValidating && (
                  <span className="ml-2 text-xs text-neutral-500">
                    (Validating...)
                  </span>
                )}
                {isInvitedUser && (
                  <span className="text-xs text-green-600 ml-2">(Pre-filled from invitation)</span>
                )}
              </label>
              <ReusableTooltip
                content={
                  errors.businessEmail ||
                  inlineErrors.businessEmail ||
                  (emailValidation.isDisposable === true &&
                    !emailValidation.isValidating &&
                    "Disposable email addresses are not allowed") ||
                  (emailValidation.isRegistered === true &&
                    !emailValidation.isValidating &&
                    "This email is already registered. Please use a different email.") ||
                  (emailValidation.error &&
                    !emailValidation.isValidating &&
                    "Unable to verify email. Please try again.")
                }
                variant="error"
                side="top"
              >
                <div className="relative">
                  <div
                    className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 ${
                      // Only show green if explicitly valid and not validating
                      emailValidation.isValid === true &&
                        !emailValidation.isValidating &&
                        formData.businessEmail
                        ? "text-green-500"
                        : // Only show red if explicitly invalid and not validating
                        (emailValidation.isDisposable === true ||
                          emailValidation.isRegistered === true) &&
                          !emailValidation.isValidating &&
                          formData.businessEmail
                          ? "text-red-500"
                          : // Default neutral state
                          "text-neutral-400"
                      }`}
                  >
                    <Mail className="h-5 w-5" />
                  </div>
                  <input
                    type="email"
                    value={formData.businessEmail}
                    onChange={(e) => {
                      const value = e.target.value;
                      updateFormData('businessEmail', value);
                      // Clear inline error when user types
                      if (inlineErrors.businessEmail) {
                        setInlineErrors(prev => ({ ...prev, businessEmail: '' }));
                      }
                      // Reset email validation when email changes
                      if (!value || value.trim() === "") {
                        setShouldResetEmailValidation(true);
                      }
                    }}
                    onBlur={(e) => {
                      const value = e.target.value;
                      if (value && !/\S+@\S+\.\S+/.test(value)) {
                        const errorMsg = 'Please enter a valid email address (e.g., your.email@dealership.com)';
                        setInlineErrors(prev => ({ ...prev, businessEmail: errorMsg }));
                      } else {
                        setInlineErrors(prev => ({ ...prev, businessEmail: '' }));
                      }
                    }}
                    disabled={isInvitedUser}
                    className={`w-full pl-10 pr-10 py-3 rounded-xl border ${
                      // Only show green if explicitly valid and not validating
                      emailValidation.isValid === true &&
                        !emailValidation.isValidating &&
                        formData.businessEmail
                        ? "border-green-300 bg-green-50 focus:shadow-[0_0_0_4px_rgba(34,197,94,0.08)]"
                        : // Only show red if explicitly invalid and not validating
                        (emailValidation.isDisposable === true ||
                          emailValidation.isRegistered === true) &&
                          !emailValidation.isValidating &&
                          formData.businessEmail
                          ? "border-red-300 bg-red-50 focus:shadow-[0_0_0_4px_rgba(239,68,68,0.08)]"
                          : // Show red for form validation errors
                          (errors.businessEmail || inlineErrors.businessEmail) && !emailValidation.isValidating
                            ? "border-red-300 bg-red-50 focus:shadow-[0_0_0_4px_rgba(239,68,68,0.08)]"
                            : // Default neutral state
                            "border-neutral-200 focus:shadow-[0_0_0_4px_rgba(15,23,42,0.08)]"
                      } ${isInvitedUser
                        ? 'bg-neutral-50 text-neutral-600 cursor-not-allowed'
                        : 'bg-white text-neutral-900'
                      } placeholder-neutral-400 focus:outline-none focus:ring-4 focus:ring-primary-200 focus:border-primary-500 transition-all duration-200`}
                    placeholder="your.email@dealership.com"
                  />
                  {/* Validation status indicator */}
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {emailValidation.isValidating && (
                      <Loader2 className="h-4 w-4 animate-spin text-neutral-400" />
                    )}
                    {!emailValidation.isValidating &&
                      emailValidation.isValid === true && (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      )}
                    {!emailValidation.isValidating &&
                      (emailValidation.isDisposable === true ||
                        emailValidation.isRegistered === true) && (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                  </div>
                </div>
              </ReusableTooltip>
              {(errors.businessEmail || inlineErrors.businessEmail ||
                (emailValidation.isDisposable === true && !emailValidation.isValidating) ||
                (emailValidation.isRegistered === true && !emailValidation.isValidating) ||
                (emailValidation.error && !emailValidation.isValidating)) && (
                  <p className="text-sm text-error">
                    {errors.businessEmail ||
                      inlineErrors.businessEmail ||
                      (emailValidation.isDisposable === true && !emailValidation.isValidating && "Disposable email addresses are not allowed") ||
                      (emailValidation.isRegistered === true && !emailValidation.isValidating && "This email is already registered. Please use a different email.") ||
                      (emailValidation.error && !emailValidation.isValidating && "Unable to verify email. Please try again.")}
                  </p>
                )}
            </motion.div>
          </div>
        </div>

        {/* Location Information */}
        <div>
          <h3 className="text-lg font-semibold text-neutral-800 mb-4">Business Location</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Zip Code */}
            <motion.div variants={itemVariants} className="space-y-2">
              <label className="block text-sm font-semibold text-neutral-700">
                Zip Code *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  value={formData.zipCode}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 5);
                    updateFormData('zipCode', value);
                    debouncedZipLookup(value);
                    // Clear inline error when zip code becomes valid (exactly 5 digits)
                    if (value.length === 5 && /^\d{5}$/.test(value)) {
                      setInlineErrors(prev => ({ ...prev, zipCode: '' }));
                    }
                    // Clear city and state if zip code is less than 5 digits
                    if (value.length < 5) {
                      updateFormData('city', '');
                      updateFormData('state', '');
                    }
                  }}
                  onBlur={(e) => {
                    const value = e.target.value;
                    if (value && value.length < 5) {
                      const errorMsg = 'Please enter a valid 5-digit ZIP code';
                      setInlineErrors(prev => ({ ...prev, zipCode: errorMsg }));
                    } else {
                      setInlineErrors(prev => ({ ...prev, zipCode: '' }));
                    }
                  }}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border ${(errors.zipCode || inlineErrors.zipCode) ? 'border-error' : 'border-neutral-200'
                    } bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-4 focus:ring-primary-200 focus:border-primary-500 transition-all duration-200`}
                  placeholder="12345"
                  maxLength="5"
                  inputMode="numeric"
                  pattern="[0-9]{5}"
                />
              </div>
              {(errors.zipCode || inlineErrors.zipCode) && (
                <p className="text-sm text-error">{errors.zipCode || inlineErrors.zipCode}</p>
              )}
            </motion.div>

            {/* City */}
            <motion.div variants={itemVariants} className="space-y-2">
              <label className="block text-sm font-semibold text-neutral-700">
                City *
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  value={formData.city}
                  disabled={true}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border ${errors.city ? 'border-error' : 'border-neutral-200'
                    } bg-neutral-50 text-neutral-600 placeholder-neutral-400 focus:outline-none focus:ring-4 focus:ring-primary-200 focus:border-primary-500 transition-all duration-200 cursor-not-allowed`}
                  placeholder="Auto-filled from ZIP"
                />
                {locationStatus === 'loading' && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
              {errors.city && (
                <p className="text-sm text-error">{errors.city}</p>
              )}
              {locationError && (
                <p className="text-sm text-error">{locationError}</p>
              )}
            </motion.div>

            {/* State */}
            <motion.div variants={itemVariants} className="space-y-2">
              <label className="block text-sm font-semibold text-neutral-700">
                State *
              </label>
              <div className="relative">
                <Map className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  value={formData.state}
                  disabled={true}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border ${errors.state ? 'border-error' : 'border-neutral-200'
                    } bg-neutral-50 text-neutral-600 placeholder-neutral-400 focus:outline-none focus:ring-4 focus:ring-primary-200 focus:border-primary-500 transition-all duration-200 cursor-not-allowed`}
                  placeholder="Auto-filled from ZIP"
                />
                {locationStatus === 'loading' && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
              {errors.state && (
                <p className="text-sm text-error">{errors.state}</p>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

DealershipInfo.defaultProps = {
  emailValidation: {
    isValidating: false,
    isDisposable: null,
    isEmailAvailable: null,
    isRegistered: null,
    error: null,
    isValid: null
  },
  shouldResetEmailValidation: false,
  setShouldResetEmailValidation: () => { }
};

export default DealershipInfo;
