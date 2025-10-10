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

const DeactivationWarningModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleGoToProfile = () => {
    navigate("/profile");
    onClose(); // Close the modal after navigation
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent 
        showCloseButton={false}
        className="max-w-md border-red-200 bg-gradient-to-b from-red-50 to-red-100"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
          <DialogTitle className="text-xl font-bold text-red-800">
            Account Deactivated
          </DialogTitle>
          <DialogDescription className="text-red-700 mt-2">
            Your account has been deactivated. You can only access your profile page 
            to update your information and contact support.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 space-y-4">
          <div className="rounded-lg bg-red-50 p-4 border border-red-200">
            <div className="flex items-start space-x-3">
              <User className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-red-800">
                <p className="font-medium mb-1">Limited Access</p>
                <p className="text-red-700">
                  You can only view and edit your profile information. 
                  All other features are restricted until your account is reactivated.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            <Button
              onClick={handleGoToProfile}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-lg transition-colors duration-200"
            >
              <User className="h-4 w-4 mr-2" />
              Go to Profile Page
            </Button>
            
            <div className="text-center">
              <p className="text-xs text-red-600">
                Need help? Contact support to reactivate your account
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeactivationWarningModal;
