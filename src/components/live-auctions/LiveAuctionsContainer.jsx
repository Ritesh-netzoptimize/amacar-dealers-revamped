import React from 'react';
import { motion } from 'framer-motion';
import { Gavel, X, Eye, Clock, DollarSign } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselDots } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';

const LiveAuctionsContainer = ({ auctions = [] }) => {

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

  const handleBidNow = (vehicleId) => {
    console.log('Bid Now:', vehicleId);
    // TODO: Implement bidding functionality
  };

  const handlePassVehicle = (vehicleId) => {
    console.log('Pass on Vehicle:', vehicleId);
    // TODO: Implement pass functionality
  };

  const handleViewVehicle = (vehicleId) => {
    console.log('View Vehicle:', vehicleId);
    // TODO: Implement view vehicle functionality
  };

  return (
    <motion.div
      className="w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {auctions.map((vehicle) => (
          <motion.div
            key={vehicle.id}
            variants={cardVariants}
            whileHover={{ y: -4, scale: 1.02 }}
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
                    dragFree: false
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
                        <span className="text-sm font-medium text-neutral-600">Cash Offer</span>
                      </div>
                      <p className="text-lg font-bold text-neutral-900">{vehicle.cashOffer}</p>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg hover:border-green-300 transition-colors duration-300">
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-2 text-green-600" />
                        <span className="text-sm font-medium text-neutral-600">Highest Bid</span>
                      </div>
                      <p className="text-lg font-bold text-green-600">{vehicle.highestBid}</p>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg hover:border-orange-300 transition-colors duration-300">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-orange-600" />
                        <span className="text-sm font-medium text-neutral-600">Ends At</span>
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
                      onClick={() => handlePassVehicle(vehicle.id)}
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
                    onClick={() => handleBidNow(vehicle.id)}
                    className="w-full bg-[var(--brand-orange)] hover:bg-[var(--color-primary-600)] text-white font-semibold py-4 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                  >
                    <Gavel className="w-4 h-4 mr-2" />
                    Bid Now
                  </Button>
                </div>
              </div>
            </div>

            {/* Desktop Layout: Split */}
            <div className="hidden lg:flex h-full">
              {/* Left Section - Image Carousel */}
              <div className="w-1/2 relative bg-gradient-to-br from-neutral-50 to-neutral-100">
                <Carousel 
                  className="w-full h-full" 
                  opts={{ 
                    loop: true,
                    align: "start",
                    skipSnaps: false,
                    dragFree: false
                  }}
                >
                  <CarouselContent>
                    {vehicle.images.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="w-full h-[36vh] relative overflow-hidden">
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

              {/* Right Section - Vehicle Information */}
              <div className="w-1/2 p-5 flex flex-col min-h-full bg-white/80 backdrop-blur-sm">
                <div className="space-y-4 flex-grow">
                  <div>
                    <h3 className="text-2xl font-bold text-neutral-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">
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
                        <span className="text-sm font-medium text-neutral-600">Highest Bid</span>
                      </div>
                      <p className="text-lg font-bold text-green-600">{vehicle.highestBid}</p>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg hover:border-orange-300 transition-colors duration-300">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-orange-600" />
                        <span className="text-sm font-medium text-neutral-600">Ends At</span>
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
                      onClick={() => handlePassVehicle(vehicle.id)}
                      className="flex-1 h-12 border-2 border-neutral-200 hover:border-red-300 hover:bg-red-50 text-neutral-700 hover:text-red-600 font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Pass
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleViewVehicle(vehicle.id)}
                      className="flex-1 h-12 border-2 border-neutral-200 hover:border-blue-300 hover:bg-blue-50 text-neutral-700 hover:text-blue-600 font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                  </div>
                  <Button
                    onClick={() => handleBidNow(vehicle.id)}
                    className="w-full h-12 bg-[var(--brand-orange)] hover:bg-[var(--color-primary-600)] text-white font-semibold py-4 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                  >
                    <Gavel className="w-4 h-4 mr-2" />
                    Bid Now
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

    </motion.div>
  );
};

export default LiveAuctionsContainer;