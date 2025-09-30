import { useState } from 'react';
import { Car, AlertTriangle, CheckCircle, XCircle, Loader2 } from 'lucide-react';
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

const PassDialog = ({ 
  isOpen, 
  onClose, 
  vehicle, 
  onPassConfirm,
  isLoading = false,
  isSuccess = false,
  isError = false,
  errorMessage = ''
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePassConfirm = async () => {
    setIsProcessing(true);
    
    try {
      // Call the parent's confirm handler
      await onPassConfirm?.(vehicle);
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
    } catch (error) {
      console.error('Error passing vehicle:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    setIsProcessing(false);
    onClose();
  };

  const resetStates = () => {
    setIsProcessing(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent 
        className="sm:max-w-md"
        showCloseButton={true}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Car className="w-5 h-5" style={{ color: 'var(--brand-orange)' }} />
            Pass Vehicle
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to pass this vehicle?
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Vehicle Info */}
          <div className="bg-neutral-50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Car className="w-6 h-6 text-orange-600" />
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
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-amber-800">
                  This action cannot be undone
                </h4>
                <p className="text-sm text-amber-700 mt-1">
                  Once you pass this vehicle, it will be removed from your active offers and cannot be recovered.
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
                <p className="text-green-800 font-medium">Vehicle Passed Successfully!</p>
                <p className="text-green-600 text-sm mt-1">
                  The vehicle has been removed from your active offers.
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
                <p className="text-red-800 font-medium">Failed to Pass Vehicle</p>
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
            onClick={handlePassConfirm}
            disabled={isProcessing || isSuccess}
            className={`${
              isProcessing || isSuccess 
                ? 'opacity-50 cursor-not-allowed' 
                : 'text-white transition-colors cursor-pointer'
            }`}
            style={{ 
              backgroundColor: 'var(--brand-orange)',
              '--hover-bg': 'var(--color-primary-600)'
            }}
            onMouseEnter={(e) => {
              if (!isProcessing && !isSuccess) {
                e.target.style.backgroundColor = 'var(--color-primary-600)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isProcessing && !isSuccess) {
                e.target.style.backgroundColor = 'var(--brand-orange)';
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
                <CheckCircle className="w-4 h-4 mr-2" />
                Yes, Pass Vehicle
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PassDialog;
