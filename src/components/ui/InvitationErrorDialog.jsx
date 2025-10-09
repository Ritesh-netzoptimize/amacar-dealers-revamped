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
import { AlertCircle, UserPlus, Clock, XCircle, RefreshCw } from 'lucide-react';

const InvitationErrorDialog = ({
  isOpen,
  onClose,
  errorType,
  errorContext,
  onRetry,
  onNavigateToRegister,
}) => {
  const getErrorConfig = () => {
    switch (errorType) {
      case 'already_used':
        return {
          icon: UserPlus,
          iconColor: 'text-orange-600',
          iconBg: 'bg-orange-100',
          title: 'Invitation Already Used',
          description: 'This invitation link has already been used to create an account.',
          details: 'If you believe this is an error, please contact your dealership administrator.',
          primaryAction: {
            label: 'Try Again',
            onClick: onRetry,
            variant: 'default',
            className: 'bg-orange-600 hover:bg-orange-700 text-white'
          },
          secondaryAction: {
            label: 'New Registration',
            onClick: () => {
              onNavigateToRegister();
              onClose();
            },
            variant: 'outline',
            className: 'border-orange-300 text-orange-700 hover:bg-orange-50'
          }
        };
      
      case 'expired':
        return {
          icon: Clock,
          iconColor: 'text-red-600',
          iconBg: 'bg-red-100',
          title: 'Invitation Expired',
          description: 'This invitation has expired.',
          details: 'Please request a new invitation from your dealership administrator.',
          primaryAction: {
            label: 'Start New Registration',
            onClick: () => {
              onNavigateToRegister();
              onClose();
            },
            variant: 'default',
            className: 'bg-red-600 hover:bg-red-700 text-white'
          }
        };
      
      case 'not_found':
        return {
          icon: XCircle,
          iconColor: 'text-red-600',
          iconBg: 'bg-red-100',
          title: 'Invitation Not Found',
          description: 'The invitation link is invalid or has been removed.',
          details: 'Please check the link or contact your dealership administrator.',
          primaryAction: {
            label: 'Start New Registration',
            onClick: () => {
              onNavigateToRegister();
              onClose();
            },
            variant: 'default',
            className: 'bg-red-600 hover:bg-red-700 text-white'
          }
        };
      
      case 'invalid':
        return {
          icon: XCircle,
          iconColor: 'text-red-600',
          iconBg: 'bg-red-100',
          title: 'Invalid Invitation',
          description: 'The invitation code is invalid.',
          details: 'Please check the link or contact your dealership administrator.',
          primaryAction: {
            label: 'Start New Registration',
            onClick: () => {
              onNavigateToRegister();
              onClose();
            },
            variant: 'default',
            className: 'bg-red-600 hover:bg-red-700 text-white'
          }
        };
      
      default:
        return {
          icon: AlertCircle,
          iconColor: 'text-red-600',
          iconBg: 'bg-red-100',
          title: 'Unable to Load Invitation',
          description: 'There was an error loading the invitation.',
          details: 'Please try again or contact support if the problem persists.',
          primaryAction: {
            label: 'Try Again',
            onClick: onRetry,
            variant: 'default',
            className: 'bg-red-600 hover:bg-red-700 text-white'
          },
          secondaryAction: {
            label: 'New Registration',
            onClick: () => {
              onNavigateToRegister();
              onClose();
            },
            variant: 'outline',
            className: 'border-red-300 text-red-700 hover:bg-red-50'
          }
        };
    }
  };

  const config = getErrorConfig();
  const IconComponent = config.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]" aria-describedby="error-description">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full ${config.iconBg} flex items-center justify-center flex-shrink-0`}>
              <IconComponent className={`w-6 h-6 ${config.iconColor}`} />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-xl font-semibold text-neutral-900">
                {config.title}
              </DialogTitle>
              <DialogDescription className="text-neutral-600 mt-1">
                {config.description}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="py-4">
          <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-200">
            <p id="error-description" className="text-sm text-neutral-700 mb-3">
              {config.details}
            </p>
            
            {errorContext?.invitationCode && (
              <div className="mt-3 p-3 bg-neutral-100 rounded-md">
                <p className="text-xs text-neutral-600 font-medium mb-1">Invitation Code:</p>
                <code className="text-xs text-neutral-800 font-mono bg-white px-2 py-1 rounded border">
                  {errorContext.invitationCode}
                </code>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="gap-2">
          {config.tertiaryAction && (
            <Button
              variant={config.tertiaryAction.variant}
              onClick={config.tertiaryAction.onClick}
              className={config.tertiaryAction.className}
            >
              {config.tertiaryAction.label}
            </Button>
          )}
          
          {config.secondaryAction && (
            <Button
              variant={config.secondaryAction.variant}
              onClick={config.secondaryAction.onClick}
              className={config.secondaryAction.className}
            >
              {config.secondaryAction.label}
            </Button>
          )}
          
          <Button
            variant={config.primaryAction.variant}
            onClick={config.primaryAction.onClick}
            className={config.primaryAction.className}
          >
            {config.primaryAction.label}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InvitationErrorDialog;
