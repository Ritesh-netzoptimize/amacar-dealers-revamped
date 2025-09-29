import { motion } from 'framer-motion';
import { Gavel, X, Eye, Clock, DollarSign } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselDots } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';

const LiveAuctions = () => {
  // Static data for now - will replace with API later
  const liveAuctions = [
    { 
      id: 1,
      name: "2014 Jeep Grand Cherokee",
      images: [
        "https://images.unsplash.com/photo-1549317336-206569e8475c?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1549317336-206569e8475c?w=500&h=300&fit=crop&auto=format&q=80",
        "https://images.unsplash.com/photo-1549317336-206569e8475c?w=500&h=300&fit=crop&auto=format&q=80"
      ],
      make: "Jeep",
      model: "Grand Cherokee",
      year: 2014,
      cashOffer: "$7,725",
      highestBid: "$8,200",
      endsAt: "Oct 30, 2025 14:00"
    },
    { 
      id: 2,
      name: "2020 Lexus RX 350",
      images: [
        "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500&h=300&fit=crop&auto=format&q=80"
      ],
      make: "Lexus",
      model: "RX 350",
      year: 2020,
      cashOffer: "$35,000",
      highestBid: "$36,500",
      endsAt: "Oct 31, 2025 16:00"
    },
    { 
      id: 3,
      name: "2019 BMW X5",
      images: [
        "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=500&h=300&fit=crop&auto=format&q=80",
        "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=500&h=300&fit=crop&auto=format&q=80"
      ],
      make: "BMW",
      model: "X5",
      year: 2019,
      cashOffer: "$42,500",
      highestBid: "$44,000",
      endsAt: "Nov 1, 2025 10:00"
    },
    { 
      id: 4,
      name: "2021 Mercedes-Benz C-Class",
      images: [
        "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=500&h=300&fit=crop&auto=format&q=80"
      ],
      make: "Mercedes-Benz",
      model: "C-Class",
      year: 2021,
      cashOffer: "$28,500",
      highestBid: "$29,200",
      endsAt: "Nov 2, 2025 12:00"
    }
  ];

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
        {liveAuctions.map((vehicle) => (
          <motion.div
            key={vehicle.id}
            variants={cardVariants}
            whileHover={{ y: -4, scale: 1.02 }}
            className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            {/* Mobile Layout: Stacked */}
            <div className="lg:hidden">
              {/* Image Carousel */}
              <div className="relative h-64 bg-neutral-100">
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
                        <div className="w-full h-64 relative overflow-hidden">
                          <img
                            src={image}
                            alt={`${vehicle.name} - Image ${index + 1}`}
                            className="w-full h-full object-cover"
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
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-1">
                      {vehicle.name}
                    </h3>
                    <p className="text-sm text-neutral-600">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-neutral-600">Cash Offer</span>
                        <span className="text-lg font-bold text-neutral-900">
                          {vehicle.cashOffer}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-neutral-600">Highest Bid</span>
                        <span className="text-lg font-bold text-green-600">
                          {vehicle.highestBid}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-neutral-500">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>Ends At</span>
                      </div>
                      <p className="text-sm font-medium text-neutral-700">
                        {vehicle.endsAt}
                      </p>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex gap-2 pt-4">
                    <Button
                      onClick={() => handleBidNow(vehicle.id)}
                      className="flex-1 bg-[var(--brand-orange)] hover:bg-[var(--color-primary-600)] text-white"
                    >
                      <Gavel className="w-4 h-4 mr-2" />
                      Bid Now
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handlePassVehicle(vehicle.id)}
                      className="flex-1"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Pass
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleViewVehicle(vehicle.id)}
                      className="flex-1"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Layout: Split */}
            <div className="hidden lg:flex h-80">
              {/* Left Section - Image Carousel */}
              <div className="w-1/2 relative bg-neutral-100">
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
                        <div className="w-full h-80 relative overflow-hidden">
                          <img
                            src={image}
                            alt={`${vehicle.name} - Image ${index + 1}`}
                            className="w-full h-full object-cover"
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
              <div className="w-1/2 p-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-1">
                      {vehicle.name}
                    </h3>
                    <p className="text-sm text-neutral-600">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-neutral-600">Cash Offer</span>
                      <span className="text-lg font-bold text-neutral-900">
                        {vehicle.cashOffer}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-neutral-600">Highest Bid</span>
                      <span className="text-lg font-bold text-green-600">
                        {vehicle.highestBid}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-neutral-500">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>Ends At: {vehicle.endsAt}</span>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={() => handleBidNow(vehicle.id)}
                    className="flex-1 bg-[var(--brand-orange)] hover:bg-[var(--color-primary-600)] text-white"
                  >
                    <Gavel className="w-4 h-4 mr-2" />
                    Bid Now
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handlePassVehicle(vehicle.id)}
                    className="flex-1"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Pass
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleViewVehicle(vehicle.id)}
                    className="flex-1"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Load More Button - Ready for Pagination */}
      <motion.div 
        className="flex justify-center mt-8"
        variants={cardVariants}
      >
        <Button
          variant="outline"
          size="lg"
          className="px-8 py-3 text-sm font-medium hover:bg-neutral-50 transition-colors duration-200"
          onClick={() => console.log('Load More Vehicles')}
        >
          Load More Vehicles
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default LiveAuctions;
