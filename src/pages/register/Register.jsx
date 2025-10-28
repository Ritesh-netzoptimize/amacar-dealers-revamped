import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle, AlertCircle, UserPlus } from 'lucide-react';
import ProgressStepper from '../../components/register/ProgressStepper';
import DealershipInfo from '../../components/register/DealershipInfo';
import ContactInfo from '../../components/register/ContactInfo';
import PaymentSetup from '../../components/register/PaymentSetup';
import InvitationErrorDialog from '../../components/ui/InvitationErrorDialog';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../lib/api';
import { toast } from 'react-hot-toast';

const steps = [
  { id: 1, title: 'Dealership Info', description: 'Complete dealership and contact details' },
  { id: 2, title: 'Personal & Account', description: 'Personal information and account setup' },
  { id: 3, title: 'Payment', description: 'Complete your registration with payment' },
];

const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Invitation state
  const [invitationData, setInvitationData] = useState(null);
  const [invitationLoading, setInvitationLoading] = useState(false);
  const [invitationError, setInvitationError] = useState(null);
  const [isInvitedUser, setIsInvitedUser] = useState(false);
  const [errorContext, setErrorContext] = useState(null); // Store additional context for errors
  
  const [formData, setFormData] = useState({
    // Dealership Info
    dealerCode: '',
    dealershipName: '',
    website: '',
    dealerGroup: '',
    
    // Contact Info
    jobPosition: '',
    firstName: '',
    lastName: '',
    mobileNumber: '',
    businessEmail: '',
    
    // Location
    zipCode: '',
    city: '',
    state: '',
    
    // Account Setup
    password: '',
    confirmPassword: '',
    agreementAccepted: false,
    talkToSales: false,
    
    // Payment Setup
    trialAccepted: false,
    paymentCompleted: false,
    setupIntentId: '',
    customerId: '',
    registrationCompleted: false,
    registrationData: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Extract invitation code from URL
  const getInvitationCode = useCallback(() => {
    console.log('location', location);  
    const path = location.pathname;
    console.log("path", path)
    // path is path /register/axMZSVZ4Fq8Cs788Mznr6sW6p5ey3XUn so do accordingly
    const invitationMatch = path.match(/\/register\/([^/]+)/);
    return invitationMatch ? invitationMatch[1] : null;
  }, [location]);

  // Fetch invitation data
  const fetchInvitationData = useCallback(async (invitationCode) => {
    setInvitationLoading(true);
    setInvitationError(null);
    setErrorContext(null);
    
    try {
      const response = await api.get(`/invitations/${invitationCode}`);
      
      if (response.data.success && response.data.invitation) {
        const invitation = response.data.invitation;
        
        // Check if invitation is still pending
        if (invitation.status !== 'pending') {
          setInvitationError('This invitation has expired or is no longer valid.');
          return;
        }
        
        setInvitationData(invitation);
        setIsInvitedUser(true);
        
        // Prefill form data with invitation data
        setFormData(prev => ({
          ...prev,
          dealerCode: invitation.dealer_code || '',
          dealershipName: invitation.dealership_name || '',
          businessEmail: invitation.email || '',
          firstName: invitation.first_name || '',
          lastName: invitation.last_name || '',
        }));
      } else {
        setInvitationError('Invalid invitation code.');
      }
    } catch (error) {
      console.error('Error fetching invitation:', error);
      
      // Handle specific error messages from API response
      if (error.response?.data?.message) {
        const errorMessage = error.response.data.message.toLowerCase();
        
        if (errorMessage.includes('already been used') || errorMessage.includes('already used')) {
          setInvitationError('already_used');
          setErrorContext({ type: 'already_used', invitationCode });
        } else if (errorMessage.includes('expired') || errorMessage.includes('expire')) {
          setInvitationError('expired');
          setErrorContext({ type: 'expired', invitationCode });
        } else if (errorMessage.includes('invalid') || errorMessage.includes('not valid')) {
          setInvitationError('invalid');
          setErrorContext({ type: 'invalid', invitationCode });
        } else if (errorMessage.includes('not found') || errorMessage.includes('does not exist')) {
          setInvitationError('not_found');
          setErrorContext({ type: 'not_found', invitationCode });
        } else {
          setInvitationError('generic');
          setErrorContext({ type: 'generic', invitationCode });
        }
      } else if (error.response?.status === 404) {
        setInvitationError('not_found');
        setErrorContext({ type: 'not_found', invitationCode });
      } else if (error.response?.status === 400) {
        setInvitationError('invalid');
        setErrorContext({ type: 'invalid', invitationCode });
      } else if (error.response?.status === 403) {
        setInvitationError('already_used'); // 403 might indicate already used
        setErrorContext({ type: 'already_used', invitationCode });
      } else {
        setInvitationError('generic');
        setErrorContext({ type: 'generic', invitationCode });
      }
    } finally {
      setInvitationLoading(false);
    }
  }, []);

  // Check for invitation on component mount
  useEffect(() => {
    const invitationCode = getInvitationCode();
    if (invitationCode) {
      fetchInvitationData(invitationCode);
    }
  }, [fetchInvitationData, getInvitationCode]);

  // Handle successful registration completion
  const handleRegistrationComplete = useCallback(() => {
    if (formData.registrationCompleted) {
      // Redirect to success page or dashboard
      navigate('/profile');
    }
  }, [formData.registrationCompleted, navigate]);

  const updateFormData = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  }, [errors]);

  // Dialog handlers
  const handleCloseErrorDialog = () => {
    setInvitationError(null);
    setErrorContext(null);
  };

  const handleRetryInvitation = () => {
    const invitationCode = getInvitationCode();
    if (invitationCode) {
      fetchInvitationData(invitationCode);
    }
  };

  const handleNavigateToRegister = () => {
    navigate('/register');
  };

  // Check for registration completion and redirect
  React.useEffect(() => {
    handleRegistrationComplete();
  }, [handleRegistrationComplete]);

  const isStepValid = (step) => {
    switch (step) {
      case 1:
        // Dealership Info validation
        if (!formData.dealerCode) return false;
        if (!formData.dealershipName) return false;
        if (!formData.website) return false;
        if (!formData.dealerGroup) return false;
        // Contact Info validation (moved from step 2)
        if (!formData.jobPosition) return false;
        if (!formData.businessEmail) return false;
        if (!/\S+@\S+\.\S+/.test(formData.businessEmail)) return false;
        // Location validation (moved from step 2)
        if (!formData.zipCode) return false;
        if (!formData.city) return false;
        if (!formData.state) return false;
        return true;
      case 2:
        // Personal Info validation
        if (!formData.firstName) return false;
        if (!formData.lastName) return false;
        if (!formData.mobileNumber) return false;
        // Account Setup validation (moved from step 3)
        if (!formData.password) return false;
        if (formData.password.length < 4) return false;
        if (!formData.confirmPassword) return false;
        if (formData.password !== formData.confirmPassword) return false;
        if (!formData.agreementAccepted) return false;
        // Note: talkToSales is optional, so we don't check it
        return true;
      case 3:
        // Payment validation only - now handled by Stripe PaymentElement
        if (!formData.trialAccepted) return false;
        return true;
      default:
        return false;
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 1:
        // Dealership Info validation
        if (!formData.dealerCode) newErrors.dealerCode = 'Dealer code is required';
        if (!formData.dealershipName) newErrors.dealershipName = 'Dealership name is required';
        if (!formData.website) newErrors.website = 'Website is required';
        if (!formData.dealerGroup) newErrors.dealerGroup = 'Dealer group is required';
        // Contact Info validation (moved from step 2)
        if (!formData.jobPosition) newErrors.jobPosition = 'Job position is required';
        if (!formData.businessEmail) newErrors.businessEmail = 'Business email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.businessEmail)) {
          newErrors.businessEmail = 'Please enter a valid email address';
        }
        // Location validation (moved from step 2)
        if (!formData.zipCode) newErrors.zipCode = 'Zip code is required';
        if (!formData.city) newErrors.city = 'City is required';
        if (!formData.state) newErrors.state = 'State is required';
        break;
      case 2:
        // Personal Info validation
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.mobileNumber) newErrors.mobileNumber = 'Mobile number is required';
        // Account Setup validation (moved from step 3)
        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 4) {
          newErrors.password = 'Password must be at least 4 characters';
        }
        if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
        else if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        }
        if (!formData.agreementAccepted) newErrors.agreementAccepted = 'You must accept the terms and conditions';
        break;
      case 3:
        // Payment validation only - now handled by Stripe PaymentElement
        if (!formData.trialAccepted) newErrors.trialAccepted = 'You must accept the trial terms';
        break;
      default:
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStepAndGetErrors = (step) => {
    const errorMessages = [];
    
    switch (step) {
      case 1:
        // Dealership Info validation
        if (!formData.dealerCode) errorMessages.push('Dealer Code');
        if (!formData.dealershipName) errorMessages.push('Dealership Name');
        if (!formData.website) errorMessages.push('Website');
        if (!formData.dealerGroup) errorMessages.push('Dealer Group');
        // Contact Info validation (moved from step 2)
        if (!formData.jobPosition) errorMessages.push('Job Position');
        if (!formData.businessEmail || !/\S+@\S+\.\S+/.test(formData.businessEmail)) errorMessages.push('Business Email');
        // Location validation (moved from step 2)
        if (!formData.zipCode) errorMessages.push('Zip Code');
        if (!formData.city) errorMessages.push('City');
        if (!formData.state) errorMessages.push('State');
        break;
      case 2:
        // Personal Info validation
        if (!formData.firstName) errorMessages.push('First Name');
        if (!formData.lastName) errorMessages.push('Last Name');
        if (!formData.mobileNumber) errorMessages.push('Mobile Number');
        // Account Setup validation (moved from step 3)
        if (!formData.password || formData.password.length < 4) errorMessages.push('Password (min 4 characters)');
        if (!formData.confirmPassword || formData.password !== formData.confirmPassword) errorMessages.push('Confirm Password');
        if (!formData.agreementAccepted) errorMessages.push('Terms and Conditions');
        break;
      case 3:
        // Payment validation only - now handled by Stripe PaymentElement
        if (!formData.trialAccepted) errorMessages.push('Trial Terms');
        break;
      default:
        break;
    }
    
    return errorMessages;
  };

  const handleNext = () => {
    if(currentStep === 2 && formData.talkToSales) {
      window.location.href = 'https://calendly.com/sz253500/'
      setCurrentStep(prev => Math.min(prev - 1, steps.length-1));
      return;
    }
    
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    } else {
      // Show toast with all validation errors
      const validationErrors = validateStepAndGetErrors(currentStep);
      if (validationErrors.length > 0) {
        toast.error(`Please complete all required fields: ${validationErrors.join(', ')}`, {
          duration: 5000,
          position: 'top-right',
        });
      }
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (validateStep(currentStep)) {
      setIsSubmitting(true);
      try {
        // Registration is now handled by PaymentSetup component
        // This function is kept for backward compatibility but shouldn't be called
        console.log('Registration data:', formData);
        console.log('Registration is handled by PaymentSetup component');
      } catch (error) {
        console.error('Registration error:', error);
        alert('Registration failed. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <DealershipInfo 
            formData={formData} 
            updateFormData={updateFormData} 
            errors={errors}
            isInvitedUser={isInvitedUser}
            invitationData={invitationData}
          />
        );
      case 2:
        return (
          <ContactInfo 
            formData={formData} 
            updateFormData={updateFormData} 
            errors={errors}
            isInvitedUser={isInvitedUser}
            invitationData={invitationData}
          />
        );
      case 3:
        return (
          <PaymentSetup 
            formData={formData} 
            updateFormData={updateFormData} 
            errors={errors}
            isInvitedUser={isInvitedUser}
            invitationData={invitationData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50">
      {/* Custom breakpoint for very small screens */}
      <style jsx>{`
        @media (max-width: 375px) {
          .xs\\:block { display: block !important; }
          .xs\\:hidden { display: none !important; }
        }
        @media (min-width: 376px) {
          .xs\\:block { display: block !important; }
          .xs\\:hidden { display: none !important; }
        }
      `}</style>
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm border-b border-neutral-200 sticky top-0 z-40">
        <div className="px-2 xs:px-3 sm:px-4 py-2 xs:py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center cursor-pointer"
              onClick={() => navigate('/')}
            >
              <img 
                src="https://dealer.amacar.ai/wp-content/uploads/2024/10/logo-4-2048x680.png"
                alt="Amacar Logo"
                className="h-6 sm:h-8 w-auto"
              />
            </motion.div>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                <CheckCircle className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="hidden xs:block">
                <h1 className="text-sm sm:text-lg font-bold text-neutral-900">Dealer Registration</h1>
                <p className="text-xs text-neutral-600">Step {currentStep} of {steps.length}</p>
              </div>
              <div className="xs:hidden">
                <h1 className="text-sm font-bold text-neutral-900">Step {currentStep}/{steps.length}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Invitation Status Banner */}
      {invitationLoading && (
        <div className="bg-blue-50 border-b border-blue-200">
          <div className="max-w-7xl mx-auto px-2 xs:px-3 sm:px-4 py-2 xs:py-2 sm:py-3">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-blue-700 text-xs sm:text-sm font-medium">Loading invitation details...</span>
            </div>
          </div>
        </div>
      )}

      {isInvitedUser && invitationData && (
        <div className="bg-green-50 border-b border-green-200">
          <div className="max-w-7xl mx-auto px-2 xs:px-3 sm:px-4 py-2 xs:py-2 sm:py-3">
            <div className="flex items-center justify-center space-x-2">
              <UserPlus className="w-4 h-4 text-green-500" />
              <span className="text-green-700 text-xs sm:text-sm font-medium">
                You were invited by <strong>Amacar sales manager</strong>
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="flex min-h-screen flex-col lg:flex-row">
        {/* Left Column - Image */}
        <div className="hidden lg:flex lg:w-2/5 relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full h-full"
          >
            {/* Background Image */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
              <div className="absolute inset-0 bg-black/20"></div>
              
              {/* Modern Automotive Pattern Overlay */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full"></div>
                <div className="absolute top-32 right-20 w-24 h-24 border-2 border-white rounded-full"></div>
                <div className="absolute bottom-20 left-20 w-40 h-40 border-2 border-white rounded-full"></div>
                <div className="absolute bottom-32 right-10 w-28 h-28 border-2 border-white rounded-full"></div>
              </div>

              {/* Content Overlay */}
              <div className="relative z-10 h-full flex flex-col justify-center items-center text-white p-8 xl:p-12">
                {/* Logo at the top */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="absolute top-6 xl:top-8 left-6 xl:left-8"
                >
                  
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-center max-w-[150vh]"
                >
                  <div className="w-16 xl:w-20 h-16 xl:h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 xl:mb-6 backdrop-blur-sm">
                    <CheckCircle className="w-8 xl:w-10 h-8 xl:h-10" />
                  </div>
                  
                  <h2 className="text-3xl xl:text-4xl font-bold mb-3 xl:mb-4">Join Amacar</h2>
                  <p className="text-lg xl:text-xl text-primary-100 mb-6 xl:mb-8 leading-relaxed">
                    Connect with the future of automotive auctions
                  </p>

                  {/* Features in 2x2 Grid */}
                  <div className="grid grid-cols-2 gap-3 xl:gap-4 mb-6 xl:mb-8">
                    <div className="flex items-center space-x-2 xl:space-x-3">
                      <div className="w-5 xl:w-6 h-5 xl:h-6 rounded-full bg-white/20 flex items-center justify-center">
                        <CheckCircle className="w-3 xl:w-4 h-3 xl:h-4" />
                      </div>
                      <span className="text-primary-100 text-xs xl:text-sm">Premium vehicle auctions</span>
                    </div>
                    <div className="flex items-center space-x-2 xl:space-x-3">
                      <div className="w-5 xl:w-6 h-5 xl:h-6 rounded-full bg-white/20 flex items-center justify-center">
                        <CheckCircle className="w-3 xl:w-4 h-3 xl:h-4" />
                      </div>
                      <span className="text-primary-100 text-xs xl:text-sm">Real-time bidding platform</span>
                    </div>
                    <div className="flex items-center space-x-2 xl:space-x-3">
                      <div className="w-5 xl:w-6 h-5 xl:h-6 rounded-full bg-white/20 flex items-center justify-center">
                        <CheckCircle className="w-3 xl:w-4 h-3 xl:h-4" />
                      </div>
                      <span className="text-primary-100 text-xs xl:text-sm">Advanced analytics & insights</span>
                    </div>
                    <div className="flex items-center space-x-2 xl:space-x-3">
                      <div className="w-5 xl:w-6 h-5 xl:h-6 rounded-full bg-white/20 flex items-center justify-center">
                        <CheckCircle className="w-3 xl:w-4 h-3 xl:h-4" />
                      </div>
                      <span className="text-primary-100 text-xs xl:text-sm">24/7 expert support</span>
                    </div>
                  </div>

                  {/* Progress Indicator */}
                  <div className="bg-white/10 rounded-2xl p-4 xl:p-6 backdrop-blur-sm">
                    <h3 className="font-semibold mb-3 xl:mb-4 text-center text-sm xl:text-base">Registration Progress</h3>
                    <div className="space-y-2 xl:space-y-3">
                      {steps.map((step, index) => (
                        <motion.div
                          key={step.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                          className="flex items-center space-x-2 xl:space-x-3"
                        >
                          <div className={`w-6 xl:w-8 h-6 xl:h-8 rounded-full flex items-center justify-center text-xs xl:text-sm font-semibold transition-all duration-300 ${
                            currentStep > step.id 
                              ? 'bg-white text-primary-600 scale-110' 
                              : currentStep === step.id 
                              ? 'bg-primary-300 text-white scale-105' 
                              : 'bg-white/20 text-white/60'
                          }`}>
                            {currentStep > step.id ? <CheckCircle className="w-4 xl:w-5 h-4 xl:h-5" /> : step.id}
                          </div>
                          <div className="flex-1">
                            <div className={`text-xs xl:text-sm font-medium transition-colors ${
                              currentStep >= step.id ? 'text-white' : 'text-white/60'
                            }`}>
                              {step.title}
                            </div>
                            <div className={`text-xs transition-colors ${
                              currentStep >= step.id ? 'text-primary-100' : 'text-white/40'
                            }`}>
                              {step.description}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Form */}
        <div className="w-full lg:w-3/5 flex flex-col bg-[#fffcf8] min-h-screen lg:min-h-0">
          {/* Desktop Logo */}
          <div className="hidden lg:block absolute top-6 xl:top-8 right-6 xl:right-8 z-10">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer"
              onClick={() => navigate('/')}
            >
              <img 
                src="https://dealer.amacar.ai/wp-content/uploads/2024/10/logo-4-2048x680.png"
                alt="Amacar Logo"
                className="h-6 xl:h-8 w-auto"
              />
            </motion.div>
          </div>

          <div className="flex-1 flex items-center justify-center p-2 xs:p-3 sm:p-4 lg:p-6 xl:p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-4xl mx-auto"
            >
              {/* Form Card */}
              <div className="bg-[#fffcf8] overflow-hidden min-h-[500px] sm:min-h-[600px] lg:min-h-[800px] max-h-[820px] sm:max-h-[800px] lg:max-h-[900px] flex flex-col">
                {/* Mobile Progress Stepper */}
                <div className="lg:hidden p-3 sm:p-4 border-b border-neutral-200 flex-shrink-0">
                  <ProgressStepper 
                    steps={steps} 
                    currentStep={currentStep} 
                  />
                </div>

                {/* Form Content */}
                <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto overflow-x-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ x: 300, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -300, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="w-full"
                    >
                      {renderStep()}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Navigation Buttons - Below Form */}
                <div className="flex-shrink-0 p-4 sm:p-6 lg:p-8">
                  <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
                    <button
                      onClick={handlePrevious}
                      disabled={currentStep === 1}
                      className="flex items-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 text-neutral-600 hover:text-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:bg-white rounded-xl border border-neutral-200 w-full sm:w-auto justify-center sm:justify-start"
                    >
                      <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="text-sm sm:text-base">Previous</span>
                    </button>

                    <div className="flex space-x-2 sm:space-x-3 w-full sm:w-auto">
                      {currentStep < steps.length ? (
                        <motion.button
                          onClick={handleNext}
                          disabled={!isStepValid(currentStep)}
                          whileHover={isStepValid(currentStep) ? { 
                            scale: 1.05,
                            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)"
                          } : {}}
                          whileTap={isStepValid(currentStep) ? { 
                            scale: 0.98 
                          } : {}}
                          className={`flex items-center space-x-2 px-6 sm:px-8 py-2.5 sm:py-3 font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 w-full sm:w-auto justify-center ${
                            isStepValid(currentStep)
                              ? 'bg-primary-500 hover:bg-primary-600 text-white focus:ring-primary-200'
                              : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                          }`}
                        >
                          <motion.span
                            key={`${currentStep}-${formData.talkToSales}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ 
                              duration: 0.3,
                              ease: "easeInOut"
                            }}
                            className="flex items-center space-x-2"
                          >
                            <span className="text-sm sm:text-base">
                              {currentStep === 2 && formData.talkToSales 
                                ? 'Submit to Sales Team' 
                                : currentStep === 2 && !formData.talkToSales 
                                ? 'Continue to Payment' 
                                : 'Next'
                              }
                            </span>
                          </motion.span>
                          <motion.div
                            animate={{ 
                              x: isStepValid(currentStep) ? [0, 3, 0] : 0,
                              scale: isStepValid(currentStep) ? [1, 1.1, 1] : 1
                            }}
                            transition={{ 
                              duration: 0.6,
                              ease: "easeInOut",
                              repeat: isStepValid(currentStep) ? Infinity : 0,
                              repeatDelay: 2
                            }}
                          >
                            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                          </motion.div>
                        </motion.button>
                      ) : (
                        <div className="text-center text-neutral-500 text-xs sm:text-sm w-full">
                          Registration will be completed after payment setup
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Invitation Error Dialog */}
      <InvitationErrorDialog
        isOpen={!!invitationError}
        onClose={handleCloseErrorDialog}
        errorType={invitationError}
        errorContext={errorContext}
        onRetry={handleRetryInvitation}
        onNavigateToRegister={handleNavigateToRegister}
      />

    </div>
  );
};

export default Register;
