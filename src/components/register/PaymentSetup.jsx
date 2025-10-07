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
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import api from "@/lib/api";

const PaymentSetup = ({ formData, updateFormData, errors }) => {
  const [clientSecret, setClientSecret] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [isStripeReady, setIsStripeReady] = useState(false);
  
  const stripe = useStripe();
  const elements = useElements();

  // Create payment intent when component mounts
  useEffect(() => {
    const createPaymentIntent = async () => {
      try {

        const response = await api.post("/create-payment-intent", {
          amount: 0, // Free trial - no charge
          currency: "usd",
        });
        
        if (response.data.clientSecret) {
          setClientSecret(response.data.clientSecret);
          setIsStripeReady(true);
        }
        // setClientSecret(import.meta.env.VITE_STRIPE_CLIENT_SECRET_TEST_KEY);
        // setIsStripeReady(true);
      } catch (error) {
        console.error("Error creating payment intent:", error);
        setPaymentError("Failed to initialize payment. Please try again.");
      }
    };

    createPaymentIntent();
  }, []);
useEffect(() => {
  console.log("clientSecret", clientSecret)
  console.log("isStripeReady", isStripeReady)
}, [clientSecret])
  // Handle payment submission
  const handlePaymentSubmit = async (event) => {
    event.preventDefault();
    console.log("out of the if of handle paymen submit")
    if (!stripe || !elements || !clientSecret) {
      console.log("in if of the handle payment submit")
      setPaymentError("Payment system not ready. Please try again.");
      return;
    }

    setIsProcessing(true);
    setPaymentError("");

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
        },
        redirect: "if_required",
      });

      if (error) {
        setPaymentError(error.message || "Payment failed. Please try again.");
      } else if (paymentIntent.status === "succeeded") {
        // Payment successful - update form data
        updateFormData("paymentCompleted", true);
        updateFormData("paymentIntentId", paymentIntent.id);
      }
    } catch (error) {
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
          <h3 className="text-base font-semibold">Free 30-Day Trial</h3>
        </div>
        <p className="text-success-100 text-sm leading-relaxed mb-3">
          Start with a free 30-day trial. No charges until your trial period
          ends. Cancel anytime during the trial with no obligations.
        </p>
       
      </motion.div>

      <div className="space-y-6">
        {/* Payment Information */}
        <motion.div
          variants={itemVariants}
          className="space-y-4"
        >
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
                      billingDetails: "auto"
                    }
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
                  <p className="text-sm text-blue-600">Processing payment...</p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center p-8 bg-neutral-50 border border-neutral-200 rounded-lg">
              <div className="text-center">
                <Loader2 className="w-6 h-6 animate-spin text-neutral-400 mx-auto mb-2" />
                <p className="text-sm text-neutral-600">Initializing payment system...</p>
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
              I understand that I will be charged $99/month after the 30-day
              free trial period, and I can cancel anytime during the trial with
              no charges. *
            </label>
          </div>
          {errors.trialAccepted && (
            <p className="text-sm text-error mt-1">{errors.trialAccepted}</p>
          )}

          {/* Submit Button */}
          <motion.button
            type="button"
            onClick={handlePaymentSubmit}
            disabled={!isStripeReady || !formData.trialAccepted || isProcessing}
            className={`
              w-full py-3 px-6 rounded-lg font-semibold text-sm transition-all duration-200
              flex items-center justify-center gap-2
              ${
                !isStripeReady || !formData.trialAccepted || isProcessing
                  ? "bg-neutral-300 text-neutral-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
              }
            `}
            whileHover={
              !isStripeReady || !formData.trialAccepted || isProcessing
                ? {}
                : { scale: 1.02 }
            }
            whileTap={
              !isStripeReady || !formData.trialAccepted || isProcessing
                ? {}
                : { scale: 0.98 }
            }
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing Payment...
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
            <span className="text-neutral-600 text-sm">30-Day Free Trial</span>
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

export default PaymentSetup;
