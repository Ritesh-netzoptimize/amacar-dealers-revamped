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
            <div className="lg:hidden flex flex-col min-h-full overflow-hidden">
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
              <div className="p-4 sm:p-5 flex flex-col flex-grow min-w-0">
                <div className="space-y-3 sm:space-y-4">
                  <div className="min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold text-neutral-900 mb-2 group-hover:text-orange-600 transition-colors duration-300 truncate">
                      {vehicle.name}
                    </h3>
                    <p className="text-sm text-neutral-500 font-medium truncate">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </p>
                  </div>

                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center justify-between p-2 sm:p-3 border border-neutral-200 rounded-lg hover:border-green-300 transition-colors duration-300 min-w-0">
                      <div className="flex items-center min-w-0 flex-1 mr-2">
                        <DollarSign className="w-4 h-4 mr-2 text-green-600 flex-shrink-0" />
                        <span className="text-sm font-medium text-neutral-600 truncate">
                          Final Price
                        </span>
                      </div>
                      <p className="text-base sm:text-lg font-bold text-green-600 truncate">
                        {vehicle.finalPrice}
                      </p>
                    </div>
                    <div className="flex items-center justify-between p-2 sm:p-3 border border-neutral-200 rounded-lg hover:border-purple-300 transition-colors duration-300 min-w-0">
                      <div className="flex items-center min-w-0 flex-1 mr-2">
                        <Trophy className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" />
                        <span className="text-sm font-medium text-neutral-600 truncate">
                          Sold By
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-green-700 truncate">
                        {userRole === "dealer"
                          ? vehicle.customer?.name || "N/A"
                          : vehicle.wonBy}
                      </p>
                    </div>
                    {/* Bidder Display Name - Only show for dealer role */}
                    {userRole === "dealer" && (
                      <div className="p-2 sm:p-3 border border-neutral-200 rounded-lg hover:border-purple-300 transition-colors duration-300 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center min-w-0 flex-1 mr-2">
                            <User className="w-4 h-4 mr-2 text-purple-600 flex-shrink-0" />
                            <span className="text-sm font-medium text-neutral-600 truncate">
                              Bidder
                            </span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-semibold text-purple-700 truncate">
                            {vehicle.winning_bid?.bidder_display_name || "N/A"}
                          </p>
                          {vehicle.winning_bid?.dealership_name && (
                            <div className="inline-block">
                              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                                {vehicle.winning_bid.dealership_name}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    <div className="flex items-center justify-between p-2 sm:p-3 border border-neutral-200 rounded-lg hover:border-orange-300 transition-colors duration-300 min-w-0">
                      <div className="flex items-center min-w-0 flex-1 mr-2">
                        <Calendar className="w-4 h-4 mr-2 text-orange-600 flex-shrink-0" />
                        <span className="text-sm font-medium text-neutral-600 truncate">
                          Accepted On
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-orange-800 truncate">
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
                    onClick={() => handleScheduleAppointment(vehicle)}
                    className="w-full bg-[var(--brand-orange)] hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Appointment
                  </Button>
                </div>
              </div>
            </div>

            {/* Desktop Layout: Full Width Row */}
            <div className="hidden lg:flex bg-white/90 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              {/* Left Section - Image Gallery (1/8 width) */}
              <div className="w-56 relative rounded-xl relative bg-gradient-to-br from-neutral-50 to-neutral-100 group/image rounded-l-xl overflow-hidden">
                <PhotoSwipeGallery
                  images={vehicle.images}
                  vehicleName={vehicle.name}
                  className="w-full h-full rounded-l-xl"
                  imageClassName="w-full h-full rounded-xl"
                  showOverlay={true}
                  // onImageClick={() => handleViewVehicle(vehicle.id)}
                />
              </div>

              {/* Right Section - Vehicle Information (7/8 width) */}
              <div className="flex-1 px-6 lg:px-8 py-4 flex flex-col justify-between min-w-0">
                {/* Header with Vehicle Title and CTA Buttons */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0 mr-4">
                    <h3 className="text-lg font-semibold text-neutral-800 group-hover:text-orange-500 transition-colors duration-200 truncate">
                      {vehicle.name}
                    </h3>
                    <p className="text-sm text-neutral-500 font-normal truncate">
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

                  <div className="flex gap-2 justify-end items-center flex-shrink-0">
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
                          onClick={() => handleScheduleAppointment(vehicle)}
                          className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-700 rounded-lg cursor-pointer hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 hover:text-orange-700 focus:bg-orange-50 focus:text-orange-700 focus:outline-none transition-all duration-200 group"
                        >
                          <Calendar className="w-4 h-4 text-neutral-500 group-hover:text-orange-600 group-focus:text-orange-600 transition-colors duration-200" />
                          <span>Schedule</span>
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
                  
                  <div className="flex flex-col p-2 lg:p-3 rounded-lg transition-all duration-200 min-w-0">
                    <div className="flex items-center mb-1">
                      <Trophy className="w-3.5 h-3.5 mr-1 text-green-500 flex-shrink-0" />
                      <span className="text-xs font-normal text-neutral-500 truncate">
                        Sold To
                      </span>
                    </div>
                    <p className="text-sm lg:text-base font-semibold text-green-700 truncate">
                      {userRole === "dealer"
                        ? vehicle.customer?.name || "N/A"
                        : vehicle.wonBy}
                    </p>
                  </div>
                  {/* Bidder Display Name - Only show for dealer role */}
                  {userRole === "dealer" && (
                    <div className="flex flex-col p-2 lg:p-3 rounded-lg transition-all duration-200 min-w-0">
                      <div className="flex items-center mb-1">
                        <User className="w-3.5 h-3.5 mr-1 text-purple-400 flex-shrink-0" />
                        <span className="text-xs font-normal text-neutral-500 truncate">
                          Sold to
                        </span>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm lg:text-base font-semibold text-purple-700 truncate">
                          {vehicle?.bidderDisplayName || "N/A"}
                        </p>
                        {console.log(vehicle)}
                        {vehicle?.dealershipName && (
                          <div className="inline-block">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                              {vehicle?.dealershipName}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col p-2 lg:p-3 rounded-lg transition-all duration-200 min-w-0">
                    <div className="flex items-center mb-1">
                      <span className="text-xs font-normal text-neutral-500 truncate">
                        VIN
                      </span>
                    </div>
                    <p
                      className="text-sm lg:text-base font-semibold truncate"
                      title={vehicle.VIN}
                    >
                      {vehicle.VIN}
                    </p>
                  </div>
                  <div className="flex flex-col p-2 lg:p-3 rounded-lg transition-all duration-200 min-w-0">
                    <div className="flex items-center mb-1">
                      <DollarSign className="w-3.5 h-3.5 mr-1 text-neutral-400 flex-shrink-0" />
                      <span className="text-xs font-normal text-neutral-500 truncate">
                        Cash Offer
                      </span>
                    </div>
                    <p className="text-sm lg:text-base font-semibold truncate">
                      {vehicle.cashOffer}
                    </p>
                  </div>
                  <div className="flex flex-col items-end p-2 lg:p-3 rounded-lg transition-all duration-200 min-w-0">
                    <div className="flex items-center mb-1">
                      <DollarSign className="w-3.5 h-3.5 mr-1 text-green-500 flex-shrink-0" />
                      <span className="text-xs font-normal text-neutral-500 truncate">
                        Highest Bid
                      </span>
                    </div>
                    <p className="text-sm lg:text-base font-semibold truncate">
                      {vehicle.highestBid}
                    </p>
                  </div>
                  <div className="flex flex-col items-end p-2 lg:p-3 rounded-lg transition-all duration-200 min-w-0">
                    <div className="flex items-center mb-1">
                      <Calendar className="w-3.5 h-3.5 mr-1 text-orange-500 flex-shrink-0" />
                      <span className="text-xs font-normal text-neutral-500 truncate">
                        Accepted On
                      </span>
                    </div>
                    <p className="text-xs lg:text-sm font-medium text-center truncate">
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
