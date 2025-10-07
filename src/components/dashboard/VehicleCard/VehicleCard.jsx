import { motion } from "framer-motion";
import { Eye, Gavel, Calendar } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  // CarouselNext,
  // CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { formatBidAmount, getStatusColor } from "@/lib/utils";
import { useState } from "react";
import BidDialog from "@/components/common/BidDialog/BidDialog";
import { useNavigate } from "react-router-dom";
const VehicleCard = ({ vehicle, onBidSuccess }) => {
  const [isBidDialogOpen, setIsBidDialogOpen] = useState(false);
  const navigate = useNavigate();
  const handleBidClick = () => {
    setIsBidDialogOpen(true);
  };

  const handleBidSuccess = (bidAmount) => {
    onBidSuccess?.(vehicle.id, bidAmount);
  };

  const handleViewClick = () => {
    navigate(`/vehicle-details/${vehicle.id}`, {
      state: {
        productId: vehicle.id,
      },
    });
  };

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden hover:shadow-lg transition-all duration-300 group h-[420px]" // ⬅ increased height
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image Carousel */}
      <div className="relative h-56 bg-neutral-100 group/carousel">
        {" "}
        {/* ⬅ slightly taller image */}
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
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* Navigation Dots */}
    {vehicle.images.length > 1 && (
      <CarouselDots className="absolute bottom-2 left-1/2 -translate-x-1/2" />
    )}
          {/* {vehicle.images.length > 1 && (
            <>
              <CarouselPrevious className="left-3 top-1/2 -translate-y-1/2 h-8 w-8 bg-white/90 hover:bg-white border-0 shadow-lg opacity-100 transition-opacity
 duration-200 hover:scale-110" />
              <CarouselNext className="right-3 top-1/2 -translate-y-1/2 h-8 w-8 bg-white/90 hover:bg-white border-0 shadow-lg opacity-100 transition-opacity
 duration-200 hover:scale-110" />
            </>
          )} */}
        </Carousel>
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
              vehicle.status
            )}`}
          >
            {vehicle.status}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col h-[calc(100%-13rem)]">
        {" "}
        {/* ⬅ flex column for content */}
        {/* Vehicle Info */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-neutral-900 mb-2 line-clamp-1">
            {vehicle.name}
          </h3>

          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-600">Cash offer</span>
              <span className="text-lg font-bold text-neutral-900">
                {formatBidAmount(vehicle.cashOffer)}
              </span>
            </div>

            {vehicle.timeLeft && (
              <div className="flex items-center text-sm text-neutral-500">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{vehicle.timeLeft}</span>
              </div>
            )}
          </div>
        </div>
        {/* Action Buttons pinned bottom */}
        <div className="flex gap-2 mt-auto mb-4">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 h-10 cursor-pointer bg-white hover:bg-neutral-50 border-neutral-200 hover:border-neutral-300 text-neutral-700 hover:text-neutral-900 shadow-sm hover:shadow-md transition-all duration-200 font-medium"
            onClick={handleViewClick}
          >
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Button>

            <Button
              variant="default"
              size="sm"
              className="flex-1 h-10 cursor-pointer bg-[var(--brand-orange)]  text-white shadow-sm hover:shadow-md transition-all duration-200 font-medium hover:scale-[1.02] active:scale-[0.98]"
              onClick={handleBidClick}
            >
              <Gavel className="w-4 h-4 mr-2" />
              Bid Now
            </Button>
        </div>
      </div>

      {/* Bid Dialog */}
      <BidDialog
        isOpen={isBidDialogOpen}
        onClose={() => setIsBidDialogOpen(false)}
        vehicle={vehicle}
        onBidSuccess={handleBidSuccess}
      />
    </motion.div>
  );
};

export default VehicleCard;
