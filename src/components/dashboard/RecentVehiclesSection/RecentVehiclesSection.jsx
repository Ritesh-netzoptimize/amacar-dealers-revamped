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

  // Handle bid success
  const handleBidSuccess = (vehicleId, bidAmount) => {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    if (vehicle) {
      toast.success(
        `Bid of $${bidAmount.toLocaleString()} placed successfully for ${vehicle.name}!`,
        {
          duration: 4000,
          position: 'top-right',
        }
      );
    }
  };

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
      <div className="w-full">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-1">Recent Vehicles</h2>
            <p className="text-neutral-600">Discover the latest auction vehicles</p>
          </div>
          <Button
            variant="outline"
            size="lg"
            className="px-8 py-3 text-sm font-medium hover:bg-primary-50 hover:border-primary-300 transition-all duration-200"
            onClick={() => navigate('/live-auctions')}
          >
            View All Vehicles
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Loading Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-neutral-200 p-4 animate-pulse">
                  <div className="space-y-3">
                    <div className="h-48 bg-neutral-200 rounded-lg"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
                      <div className="h-4 bg-neutral-200 rounded w-1/2"></div>
                      <div className="h-6 bg-neutral-200 rounded w-1/3"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-1">
            <RecentActivity />
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-1">Recent Vehicles</h2>
            <p className="text-neutral-600">Discover the latest auction vehicles</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchRecentVehicles}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              {isLoading ? 'Retrying...' : 'Retry'}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-3 text-sm font-medium hover:bg-primary-50 hover:border-primary-300 transition-all duration-200"
              onClick={() => navigate('/live-auctions')}
            >
              View All Vehicles
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Error Message */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <div className="text-red-600 mb-2">
            <h3 className="font-semibold">Failed to load vehicles</h3>
            <p className="text-sm text-red-500 mt-1">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Section Header */}
      <motion.div 
        className="flex items-center justify-between mb-6"
        variants={sectionVariants}
      >
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-1">Recent Vehicles</h2>
          <p className="text-neutral-600">Discover the latest auction vehicles</p>
        </div>
        <div className="flex gap-2">

          <Button
            variant="outline"
            size="lg"
            className="px-8 py-3 text-sm font-medium hover:bg-primary-50 hover:border-primary-300 transition-all duration-200"
            onClick={() => navigate('/live-auctions')}
          >
            View All Vehicles
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Section - Vehicle Cards */}
        <motion.div 
          className="lg:col-span-3"
          variants={sectionVariants}
        >
          {vehicles.length === 0 ? (
            <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6 text-center">
              <div className="text-neutral-600">
                <h3 className="font-semibold">No vehicles available</h3>
                <p className="text-sm text-neutral-500 mt-1">Recent vehicles will appear here once data is available.</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
                    onBidSuccess={handleBidSuccess}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Right Section - Recent Activity */}
        <motion.div 
          className="lg:col-span-1"
          variants={sectionVariants}
        >
          <RecentActivity />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RecentVehiclesSection;
