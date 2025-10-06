import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DollarSign, 
  CheckCircle, 
  XCircle, 
  Loader2, 
  Clock, 
  TrendingUp, 
  Shield,
  AlertTriangle,
  Gavel
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { formatBidAmount } from '@/lib/utils';

const BidDialog = ({ 
  isOpen, 
  onClose, 
  vehicle, 
  onBidSuccess,
  formatRemainingTime,
  remainingTime
}) => {
  const [bidAmount, setBidAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleAmountChange = (e) => {
    const value = e.target.value;
    // Only allow numbers and one decimal point
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setBidAmount(value);
      setValidationError('');
    }
  };

  // Format input with commas for better readability
  const formatInputValue = (value) => {
    if (!value) return '';
    const numericValue = value.replace(/[^0-9.]/g, '');
    const parts = numericValue.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  };

  const parseCurrencyString = (currencyString) => {
    if (typeof currencyString === 'number') return currencyString;
    if (typeof currencyString === 'string') {
      // Remove $ and commas, then parse
      return parseFloat(currencyString.replace(/[$,]/g, ''));
    }
    return 0;
  };

  const validateBid = (amount) => {
    const numericAmount = parseFloat(amount);
    if (!amount || isNaN(numericAmount) || numericAmount <= 0) {
      return 'Please enter a valid bid amount';
    }
    const cashOfferAmount = parseCurrencyString(vehicle.cashOffer || vehicle.cash_offer?.offer_amount);
    if (numericAmount <= cashOfferAmount) {
      return `Bid amount must be greater than the current cash offer of ${formatBidAmount(cashOfferAmount)}`;
    }
    return null;
  };

  const handleSubmit = async () => {
    const validation = validateBid(bidAmount);
    if (validation) {
      setValidationError(validation);
      return;
    }

    setIsLoading(true);
    setValidationError('');
    setIsError(false);
    setErrorMessage('');

    try {
      // Simulate API call with setTimeout
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate 80% success rate
          if (Math.random() > 0.2) {
            resolve();
          } else {
            reject(new Error('Bid submission failed. Please try again.'));
          }
        }, 2000);
      });

      setIsSuccess(true);
      setTimeout(() => {
        onBidSuccess?.(parseFloat(bidAmount));
        handleClose();
      }, 1500);
    } catch (error) {
      setIsError(true);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setBidAmount('');
    setIsLoading(false);
    setIsSuccess(false);
    setIsError(false);
    setErrorMessage('');
    setValidationError('');
    onClose();
  };

  const resetStates = () => {
    setIsSuccess(false);
    setIsError(false);
    setErrorMessage('');
    setValidationError('');
  };

  useEffect(() => {
    console.log("vehicle", vehicle);
  }, [vehicle]);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent 
        className="sm:max-w-lg p-0 overflow-hidden"
        showCloseButton={true}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {/* Header with gradient background */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4 text-white">
            <DialogHeader className="space-y-2">
              <DialogTitle className="flex items-center gap-3 text-xl font-bold">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Gavel className="w-6 h-6" />
                </div>
                Place Your Bid
              </DialogTitle>
            </DialogHeader>
          </div>

          <div className="px-6 py-6 space-y-6">
            {/* Vehicle Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div 
                className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500 rounded-lg">
                    <DollarSign className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-700">Current Cash Offer</p>
                    <p className="text-xl font-bold text-green-900">
                      {formatBidAmount(parseCurrencyString(vehicle?.cash_offer?.offer_amount || vehicle?.cashOffer))}
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500 rounded-lg">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-700">Time Remaining</p>
                    <p className="text-lg font-bold text-blue-900">
                      {vehicle?.timeLeft || formatRemainingTime(remainingTime)}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Auction Status */}
            <motion.div 
              className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-amber-700">Auction Status</p>
                  <p className="text-base font-semibold text-amber-900">
                    {vehicle?.auctionStatus === 'active' ? 'Active - Bidding Open' : 'Ended - Bidding Closed'}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Bid Amount Input */}
            <motion.div 
              className="space-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-orange-500" />
                <label htmlFor="bidAmount" className="text-lg font-semibold text-neutral-800">
                  Your Bid Amount
                </label>
              </div>
              
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-2xl font-bold text-neutral-400 group-focus-within:text-orange-500 transition-colors">$</span>
                </div>
                <motion.input
                  type="text"
                  id="bidAmount"
                  value={bidAmount}
                  onChange={handleAmountChange}
                  placeholder="Enter amount..."
                  className={`w-full placeholder:text-neutral-400 pl-12 pr-4 py-4 text-xl font-semibold border-2 rounded-xl focus:outline-none focus:ring-4 transition-all duration-200 ${
                    validationError 
                      ? 'border-red-300 bg-red-50 focus:ring-red-200 focus:border-red-400' 
                      : 'border-neutral-200 bg-neutral-50 focus:ring-orange-200 focus:border-orange-400 hover:border-orange-300'
                  } ${isLoading || isSuccess ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={isLoading || isSuccess}
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                  <span className="text-sm text-neutral-400 font-medium">USD</span>
                </div>
              </div>
              
              <AnimatePresence>
                {validationError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg"
                  >
                    <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
                    <p className="text-sm text-red-700 font-medium">{validationError}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Success State */}
            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <CheckCircle className="w-8 h-8 text-white" />
                  </motion.div>
                  <motion.h3 
                    className="text-xl font-bold text-green-800 mb-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Bid Submitted Successfully!
                  </motion.h3>
                  <motion.p 
                    className="text-green-700 text-base"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Your bid of <span className="font-bold text-green-800">{formatBidAmount(parseFloat(bidAmount))}</span> has been placed.
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error State */}
            <AnimatePresence>
              {isError && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-200 rounded-2xl p-6 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <XCircle className="w-8 h-8 text-white" />
                  </motion.div>
                  <motion.h3 
                    className="text-xl font-bold text-red-800 mb-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Bid Submission Failed
                  </motion.h3>
                  <motion.p 
                    className="text-red-700 text-base mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {errorMessage}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={resetStates}
                      className="bg-white hover:bg-red-50 border-red-300 text-red-700 hover:text-red-800"
                    >
                      Try Again
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer */}
            <motion.div 
              className="bg-neutral-50 py-4 border-t border-neutral-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={handleClose}
                  disabled={isLoading}
                  className="px-6 py-5 border-2 border-neutral-300 text-neutral-700 hover:bg-neutral-100 hover:border-neutral-400 transition-all duration-200 font-medium"
                >
                  Cancel
                </Button>
                <motion.div
                  whileHover={!isLoading && bidAmount && !isSuccess ? { scale: 1.05 } : {}}
                  whileTap={!isLoading && bidAmount && !isSuccess ? { scale: 0.95 } : {}}
                >
                  <Button
                    onClick={handleSubmit}
                    disabled={isLoading || !bidAmount || isSuccess}
                    className={`px-8 py-5.5 font-semibold text-white rounded-lg transition-all duration-200 ${
                      isLoading || !bidAmount || isSuccess
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:shadow-xl'
                    }`}
                    style={{ 
                      background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                      boxShadow: bidAmount && !isLoading && !isSuccess 
                        ? '0 4px 20px 0 rgba(249, 115, 22, 0.4)' 
                        : '0 4px 14px 0 rgba(249, 115, 22, 0.3)'
                    }}
                  >
                  {isLoading ? (
                    <motion.div 
                      className="flex items-center gap-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting...
                    </motion.div>
                  ) : (
                    <motion.div 
                      className="flex items-center gap-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <Gavel className="w-4 h-4" />
                      Submit Bid
                    </motion.div>
                  )}
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default BidDialog;
