import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Clock, DollarSign, User, Trophy, Calendar, MapPin } from 'lucide-react';
import PhotoSwipeGallery from '@/components/ui/PhotoSwipeGallery';
import { Button } from '@/components/ui/button';

const WonAuctionsContainer = ({ auctions = [] }) => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const handleViewVehicle = (vehicleId) => {
    console.log('View Vehicle:', vehicleId);
    // TODO: Implement view vehicle functionality
  };

  const handleViewCustomer = (customerId) => {
    console.log('View Customer:', customerId);
    // TODO: Implement view customer functionality
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
                        <span className="text-sm font-medium text-neutral-600">Cash Offer</span>
                      </div>
                      <p className="text-lg font-bold text-neutral-900">{vehicle.cashOffer}</p>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg hover:border-green-300 transition-colors duration-300">
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-2 text-green-600" />
                        <span className="text-sm font-medium text-neutral-600">Final Price</span>
                      </div>
                      <p className="text-lg font-bold text-green-600">{vehicle.finalPrice}</p>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg hover:border-blue-300 transition-colors duration-300">
                      <div className="flex items-center">
                        <Trophy className="w-4 h-4 mr-2 text-blue-600" />
                        <span className="text-sm font-medium text-neutral-600">Won By</span>
                      </div>
                      <p className="text-sm font-semibold text-blue-800">{vehicle.wonBy}</p>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg hover:border-orange-300 transition-colors duration-300">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-orange-600" />
                        <span className="text-sm font-medium text-neutral-600">Accepted On</span>
                      </div>
                      <p className="text-sm font-semibold text-orange-800">{vehicle.endsAt}</p>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons - Pinned to Bottom */}
                <div className="space-y-3 pt-5 mt-auto">
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => handleViewCustomer(vehicle.wonBy)}
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
            <div className="hidden lg:flex min-h-80">
              {/* Left Section - Image Gallery (1/4 width) */}
              <div className="w-1/4 relative bg-gradient-to-br from-neutral-50 to-neutral-100 group/image">
                <PhotoSwipeGallery
                  images={vehicle.images}
                  vehicleName={vehicle.name}
                  className="w-full h-full"
                  imageClassName="w-full h-80"
                  showOverlay={true}
                  onImageClick={() => handleViewVehicle(vehicle.id)}
                />
              </div>

              {/* Right Section - Vehicle Information (3/4 width) */}
              <div className="w-3/4 p-8 flex flex-col justify-between bg-white/95 backdrop-blur-sm min-h-80">
                {/* Header with Vehicle Title and CTA Buttons */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold text-neutral-800 mb-1 group-hover:text-orange-500 transition-colors duration-300">
                      {vehicle.name}
                    </h3>
                    <p className="text-base text-neutral-400 font-normal">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </p>
                  </div>
                  
                  {/* CTA Buttons - Top Right */}
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      onClick={() => handleViewCustomer(vehicle.wonBy)}
                      className="h-10 px-4 border border-neutral-200 hover:border-blue-200 hover:bg-blue-50 text-neutral-600 hover:text-blue-500 font-medium rounded-lg transition-colors duration-300 cursor-pointer"
                    >
                      <User className="w-4 h-4 mr-1" />
                      View Customer
                    </Button>
                    <Button
                      onClick={() => handleViewVehicle(vehicle.id)}
                      className="h-10 px-5 bg-[var(--brand-orange)] hover:bg-[var(--color-primary-600)] text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-colors duration-300 cursor-pointer"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View Vehicle
                    </Button>
                  </div>
                </div>

                {/* Auction Details Grid - Bottom */}
                <div className="grid grid-cols-4 gap-4 mt-auto">
                  <div className="flex flex-col items-center p-4 border border-neutral-100 rounded-2xl hover:border-orange-200 hover:bg-orange-50/20 transition-all duration-300">
                    <div className="flex items-center mb-2">
                      <DollarSign className="w-4 h-4 mr-2 text-neutral-400" />
                      <span className="text-xs font-normal text-neutral-500">Cash Offer</span>
                    </div>
                    <p className="text-lg font-semibold text-neutral-800">{vehicle.cashOffer}</p>
                  </div>
                  <div className="flex flex-col items-center p-4 border border-neutral-100 rounded-2xl hover:border-green-200 hover:bg-green-50/20 transition-all duration-300">
                    <div className="flex items-center mb-2">
                      <DollarSign className="w-4 h-4 mr-2 text-green-500" />
                      <span className="text-xs font-normal text-neutral-500">Final Price</span>
                    </div>
                    <p className="text-lg font-semibold text-green-600">{vehicle.finalPrice}</p>
                  </div>
                  <div className="flex flex-col items-center p-4 border border-neutral-100 rounded-2xl hover:border-blue-200 hover:bg-blue-50/20 transition-all duration-300">
                    <div className="flex items-center mb-2">
                      <Trophy className="w-4 h-4 mr-2 text-blue-500" />
                      <span className="text-xs font-normal text-neutral-500">Won By</span>
                    </div>
                    <p className="text-sm font-medium text-blue-600 text-center">{vehicle.wonBy}</p>
                  </div>
                  <div className="flex flex-col items-center p-4 border border-neutral-100 rounded-2xl hover:border-orange-200 hover:bg-orange-50/20 transition-all duration-300">
                    <div className="flex items-center mb-2">
                      <Calendar className="w-4 h-4 mr-2 text-orange-500" />
                      <span className="text-xs font-normal text-neutral-500">Accepted On</span>
                    </div>
                    <p className="text-xs font-medium text-orange-600 text-center">{vehicle.endsAt}</p>
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