import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Gavel, X, Eye, Clock, DollarSign, CheckCircle } from "lucide-react";
import PhotoSwipeGallery from "@/components/ui/PhotoSwipeGallery";
import { Button } from "@/components/ui/button";
import BidDialog from "@/components/common/BidDialog/BidDialog";
import PassDialog from "@/components/common/PassDialog/PassDialog";

const LiveAuctionsContainer = ({ 
  auctions = [], 
  onPassUnpassSuccess = () => {} 
}) => {
  const navigate = useNavigate();
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isBidDialogOpen, setIsBidDialogOpen] = useState(false);
  const [isPassDialogOpen, setIsPassDialogOpen] = useState(false);
  const [passDialogMode, setPassDialogMode] = useState('pass'); // 'pass' or 'unpass'

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
    setPassDialogMode('pass');
    setIsPassDialogOpen(true);
  };

  const handleUnpassVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
    setPassDialogMode('unpass');
    setIsPassDialogOpen(true);
  };

  const handlePassSuccess = (vehicle, response) => {
    console.log("Vehicle passed successfully:", vehicle.id, response);
    // Notify parent component to refresh data
    onPassUnpassSuccess();
  };

  const handleUnpassSuccess = (vehicle, response) => {
    console.log("Vehicle unpassed successfully:", vehicle.id, response);
    // Notify parent component to refresh data
    onPassUnpassSuccess();
  };

  const handlePassError = (vehicle, error) => {
    console.error("Error passing vehicle:", vehicle.id, error);
  };

  const handleUnpassError = (vehicle, error) => {
    console.error("Error unpassing vehicle:", vehicle.id, error);
  };

  const handleClosePassDialog = () => {
    setIsPassDialogOpen(false);
    setSelectedVehicle(null);
  };

  const isVehiclePassed = (vehicle) => {
    // Use the is_passed field from the API response
    return vehicle.is_passed === true;
  };

  const handleViewVehicle = (vehicle) => {
    console.log("View Vehicle:", vehicle.id);
    navigate(`/vehicle-details/${vehicle.id}`, { 
      state: { 
        productId: vehicle.id,
        vehicleData: vehicle 
      } 
    });
  };

  useEffect(() => {
    console.log("auctions", auctions);
  }, [auctions]);

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
            className={`bg-white rounded-xl border overflow-hidden transition-all duration-300 group ${
              isVehiclePassed(vehicle)
                ? 'border-gray-300 opacity-75 hover:shadow-md hover:border-gray-400'
                : 'border-neutral-200 hover:shadow-lg hover:border-orange-200'
            }`}
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
                <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${
                  isVehiclePassed(vehicle)
                    ? 'bg-gray-500 text-white'
                    : 'bg-orange-500 text-white'
                }`}>
                  {isVehiclePassed(vehicle) ? 'Passed' : 'Live'}
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
                  
                  {/* Conditional Pass/Unpass Button */}
                  {isVehiclePassed(vehicle) ? (
                    <Button
                      variant="outline"
                      onClick={() => handleUnpassVehicle(vehicle)}
                      className="flex-1 h-9 text-xs border-green-200 hover:border-green-300 hover:bg-green-50 text-green-600 hover:text-green-700 font-medium rounded-lg transition-all duration-200"
                    >
                      <CheckCircle className="w-3.5 h-3.5 mr-1" />
                      Unpass
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={() => handlePassVehicle(vehicle)}
                      className="flex-1 h-9 text-xs border-neutral-200 hover:border-red-300 hover:bg-red-50 text-neutral-600 hover:text-red-600 font-medium rounded-lg transition-all duration-200"
                    >
                      <X className="w-3.5 h-3.5 mr-1" />
                      Pass
                    </Button>
                  )}
                  
                  <Button
                    onClick={() => handleBidNow(vehicle)}
                    disabled={isVehiclePassed(vehicle)}
                    className={`flex-1 h-9 text-xs font-medium rounded-lg transition-all duration-200 ${
                      isVehiclePassed(vehicle)
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-60'
                        : 'bg-orange-500 hover:bg-orange-600 text-white'
                    }`}
                    title={isVehiclePassed(vehicle) ? 'Cannot bid on passed vehicle' : 'Place a bid'}
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

      {/* Pass/Unpass Dialog */}
      {selectedVehicle && (
        <PassDialog
          isOpen={isPassDialogOpen}
          onClose={handleClosePassDialog}
          vehicle={selectedVehicle}
          mode={passDialogMode}
          onSuccess={passDialogMode === 'pass' ? handlePassSuccess : handleUnpassSuccess}
          onError={passDialogMode === 'pass' ? handlePassError : handleUnpassError}
        />
      )}
    </motion.div>
  );
};

export default LiveAuctionsContainer;
