import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { UserPlus, Mail, Building2, Hash, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import { Button } from "./Button";

const InviteDealershipsModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    dealer_email: "",
    dealership_name: "",
    dealer_code: "",
    first_name: "",
    last_name: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate required fields
      const requiredFields = [
        "dealer_email",
        "dealership_name",
        "dealer_code",
        "first_name",
        "last_name",
      ];

      for (const field of requiredFields) {
        if (!formData[field].trim()) {
          toast.error(`Please fill in ${field.replace("_", " ")}`);
          setLoading(false);
          return;
        }
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.dealer_email)) {
        toast.error("Please enter a valid email address");
        setLoading(false);
        return;
      }

      // Here you would typically make an API call to invite the dealership
      // For now, we'll simulate the API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Dealership invitation sent successfully!");
      
      // Reset form and close modal
      setFormData({
        dealer_email: "",
        dealership_name: "",
        dealer_code: "",
        first_name: "",
        last_name: "",
      });
      onClose();
    } catch (error) {
      console.error("Error sending invitation:", error);
      toast.error("Failed to send invitation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({
        dealer_email: "",
        dealership_name: "",
        dealer_code: "",
        first_name: "",
        last_name: "",
      });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <motion.div
            className="flex items-center gap-3 mb-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <DialogTitle className="text-xl font-semibold text-neutral-900">
                Invite Dealership
              </DialogTitle>
              <DialogDescription className="text-neutral-600">
                Send an invitation to a new dealership partner
              </DialogDescription>
            </div>
          </motion.div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Dealer Email
              </label>
              <input
                type="email"
                name="dealer_email"
                value={formData.dealer_email}
                onChange={handleInputChange}
                placeholder="dealer@example.com"
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                disabled={loading}
                required
              />
            </div>

            {/* Dealership Name Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Dealership Name
              </label>
              <input
                type="text"
                name="dealership_name"
                value={formData.dealership_name}
                onChange={handleInputChange}
                placeholder="ABC Motors"
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                disabled={loading}
                required
              />
            </div>

            {/* Dealer Code Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                <Hash className="w-4 h-4" />
                Dealer Code
              </label>
              <input
                type="text"
                name="dealer_code"
                value={formData.dealer_code}
                onChange={handleInputChange}
                placeholder="ABC001"
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                disabled={loading}
                required
              />
            </div>

            {/* Name Fields Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  First Name
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  placeholder="Neeraj"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  disabled={loading}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Last Name
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  placeholder="Kumar"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  disabled={loading}
                  required
                />
              </div>
            </div>
          </motion.div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={loading}
              className="flex-1 sm:flex-none"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 sm:flex-none bg-orange-500 hover:bg-orange-600 text-white"
            >
              {loading ? (
                <motion.div
                  className="flex items-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending...
                </motion.div>
              ) : (
                <div className="flex items-center gap-2">
                  <UserPlus className="w-4 h-4" />
                  Send Invitation
                </div>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InviteDealershipsModal;
