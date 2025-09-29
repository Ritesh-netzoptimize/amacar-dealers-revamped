import { motion } from 'framer-motion';
import { Eye, Gavel, Heart, Calendar } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';

const VehicleCard = ({ vehicle }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'live':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'hot':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'expired':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const formatBidAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden hover:shadow-lg transition-all duration-300 group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image Carousel */}
      <div className="relative h-48 bg-neutral-100 group/carousel">
        <Carousel 
          className="w-full h-full" 
          opts={{ 
            loop: true,
            align: "start",
            skipSnaps: false,
            dragFree: true
          }}
        >
          <CarouselContent>
            {vehicle.images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="w-full h-48 relative overflow-hidden">
                  <img
                    src={image}
                    alt={`${vehicle.name} - Image ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {vehicle.images.length > 1 && (
            <>
              <CarouselPrevious className="left-3 top-1/2 -translate-y-1/2 h-8 w-8 bg-white/90 hover:bg-white border-0 shadow-lg opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-200 hover:scale-110" />
              <CarouselNext className="right-3 top-1/2 -translate-y-1/2 h-8 w-8 bg-white/90 hover:bg-white border-0 shadow-lg opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-200 hover:scale-110" />
            </>
          )}
        </Carousel>
        
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(vehicle.status)}`}>
            {vehicle.status}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Vehicle Name */}
        <h3 className="text-lg font-semibold text-neutral-900 mb-2 line-clamp-1">
          {vehicle.name}
        </h3>

        {/* Bid Information */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-600">Current Bid</span>
            <span className="text-lg font-bold text-neutral-900">
              {formatBidAmount(vehicle.currentBid)}
            </span>
          </div>
          
          {vehicle.timeLeft && (
            <div className="flex items-center text-sm text-neutral-500">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{vehicle.timeLeft}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 h-10 cursor-pointer bg-white hover:bg-neutral-50 border-neutral-200 hover:border-neutral-300 text-neutral-700 hover:text-neutral-900 shadow-sm hover:shadow-md transition-all duration-200 font-medium"
            onClick={() => console.log('View Details:', vehicle.id)}
          >
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Button>
          
          <Button
            variant="default"
            size="sm"
            className="flex-1 h-10 cursor-pointer bg-[var(--brand-orange)] text-white shadow-sm hover:shadow-md transition-all duration-200 font-medium hover:scale-[1.02] active:scale-[0.98]"
            onClick={() => console.log('Bid Now:', vehicle.id)}
          >
            <Gavel className="w-4 h-4 mr-2" />
            Bid Now
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default VehicleCard;
