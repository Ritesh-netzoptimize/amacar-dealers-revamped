import { useState } from 'react';
import { Car, AlertTriangle, CheckCircle, XCircle, Loader2, RotateCcw } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { passVehicle, unpassVehicle } from '../../../lib/api';

const PassDialog = ({ 
  isOpen, 
  onClose, 
  vehicle, 
  mode = 'pass', // 'pass' or 'unpass'
  onSuccess,
  onError
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isPassMode = mode === 'pass';
  const isUnpassMode = mode === 'unpass';

  const handleConfirm = async () => {
    setIsProcessing(true);
    setIsError(false);
    setErrorMessage('');
    
    try {
      // Call the appropriate API based on mode
      const response = isPassMode 
        ? await passVehicle(vehicle.id)
        : await unpassVehicle(vehicle.id);
      
      if (response.success) {
        setIsSuccess(true);
        
        // Call parent success handler
        onSuccess?.(vehicle, response);
        
        // Close dialog after success
        setTimeout(() => {
          handleClose();
        }, 1500);
      } else {
        throw new Error(response.message || `Failed to ${mode} vehicle`);
      }
      
    } catch (error) {
      console.error(`Error ${mode}ing vehicle:`, error);
      setIsError(true);
      setErrorMessage(error.message || `Failed to ${mode} vehicle. Please try again.`);
      
      // Call parent error handler
      onError?.(vehicle, error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    setIsProcessing(false);
    setIsSuccess(false);
    setIsError(false);
    setErrorMessage('');
    onClose();
  };

  const resetStates = () => {
    setIsProcessing(false);
    setIsError(false);
    setErrorMessage('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent 
        className="sm:max-w-md"
        showCloseButton={true}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isPassMode ? (
              <XCircle className="w-5 h-5 text-red-500" />
            ) : (
              <RotateCcw className="w-5 h-5 text-green-500" />
            )}
            {isPassMode ? 'Pass Vehicle' : 'Unpass Vehicle'}
          </DialogTitle>
          <DialogDescription>
            {isPassMode 
              ? 'Are you sure you want to pass this vehicle?'
              : 'Are you sure you want to unpass this vehicle?'
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Vehicle Info */}
          <div className={`rounded-lg p-4 ${
            isPassMode 
              ? 'bg-red-50 border border-red-200' 
              : 'bg-green-50 border border-green-200'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                isPassMode 
                  ? 'bg-red-100' 
                  : 'bg-green-100'
              }`}>
                <Car className={`w-6 h-6 ${
                  isPassMode 
                    ? 'text-red-600' 
                    : 'text-green-600'
                }`} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-neutral-900 text-sm">
                  {vehicle?.name || 'Vehicle Name'}
                </h3>
                <p className="text-xs text-neutral-600 mt-1">
                  {vehicle?.vehicle || 'Vehicle Model'}
                </p>
                {vehicle?.offer && (
                  <p className="text-sm font-medium text-green-600 mt-1">
                    {vehicle.offer}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Warning Message */}
          <div className={`rounded-lg p-4 ${
            isPassMode 
              ? 'bg-amber-50 border border-amber-200' 
              : 'bg-blue-50 border border-blue-200'
          }`}>
            <div className="flex items-start gap-3">
              <AlertTriangle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                isPassMode 
                  ? 'text-amber-600' 
                  : 'text-blue-600'
              }`} />
              <div>
                <h4 className={`text-sm font-medium ${
                  isPassMode 
                    ? 'text-amber-800' 
                    : 'text-blue-800'
                }`}>
                  {isPassMode 
                    ? 'This action cannot be undone'
                    : 'Vehicle will be available for bidding again'
                  }
                </h4>
                <p className={`text-sm mt-1 ${
                  isPassMode 
                    ? 'text-amber-700' 
                    : 'text-blue-700'
                }`}>
                  {isPassMode 
                    ? 'Once you pass this vehicle, it will be removed from your active offers and cannot be recovered.'
                    : 'Unpassing this vehicle will make it available for bidding again in your active offers.'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Success State */}
          <AnimatePresence>
            {isSuccess && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-green-50 border border-green-200 rounded-lg p-4 text-center"
              >
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-green-800 font-medium">
                  {isPassMode 
                    ? 'Vehicle Passed Successfully!'
                    : 'Vehicle Unpassed Successfully!'
                  }
                </p>
                <p className="text-green-600 text-sm mt-1">
                  {isPassMode 
                    ? 'The vehicle has been removed from your active offers.'
                    : 'The vehicle is now available for bidding again.'
                  }
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error State */}
          <AnimatePresence>
            {isError && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-red-50 border border-red-200 rounded-lg p-4 text-center"
              >
                <XCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <p className="text-red-800 font-medium">
                  {isPassMode 
                    ? 'Failed to Pass Vehicle'
                    : 'Failed to Unpass Vehicle'
                  }
                </p>
                <p className="text-red-600 text-sm mt-1">
                  {errorMessage || 'An error occurred. Please try again.'}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetStates}
                  className="mt-3"
                >
                  Try Again
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isProcessing || isSuccess}
            className="cursor-pointer"
          >
            <XCircle className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isProcessing || isSuccess}
            className={`${
              isProcessing || isSuccess 
                ? 'opacity-50 cursor-not-allowed' 
                : 'text-white transition-colors cursor-pointer'
            }`}
            style={{ 
              backgroundColor: isPassMode ? '#ef4444' : '#10b981',
              '--hover-bg': isPassMode ? '#dc2626' : '#059669'
            }}
            onMouseEnter={(e) => {
              if (!isProcessing && !isSuccess) {
                e.target.style.backgroundColor = isPassMode ? '#dc2626' : '#059669';
              }
            }}
            onMouseLeave={(e) => {
              if (!isProcessing && !isSuccess) {
                e.target.style.backgroundColor = isPassMode ? '#ef4444' : '#10b981';
              }
            }}
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                {isPassMode ? (
                  <XCircle className="w-4 h-4 mr-2" />
                ) : (
                  <RotateCcw className="w-4 h-4 mr-2" />
                )}
                {isPassMode ? 'Yes, Pass Vehicle' : 'Yes, Unpass Vehicle'}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PassDialog;
