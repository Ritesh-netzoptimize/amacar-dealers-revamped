import { motion } from 'framer-motion';
import { CreditCard, Calendar, Lock, CheckCircle, Star, Gift } from 'lucide-react';
import { useState } from 'react';

const PaymentSetup = ({ formData, updateFormData, errors }) => {
  const [cardType, setCardType] = useState('');

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const detectCardType = (number) => {
    const num = number.replace(/\s/g, '');
    if (num.startsWith('4')) return 'visa';
    if (num.startsWith('5') || num.startsWith('2')) return 'mastercard';
    if (num.startsWith('3')) return 'amex';
    return '';
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    updateFormData('cardNumber', formatted);
    setCardType(detectCardType(formatted));
  };

  const handleExpiryChange = (e) => {
    const formatted = formatExpiryDate(e.target.value);
    updateFormData('expiryDate', formatted);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <motion.div
          variants={itemVariants}
          className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-soft"
        >
          <CreditCard className="w-6 h-6 text-primary-600" />
        </motion.div>
        <motion.h2 variants={itemVariants} className="text-xl font-bold text-neutral-900 mb-2">
          Payment Setup
        </motion.h2>
        <motion.p variants={itemVariants} className="text-neutral-600 text-sm">
          Complete your registration with secure payment
        </motion.p>
      </div>

      {/* Trial Information */}
      <motion.div variants={itemVariants} className="bg-gradient-to-r from-success to-success/80 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <Gift className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold">Free 30-Day Trial</h3>
        </div>
        <p className="text-success-100 text-sm leading-relaxed mb-4">
          Start with a free 30-day trial. No charges until your trial period ends. 
          Cancel anytime during the trial with no obligations.
        </p>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4" />
            <span>Full access to all features</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4" />
            <span>No setup fees</span>
          </div>
        </div>
      </motion.div>

      <div className="space-y-6">
        {/* Card Information */}
        <motion.div variants={itemVariants} className="bg-neutral-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Payment Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card Number */}
            <div className="md:col-span-2 space-y-2">
              <label className="block text-sm font-semibold text-neutral-700">
                Card Number *
              </label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  value={formData.cardNumber}
                  onChange={handleCardNumberChange}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                    errors.cardNumber ? 'border-error' : 'border-neutral-200'
                  } bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-4 focus:ring-primary-200 focus:border-primary-500 transition-all duration-200`}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                />
                {cardType && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className={`w-8 h-5 rounded text-xs flex items-center justify-center font-semibold ${
                      cardType === 'visa' ? 'bg-blue-600 text-white' :
                      cardType === 'mastercard' ? 'bg-red-600 text-white' :
                      cardType === 'amex' ? 'bg-green-600 text-white' :
                      'bg-neutral-300 text-neutral-600'
                    }`}>
                      {cardType === 'visa' ? 'VISA' :
                       cardType === 'mastercard' ? 'MC' :
                       cardType === 'amex' ? 'AMEX' : ''}
                    </div>
                  </div>
                )}
              </div>
              {errors.cardNumber && (
                <p className="text-sm text-error">{errors.cardNumber}</p>
              )}
            </div>

            {/* Expiry Date */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-neutral-700">
                Expiry Date *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  value={formData.expiryDate}
                  onChange={handleExpiryChange}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                    errors.expiryDate ? 'border-error' : 'border-neutral-200'
                  } bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-4 focus:ring-primary-200 focus:border-primary-500 transition-all duration-200`}
                  placeholder="MM/YY"
                  maxLength="5"
                />
              </div>
              {errors.expiryDate && (
                <p className="text-sm text-error">{errors.expiryDate}</p>
              )}
            </div>

            {/* CVV */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-neutral-700">
                CVV *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  value={formData.cvv}
                  onChange={(e) => updateFormData('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                    errors.cvv ? 'border-error' : 'border-neutral-200'
                  } bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-4 focus:ring-primary-200 focus:border-primary-500 transition-all duration-200`}
                  placeholder="123"
                  maxLength="4"
                />
              </div>
              {errors.cvv && (
                <p className="text-sm text-error">{errors.cvv}</p>
              )}
            </div>

            {/* Cardholder Name */}
            <div className="md:col-span-2 space-y-2">
              <label className="block text-sm font-semibold text-neutral-700">
                Cardholder Name *
              </label>
              <input
                type="text"
                value={formData.cardholderName}
                onChange={(e) => updateFormData('cardholderName', e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.cardholderName ? 'border-error' : 'border-neutral-200'
                } bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-4 focus:ring-primary-200 focus:border-primary-500 transition-all duration-200`}
                placeholder="Name as it appears on card"
              />
              {errors.cardholderName && (
                <p className="text-sm text-error">{errors.cardholderName}</p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Trial Terms */}
        <motion.div variants={itemVariants} className="space-y-2">
          <div className="flex items-start space-x-3">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                id="trialAccepted"
                checked={formData.trialAccepted}
                onChange={(e) => updateFormData('trialAccepted', e.target.checked)}
                className="w-4 h-4 text-primary-600 bg-neutral-100 border-neutral-300 rounded focus:ring-primary-500 focus:ring-2"
              />
            </div>
            <div className="text-sm">
              <label htmlFor="trialAccepted" className="text-neutral-700 cursor-pointer">
                I understand that I will be charged $99/month after the 30-day free trial period, 
                and I can cancel anytime during the trial with no charges. *
              </label>
              {errors.trialAccepted && (
                <p className="text-sm text-error mt-1">{errors.trialAccepted}</p>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Security Notice */}
      <motion.div variants={itemVariants} className="bg-primary-50 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <Lock className="w-4 h-4 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-primary-900 mb-1">Secure Payment</h4>
            <p className="text-sm text-primary-700">
              Your payment information is encrypted and processed securely. We use industry-standard 
              SSL encryption to protect your data and never store your full card details.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Pricing Summary */}
      <motion.div variants={itemVariants} className="bg-gradient-to-r from-neutral-50 to-neutral-100 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Pricing Summary</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-neutral-600">30-Day Free Trial</span>
            <span className="font-semibold text-success">$0.00</span>
          </div>
          <div className="flex justify-between items-center text-sm text-neutral-500">
            <span>After trial (monthly)</span>
            <span>$99.00</span>
          </div>
          <div className="border-t border-neutral-200 pt-3">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-neutral-900">Today's Charge</span>
              <span className="font-bold text-lg text-success">$0.00</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PaymentSetup;
