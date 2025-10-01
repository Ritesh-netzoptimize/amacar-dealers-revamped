import React, { useState } from "react";
import { motion } from "framer-motion";
import { Gavel, X, Eye, Clock, DollarSign } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselDots,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import BidDialog from "@/components/common/BidDialog/BidDialog";
import PassDialog from "@/components/common/PassDialog/PassDialog";

const LiveAuctionsContainer = ({ auctions = [] }) => {
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

  const handleViewVehicle = (vehicleId) => {
    console.log("View Vehicle:", vehicleId);
    // TODO: Implement view vehicle functionality
  };

  return (
    <motion.div
      className="w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Full Width Rows Layout */}
      <div className="space-y-6">
        {auctions.map((vehicle) => (
          <motion.div
            key={vehicle.id}
            variants={cardVariants}
            className="bg-white rounded-3xl shadow-sm border border-neutral-100 overflow-hidden hover:shadow-xl hover:border-neutral-200 transition-all duration-500 group"
          >
            {/* Mobile Layout: Stacked */}
            <div className="lg:hidden flex flex-col min-h-full">
              {/* Image Carousel */}
              <div className="relative h-56 bg-gradient-to-br from-neutral-50 to-neutral-100">
                <Carousel
                  className="w-full h-full"
                  opts={{
                    loop: true,
                    align: "start",
                    skipSnaps: false,
                    dragFree: false,
                  }}
                >
                  <CarouselContent>
                    {vehicle.images.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="w-full h-56 relative overflow-hidden">
                          <img
                            src={image}
                            alt={`${vehicle.name} - Image ${index + 1}`}
                            className="w-full h-full object-cover object-center"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  {vehicle.images.length > 1 && (
                    <CarouselDots className="absolute bottom-3 left-1/2 -translate-x-1/2" />
                  )}
                </Carousel>
              </div>

              {/* Vehicle Information */}
              <div className="p-5 flex flex-col flex-grow">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                      {vehicle.name}
                    </h3>
                    <p className="text-sm text-neutral-500 font-medium">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg hover:border-orange-300 transition-colors duration-300">
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-2 text-neutral-600" />
                        <span className="text-sm font-medium text-neutral-600">
                          Cash Offer
                        </span>
                      </div>
                      <p className="text-lg font-bold text-neutral-900">
                        {vehicle.cashOffer}
                      </p>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg hover:border-green-300 transition-colors duration-300">
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-2 text-green-600" />
                        <span className="text-sm font-medium text-neutral-600">
                          Highest Bid
                        </span>
                      </div>
                      <p className="text-lg font-bold text-green-600">
                        {vehicle.highestBid}
                      </p>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg hover:border-orange-300 transition-colors duration-300">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-orange-600" />
                        <span className="text-sm font-medium text-neutral-600">
                          Ends At
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-orange-800">
                        {vehicle.endsAt}
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons - Pinned to Bottom */}
                <div className="space-y-3 pt-5 mt-auto">
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => handlePassVehicle(vehicle)}
                      className="flex-1 border-2 border-neutral-200 hover:border-red-300 hover:bg-red-50 text-neutral-700 hover:text-red-600 font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Pass
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleViewVehicle(vehicle.id)}
                      className="flex-1 border-2 border-neutral-200 hover:border-blue-300 hover:bg-blue-50 text-neutral-700 hover:text-blue-600 font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                  </div>
                  <Button
                    onClick={() => handleBidNow(vehicle)}
                    className="w-full bg-[var(--brand-orange)] hover:bg-[var(--color-primary-600)] text-white font-semibold py-4 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                  >
                    <Gavel className="w-4 h-4 mr-2" />
                    Bid Now
                  </Button>
                </div>
              </div>
            </div>

            {/* Desktop Layout: Full Width Row */}
            <div className="hidden lg:flex min-h-[180px] bg-white/90 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              {/* Left Section - Image Carousel (1/8 width) */}
              <div className="w-1/8 relative bg-gradient-to-br from-neutral-50 to-neutral-100 group/image rounded-l-xl overflow-hidden">
                <Carousel
                  className="w-full h-full"
                   opts={{
                    loop: true,
                    align: "start",
                    skipSnaps: false,
                    dragFree: false,
                  }}
                >
                  <CarouselContent>
                    {vehicle.images.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="w-full h-[180px] relative overflow-hidden cursor-pointer">
                          <img
                            src={image}
                            alt={`${vehicle.name} - Image ${index + 1}`}
                            className="w-full h-full object-cover object-center"
                            onClick={() => handleViewVehicle(vehicle.id)}
                          />
                          {/* Overlay for better UX */}
                          <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/40 transition-all duration-300 flex items-center justify-center">
                            <div className="opacity-0 group-hover/image:opacity-100 transition-opacity duration-200">
                              <div
                                className="flex items-center gap-1.5 cursor-pointer"
                                onClick={() => handleViewVehicle(vehicle.id)}
                              >
                                <Eye className="w-3.5 h-3.5 text-white" />
                                <span className="text-white text-sm font-medium tracking-wide">
                                  View
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  {vehicle.images.length > 1 && (
                    <CarouselDots className="absolute bottom-2 left-1/2 -translate-x-1/2" />
                  )}
                </Carousel>
              </div>

              {/* Right Section - Vehicle Information (7/8 width) */}
              <div className="w-7/8 px-8 py-4 flex flex-col justify-between">
                {/* Header with Vehicle Title and CTA Buttons */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-800 group-hover:text-orange-500 transition-colors duration-200">
                      {vehicle.name}
                    </h3>
                    <p className="text-sm text-neutral-500 font-normal">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </p>
                  </div>

                  {/* CTA Buttons - Top Right */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      onClick={() => handlePassVehicle(vehicle)}
                      className="h-8 px-3 border border-neutral-200 hover:border-red-200 hover:bg-red-50/50 text-neutral-600 hover:text-red-500 font-medium rounded-md text-sm transition-colors duration-200 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5 mr-1" />
                      Pass
                    </Button>
                    <Button
                      onClick={() => handleBidNow(vehicle)}
                      className="h-8 px-4 bg-[var(--brand-orange)] hover:bg-[var(--color-primary-600)] text-white font-medium rounded-md text-sm transition-colors duration-200 cursor-pointer"
                    >
                      <Gavel className="w-3.5 h-3.5 mr-1" />
                      Bid
                    </Button>
                  </div>
                </div>

                {/* Auction Details Grid - Bottom */}
                <div className="grid grid-cols-5 gap-3 justify-end">
                  <div className="flex flex-col  p-3  rounded-lg transition-all duration-200">
                    <div className="flex items-center mb-1">
                      <DollarSign className="w-3.5 h-3.5 mr-1 text-neutral-400" />
                      <span className="text-xs font-normal text-neutral-500">
                        Cash Offer
                      </span>
                    </div>
                    <p className="text-base font-semibold ">
                      {vehicle.cashOffer}
                    </p>
                  </div>
                  <div className="flex flex-col  p-3  rounded-lg transition-all duration-200">
                    <div className="flex items-center mb-1">
                      <DollarSign className="w-3.5 h-3.5 mr-1 text-neutral-400" />
                      <span className="text-xs font-normal text-neutral-500">
                        Mileage
                      </span>
                    </div>
                    <p className="text-base font-semibold ">
                      {vehicle.mileage}
                    </p>
                  </div>
                  <div className="flex flex-col  p-3  rounded-lg transition-all duration-200">
                    <div className="flex items-center mb-1">
                      <DollarSign className="w-3.5 h-3.5 mr-1 text-neutral-400" />
                      <span className="text-xs font-normal text-neutral-500">
                        VIN
                      </span>
                    </div>
                    <p className="text-base font-semibold ">
                      {vehicle.VIN}
                    </p>
                  </div>
                  <div className="flex flex-col items-end p-3 rounded-lg transition-all duration-200">
                    <div className="flex items-center mb-1">
                      <DollarSign className="w-3.5 h-3.5 mr-1 text-green-500" />
                      <span className="text-xs font-normal text-neutral-500">
                        Highest Bid
                      </span>
                    </div>
                    <p className="text-base font-semibold ">
                      {vehicle.highestBid}
                    </p>
                  </div>
                  <div className="flex flex-col items-end p-3 rounded-lg transition-all duration-200">
                    <div className="flex items-center mb-1">
                      <Clock className="w-3.5 h-3.5 mr-1 text-orange-500" />
                      <span className="text-xs font-normal text-neutral-500">
                        Ends At
                      </span>
                    </div>
                    <p className="text-sm font-medium  text-center">
                      {vehicle.endsAt}
                    </p>
                  </div>
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
