import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Car,
  MapPin,
  DollarSign,
  Clock,
  User,
  Calendar,
  Gavel,
  Image as ImageIcon,
  CheckCircle,
  XCircle,
  AlertCircle,
  Phone,
  Mail,
  Star,
  Award,
  Shield,
  ArrowLeft,
} from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import api from "@/lib/api";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import SingleLiveAuctionSkeleton from "@/components/skeletons/SingleLiveAuction/SingleLiveAuctionSkeleton";
import ImageCarouselAndKeyInfo from "@/components/single-live-auction/ImageCarouselAndKeyInfo";
import MainContent from "@/components/single-live-auction/MainContent";
const SingleLiveAuction = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const productId = state?.productId;
  const [vehicleData, setVehicleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);

  // Parse time remaining string to seconds
  const parseTimeRemaining = (timeString) => {
    if (!timeString) return 0;
    
    // Parse format like "0 days, 6 hours, 4 minutes"
    const daysMatch = timeString.match(/(\d+) days?/);
    const hoursMatch = timeString.match(/(\d+) hours?/);
    const minutesMatch = timeString.match(/(\d+) minutes?/);
    
    const days = daysMatch ? parseInt(daysMatch[1]) : 0;
    const hours = hoursMatch ? parseInt(hoursMatch[1]) : 0;
    const minutes = minutesMatch ? parseInt(minutesMatch[1]) : 0;
    
    return (days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60);
  };

  // Transform API data to match component expectations
  const transformAuctionData = (auctionData) => {
    return {
      basic_info: {
        title: auctionData.title,
        year: parseInt(auctionData.year),
        make: auctionData.make,
        model: auctionData.model,
        trim: "N/A", // Not provided in API
        mileage: parseInt(auctionData.mileage),
        body_type: "N/A", // Not provided in API
        exterior_color: "N/A", // Not provided in API
        interior_color: "N/A", // Not provided in API
        transmission: "N/A", // Not provided in API
        engine_type: "N/A", // Not provided in API
        powertrain_description: "N/A" // Not provided in API
      },
      location: {
        city: "N/A", // Not provided in API
        state: "N/A", // Not provided in API
        zip_code: "N/A" // Not provided in API
      },
      cash_offer: {
        offer_amount: auctionData.cash_offer,
        offer_date: "N/A", // Not provided in API
        offer_expiration: "N/A" // Not provided in API
      },
      auction: {
        is_active: auctionData.auction_status === "active",
        auction_started_at: auctionData.created_at,
        auction_ends_at: auctionData.ends_at,
        remaining_seconds: parseTimeRemaining(auctionData.time_remaining)
      },
      user: {
        name: "N/A", // Not provided in API
        email: "N/A", // Not provided in API
        phone: "N/A" // Not provided in API
      },
      condition_assessment: {
        title: "N/A", // Not provided in API
        cosmetic: "N/A", // Not provided in API
        accident: "N/A", // Not provided in API
        tread: "N/A", // Not provided in API
        smoked: "N/A", // Not provided in API
        modifications: "N/A", // Not provided in API
        warning: "N/A", // Not provided in API
        features: "N/A" // Not provided in API
      },
      bids: [], // Not provided in API
      images: auctionData.images?.map(img => ({
        url: img.url,
        name: img.type,
        attachment_id: img.id
      })) || []
    };
  };

  // Fetch vehicle details
  useEffect(() => {
    console.log("productId", productId);
    const fetchVehicleDetails = async () => {
      if (!productId) {
        setError("No product ID available");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        console.log("productId", productId);
        console.log("before api call");
        const response = await api.get(`/live-auctions/${productId}`);

        if (response.data.success) {
          // Transform the API response to match the expected structure
          const transformedData = transformAuctionData(response.data.auction);
          setVehicleData(transformedData);
          setRemainingTime(parseTimeRemaining(response.data.auction?.time_remaining) || 0);
          console.log("response.data.auction", response.data.auction);
          console.log("transformedData", transformedData);
        } else {
          setError(response.data.message || "Failed to fetch vehicle details");
        }
      } catch (err) {
        console.error("Error fetching vehicle details:", err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to fetch vehicle details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleDetails();
  }, [productId]);

  // Countdown timer effect
  useEffect(() => {
    if (remainingTime === null || remainingTime <= 0) return;

    const timer = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingTime]);

  // Update remaining time when vehicleData changes
  useEffect(() => {
    if (vehicleData?.auction?.remaining_seconds) {
      setRemainingTime(vehicleData.auction.remaining_seconds);
    }
  }, [vehicleData]);

  // Format remaining time
  const formatRemainingTime = (seconds) => {
    if (!seconds) return "N/A";

    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m ${secs}s`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  // Format bid status
  const getBidStatusIcon = (status) => {
    switch (status) {
      case "accepted":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "rejected":
        return <XCircle className="w-4 h-4 text-red-500" />;
      case "pending":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  // Format bid status text
  const getBidStatusText = (status) => {
    switch (status) {
      case "accepted":
        return "Accepted";
      case "rejected":
        return "Rejected";
      case "pending":
        return "Pending";
      default:
        return "Unknown";
    }
  };

  // Container variants for animations
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // Loading state
  if (loading) {
    return (
      <SingleLiveAuctionSkeleton />
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-hero p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Car className="w-12 h-12 text-red-500" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-800 mb-2">
              Error Loading Vehicle Details
            </h3>
            <p className="text-neutral-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // No data state
  if (!vehicleData) {
    return (
      <div className="min-h-screen bg-gradient-hero p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Car className="w-12 h-12 text-neutral-400" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-800 mb-2">
              No Vehicle Data
            </h3>
            <p className="text-neutral-600">
              No vehicle details available for this product.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const {
    basic_info,
    location,
    cash_offer,
    auction,
    user,
    condition_assessment,
    bids,
    images,
  } = vehicleData;

  return (
    <div className="mt-8 lg:mt-16 min-h-screen bg-gradient-hero">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6 sm:space-y-8"
        >
          {/* Header */}
          <motion.div
            variants={itemVariants}
            className="px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-800 mb-2 truncate">
                  {basic_info?.title || "Vehicle Details"}
                </h1>
                <p className="text-neutral-600 text-sm sm:text-base lg:text-lg">
                  Complete vehicle information and auction details
                </p>
              </div>
              <button
                onClick={() => navigate(-1)}
                className="cursor-pointer flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-white hover:bg-neutral-50 border border-neutral-200 rounded-lg shadow-sm transition-colors duration-200 w-full sm:w-auto"
              >
                <ArrowLeft className="w-4 h-4 text-neutral-600" />
                <span className="text-neutral-700 font-medium text-sm sm:text-base">
                  Back
                </span>
              </button>
            </div>
          </motion.div>

          {/* Images Carousel and Key Info Section */}
          <ImageCarouselAndKeyInfo images={images} auction={auction} cash_offer={cash_offer} itemVariants={itemVariants} formatRemainingTime={formatRemainingTime} remainingTime={remainingTime} />

          {/* Main Content */}
          <MainContent basic_info={basic_info} location={location} condition_assessment={condition_assessment} itemVariants={itemVariants} bids={bids} />

          {/* Bids Section */}
          {bids && bids.length > 0 && (
            <motion.div
              variants={itemVariants}
              className="px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8"
            >
              <div className="card p-4 sm:p-6">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <Gavel className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-neutral-800">
                      Bids ({bids.length})
                    </h2>
                    <p className="text-sm sm:text-base text-neutral-600">
                      Current bids on this vehicle
                    </p>
                  </div>
                </div>

                {/* Mobile Card Layout */}
                <div className="block sm:hidden space-y-3">
                  {bids.map((bid, index) => (
                    <div
                      key={bid.id}
                      className="bg-gradient-to-r from-neutral-50 to-neutral-100 p-4 rounded-lg border border-neutral-200"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-lg font-bold text-green-600">
                          {formatCurrency(bid.amount)}
                        </span>
                        <div className="flex items-center gap-2">
                          {getBidStatusIcon(bid.status)}
                          <span className="font-medium text-sm">
                            {getBidStatusText(bid.status)}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-neutral-600">
                            Bidder:
                          </span>
                          <span className="font-semibold text-sm text-neutral-800">
                            {bid.bidder_display_name}
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-sm text-neutral-600">
                            Email:
                          </span>
                          <span className="text-sm text-neutral-600 truncate max-w-[150px]">
                            {bid.bidder_email}
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-sm text-neutral-600">
                            Date:
                          </span>
                          <span className="font-medium text-sm text-neutral-800">
                            {bid.bid_at?.date}
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-sm text-neutral-600">
                            Time:
                          </span>
                          <span className="text-sm text-neutral-600">
                            {bid.bid_at?.time}
                          </span>
                        </div>

                      
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop Table Layout */}
                <div className="hidden sm:block overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-neutral-200">
                        <th className="text-left py-3 sm:py-4 px-2 sm:px-4 font-semibold text-neutral-700 text-xs sm:text-sm">
                          Amount
                        </th>
                        <th className="text-left py-3 sm:py-4 px-2 sm:px-4 font-semibold text-neutral-700 text-xs sm:text-sm">
                          Bidder
                        </th>
                        <th className="text-left py-3 sm:py-4 px-2 sm:px-4 font-semibold text-neutral-700 text-xs sm:text-sm">
                          Status
                        </th>
                        <th className="text-left py-3 sm:py-4 px-2 sm:px-4 font-semibold text-neutral-700 text-xs sm:text-sm">
                          Date & Time
                        </th>
                    
                      </tr>
                    </thead>
                    <tbody>
                      {bids.map((bid) => (
                        <tr
                          key={bid.id}
                          className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors"
                        >
                          <td className="py-3 sm:py-4 px-2 sm:px-4">
                            <span className="text-lg sm:text-xl font-bold text-green-600">
                              {formatCurrency(bid.amount)}
                            </span>
                          </td>
                          <td className="py-3 sm:py-4 px-2 sm:px-4">
                            <div>
                              <p className="font-semibold text-neutral-800 text-xs sm:text-sm">
                                {bid.bidder_display_name}
                              </p>
                              <p className="text-xs sm:text-sm text-neutral-600 truncate max-w-[120px] sm:max-w-none">
                                {bid.bidder_email}
                              </p>
                            </div>
                          </td>
                          <td className="py-3 sm:py-4 px-2 sm:px-4">
                            <div className="flex items-center gap-1 sm:gap-2">
                              {getBidStatusIcon(bid.status)}
                              <span className="font-medium text-xs sm:text-sm">
                                {getBidStatusText(bid.status)}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 sm:py-4 px-2 sm:px-4">
                            <div>
                              <p className="font-medium text-neutral-800 text-xs sm:text-sm">
                                {bid.bid_at?.date}
                              </p>
                              <p className="text-xs sm:text-sm text-neutral-600">
                                {bid.bid_at?.time}
                              </p>
                            </div>
                          </td>
                        
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SingleLiveAuction;
