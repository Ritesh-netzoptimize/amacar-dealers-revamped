import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  User,
  Mail,
  Building2,
  MessageSquare,
  Calendar,
  Phone,
  AlertTriangle,
} from "lucide-react";
import { toast } from "react-hot-toast";

const ApproveSubscriptionCancellationRequestsModal = ({
  isOpen,
  onClose,
  onApprove,
  requestData,
  loading = false,
}) => {
  const [adminNotes, setAdminNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when modal opens/closes
  React.useEffect(() => {
    if (isOpen) {
      setAdminNotes("");
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handleApprove = async () => {
    if (!adminNotes.trim()) {
      toast.error("Please provide admin notes before approving");
      return;
    }

    setIsSubmitting(true);
    try {
      await onApprove(requestData?.dealer_id, adminNotes);
      toast.success("Cancellation request approved successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to approve cancellation request");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  if (!requestData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
            <CheckCircle className="w-6 h-6 text-green-600" />
            Approve Cancellation Request
          </DialogTitle>
          <DialogDescription>
            Review the cancellation request details and provide admin notes before approving.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Dealer Information */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              Dealer Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Dealer Name</Label>
                  <p className="text-gray-900 font-medium">{requestData.dealer_name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Email</Label>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-900">{requestData.dealer_email}</p>
                  </div>
                </div>
                
              </div>
              <div className="space-y-3">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Dealership</Label>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-900">{requestData.dealership_name}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Request Date</Label>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-900">{requestData.formatted_request_date}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* Cancellation Message */}
          <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl p-4 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-gray-600" />
              Cancellation Message
            </h3>
            <div className="bg-white rounded-lg p-3 border border-gray-200">
              <p className="text-gray-700 text-sm leading-relaxed">
                {requestData.cancellation_message || "No message provided"}
              </p>
            </div>
          </div>

          {/* Admin Notes */}
          <div className="space-y-3">
            <Label htmlFor="adminNotes" className="text-sm font-medium text-gray-700">
              Admin Notes <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="adminNotes"
              placeholder="Provide notes about why this cancellation request is being approved..."
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              className="min-h-[100px] resize-none"
              disabled={isSubmitting}
            />
        
          </div>
        </div>

        <DialogFooter className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleApprove}
            disabled={isSubmitting || !adminNotes.trim()}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Approving...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Approve Request
              </div>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApproveSubscriptionCancellationRequestsModal;
