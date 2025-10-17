import React from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./dialog";
import { Button } from "./Button";

const DeactivationWarningModal = ({ isOpen, onClose, warningType = "account" }) => {
  const navigate = useNavigate();

  const handleGoToProfile = () => {
    navigate("/profile");
    onClose(); // Close the modal after navigation
  };

  // Conditional styling and content based on warning type
  const isAccountWarning = warningType === "account";
  const isSubscriptionWarning = warningType === "subscription";

  const modalStyles = isAccountWarning 
    ? "max-w-md border-red-200 bg-gradient-to-b from-red-50 to-red-100"
    : "max-w-md border-orange-200 bg-gradient-to-b from-orange-50 to-orange-100";

  const iconStyles = isAccountWarning
    ? "bg-red-100"
    : "bg-orange-100";

  const iconColor = isAccountWarning
    ? "text-red-600"
    : "text-orange-600";

  const titleColor = isAccountWarning
    ? "text-red-800"
    : "text-orange-800";

  const descriptionColor = isAccountWarning
    ? "text-red-700"
    : "text-orange-700";

  const infoBoxStyles = isAccountWarning
    ? "bg-red-50 border-red-200"
    : "bg-orange-50 border-orange-200";

  const infoTextColor = isAccountWarning
    ? "text-red-800"
    : "text-orange-800";

  const infoSubTextColor = isAccountWarning
    ? "text-red-700"
    : "text-orange-700";

  const buttonStyles = isAccountWarning
    ? "bg-red-600 hover:bg-red-700"
    : "bg-orange-600 hover:bg-orange-700";

  const helpTextColor = isAccountWarning
    ? "text-red-600"
    : "text-orange-600";

  return (
    <Dialog open={isOpen}>
      <DialogContent 
        showCloseButton={false}
        className={modalStyles}
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader className="text-center">
          <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${iconStyles}`}>
            <AlertTriangle className={`h-8 w-8 ${iconColor}`} />
          </div>
          <DialogTitle className={`text-xl font-bold ${titleColor}`}>
            {isAccountWarning ? "Account Deactivated" : "No Active Subscription"}
          </DialogTitle>
          <DialogDescription className={`${descriptionColor} mt-2`}>
            {isAccountWarning 
              ? "Your account has been deactivated. You can only access your profile page to update your information and contact support."
              : "You don't have an active subscription. Subscribe to a plan to access all platform features and continue using the service."
            }
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 space-y-4">
          <div className={`rounded-lg ${infoBoxStyles} p-4 border`}>
            <div className="flex items-start space-x-3">
              <User className={`h-5 w-5 ${iconColor} mt-0.5 flex-shrink-0`} />
              <div className={`text-sm ${infoTextColor}`}>
                <p className="font-medium mb-1">
                  {isAccountWarning ? "Limited Access" : "Subscription Required"}
                </p>
                <p className={infoSubTextColor}>
                  {isAccountWarning 
                    ? "You can only view and edit your profile information. All other features are restricted until your account is reactivated."
                    : "You need an active subscription to access all platform features. Choose a plan that fits your needs to continue using the service."
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            <Button
              onClick={handleGoToProfile}
              className={`w-full ${buttonStyles} text-white font-medium py-3 rounded-lg transition-colors duration-200`}
            >
              <User className="h-4 w-4 mr-2" />
              Go to Profile Page
            </Button>
            
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeactivationWarningModal;
