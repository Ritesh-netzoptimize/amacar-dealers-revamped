import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Gavel, X, Eye, Clock, DollarSign } from "lucide-react";
import PhotoSwipeGallery from "@/components/ui/PhotoSwipeGallery";
import { Button } from "@/components/ui/button";
import BidDialog from "@/components/common/BidDialog/BidDialog";
import PassDialog from "@/components/common/PassDialog/PassDialog";

const LiveAuctionsContainer = ({ auctions = [] }) => {
  const navigate = useNavigate();
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isBidDialogOpen, setIsBidDialogOpen] = useState(false);
  const [isPassDialogOpen, setIsPassDialogOpen] = useState(false);
  const [passLoading, setPassLoading] = useState(false);
  const [passSuccess, setPassSuccess] = useState(false);
  const [passError, setPassError] = useState(false);
  const [passErrorMessage, setPassErrorMessage] = useState("");

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const handleBidNow = (vehicle) => {
    setSelectedVehicle(vehicle);
    setIsBidDialogOpen(true);
  };

  const handleBidSuccess = (bidAmount) => {
    console.log("Bid successful:", bidAmount);
    // TODO: Update the vehicle's highest bid or handle success
  };

  const handleCloseBidDialog = () => {
    setIsBidDialogOpen(false);
    setSelectedVehicle(null);
  };

  const handlePassVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
    setIsPassDialogOpen(true);
    // Reset states when opening dialog
    setPassLoading(false);
    setPassSuccess(false);
    setPassError(false);
    setPassErrorMessage("");
  };

  const handlePassConfirm = async (vehicle) => {
    setPassLoading(true);
    setPassError(false);
    setPassErrorMessage("");

    try {
      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate 90% success rate
          if (Math.random() > 0.1) {
            resolve();
          } else {
            reject(new Error("Failed to pass vehicle. Please try again."));
          }
        }, 2000);
      });

      setPassSuccess(true);

      // Close dialog after success
      setTimeout(() => {
        handleClosePassDialog();
        // TODO: Remove vehicle from auctions list or update its status
        console.log("Vehicle passed successfully:", vehicle.id);
      }, 1500);
    } catch (error) {
      setPassError(true);
      setPassErrorMessage(error.message);
    } finally {
      setPassLoading(false);
    }
  };

  const handleClosePassDialog = () => {
    setIsPassDialogOpen(false);
    setSelectedVehicle(null);
    setPassLoading(false);
    setPassSuccess(false);
    setPassError(false);
    setPassErrorMessage("");
  };

  const handleViewVehicle = (vehicle) => {
    console.log("View Vehicle:", vehicle.id);
    navigate(`/live-auctions/${vehicle.id}`, { 
      state: { 
        productId: vehicle.id,
        vehicleData: vehicle 
      } 
    });
  };

  return (
    <motion.div
      className="w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Grid Layout for Maximum Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {auctions.map((vehicle) => (
          <motion.div
            key={vehicle.id}
            variants={cardVariants}
            className="bg-white rounded-xl border border-neutral-200 overflow-hidden hover:shadow-lg hover:border-orange-200 transition-all duration-300 group"
          >
            {/* Compact Card Layout */}
            <div className="flex flex-col h-full">
              {/* Image Gallery */}
              <div className="relative h-48 bg-gradient-to-br from-neutral-50 to-neutral-100">
                <PhotoSwipeGallery
                  images={vehicle.images}
                  vehicleName={vehicle.name}
                  className="w-full h-full"
                  imageClassName="w-full h-48 object-cover"
                  showOverlay={true}
                />
                {/* Status Badge */}
                <div className="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                  Live
                </div>
              </div>

              {/* Vehicle Information */}
              <div className="p-4 flex flex-col flex-grow">
                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-1 group-hover:text-orange-600 transition-colors duration-200 line-clamp-2">
                      {vehicle.name}
                    </h3>
                    <p className="text-sm text-neutral-500">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </p>
                  </div>

                  {/* Compact Info Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-neutral-50 rounded-lg p-3">
                      <div className="flex items-center mb-1">
                        <DollarSign className="w-3.5 h-3.5 mr-1.5 text-neutral-500" />
                        <span className="text-xs text-neutral-600">Cash Offer</span>
                      </div>
                      <p className="text-sm font-semibold text-neutral-900">
                        {vehicle.cashOffer}
                      </p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3">
                      <div className="flex items-center mb-1">
                        <DollarSign className="w-3.5 h-3.5 mr-1.5 text-green-600" />
                        <span className="text-xs text-neutral-600">Highest Bid</span>
                      </div>
                      <p className="text-sm font-semibold text-green-700">
                        {vehicle.highestBid}
                      </p>
                    </div>
                  </div>

                  {/* Time Remaining */}
                  <div className="bg-orange-50 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Clock className="w-3.5 h-3.5 mr-1.5 text-orange-600" />
                        <span className="text-xs text-neutral-600">Ends At</span>
                      </div>
                      <p className="text-sm font-semibold text-orange-700">
                        {vehicle.endsAt}
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex gap-2 pt-4 mt-auto">
                  <Button
                    variant="outline"
                    onClick={() => handleViewVehicle(vehicle)}
                    className="flex-1 h-9 text-xs border-neutral-200 hover:border-blue-300 hover:bg-blue-50 text-neutral-600 hover:text-blue-600 font-medium rounded-lg transition-all duration-200"
                  >
                    <Eye className="w-3.5 h-3.5 mr-1" />
                    View
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handlePassVehicle(vehicle)}
                    className="flex-1 h-9 text-xs border-neutral-200 hover:border-red-300 hover:bg-red-50 text-neutral-600 hover:text-red-600 font-medium rounded-lg transition-all duration-200"
                  >
                    <X className="w-3.5 h-3.5 mr-1" />
                    Pass
                  </Button>
                  <Button
                    onClick={() => handleBidNow(vehicle)}
                    className="flex-1 h-9 text-xs bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-all duration-200"
                  >
                    <Gavel className="w-3.5 h-3.5 mr-1" />
                    Bid
                  </Button>
                </div>
              </div>
            </div>

          </motion.div>
        ))}
      </div>

      {/* Bid Dialog */}
      {selectedVehicle && (
        <BidDialog
          isOpen={isBidDialogOpen}
          onClose={handleCloseBidDialog}
          vehicle={selectedVehicle}
          onBidSuccess={handleBidSuccess}
        />
      )}

      {/* Pass Dialog */}
      {selectedVehicle && (
        <PassDialog
          isOpen={isPassDialogOpen}
          onClose={handleClosePassDialog}
          vehicle={selectedVehicle}
          onPassConfirm={handlePassConfirm}
          isLoading={passLoading}
          isSuccess={passSuccess}
          isError={passError}
          errorMessage={passErrorMessage}
        />
      )}
    </motion.div>
  );
};

export default LiveAuctionsContainer;
