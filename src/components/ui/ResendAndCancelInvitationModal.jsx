import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RotateCcw, X, AlertTriangle } from 'lucide-react';

const ResendAndCancelInvitationModal = ({
  isOpen,
  onClose,
  onConfirm,
  actionType, // 'resend' or 'cancel'
  dealershipName,
  isLoading = false
}) => {
  const isResend = actionType === 'resend';
  
  const handleConfirm = () => {
    onConfirm();
  };

  const handleCancel = () => {
    if (!isLoading) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${
              isResend 
                ? 'bg-blue-100' 
                : 'bg-orange-100'
            }`}>
              {isResend ? (
                <RotateCcw className={`w-5 h-5 ${
                  isResend 
                    ? 'text-blue-600' 
                    : 'text-orange-600'
                }`} />
              ) : (
                <X className={`w-5 h-5 ${
                  isResend 
                    ? 'text-blue-600' 
                    : 'text-orange-600'
                }`} />
              )}
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold">
                {isResend ? 'Resend Invitation' : 'Cancel Invitation'}
              </DialogTitle>
              <DialogDescription className="text-sm text-neutral-600">
                {isResend 
                  ? 'This will send a new invitation email to the dealership.'
                  : 'This will permanently cancel the invitation and remove it from the list.'
                }
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="py-4">
          <div className="flex items-start gap-3 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
            <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-neutral-700">
              <p className="font-medium mb-1">
                Are you sure you want to {isResend ? 'resend' : 'cancel'} the invitation?
              </p>
              <p className="text-neutral-600">
                <span className="font-medium">{dealershipName}</span> will 
                {isResend 
                  ? ' receive a new invitation email with updated expiration date.'
                  : ' no longer be able to accept this invitation.'
                }
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isLoading}
            className="px-4 py-2"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isLoading}
            className={`px-4 py-2 ${
              isResend
                ? 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500'
                : 'bg-orange-600 hover:bg-orange-700 text-white focus:ring-orange-500'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {isResend ? 'Resending...' : 'Canceling...'}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                {isResend ? (
                  <RotateCcw className="w-4 h-4" />
                ) : (
                  <X className="w-4 h-4" />
                )}
                {isResend ? 'Resend Invitation' : 'Cancel Invitation'}
              </div>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResendAndCancelInvitationModal;
