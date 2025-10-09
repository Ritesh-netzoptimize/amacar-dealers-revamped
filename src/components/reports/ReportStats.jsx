import { motion } from 'framer-motion';
import { Gavel, DollarSign, Clock, Flame, XCircle, Users, Car, Target } from 'lucide-react';
import StatsCard from '../common/StatsCard/StatsCard';
import { getSummaryReport } from '@/lib/api';
import { useState, useEffect } from 'react';

const ReportStats = ({ startDate, endDate }) => {
  const [stats, setStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        
        // Use default date range if not provided
        const dateFrom = startDate || '2024-01-01';
        const dateTo = endDate || '2024-12-31';
        
        const response = await getSummaryReport(dateFrom, dateTo);
        
        if (response.success) {
          const sales = response.sales || {};
          const bids = response.bids || {};
          const customers = response.customers || {};
          const vehicles = response.vehicles || {};
          
          setStats([
            { 
              title: 'Total Sales', 
              value: `$${(sales.total_sales || 0).toLocaleString()}`, 
              change: '0%',
              icon: DollarSign
            },
            { 
              title: 'Vehicles Sold', 
              value: sales.vehicles_sold || 0, 
              change: '0%',
              icon: Gavel
            },
            { 
              title: 'Average Sale', 
              value: `$${(sales.average_sale || 0).toLocaleString()}`, 
              change: '0%',
              icon: Clock
            },
            { 
              title: 'Total Bids', 
              value: bids.total_bids || 0, 
              change: '0%',
              icon: Flame
            },
            { 
              title: 'Win Rate', 
              value: `${(bids.win_rate || 0).toFixed(1)}%`, 
              change: '0%',
              icon: Target
            },
            { 
              title: 'Total Customers', 
              value: customers.total_customers || 0, 
              change: '0%',
              icon: Users
            },
          ]);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
        // Fallback to default stats
        setStats([
          { 
            title: 'Total Sales', 
            value: '$0', 
            change: '0%',
            icon: DollarSign
          },
          { 
            title: 'Vehicles Sold', 
            value: 0, 
            change: '0%',
            icon: Gavel
          },
          { 
            title: 'Average Sale', 
            value: '$0', 
            change: '0%',
            icon: Clock
          },
          { 
            title: 'Total Bids', 
            value: 0, 
            change: '0%',
            icon: Flame
          },
          { 
            title: 'Win Rate', 
            value: '0%', 
            change: '0%',
            icon: Target
          },
          { 
            title: 'Total Customers', 
            value: 0, 
            change: '0%',
            icon: Users
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [startDate, endDate]);

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

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 rounded-lg h-24"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
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
  );
};

export default ReportStats;
