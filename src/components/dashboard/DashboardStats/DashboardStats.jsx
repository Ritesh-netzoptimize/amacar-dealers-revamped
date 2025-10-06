import { motion } from 'framer-motion';
import { Gavel, DollarSign, Clock, Flame, XCircle, RefreshCw } from 'lucide-react';
import { useState, useEffect } from 'react';
import StatsCard from '../../common/StatsCard/StatsCard';
import api from '@/lib/api';

const DashboardStats = () => {
  const [stats, setStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Card configuration mapping API response to UI
  const cardConfig = {
    live_auctions: { 
      title: 'Live Auctions', 
      icon: Gavel,
      change: '0%' // Static for now, can be enhanced later
    },
    total_bids: { 
      title: 'Total Bids', 
      icon: DollarSign,
      change: '0%' // Static for now, can be enhanced later
    },
    expired_bids: { 
      title: 'Expired Bids', 
      icon: Clock,
      change: '0%' // Static for now, can be enhanced later
    },
    hot_bids: { 
      title: 'Hot Bids', 
      icon: Flame,
      change: '0%' // Static for now, can be enhanced later
    },
    lost_bids: { 
      title: 'Lost Bids', 
      icon: XCircle,
      change: '0%' // Static for now, can be enhanced later
    },
  };

  // Dashboard Cards API
  const getDashboardCards = async () => {
    try {
      const response = await api.get('/dashboard/cards');
      return response.data;
    } catch (error) {
      console.error('Error fetching dashboard cards:', error);
      throw error;
    }
};

  // Fetch dashboard cards data
  const fetchDashboardCards = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await getDashboardCards();
      
      if (response.success && response.cards) {
        // Transform API response to stats array
        const transformedStats = Object.entries(response.cards).map(([key, value]) => ({
          title: cardConfig[key]?.title || key,
          value: value,
          change: cardConfig[key]?.change || '0%',
          icon: cardConfig[key]?.icon || Gavel
        }));
        
        setStats(transformedStats);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('Error fetching dashboard cards:', err);
      setError(err.message);
      
      // Fallback to empty stats on error
      setStats([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardCards();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 animate-pulse">
            <div className="space-y-3">
              <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
              <div className="h-8 bg-neutral-200 rounded w-1/2"></div>
              <div className="h-6 bg-neutral-200 rounded w-1/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <div className="text-red-600 mb-2">
          <XCircle className="w-8 h-8 mx-auto mb-2" />
          <h3 className="font-semibold">Failed to load dashboard data</h3>
          <p className="text-sm text-red-500 mt-1">{error}</p>
        </div>
        <button 
          onClick={fetchDashboardCards}
          disabled={isLoading}
          className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          {isLoading ? 'Retrying...' : 'Retry'}
        </button>
      </div>
    );
  }

  // Empty state
  if (stats.length === 0) {
    return (
      <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6 text-center">
        <div className="text-neutral-600">
          <Gavel className="w-8 h-8 mx-auto mb-2" />
          <h3 className="font-semibold">No data available</h3>
          <p className="text-sm text-neutral-500 mt-1">Dashboard cards will appear here once data is available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
   

      {/* Stats cards */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={`${stat.title}-${index}`}
            variants={cardVariants}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.98 }}
          >
            <StatsCard
              title={stat.title}
              value={stat.value}
              change={stat.change}
              icon={stat.icon}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default DashboardStats;
