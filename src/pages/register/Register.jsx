import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import ProgressStepper from '../../components/register/ProgressStepper';
import DealershipInfo from '../../components/register/DealershipInfo';
import ContactInfo from '../../components/register/ContactInfo';
import PaymentSetup from '../../components/register/PaymentSetup';

const steps = [
  { id: 1, title: 'Dealership Info', description: 'Complete dealership and contact details' },
  { id: 2, title: 'Personal & Account', description: 'Personal information and account setup' },
  { id: 3, title: 'Payment', description: 'Complete your registration with payment' },
];

const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
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
    
    // Payment Setup
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    trialAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
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
        else if (formData.password.length < 8) {
          newErrors.password = 'Password must be at least 8 characters';
        }
        if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
        else if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        }
        if (!formData.agreementAccepted) newErrors.agreementAccepted = 'You must accept the terms and conditions';
        break;
      case 3:
        // Payment validation only
        if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
        if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
        if (!formData.cvv) newErrors.cvv = 'CVV is required';
        if (!formData.cardholderName) newErrors.cardholderName = 'Cardholder name is required';
        if (!formData.trialAccepted) newErrors.trialAccepted = 'You must accept the trial terms';
        break;
      default:
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (validateStep(currentStep)) {
      setIsSubmitting(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('Registration data:', formData);
        // Handle successful registration
        alert('Registration successful!');
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
        return <DealershipInfo formData={formData} updateFormData={updateFormData} errors={errors} />;
      case 2:
        return <ContactInfo formData={formData} updateFormData={updateFormData} errors={errors} />;
      case 3:
        return <PaymentSetup formData={formData} updateFormData={updateFormData} errors={errors} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm border-b border-neutral-200 sticky top-0 z-40">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-neutral-900">Dealer Registration</h1>
                <p className="text-xs text-neutral-600">Step {currentStep} of {steps.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex min-h-screen">
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
              <div className="relative z-10 h-full flex flex-col justify-center items-center text-white p-12">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-center max-w-[150vh]"
                >
                  <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  
                  <h2 className="text-4xl font-bold mb-4">Join Amacar</h2>
                  <p className="text-xl text-primary-100 mb-8 leading-relaxed">
                    Connect with the future of automotive auctions
                  </p>

                  {/* Features in 2x2 Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-8 ">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                      <span className="text-primary-100 text-sm">Premium vehicle auctions</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                      <span className="text-primary-100 text-sm">Real-time bidding platform</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                      <span className="text-primary-100 text-sm">Advanced analytics & insights</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                      <span className="text-primary-100 text-sm">24/7 expert support</span>
                    </div>
                  </div>

                  {/* Progress Indicator */}
                  <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                    <h3 className="font-semibold mb-4 text-center">Registration Progress</h3>
                    <div className="space-y-3">
                      {steps.map((step, index) => (
                        <motion.div
                          key={step.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                          className="flex items-center space-x-3"
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                            currentStep > step.id 
                              ? 'bg-white text-primary-600 scale-110' 
                              : currentStep === step.id 
                              ? 'bg-primary-300 text-white scale-105' 
                              : 'bg-white/20 text-white/60'
                          }`}>
                            {currentStep > step.id ? <CheckCircle className="w-5 h-5" /> : step.id}
                          </div>
                          <div className="flex-1">
                            <div className={`text-sm font-medium transition-colors ${
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
        <div className="w-full lg:w-3/5 flex flex-col bg-[#fffcf8]">
          <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-4xl"
            >
              {/* Form Card */}
              <div className="bg-[#fffcf8] overflow-hidden min-h-[800px] max-h-[900px] flex flex-col">
                {/* Mobile Progress Stepper */}
                <div className="lg:hidden p-4 border-b border-neutral-200 flex-shrink-0">
                  <ProgressStepper 
                    steps={steps} 
                    currentStep={currentStep} 
                  />
                </div>

                {/* Form Content */}
                <div className="flex-1 p-6 lg:p-8 overflow-y-auto overflow-x-hidden">
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
                <div className="flex-shrink-0 p-6 lg:p-8 ">
                  <div className="flex justify-between items-center">
                    <button
                      onClick={handlePrevious}
                      disabled={currentStep === 1}
                      className="flex items-center space-x-2 px-6 py-3 text-neutral-600 hover:text-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:bg-white rounded-xl border border-neutral-200"
                    >
                      <ChevronLeft className="w-5 h-5" />
                      <span>Previous</span>
                    </button>

                    <div className="flex space-x-3">
                      {currentStep < steps.length ? (
                        <button
                          onClick={handleNext}
                          className="flex items-center space-x-2 px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-glow focus:outline-none focus:ring-4 focus:ring-primary-200"
                        >
                          <span>Next</span>
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      ) : (
                        <button
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                          className="flex items-center space-x-2 px-8 py-3 bg-success hover:bg-success/90 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-glow focus:outline-none focus:ring-4 focus:ring-success/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              <span>Processing...</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-5 h-5" />
                              <span>Complete Registration</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Register;
