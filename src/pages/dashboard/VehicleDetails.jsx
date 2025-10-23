import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Car,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import api from "@/lib/api";
import SingleVehicleDetailsSkeleton from "@/components/skeletons/VehicleDetails/VehicleDetailsSkeleton";
import ImageCarouselAndKeyInfo from "@/components/vehicle-details/ImageCarouselAndKeyInfo";
import MainContent from "@/components/vehicle-details/MainContent";
import BidsSection from "@/components/vehicle-details/BidsSection";
import { Button } from "@/components/ui/button";
import { Gavel } from "lucide-react";
import BidDialog from "@/components/common/BidDialog/BidDialog";
import { canBidPass, getUserPermissions } from "@/utils/rolePermissions";
import { useSelector } from "react-redux";
const VehicleDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const productId = state?.productId;
  const [vehicleData, setVehicleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isBidDialogOpen, setIsBidDialogOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  const { user } = useSelector((state) => state.user);

  const userRole = user?.role;
  const permissions = getUserPermissions(userRole, user);
  const { canBidPass } = permissions;

  // Get current user ID from localStorage or auth context
  const getCurrentUserId = () => {
    try {
      const authUser = localStorage.getItem("authUser");
      if (authUser) {
        const user = JSON.parse(authUser);
        return user.id || user.user_id;
      }
    } catch (error) {
      console.error("Error getting current user ID:", error);
    }
    return null;
  };

  // Filter bids to show only current user's bids
  const filterUserBids = (bids, userId) => {
    if (!bids || !userId) {
      console.log("No bids or userId:", { bids, userId });
      return [];
    }
    const userBids = bids.filter((bid) => bid.bidder_id === userId.toString());
    console.log("Filtered user bids:", { allBids: bids, userId, userBids });
    return userBids;
  };

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

    return days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60;
  };

  // Transform API data to match component expectations
  const transformVehicleData = useCallback((vehicleData, userId) => {
    return {
      basic_info: {
        product_id: vehicleData.basic_info.product_id,
        title: vehicleData.basic_info.title,
        vin: vehicleData.basic_info.vin,
        year: parseInt(vehicleData.basic_info.year),
        make: vehicleData.basic_info.make,
        model: vehicleData.basic_info.model,
        trim: vehicleData.basic_info.trim,
        mileage: parseInt(vehicleData.basic_info.mileage),
        body_type: vehicleData.basic_info.body_type,
        exterior_color: vehicleData.basic_info.exterior_color,
        interior_color: vehicleData.basic_info.interior_color,
        transmission: vehicleData.basic_info.transmission,
        engine_type: vehicleData.basic_info.engine_type,
        powertrain_description: vehicleData.basic_info.powertrain_description,
        features: vehicleData.basic_info.features || [],
      },
      location: {
        city: vehicleData.location.city,
        state: vehicleData.location.state,
        zip_code: vehicleData.location.zip_code,
        coordinates: vehicleData.location.coordinates,
      },
      cash_offer: {
        offer_amount: parseFloat(vehicleData.cash_offer.offer_amount),
        offer_date: vehicleData.cash_offer.offer_date,
        offer_expiration: vehicleData.cash_offer.offer_expiration,
        offer_terms: vehicleData.cash_offer.offer_terms,
        dealers_to_send_details: vehicleData.cash_offer.dealers_to_send_details,
      },
      auction: {
        is_auctionable: vehicleData.auction.is_auctionable,
        is_active: vehicleData.auction.is_active,
        auction_started: vehicleData.auction.auction_started,
        auction_started_at: vehicleData.auction.auction_started_at,
        auction_ends_at: vehicleData.auction.auction_ends_at,
        is_sent_to_salesforce: vehicleData.auction.is_sent_to_salesforce,
        remaining_seconds: vehicleData.auction.remaining_seconds,
        in_working_hours: vehicleData.auction.in_working_hours,
      },
      user: {
        user_id: vehicleData.user.user_id,
        display_name: vehicleData.user.display_name,
        email: vehicleData.user.email,
        first_name: vehicleData.user.first_name,
        last_name: vehicleData.user.last_name,
      },
      condition_assessment: {
        title: vehicleData.condition_assessment.title,
        cosmetic: vehicleData.condition_assessment.cosmetic,
        accident: vehicleData.condition_assessment.accident,
        tread: vehicleData.condition_assessment.tread,
        smoked: vehicleData.condition_assessment.smoked,
        modifications: vehicleData.condition_assessment.modifications,
        warning: vehicleData.condition_assessment.warning,
        features: vehicleData.condition_assessment.features || [],
      },
      bids: filterUserBids(vehicleData.bids || [], userId),
      images:
        vehicleData.images?.map((img) => ({
          url: img.url,
          name: img.name,
          attachment_id: img.attachment_id,
          meta_key: img.meta_key,
        })) || [],
      created_at: vehicleData.created_at,
      updated_at: vehicleData.updated_at,
    };
  }, []);

  const handleBidNow = (vehicle) => {
    setSelectedVehicle(vehicle);
    setIsBidDialogOpen(true);
  };

  const handleCloseBidDialog = () => {
    setIsBidDialogOpen(false);
    setSelectedVehicle(null);
  };

  const handleBidSuccess = (bidAmount) => {
    console.log("Bid successful:", bidAmount);
    // TODO: Update the vehicle's highest bid or handle success
  };

  const handleBidRefresh = async () => {
    console.log("Refreshing vehicle details after bid success...");
    // Re-fetch vehicle details to get updated bid information
    if (productId) {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get(`/vehicle/details/${productId}`);
        
        if (response.data.success) {
          const userId = getCurrentUserId();
          const transformedData = transformVehicleData(
            response.data.vehicle,
            userId
          );
          setVehicleData(transformedData);
          setRemainingTime(
            response.data.vehicle.auction?.remaining_seconds || 0
          );
        }
      } catch (err) {
        console.error("Error refreshing vehicle details:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  // Set current user ID on component mount
  useEffect(() => {
    const userId = getCurrentUserId();
    setCurrentUserId(userId);
  }, []);

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
        const response = await api.get(`/vehicle/details/${productId}`);

        if (response.data.success) {
          // Transform the API response to match the expected structure
          const userId = getCurrentUserId();
          const transformedData = transformVehicleData(
            response.data.vehicle,
            userId
          );
          setVehicleData(transformedData);
          setRemainingTime(
            response.data.vehicle.auction?.remaining_seconds || 0
          );
          console.log("response.data.vehicle", response.data.vehicle);
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
  }, [productId, transformVehicleData]);

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
    if (vehicleData?.auction?.remaining_seconds !== undefined) {
      setRemainingTime(vehicleData.auction.remaining_seconds);
    }
  }, [vehicleData]);

  // Format remaining time
  const formatRemainingTime = (seconds) => {
    if (seconds === undefined || seconds === null) return "N/A";

    if (seconds <= 0) return "Auction Ended";

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
    return <SingleVehicleDetailsSkeleton />;
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
              <div className="flex gap-2 items-center">
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
            </div>
          </motion.div>

          {/* Images Carousel and Key Info Section */}
          <ImageCarouselAndKeyInfo
            images={images}
            auction={auction}
            cash_offer={cash_offer}
            itemVariants={itemVariants}
            formatRemainingTime={formatRemainingTime}
            remainingTime={remainingTime}
            vehicleData={vehicleData}
            onBidNow={handleBidNow}
            onBidRefresh={handleBidRefresh}
            canBidPass={canBidPass}
          />

          {/* Main Content */}
          <MainContent
            basic_info={basic_info}
            location={location}
            condition_assessment={condition_assessment}
            itemVariants={itemVariants}
            bids={bids}
          />

          {/* Bids Section */}
          {bids?.length > 0 ? (
            <BidsSection
              bids={bids}
              itemVariants={itemVariants}
              getBidStatusIcon={getBidStatusIcon}
              getBidStatusText={getBidStatusText}
            />
          ) : (
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8 text-center"
            >
              <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gavel className="w-8 h-8 text-neutral-400" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-2">
                No Bids Yet
              </h3>
              <p className="text-neutral-600 mb-4">
                You haven't placed any bids on this vehicle yet.
              </p>
              {/* <Button
                onClick={() => handleBidNow(vehicleData)}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                <Gavel className="w-4 h-4 mr-2" />
                Place Your First Bid
              </Button> */}
            </motion.div>
          )}
        </motion.div>

        {selectedVehicle && (
          <BidDialog
            isOpen={isBidDialogOpen}
            onClose={handleCloseBidDialog}
            vehicle={selectedVehicle}
            onBidSuccess={handleBidSuccess}
            onRefresh={handleBidRefresh}
            formatRemainingTime={formatRemainingTime}
            remainingTime={remainingTime}
          />
        )}
      </div>
    </div>
  );
};

export default VehicleDetails;
