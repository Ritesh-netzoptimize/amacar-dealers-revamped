import { motion } from "framer-motion";
import { Eye, Gavel, Calendar } from "lucide-react";
import PhotoSwipeGallery from "@/components/ui/PhotoSwipeGallery";
import { Button } from "@/components/ui/button";
import { formatBidAmount, getStatusColor } from "@/lib/utils";
import { useState } from "react";
import BidDialog from "@/components/common/BidDialog/BidDialog";
const VehicleCard = ({ vehicle, onBidSuccess }) => {
  const [isBidDialogOpen, setIsBidDialogOpen] = useState(false);

  const handleBidClick = () => {
    setIsBidDialogOpen(true);
  };

  const handleBidSuccess = (bidAmount) => {
    onBidSuccess?.(vehicle.id, bidAmount);
  };

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden hover:shadow-lg transition-all duration-300 group h-[420px]" // ⬅ increased height
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image Gallery */}
      <div className="relative h-56 bg-neutral-100 group/carousel">
        <PhotoSwipeGallery
          images={vehicle.images}
          vehicleName={vehicle.name}
          className="w-full h-full"
          imageClassName="w-full h-56"
          showOverlay={true}
        />
        {/* Status Badge */}
        <div className="absolute top-3 left-3 z-10">
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
            onClick={() => console.log("View Details:", vehicle.id)}
          >
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Button>

            <Button
              variant="default"
              size="sm"
              className="flex-1 h-10 cursor-pointer bg-[var(--brand-orange)] text-white shadow-sm hover:shadow-md transition-all duration-200 font-medium hover:scale-[1.02] active:scale-[0.98]"
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
