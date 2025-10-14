import React, { useState } from "react";
import { motion } from "framer-motion";
import { DollarSign, Gavel, Image as ImageIcon, Eye } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import { Button } from "../ui/Button";
import BidDialog from "@/components/common/BidDialog/BidDialog";

const ImageCarouselAndKeyInfo = ({
  images,
  auction,
  cash_offer,
  itemVariants,
  formatRemainingTime,
  remainingTime,
  vehicleData,
  onBidNow,
  canBidPass,
}) => {
  const [isBidDialogOpen, setIsBidDialogOpen] = useState(false);

  const handleBidNow = () => {
    if (onBidNow && vehicleData) {
      onBidNow(vehicleData);
    } else {
      setIsBidDialogOpen(true);
    }
  };

  const handleCloseBidDialog = () => {
    setIsBidDialogOpen(false);
  };

  const handleBidSuccess = (bidAmount) => {
    console.log("Bid successful:", bidAmount);
    setIsBidDialogOpen(false);
  };
  return (
    <div className="px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Images Carousel - Takes 2 columns */}
        {images?.length > 0 ? (
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Gallery>
              <Carousel
                className="shadow-lg w-full"
                opts={{
                  align: "start",
                  loop: true,
                }}
                plugins={
                  [
                    // Autoplay({
                    //   delay: 3000,
                    //   stopOnInteraction: false,
                    //   stopOnMouseEnter: true,
                    // }),
                  ]
                }
              >
                <CarouselContent>
                  {images.map((image, index) => (
                    <CarouselItem key={image.attachment_id || index}>
                      <div className="aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/3] w-full rounded-lg sm:rounded-xl overflow-hidden shadow-sm relative group">
                        <Item
                          original={image.url}
                          thumbnail={image.url}
                          width="1200"
                          height="900"
                          alt={image.name || `Vehicle image ${index + 1}`}
                        >
                          {({ ref, open }) => (
                            <div
                              ref={ref}
                              onClick={open}
                              className="w-full h-full cursor-pointer relative overflow-hidden"
                            >
                              <img
                                src={image.url}
                                alt={image.name || `Vehicle image ${index + 1}`}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                onError={(e) => {
                                  e.target.style.display = "none";
                                  e.target.nextSibling.style.display = "flex";
                                }}
                              />
                              <div
                                className="w-full h-full bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center"
                                style={{ display: "none" }}
                              >
                                <ImageIcon className="w-12 h-12 sm:w-16 sm:h-16 text-neutral-400" />
                              </div>

                              {/* PhotoSwipe overlay */}
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                  <div className="flex items-center gap-1.5">
                                    <Eye className="w-3.5 h-3.5 text-white" />
                                    <span className="text-white text-sm font-medium tracking-wide">
                                      View Gallery
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Image counter */}
                              {images.length > 1 && (
                                <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                                  {index + 1} / {images.length}
                                </div>
                              )}
                            </div>
                          )}
                        </Item>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-1 sm:left-2 bg-white/90 hover:bg-white shadow-lg border-0 cursor-pointer w-8 h-8 sm:w-10 sm:h-10" />
                <CarouselNext className="right-1 sm:right-2 bg-white/90 hover:bg-white shadow-lg border-0 cursor-pointer w-8 h-8 sm:w-10 sm:h-10" />
              </Carousel>
            </Gallery>
          </motion.div>
        ) : (
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/3] w-full bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-lg sm:rounded-xl flex items-center justify-center shadow-sm">
              <div className="text-center">
                <ImageIcon className="w-12 h-12 sm:w-16 sm:h-16 text-neutral-400 mx-auto mb-2 sm:mb-4" />
                <p className="text-neutral-600 text-sm sm:text-base">
                  No images available
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Auction Details and Cash Offer - Takes 1 column */}
        <div className="space-y-4 sm:space-y-6">
          {/* Auction Information */}
          <motion.div variants={itemVariants} className="card p-3 sm:p-4">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Gavel className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-neutral-800">
                  Auction Details
                </h2>
                <p className="text-xs sm:text-sm text-neutral-600">
                  Status and timing
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-3 sm:p-4 rounded-lg">
                <p className="text-xs sm:text-sm font-medium text-neutral-600 mb-2">
                  Status
                </p>
                <span
                  className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                    auction?.is_active
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {auction?.is_active ? "Active" : "Inactive"}
                </span>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 sm:p-4 rounded-lg">
                <p className="text-xs sm:text-sm font-medium text-neutral-600 mb-2">
                  Started
                </p>
                <p className="text-sm sm:text-base font-semibold text-neutral-800 break-words">
                  {auction?.auction_started_at
                    ? formatDate(auction.auction_started_at)
                    : "N/A"}
                </p>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-3 sm:p-4 rounded-lg">
                <p className="text-xs sm:text-sm font-medium text-neutral-600 mb-2">
                  Ends
                </p>
                <p className="text-sm sm:text-base font-semibold text-neutral-800 break-words">
                  {auction?.auction_ends_at
                    ? formatDate(auction.auction_ends_at)
                    : "N/A"}
                </p>
              </div>

              {auction?.is_active && (
                <div className="bg-gradient-to-r from-red-50 to-red-100 p-3 sm:p-4 rounded-lg">
                  <p className="text-xs sm:text-sm font-medium text-neutral-600 mb-2">
                    Time Left
                  </p>
                  <p className="text-sm sm:text-base font-semibold text-neutral-800 font-mono">
                    {formatRemainingTime(remainingTime)}
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Cash Offer - Highlighted */}
          <motion.div
            variants={itemVariants}
            className="card p-3 sm:p-4 bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-200"
          >
            <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4">
              <div className="h-6  sm:h-8 flex items-center justify-center gap-2 ">
                <DollarSign className=" " />
                <h2 className="text-base sm:text-lg font-bold text-neutral-800">
                  Cash Offer
                </h2>
              </div>
              {auction?.is_active && canBidPass && (
                <Button 
                  onClick={handleBidNow}
                  className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-3 py-1.5"
                >
                  Bid now
                </Button>
              )}
            </div>

            <div className="space-y-3">
              <div className="bg-white p-2 sm:p-3 rounded-lg shadow-sm">
                <p className="text-xs font-medium text-neutral-600 mb-1">
                  Offer Amount
                </p>
                <p className="text-lg sm:text-xl font-bold text-orange-600">
                  {cash_offer?.offer_amount
                    ? formatCurrency(cash_offer.offer_amount)
                    : "N/A"}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm">
                  <p className="text-xs sm:text-sm font-medium text-neutral-600 mb-2">
                    Date
                  </p>
                  <p className="text-sm sm:text-base font-semibold text-neutral-800 break-words">
                    {cash_offer?.offer_date
                      ? formatDate(cash_offer.offer_date)
                      : "N/A"}
                  </p>
                </div>

                <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm">
                  <p className="text-xs sm:text-sm font-medium text-neutral-600 mb-2">
                    Expires
                  </p>
                  <p className="text-sm sm:text-base font-semibold text-neutral-800 break-words">
                    {cash_offer?.offer_expiration || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bid Dialog */}
      {vehicleData && (
        <BidDialog
          isOpen={isBidDialogOpen}
          onClose={handleCloseBidDialog}
          vehicle={vehicleData}
          onBidSuccess={handleBidSuccess}
          formatRemainingTime={formatRemainingTime}
          remainingTime={remainingTime}
        />
      )}
    </div>
  );
};

export default ImageCarouselAndKeyInfo;
