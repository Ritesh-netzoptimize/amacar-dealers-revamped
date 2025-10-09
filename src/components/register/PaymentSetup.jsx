import { motion } from "framer-motion";
import {
  CreditCard,
  Calendar,
  Lock,
  CheckCircle,
  Star,
  Gift,
  Loader2,
} from "lucide-react";
import { useState, useEffect } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import api from "@/lib/api";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@/redux/slices/userSlice";

// We'll create the stripe instance dynamically when we have the client secret
let stripePromise = null;
// Inner component that uses Stripe hooks
const PaymentForm = ({
  formData,
  updateFormData,
  errors,
  clientSecret,
  isStripeReady,
  isInvitedUser,
  invitationData,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [isCompletingRegistration, setIsCompletingRegistration] = useState(false);
  const [registrationError, setRegistrationError] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  
  // Get registration status from Redux
  const { registrationStatus, registrationError: reduxRegistrationError } = useSelector((state) => state.user);

  // Complete registration after successful payment setup
  const completeRegistration = async (setupIntentId, customerId) => {
    setIsCompletingRegistration(true);
    setRegistrationError("");
    
    try {
      const registrationData = {
        setupIntentId,
        customerId,
        dealerCode: formData.dealerCode,
        dealershipName: formData.dealershipName,
        website: formData.website,
        dealerGroup: formData.dealerGroup,
        jobPosition: formData.jobPosition,
        zipCode: formData.zipCode,
        city: formData.city,
        state: formData.state,
        firstName: formData.firstName,
        lastName: formData.lastName,
        mobileNumber: formData.mobileNumber,
        businessEmail: formData.businessEmail,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        agreementAccepted: formData.agreementAccepted,
        inviteToken: invitationData?.invite_token || null
      };

      console.log("Dispatching registration with data:", registrationData);
      
      const result = await dispatch(registerUser(registrationData)).unwrap();
      
      console.log("Registration completed successfully:", result);
      setRegistrationSuccess(true);
      updateFormData("registrationCompleted", true);
      updateFormData("registrationData", result);
      
    } catch (error) {
      console.error("Registration completion error:", error);
      setRegistrationError(error || "Failed to complete registration. Please contact support.");
    } finally {
      setIsCompletingRegistration(false);
    }
  };

  // Handle payment submission
  const handlePaymentSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements || !clientSecret) {
      console.log("in if of the handle payment submit");
      setPaymentError("Payment system not ready. Please try again.");
      return;
    }

    setIsProcessing(true);
    setPaymentError("");
    console.log("Inside the handle payment submit");
    console.log("client secret:", clientSecret);
    console.log("stripe object:", stripe);
    console.log("elements object:", elements);
    
    try {
      // Ensure we have valid elements before proceeding
      if (!elements || typeof elements !== 'object') {
        throw new Error('Elements not properly initialized');
      }

      const { error, setupIntent } = await stripe.confirmSetup({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/profile`,
        },
        redirect: "if_required",
      });

      if (error) {
        console.error("Stripe setup error:", error);
        if (
          error.type === "invalid_request_error" &&
          error.param === "client_secret"
        ) {
          setPaymentError(
            "Payment configuration error. Please contact support or try refreshing the page."
          );
        } else {
          setPaymentError(
            error.message || "Payment setup failed. Please try again."
          );
        }
      } else if (setupIntent.status === "succeeded") {
        // Setup successful - update form data
        updateFormData("paymentCompleted", true);
        updateFormData("setupIntentId", setupIntent.id);
        
        console.log("SetupIntent response:", setupIntent);
        
        // Get customer ID from the setup intent response or form data
        // The customer ID should be available in the original API response
        const customerId = formData.customerId || setupIntent.payment_method?.customer;
        
        console.log("Customer ID for registration:", customerId);
        
        // Complete registration after successful payment setup
        await completeRegistration(setupIntent.id, customerId);
      }
    } catch (error) {
      console.error("Payment submission error:", error);
      setPaymentError("An unexpected error occurred. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    setTimeout(() => {
      console.log("stripe key", import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
    }, 5000);
  }, []);
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <div className="text-left mb-6">
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            variants={itemVariants}
            className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center shadow-soft"
          >
            <CreditCard className="w-6 h-6 text-primary-600" />
          </motion.div>
          <div>
            <motion.h2
              variants={itemVariants}
              className="text-xl font-bold text-neutral-900"
            >
              Payment Setup
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-neutral-600 text-sm"
            >
              Complete your registration with secure payment
            </motion.p>
          </div>
        </div>
      </div>

      {/* Trial Information */}
      <motion.div
        variants={itemVariants}
        className="bg-gradient-to-r from-success to-success/80 rounded-xl p-4 text-white"
      >
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
            <Gift className="w-4 h-4" />
          </div>
          <h3 className="text-base font-semibold">Free 7-Day Trial</h3>
        </div>
        <p className="text-success-100 text-sm leading-relaxed mb-3">
          Start with a free 7-day trial. No charges until your trial period
          ends. Cancel anytime during the trial with no obligations.
        </p>
      </motion.div>

      <div className="space-y-6">
        {/* Payment Information */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h3 className="text-base font-semibold text-neutral-900">
            Payment Information
          </h3>

          {/* Stripe Payment Element */}
          {isStripeReady && clientSecret ? (
            <div className="space-y-4">
              <div className="p-4 border border-neutral-200 rounded-lg bg-white">
                <PaymentElement
                  options={{
                    layout: "tabs",
                    fields: {
                      billingDetails: "auto",
                    },
                  }}
                />
              </div>

              {/* Payment Error Display */}
              {paymentError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{paymentError}</p>
                </div>
              )}

              {/* Processing State */}
              {isProcessing && (
                <div className="flex items-center justify-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <Loader2 className="w-5 h-5 animate-spin text-blue-600 mr-2" />
                  <p className="text-sm text-blue-600">
                    Setting up payment method...
                  </p>
                </div>
              )}

              {/* Registration Completion State */}
              {isCompletingRegistration && (
                <div className="flex items-center justify-center p-4 bg-green-50 border border-green-200 rounded-lg">
                  <Loader2 className="w-5 h-5 animate-spin text-green-600 mr-2" />
                  <p className="text-sm text-green-600">
                    Completing registration...
                  </p>
                </div>
              )}

              {/* Registration Success State */}
              {registrationSuccess && (
                <div className="flex items-center justify-center p-4 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  <p className="text-sm text-green-600">
                    Registration completed successfully! Redirecting...
                  </p>
                </div>
              )}

              {/* Registration Error Display */}
              {registrationError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{registrationError}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center p-8 bg-neutral-50 border border-neutral-200 rounded-lg">
              <div className="text-center">
                <Loader2 className="w-6 h-6 animate-spin text-neutral-400 mx-auto mb-2" />
                <p className="text-sm text-neutral-600">
                  Initializing payment system...
                </p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Trial Terms */}
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="trialAccepted"
              checked={formData.trialAccepted}
              onChange={(e) =>
                updateFormData("trialAccepted", e.target.checked)
              }
              className="w-4 h-4 text-primary-600 bg-neutral-100 border-neutral-300 rounded focus:ring-primary-500 focus:ring-2 mt-1"
            />
            <label
              htmlFor="trialAccepted"
              className="text-sm text-neutral-700 cursor-pointer"
            >
              I understand that I will be charged $99/month after the 7-day free
              trial period, and I can cancel anytime during the trial with no
              charges. *
            </label>
          </div>
          {errors.trialAccepted && (
            <p className="text-sm text-error mt-1">{errors.trialAccepted}</p>
          )}

          {/* Submit Button */}
          <motion.button
            type="button"
            onClick={handlePaymentSubmit}
            disabled={
              !isStripeReady || 
              !formData.trialAccepted || 
              isProcessing || 
              isCompletingRegistration ||
              registrationSuccess
            }
            className={`
              w-full py-3 px-6 rounded-lg font-semibold text-sm transition-all duration-200
              flex items-center justify-center gap-2
              ${
                !isStripeReady || 
                !formData.trialAccepted || 
                isProcessing || 
                isCompletingRegistration ||
                registrationSuccess
                  ? "bg-neutral-300 text-neutral-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
              }
            `}
            whileHover={
              !isStripeReady || 
              !formData.trialAccepted || 
              isProcessing || 
              isCompletingRegistration ||
              registrationSuccess
                ? {}
                : { scale: 1.02 }
            }
            whileTap={
              !isStripeReady || 
              !formData.trialAccepted || 
              isProcessing || 
              isCompletingRegistration ||
              registrationSuccess
                ? {}
                : { scale: 0.98 }
            }
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Setting Up Payment...
              </>
            ) : isCompletingRegistration ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Completing Registration...
              </>
            ) : registrationSuccess ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Registration Complete!
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                Complete Registration
              </>
            )}
          </motion.button>
        </motion.div>
      </div>

      {/* Pricing Summary */}
      <motion.div
        variants={itemVariants}
        className="bg-gradient-to-r from-neutral-50 to-neutral-100 rounded-xl p-4"
      >
        <h3 className="text-base font-semibold text-neutral-900 mb-3">
          Pricing Summary
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-neutral-600 text-sm">7-Day Free Trial</span>
            <span className="font-semibold text-success text-sm">$0.00</span>
          </div>
          <div className="flex justify-between items-center text-xs text-neutral-500">
            <span>After trial (monthly)</span>
            <span>$99.00</span>
          </div>
          <div className="border-t border-neutral-200 pt-2">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-neutral-900 text-sm">
                Today's Charge
              </span>
              <span className="font-bold text-success">$0.00</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Main component that handles API calls and wraps PaymentForm with Elements
const PaymentSetup = ({ formData, updateFormData, errors, isInvitedUser, invitationData }) => {
  const [clientSecret, setClientSecret] = useState("");
  const [isStripeReady, setIsStripeReady] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [stripeInstance, setStripeInstance] = useState(null);

  // Create setup intent when component mounts
  useEffect(() => {
    const createSetupIntent = async (
      email,
      customerName,
      dealerCode,
      dealershipName
    ) => {
      try {
        const response = await api.post("/registration/create-payment-intent", {
          amount: 0, // Free trial - no charge
          currency: "usd",
          customer_email: email,
          customer_name: customerName,
          dealer_code: dealerCode,
          dealership_name: dealershipName,
        });

        console.log("Setup intent response:", response.data);
        console.log(
          "Current publishable key:",
          import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
        );
        console.log(
          "Using publishable key:",
          import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ||
            "pk_test_51POSsaDUuzIKcsNTvzb5ZfgRrI9537WuMyJvmEfY4fmTyCCpYwvcokSGpLFexOej29Y4XqyLCTS8b7LOkhU4Rmak00F1TaGtHe"
        );

        if (response.data.client_secret) {
          console.log("Setting client secret:", response.data.client_secret);
          console.log(
            "Client secret format check:",
            response.data.client_secret.startsWith("seti_") &&
              response.data.client_secret.includes("_secret_")
          );

          // Store customer ID from the API response
          if (response.data.customer_id) {
            updateFormData("customerId", response.data.customer_id);
            console.log("Customer ID stored:", response.data.customer_id);
          }

          // Extract account ID from client secret for debugging
          const clientSecretParts = response.data.client_secret.split("_");
          const accountId = clientSecretParts[1];
          console.log("Account ID from client secret:", accountId);

          // Extract account ID from publishable key for debugging
          const pubKey =
            import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ||
            "pk_test_51POSsaDUuzIKcsNTvzb5ZfgRrI9537WuMyJvmEfY4fmTyCCpYwvcokSGpLFexOej29Y4XqyLCTS8b7LOkhU4Rmak00F1TaGtHe";
          // const pubKey = "pk_test_511SFyPQDUuzIKcsNT7wrDuDxd";
          const pubKeyParts = pubKey.split("_");
          const pubKeyAccountId = pubKeyParts[1];
          console.log("Account ID from publishable key:", pubKeyAccountId);

          console.log("Account IDs match:", accountId === pubKeyAccountId);

          // Create the correct publishable key based on the account ID from client secret
          // const correctPublishableKey = `pk_test_51${accountId}`;
          const correctPublishableKey =
            "pk_test_51POSsaDUuzIKcsNTvzb5ZfgRrI9537WuMyJvmEfY4fmTyCCpYwvcokSGpLFexOej29Y4XqyLCTS8b7LOkhU4Rmak00F1TaGtHe";
          console.log(
            "Correct publishable key should be:",
            correctPublishableKey
          );

          // Create Stripe instance with the correct publishable key
          try {
            const stripe = await loadStripe(correctPublishableKey);
            console.log("Stripe instance created with correct key");
            setStripeInstance(stripe);
            setClientSecret(response.data.client_secret);
            setIsStripeReady(true);
          } catch (stripeError) {
            console.error("Stripe loading error:", stripeError);
            setPaymentError(
              "Failed to initialize payment system. Please try again."
            );
          }
        } else {
          console.error("No client_secret in response:", response.data);
        }
      } catch (error) {
        console.error("Error creating setup intent:", error);
        setPaymentError(
          "Failed to initialize payment setup. Please try again."
        );
      }
    };

    createSetupIntent(
      formData.businessEmail,
      formData.firstName + " " + formData.lastName,
      formData.dealerCode,
      formData.dealershipName
    );
  }, [
    formData.businessEmail,
    formData.firstName,
    formData.lastName,
    formData.dealerCode,
    formData.dealershipName,
    updateFormData,
  ]);

  // Don't render Elements until we have a client secret
  if (!clientSecret) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="text-left mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center shadow-soft">
              <CreditCard className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-neutral-900">
                Payment Setup
              </h2>
              <p className="text-neutral-600 text-sm">
                Complete your registration with secure payment
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center p-8 bg-neutral-50 border border-neutral-200 rounded-lg">
          <div className="text-center">
            <Loader2 className="w-6 h-6 animate-spin text-neutral-400 mx-auto mb-2" />
            <p className="text-sm text-neutral-600">
              Initializing payment system...
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <Elements stripe={stripeInstance} options={{ clientSecret }}>
      <PaymentForm
        formData={formData}
        updateFormData={updateFormData}
        errors={errors}
        clientSecret={clientSecret}
        isStripeReady={isStripeReady}
        isInvitedUser={isInvitedUser}
        invitationData={invitationData}
      />
    </Elements>
  );
};

export default PaymentSetup;
