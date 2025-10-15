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
import CustomerDetailsModal from "@/components/common/CustomerDetailsModal/CustomerDetailsModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const WonAuctionsContainer = ({
  auctions = [],
  onScheduleAppointment = () => {},
  userRole = null,
}) => {
  const navigate = useNavigate();

  // Customer modal state
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [selectedCustomerName, setSelectedCustomerName] = useState("");

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

  const handleViewCustomer = (customerId, customerName = "") => {
    console.log("View customer:", customerId);
    setSelectedCustomerId(customerId);
    setSelectedCustomerName(customerName);
    setIsCustomerModalOpen(true);
  };

  const handleCloseCustomerModal = () => {
    setIsCustomerModalOpen(false);
    setSelectedCustomerId(null);
    setSelectedCustomerName("");
  };

  const handleScheduleAppointment = (vehicle) => {
    console.log("handle schedule for vehicle:", vehicle);
    onScheduleAppointment(vehicle);
  };

  const handleViewAppointment = (vehicle) => {
    console.log("handle view appointment for vehicle:", vehicle);
    // Navigate to appointments page or show appointment details
    // For now, we'll just log it - you can implement navigation as needed
    navigate('/appointments');
  };

  return (
    <motion.div
      className="w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Full Width Rows Layout */}
      <div className="space-y-6 relative">
        {auctions.map((vehicle) => (
          <motion.div
            key={vehicle.id}
            variants={cardVariants}
            className="bg-white rounded-3xl shadow-sm border border-neutral-100 hover:shadow-xl hover:border-neutral-200 transition-all duration-500 group relative"
          >
            {/* Mobile Layout: Stacked */}
            <div className="md:hidden flex flex-col min-h-full overflow-hidden">
              {/* Image Gallery */}
              <div className="relative h-48 sm:h-56 bg-gradient-to-br from-neutral-50 to-neutral-100">
                <PhotoSwipeGallery
                  images={vehicle.images}
                  vehicleName={vehicle.name}
                  className="w-full h-full"
                  imageClassName="w-full h-full object-cover"
                  showOverlay={true}
                />
              </div>

              {/* Vehicle Information */}
              <div className="p-4 sm:p-5 flex flex-col flex-grow min-w-0">
                <div className="space-y-3 sm:space-y-4">
                  <div className="min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold text-neutral-900 mb-2 group-hover:text-orange-600 transition-colors duration-300 break-words">
                      {vehicle.name}
                    </h3>
                    <p className="text-sm text-neutral-500 font-medium break-words">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </p>
                  </div>

                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border border-neutral-200 rounded-lg hover:border-green-300 transition-colors duration-300 min-w-0 gap-2">
                      <div className="flex items-center min-w-0 flex-1">
                        <DollarSign className="w-4 h-4 mr-2 text-green-600 flex-shrink-0" />
                        <span className="text-sm font-medium text-neutral-600">
                          Final Price
                        </span>
                      </div>
                      <p className="text-base sm:text-lg font-bold text-green-600 break-words text-right sm:text-left">
                        {vehicle.finalPrice}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border border-neutral-200 rounded-lg hover:border-purple-300 transition-colors duration-300 min-w-0 gap-2">
                      <div className="flex items-center min-w-0 flex-1">
                        <Trophy className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" />
                        <span className="text-sm font-medium text-neutral-600">
                          Sold By
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-green-700 break-words text-right sm:text-left">
                        {userRole === "dealer"
                          ? vehicle.customer?.name || "N/A"
                          : vehicle.wonBy}
                      </p>
                    </div>
                    {/* Bidder Display Name - Only show for dealer role */}
                    {userRole === "dealer" && (
                      <div className="p-3 sm:p-4 border border-neutral-200 rounded-lg hover:border-purple-300 transition-colors duration-300 min-w-0">
                        <div className="flex items-center mb-3">
                          <User className="w-4 h-4 mr-2 text-purple-600 flex-shrink-0" />
                          <span className="text-sm font-medium text-neutral-600">
                            Sold to
                          </span>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-semibold text-purple-700 break-words">
                            {vehicle.winning_bid?.bidder_display_name || "N/A"}
                          </p>
                          {vehicle.winning_bid?.dealership_name && (
                            <div className="inline-block">
                              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200 break-words">
                                {vehicle.winning_bid.dealership_name}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border border-neutral-200 rounded-lg hover:border-orange-300 transition-colors duration-300 min-w-0 gap-2">
                      <div className="flex items-center min-w-0 flex-1">
                        <Calendar className="w-4 h-4 mr-2 text-orange-600 flex-shrink-0" />
                        <span className="text-sm font-medium text-neutral-600">
                          Accepted On
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-orange-800 break-words text-right sm:text-left">
                        {vehicle.endsAt}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border border-neutral-200 rounded-lg hover:border-blue-300 transition-colors duration-300 min-w-0 gap-2">
                      <div className="flex items-center min-w-0 flex-1">
                        <span className="text-sm font-medium text-neutral-600">
                          VIN
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-neutral-700 break-words text-right sm:text-left" title={vehicle.VIN}>
                        {vehicle.VIN}
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons - Pinned to Bottom */}
                <div className="space-y-3 pt-5 mt-auto">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      variant="outline"
                      onClick={() =>
                        handleViewCustomer(
                          vehicle.customer?.id,
                          vehicle.customer?.name
                        )
                      }
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
                  <Button
                    onClick={() => 
                      vehicle.appointmentScheduled 
                        ? handleViewAppointment(vehicle)
                        : handleScheduleAppointment(vehicle)
                    }
                    className={`w-full font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 cursor-pointer ${
                      vehicle.appointmentScheduled
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-[var(--brand-orange)] hover:bg-orange-600 text-white"
                    }`}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    {vehicle.appointmentScheduled ? "See Appointment" : "Schedule Appointment"}
                  </Button>
                </div>
              </div>
            </div>

            {/* Tablet Layout: Horizontal with Image */}
            <div className="hidden md:flex lg:hidden bg-white/90 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              {/* Left Section - Image Gallery */}
              <div className="w-40 relative rounded-xl relative bg-gradient-to-br from-neutral-50 to-neutral-100 group/image rounded-l-xl overflow-hidden flex-shrink-0">
                <PhotoSwipeGallery
                  images={vehicle.images}
                  vehicleName={vehicle.name}
                  className="w-full h-full rounded-l-xl"
                  imageClassName="w-full h-full object-cover rounded-xl"
                  showOverlay={true}
                />
              </div>

              {/* Right Section - Vehicle Information */}
              <div className="flex-1 px-4 py-4 flex flex-col justify-between min-w-0">
                {/* Header with Vehicle Title and CTA Buttons */}
                <div className="flex items-start justify-between mb-4 gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-neutral-800 group-hover:text-orange-500 transition-colors duration-200 break-words">
                      {vehicle.name}
                    </h3>
                    <p className="text-sm text-neutral-500 font-normal break-words">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </p>
                  </div>

                  <div className="flex gap-2 justify-end items-center flex-shrink-0">
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
                        side="bottom"
                        sideOffset={4}
                        className="w-56 bg-white border border-neutral-200 rounded-xl shadow-lg p-1 overflow-hidden backdrop-blur-sm bg-opacity-90"
                      >
                        <DropdownMenuItem
                          onClick={() =>
                            handleViewCustomer(
                              vehicle.customer?.id,
                              vehicle.customer?.name
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
                          onClick={() => 
                            vehicle.appointmentScheduled 
                              ? handleViewAppointment(vehicle)
                              : handleScheduleAppointment(vehicle)
                          }
                          className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg cursor-pointer focus:outline-none transition-all duration-200 group ${
                            vehicle.appointmentScheduled
                              ? "text-green-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-green-100 hover:text-green-800 focus:bg-green-50 focus:text-green-800"
                              : "text-neutral-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 hover:text-orange-700 focus:bg-orange-50 focus:text-orange-700"
                          }`}
                        >
                          <Calendar className={`w-4 h-4 transition-colors duration-200 ${
                            vehicle.appointmentScheduled
                              ? "text-green-500 group-hover:text-green-600 group-focus:text-green-600"
                              : "text-neutral-500 group-hover:text-orange-600 group-focus:text-orange-600"
                          }`} />
                          <span>{vehicle.appointmentScheduled ? "See Appointment" : "Schedule"}</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Auction Details Grid - Bottom */}
                <div
                  className={`grid gap-2 ${
                    userRole === "dealer"
                      ? "grid-cols-2 md:grid-cols-3"
                      : "grid-cols-2 md:grid-cols-3"
                  }`}
                >
                  
                  <div className="flex flex-col p-2 rounded-lg transition-all duration-200 min-w-0">
                    <div className="flex items-center mb-1">
                      <Trophy className="w-3.5 h-3.5 mr-1 text-green-500 flex-shrink-0" />
                      <span className="text-xs font-normal text-neutral-500">
                        Sold By
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-green-700 break-words">
                      {userRole === "dealer"
                        ? vehicle.customer?.name || "N/A"
                        : vehicle.wonBy}
                    </p>
                  </div>
                  {/* Bidder Display Name - Only show for dealer role */}
                  {userRole === "dealer" && (
                    <div className="flex flex-col p-2 rounded-lg transition-all duration-200 min-w-0">
                      <div className="flex items-center mb-1">
                        <User className="w-3.5 h-3.5 mr-1 text-purple-400 flex-shrink-0" />
                        <span className="text-xs font-normal text-neutral-500">
                          Bidder
                        </span>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-purple-700 break-words">
                          {vehicle?.bidderDisplayName || "N/A"}
                        </p>
                        {vehicle?.dealershipName && (
                          <div className="inline-block">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200 break-words">
                              {vehicle?.dealershipName}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col p-2 rounded-lg transition-all duration-200 min-w-0">
                    <div className="flex items-center mb-1">
                      <span className="text-xs font-normal text-neutral-500">
                        VIN
                      </span>
                    </div>
                    <p
                      className="text-sm font-semibold break-words"
                      title={vehicle.VIN}
                    >
                      {vehicle.VIN}
                    </p>
                  </div>
                  <div className="flex flex-col p-2 rounded-lg transition-all duration-200 min-w-0">
                    <div className="flex items-center mb-1">
                      <DollarSign className="w-3.5 h-3.5 mr-1 text-neutral-400 flex-shrink-0" />
                      <span className="text-xs font-normal text-neutral-500">
                        Original Offer
                      </span>
                    </div>
                    <p className="text-sm font-semibold break-words">
                      {vehicle.cashOffer}
                    </p>
                  </div>
                  <div className="flex flex-col items-end p-2 rounded-lg transition-all duration-200 min-w-0">
                    <div className="flex items-center mb-1">
                      <DollarSign className="w-3.5 h-3.5 mr-1 text-green-500 flex-shrink-0" />
                      <span className="text-xs font-normal text-neutral-500">
                        Highest Bid
                      </span>
                    </div>
                    <p className="text-sm font-semibold break-words text-right">
                      {vehicle.highestBid}
                    </p>
                  </div>
                  <div className="flex flex-col items-end p-2 rounded-lg transition-all duration-200 min-w-0">
                    <div className="flex items-center mb-1">
                      <Calendar className="w-3.5 h-3.5 mr-1 text-orange-500 flex-shrink-0" />
                      <span className="text-xs font-normal text-neutral-500">
                        Accepted On
                      </span>
                    </div>
                    <p className="text-xs font-medium text-center break-words">
                      {vehicle.acceptedOn}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Layout: Full Width Row */}
            <div className="hidden lg:flex bg-white/90 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              {/* Left Section - Image Gallery */}
              <div className="w-48 xl:w-56 relative rounded-xl relative bg-gradient-to-br from-neutral-50 to-neutral-100 group/image rounded-l-xl overflow-hidden flex-shrink-0">
                <PhotoSwipeGallery
                  images={vehicle.images}
                  vehicleName={vehicle.name}
                  className="w-full h-full rounded-l-xl"
                  imageClassName="w-full h-full object-cover rounded-xl"
                  showOverlay={true}
                />
              </div>

              {/* Right Section - Vehicle Information */}
              <div className="flex-1 px-4 lg:px-6 xl:px-8 py-2 flex flex-col justify-between min-w-0">
                {/* Header with Vehicle Title and CTA Buttons */}
                <div className="flex items-start justify-between mb-4 gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base lg:text-lg font-semibold text-neutral-800 group-hover:text-orange-500 transition-colors duration-200 break-words">
                      {vehicle.name}
                    </h3>
                    <p className="text-sm text-neutral-500 font-normal break-words">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </p>
                  </div>

                  <div className="flex gap-2 justify-end items-center flex-shrink-0">
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
                        side="bottom"
                        sideOffset={4}
                        className="w-56 bg-white border border-neutral-200 rounded-xl shadow-lg p-1 overflow-hidden backdrop-blur-sm bg-opacity-90"
                      >
                        <DropdownMenuItem
                          onClick={() =>
                            handleViewCustomer(
                              vehicle.customer?.id,
                              vehicle.customer?.name
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
                          onClick={() => 
                            vehicle.appointmentScheduled 
                              ? handleViewAppointment(vehicle)
                              : handleScheduleAppointment(vehicle)
                          }
                          className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg cursor-pointer focus:outline-none transition-all duration-200 group ${
                            vehicle.appointmentScheduled
                              ? "text-green-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-green-100 hover:text-green-800 focus:bg-green-50 focus:text-green-800"
                              : "text-neutral-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 hover:text-orange-700 focus:bg-orange-50 focus:text-orange-700"
                          }`}
                        >
                          <Calendar className={`w-4 h-4 transition-colors duration-200 ${
                            vehicle.appointmentScheduled
                              ? "text-green-500 group-hover:text-green-600 group-focus:text-green-600"
                              : "text-neutral-500 group-hover:text-orange-600 group-focus:text-orange-600"
                          }`} />
                          <span>{vehicle.appointmentScheduled ? "See Appointment" : "Schedule"}</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Auction Details Grid - Bottom */}
                <div
                  className={`grid gap-2 xl:gap-3 ${
                    userRole === "dealer"
                      ? "grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
                      : "grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
                  }`}
                >
                  
                  <div className="flex flex-col justify-center p-2 lg:p-3 rounded-lg transition-all duration-200 min-w-0">
                    <div className="flex items-center mb-1">
                      <Trophy className="w-3.5 h-3.5 mr-1 text-green-500 flex-shrink-0" />
                      <span className="text-xs font-normal text-neutral-500">
                        Sold By
                      </span>
                    </div>
                    <p className="text-sm lg:text-base font-semibold text-green-700 break-words">
                      {userRole === "dealer"
                        ? vehicle.customer?.name || "N/A"
                        : vehicle.wonBy}
                    </p>
                  </div>
                  {/* Bidder Display Name - Only show for dealer role */}
                  {userRole === "dealer" && (
                    <div className="flex flex-col justify-center p-2 lg:p-3 rounded-lg transition-all duration-200 min-w-0">
                      <div className="flex items-center mb-1">
                        <User className="w-3.5 h-3.5 mr-1 text-purple-400 flex-shrink-0" />
                        <span className="text-xs font-normal text-neutral-500">
                          Sold to 
                        </span>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm lg:text-base font-semibold text-purple-700 break-words">
                          {vehicle?.bidderDisplayName || "N/A"}
                        </p>
                        {vehicle?.dealershipName && (
                          <div className="inline-block">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200 break-words">
                              {vehicle?.dealershipName}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col justify-center p-2 lg:p-3 rounded-lg transition-all duration-200 min-w-0">
                    <div className="flex items-center mb-1">
                      <span className="text-xs font-normal text-neutral-500">
                        VIN
                      </span>
                    </div>
                    <p
                      className="text-sm lg:text-base font-semibold break-words"
                      title={vehicle.VIN}
                    >
                      {vehicle.VIN}
                    </p>
                  </div>
                  <div className="flex flex-col justify-center p-2 lg:p-3 rounded-lg transition-all duration-200 min-w-0">
                    <div className="flex items-center mb-1">
                      <DollarSign className="w-3.5 h-3.5 mr-1 text-neutral-400 flex-shrink-0" />
                      <span className="text-xs font-normal text-neutral-500">
                        Original Offer
                      </span>
                    </div>
                    <p className="text-sm lg:text-base font-semibold break-words">
                      {vehicle.cashOffer}
                    </p>
                  </div>
                  <div className="flex flex-col justify-center items-end p-2 lg:p-3 rounded-lg transition-all duration-200 min-w-0">
                    <div className="flex items-center mb-1">
                      <DollarSign className="w-3.5 h-3.5 mr-1 text-green-500 flex-shrink-0" />
                      <span className="text-xs font-normal text-neutral-500">
                        Highest Bid
                      </span>
                    </div>
                    <p className="text-sm lg:text-base font-semibold break-words text-right">
                      {vehicle.highestBid}
                    </p>
                  </div>
                  <div className="flex flex-col justify-center items-end p-2 lg:p-3 rounded-lg transition-all duration-200 min-w-0">
                    <div className="flex items-center mb-1">
                      <Calendar className="w-3.5 h-3.5 mr-1 text-orange-500 flex-shrink-0" />
                      <span className="text-xs font-normal text-neutral-500">
                        Accepted On
                      </span>
                    </div>
                    <p className="text-xs lg:text-sm font-medium text-center break-words">
                      {vehicle.acceptedOn}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Customer Details Modal */}
      <CustomerDetailsModal
        isOpen={isCustomerModalOpen}
        onClose={handleCloseCustomerModal}
        customerId={selectedCustomerId}
        customerName={selectedCustomerName}
      />
    </motion.div>
  );
};

export default WonAuctionsContainer;