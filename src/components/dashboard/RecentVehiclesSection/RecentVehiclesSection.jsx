import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import VehicleCard from '../VehicleCard/VehicleCard';
import RecentActivity from '../RecentActivity/RecentActivity';
import { Button } from '@/components/ui/button';

const RecentVehiclesSection = () => {
  // Static vehicle data - will replace with API later
  const vehicles = [
    {
      id: 1,
      name: '2014 Jeep Grand Cherokee',
      status: 'Live',
      currentBid: 18500,
      timeLeft: '2h 15m left',
      images: [
        'https://images.unsplash.com/photo-1549317336-206569e8475c?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1549317336-206569e8475c?w=500&h=300&fit=crop&auto=format&q=80',
        'https://images.unsplash.com/photo-1549317336-206569e8475c?w=500&h=300&fit=crop&auto=format&q=80'
      ]
    },
    {
      id: 2,
      name: '2019 BMW X5',
      status: 'Hot',
      currentBid: 42500,
      timeLeft: '45m left',
      images: [
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500&h=300&fit=crop&auto=format&q=80'
      ]
    },
    {
      id: 3,
      name: '2017 Audi A4',
      status: 'Live',
      currentBid: 22500,
      timeLeft: '1d 3h left',
      images: [
        'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=500&h=300&fit=crop&auto=format&q=80',
        'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=500&h=300&fit=crop&auto=format&q=80'
      ]
    },
    {
      id: 4,
      name: '2020 Mercedes-Benz C-Class',
      status: 'Live',
      currentBid: 28500,
      timeLeft: 'Ended',
      images: [
        'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=500&h=300&fit=crop&auto=format&q=80'
      ]
    },
    {
      id: 5,
      name: '2018 Ford F-150',
      status: 'Live',
      currentBid: 32000,
      timeLeft: '5h 30m left',
      images: [
        'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=500&h=300&fit=crop&auto=format&q=80',
        'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=500&h=300&fit=crop&auto=format&q=80'
      ]
    },
    {
      id: 6,
      name: '2016 Honda Accord',
      status: 'Hot',
      currentBid: 15500,
      timeLeft: '1h 20m left',
      images: [
        'https://images.unsplash.com/photo-1549317336-206569e8475c?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1549317336-206569e8475c?w=500&h=300&fit=crop&auto=format&q=80'
      ]
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
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Section - Vehicle Cards */}
        <motion.div 
          className="lg:col-span-3"
          variants={sectionVariants}
        >
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
                <VehicleCard vehicle={vehicle} />
              </motion.div>
            ))}
          </div>

          {/* View All Button */}
          <motion.div 
            className="flex justify-center mt-8"
            variants={sectionVariants}
          >
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-3 text-sm font-medium hover:bg-primary-50 hover:border-primary-300 transition-all duration-200"
              onClick={() => console.log('View All Vehicles')}
            >
              View All Vehicles
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
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
