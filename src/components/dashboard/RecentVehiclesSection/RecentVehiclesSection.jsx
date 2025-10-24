import { motion } from 'framer-motion';
import { ArrowRight, RefreshCw } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { getRecentVehicles } from '../../../lib/api';
import VehicleCard from '../VehicleCard/VehicleCard';
import RecentActivity from '../RecentActivity/RecentActivity';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const RecentVehiclesSection = () => {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch recent vehicles from API
  const fetchRecentVehicles = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await getRecentVehicles(6);
      
      // Handle different response structures
      const vehiclesData = response.data || response;
      
      if (vehiclesData && Array.isArray(vehiclesData)) {
        console.log("vehiclesData", vehiclesData)
        // Transform API response to match VehicleCard expected format
        const transformedVehicles = vehiclesData.map((vehicle, index) => {
          // Ensure we're working with a proper object
          if (typeof vehicle !== 'object' || vehicle === null) {
            console.warn('Invalid vehicle data:', vehicle);
            return {
              id: index + 1,
              name: 'Unknown Vehicle',
              status: 'Live',
              cashOffer: 0,
              timeLeft: 'N/A',
              images: ['https://images.unsplash.com/photo-1549317336-206569e8475c?w=500&h=300&fit=crop']
            };
          }
          
          return {
            id: vehicle.id || index + 1,
            name: String(vehicle.title || `${vehicle.year || ''} ${vehicle.make || ''} ${vehicle.model || ''}`.trim() || 'Vehicle'),
            isPassed: vehicle.is_passed,
            highestBid: vehicle.highest_bid,
            status: String(vehicle.auction_status || vehicle.status || 'Live'),
            cashOffer: Number(vehicle.cash_offer || vehicle.current_bid || 0),
            timeLeft: String(vehicle.time_remaining || vehicle.time_left || vehicle.timeLeft || 'N/A'),
            images: Array.isArray(vehicle.images) 
              ? vehicle.images.map(img => typeof img === 'string' ? img : img.url).filter(Boolean)
              : (vehicle.primary_image ? [String(vehicle.primary_image)] : []) || [
              'https://images.unsplash.com/photo-1549317336-206569e8475c?w=500&h=300&fit=crop'
            ]
          };
        });
        
        setVehicles(transformedVehicles);
      } else {
        throw new Error('Invalid response format - expected array of vehicles');
      }
    } catch (err) {
      console.error('Error fetching recent vehicles:', err);
      setError(err.message);
      
      // Fallback to empty array on error
      setVehicles([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentVehicles();
  }, []);


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

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="w-full pt-4 sm:pt-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-1">Recent Vehicles</h2>
            <p className="text-sm sm:text-base text-neutral-600">Discover the latest auction vehicles</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="cursor-pointer px-4 sm:px-8 py-2 sm:py-3 text-xs sm:text-sm font-medium hover:bg-primary-50 hover:border-primary-300 transition-all duration-200 w-full sm:w-auto"
            onClick={() => navigate('/live-auctions')}
          >
            View All Vehicles
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
          </Button>
        </div>

        {/* Loading Grid */}
        <div className="space-y-6">
          {/* Mobile and Tablet Layout: Stacked */}
          <div className="block 2xl:hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-neutral-200 p-3 sm:p-4 animate-pulse">
                  <div className="space-y-3">
                    <div className="h-32 sm:h-48 bg-neutral-200 rounded-lg"></div>
                    <div className="space-y-2">
                      <div className="h-3 sm:h-4 bg-neutral-200 rounded w-3/4"></div>
                      <div className="h-3 sm:h-4 bg-neutral-200 rounded w-1/2"></div>
                      <div className="h-4 sm:h-6 bg-neutral-200 rounded w-1/3"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <RecentActivity />
          </div>

          {/* Large Desktop Layout: Side by Side */}
          <div className="hidden 2xl:grid grid-cols-4 gap-6">
            <div className="col-span-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm border border-neutral-200 p-3 sm:p-4 animate-pulse">
                    <div className="space-y-3">
                      <div className="h-32 sm:h-48 bg-neutral-200 rounded-lg"></div>
                      <div className="space-y-2">
                        <div className="h-3 sm:h-4 bg-neutral-200 rounded w-3/4"></div>
                        <div className="h-3 sm:h-4 bg-neutral-200 rounded w-1/2"></div>
                        <div className="h-4 sm:h-6 bg-neutral-200 rounded w-1/3"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-span-1">
              <RecentActivity />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full pt-4 sm:pt-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-1">Recent Vehicles</h2>
            <p className="text-sm sm:text-base text-neutral-600">Discover the latest auction vehicles</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchRecentVehicles}
              disabled={isLoading}
              className="flex items-center gap-2 text-xs sm:text-sm"
            >
              <RefreshCw className={`w-3 h-3 sm:w-4 sm:h-4 ${isLoading ? 'animate-spin' : ''}`} />
              {isLoading ? 'Retrying...' : 'Retry'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer px-4 sm:px-8 py-2 sm:py-3 text-xs sm:text-sm font-medium hover:bg-primary-50 hover:border-primary-300 transition-all duration-200"
              onClick={() => navigate('/live-auctions')}
            >
              View All Vehicles
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Error Message */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 sm:p-6 text-center">
          <div className="text-red-600 mb-2">
            <h3 className="text-sm sm:text-base font-semibold">Failed to load vehicles</h3>
            <p className="text-xs sm:text-sm text-red-500 mt-1">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="w-full pt-4 sm:pt-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Section Header */}
      <motion.div 
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-4"
        variants={sectionVariants}
      >
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-1">Recent Vehicles</h2>
          <p className="text-sm sm:text-base text-neutral-600">Discover the latest auction vehicles</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="h-12 cursor-pointer px-4 sm:px-8 py-2 sm:py-3 text-xs sm:text-sm font-medium hover:bg-primary-50 hover:border-primary-300 transition-all duration-200 w-full sm:w-auto"
          onClick={() => navigate('/live-auctions')}
        >
          View All Vehicles
          <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
        </Button>
      </motion.div>

      {/* Main Content Grid */}
      <div className="space-y-6">
        {/* Mobile and Tablet Layout: Stacked */}
        <div className="block 2xl:hidden">
          {/* Vehicle Cards */}
          <motion.div 
            className="mb-6"
            variants={sectionVariants}
          >
            {vehicles.length === 0 ? (
              <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 sm:p-6 text-center">
                <div className="text-neutral-600">
                  <h3 className="text-sm sm:text-base font-semibold">No vehicles available</h3>
                  <p className="text-xs sm:text-sm text-neutral-500 mt-1">Recent vehicles will appear here once data is available.</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {vehicles.slice(0, 6).map((vehicle, index) => (
                  <motion.div
                    key={vehicle.id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 0.5,
                          delay: index * 0.1
                        }
                      }
                    }}
                  >
                    <VehicleCard 
                      vehicle={vehicle}
                      onBidRefresh={fetchRecentVehicles}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Recent Activity */}
          <motion.div 
            variants={sectionVariants}
          >
            <RecentActivity />
          </motion.div>
        </div>

        {/* Large Desktop Layout: Side by Side */}
        <div className="hidden 2xl:grid grid-cols-4 gap-6">
          {/* Left Section - Vehicle Cards */}
          <motion.div 
            className="col-span-3"
            variants={sectionVariants}
          >
            {vehicles.length === 0 ? (
              <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 sm:p-6 text-center">
                <div className="text-neutral-600">
                  <h3 className="text-sm sm:text-base font-semibold">No vehicles available</h3>
                  <p className="text-xs sm:text-sm text-neutral-500 mt-1">Recent vehicles will appear here once data is available.</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {vehicles.slice(0, 6).map((vehicle, index) => (
                  <motion.div
                    key={vehicle.id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 0.5,
                          delay: index * 0.1
                        }
                      }
                    }}
                  >
                    <VehicleCard 
                      vehicle={vehicle}
                      onBidRefresh={fetchRecentVehicles}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Right Section - Recent Activity */}
          <motion.div 
            className="col-span-1"
            variants={sectionVariants}
          >
            <RecentActivity />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default RecentVehiclesSection;
