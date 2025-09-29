import { useState } from 'react';
import { DollarSign, CheckCircle, XCircle, Loader2 } from 'lucide-react';
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
  onBidSuccess 
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

  const validateBid = (amount) => {
    const numericAmount = parseFloat(amount);
    if (!amount || isNaN(numericAmount) || numericAmount <= 0) {
      return 'Please enter a valid bid amount';
    }
    if (numericAmount <= vehicle.cashOffer) {
      return `Bid amount must be greater than the current cash offer of ${formatBidAmount(vehicle.cashOffer)}`;
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

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent 
        className="sm:max-w-md"
        showCloseButton={true}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" style={{ color: 'var(--brand-orange)' }} />
            Place Your Bid
          </DialogTitle>
          <DialogDescription>
            Enter your bid amount for <span className="font-semibold">{vehicle.name}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Vehicle Info */}
          <div className="bg-neutral-50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-neutral-600">Current Cash Offer</span>
              <span className="text-lg font-bold text-neutral-900">
                {formatBidAmount(vehicle.cashOffer)}
              </span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-neutral-600">Time Left</span>
              <span className="text-sm text-neutral-500">{vehicle.timeLeft}</span>
            </div>
          </div>

          {/* Bid Amount Input */}
          <div className="space-y-2">
            <label htmlFor="bidAmount" className="text-sm font-medium text-neutral-700">
              Your Bid Amount
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-neutral-500 sm:text-sm">$</span>
              </div>
              <input
                type="text"
                id="bidAmount"
                value={bidAmount}
                onChange={handleAmountChange}
                placeholder="0.00"
                className={`w-full placeholder:text-neutral-500 pl-7 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent transition-colors ${
                  validationError 
                    ? 'border-red-300 bg-red-50 focus:ring-red-500' 
                    : 'border-neutral-300 focus:ring-[var(--brand-orange)]'
                }`}
                disabled={isLoading || isSuccess}
              />
            </div>
            {validationError && (
              <p className="text-sm text-red-600 animate-in fade-in-0 slide-in-from-top-1 duration-200">
                {validationError}
              </p>
            )}
          </div>

          {/* Success State */}
          {isSuccess && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center animate-in fade-in-0 zoom-in-95 duration-300">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-green-800 font-medium">Bid Submitted Successfully!</p>
              <p className="text-green-600 text-sm mt-1">
                Your bid of {formatBidAmount(parseFloat(bidAmount))} has been placed.
              </p>
            </div>
          )}

          {/* Error State */}
          {isError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center animate-in fade-in-0 zoom-in-95 duration-300">
              <XCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <p className="text-red-800 font-medium">Bid Submission Failed</p>
              <p className="text-red-600 text-sm mt-1">{errorMessage}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={resetStates}
                className="mt-3"
              >
                Try Again
              </Button>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isLoading}
            className="cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading || !bidAmount || isSuccess}
            className={`${isLoading || !bidAmount || isSuccess? 'opacity-50 cursor-not-allowed' : 'text-white transition-colors cursor-pointer'}`}
            style={{ 
              backgroundColor: 'var(--brand-orange)',
              '--hover-bg': 'var(--color-primary-600)'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'var(--color-primary-600)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'var(--brand-orange)';
            }}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Bid'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BidDialog;
