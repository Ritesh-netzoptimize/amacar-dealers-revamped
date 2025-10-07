import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Eye,
  Clock,
  DollarSign,
  User,
  Trophy,
  Calendar,
  X,
  Gavel,
  MoreHorizontal,
  Car,
  Phone,
} from "lucide-react";
import PhotoSwipeGallery from "@/components/ui/PhotoSwipeGallery";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

const WonAuctionsContainer = ({ auctions = [] }) => {
  const navigate = useNavigate();

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

  const handleViewVehicle = (vehicleId) => {
    navigate(`/vehicle-details/${vehicleId}`, {
      state: {
        productId: vehicleId,
      },
    });
  };

  const handleViewCustomer = (customerId) => {
    navigate(`/customers/${customerId}`);
  };

  const handleScheduleAppointment = () => {
    console.log("handle schedule");
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
              {/* Image Gallery */}
              <div className="relative h-56 bg-gradient-to-br from-neutral-50 to-neutral-100">
                <PhotoSwipeGallery
                  images={vehicle.images}
                  vehicleName={vehicle.name}
                  className="w-full h-full"
                  imageClassName="w-full h-56"
                  showOverlay={true}
                />
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
                          Final Price
                        </span>
                      </div>
                      <p className="text-lg font-bold text-green-600">
                        {vehicle.finalPrice}
                      </p>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg hover:border-blue-300 transition-colors duration-300">
                      <div className="flex items-center">
                        <Trophy className="w-4 h-4 mr-2 text-blue-600" />
                        <span className="text-sm font-medium text-neutral-600">
                          Won By
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-blue-800">
                        {vehicle.wonBy}
                      </p>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg hover:border-orange-300 transition-colors duration-300">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-orange-600" />
                        <span className="text-sm font-medium text-neutral-600">
                          Accepted On
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
                      onClick={() => handleViewCustomer(vehicle.id)}
                      className="flex-1 border-2 border-neutral-200 hover:border-blue-300 hover:bg-blue-50 text-neutral-700 hover:text-blue-600 font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                    >
                      <User className="w-4 h-4 mr-2" />
                      View Customer
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleViewVehicle(vehicle.id)}
                      className="flex-1 border-2 border-neutral-200 hover:border-green-300 hover:bg-green-50 text-neutral-700 hover:text-green-600 font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Vehicle
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Layout: Full Width Row */}
            <div className="hidden lg:flex max-h-[160px] bg-white/90 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              {/* Left Section - Image Gallery (1/8 width) */}
              <div className="w-56 rounded-xl relative bg-gradient-to-br from-neutral-50 to-neutral-100 group/image rounded-l-xl overflow-hidden">
                <PhotoSwipeGallery
                  images={vehicle.images}
                  vehicleName={vehicle.name}
                  className="w-full h-full"
                  imageClassName="w-full h-full rounded-xl"
                  showOverlay={true}
                  // onImageClick={() => handleViewVehicle(vehicle.id)}
                />
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
                  {/* <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      onClick={() => handleViewCustomer(vehicle.id)}
                      className="h-8 px-3 border border-neutral-200 hover:border-orange-200 hover:bg-orange-50/50 text-neutral-600 hover:text-orange-500 font-medium rounded-md text-sm transition-colors duration-200 cursor-pointer"
                    >
                      View Customer
                    </Button>
                    <Button
                      onClick={() => handleViewVehicle(vehicle.id)}
                      className="h-8 px-4 bg-[var(--brand-orange)]  hover:bg-[var(--color-primary-600)] text-white font-medium rounded-md text-sm transition-colors duration-200 cursor-pointer"
                    >
                      View Vehicle
                    </Button>
                  </div> */}

                  <div className="flex gap-2 justify-end items-center">
                    {/* <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleScheduleAppointment(customer.id)}
                      className="h-8 px-3 text-xs bg-white border-2 border-white cursor-pointer hover:bg-white text-[var(--brand-orange)]"
                    >
                      <Calendar className="w-3 h-3 mr-1" />
                      Schedule
                    </Button> */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-neutral-100 cursor-pointer"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="w-56 bg-white border border-neutral-200 rounded-xl shadow-lg p-1 overflow-hidden backdrop-blur-sm bg-opacity-90 z-50"
                      >
                        <DropdownMenuItem
                          onClick={() =>
                            handleViewCustomer(
                              vehicle.customer.id,
                              vehicle.customer.name
                            )
                          }
                          className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-700 rounded-lg cursor-pointer hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 hover:text-orange-700 focus:bg-orange-50 focus:text-orange-700 focus:outline-none transition-all duration-200 group"
                        >
                          <Eye className="w-4 h-4 text-neutral-500 group-hover:text-orange-600 group-focus:text-orange-600 transition-colors duration-200" />
                          <span>View Customer</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleViewVehicle(vehicle.id)}
                          className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-700 rounded-lg cursor-pointer hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 hover:text-orange-700 focus:bg-orange-50 focus:text-orange-700 focus:outline-none transition-all duration-200 group"
                        >
                          <Car className="w-4 h-4 text-neutral-500 group-hover:text-orange-600 group-focus:text-orange-600 transition-colors duration-200" />
                          <span>View Vehicle</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleScheduleAppointment()}
                          className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-700 rounded-lg cursor-pointer hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 hover:text-orange-700 focus:bg-orange-50 focus:text-orange-700 focus:outline-none transition-all duration-200 group"
                        >
                          <Phone className="w-4 h-4 text-neutral-500 group-hover:text-orange-600 group-focus:text-orange-600 transition-colors duration-200" />
                          <span>Schedule</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
                        Won By
                      </span>
                    </div>
                    <p className="text-base font-semibold ">{vehicle.wonBy}</p>
                  </div>
                  <div className="flex flex-col  p-3  rounded-lg transition-all duration-200">
                    <div className="flex items-center mb-1">
                      <DollarSign className="w-3.5 h-3.5 mr-1 text-neutral-400" />
                      <span className="text-xs font-normal text-neutral-500">
                        VIN
                      </span>
                    </div>
                    <p className="text-base font-semibold ">{vehicle.VIN}</p>
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
                      <Calendar className="w-3.5 h-3.5 mr-1 text-orange-500" />
                      <span className="text-xs font-normal text-neutral-500">
                        Accepted On
                      </span>
                    </div>
                    <p className="text-sm font-medium  text-center">
                      {vehicle.acceptedOn}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default WonAuctionsContainer;
