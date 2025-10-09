import { motion } from 'framer-motion';
import { Gavel, DollarSign, Clock, Flame, XCircle } from 'lucide-react';
import StatsCard from '../common/StatsCard/StatsCard';

const ReportStats = ({ startDate, endDate }) => {
  // Static data for now - will replace with API later
  // TODO: Use startDate and endDate to fetch filtered data
  const stats = [
    { 
      title: 'Purchased', 
      value: 1, 
      change: '0%',
      icon: Gavel
    },
    { 
      title: 'Lost', 
      value: 57, 
      change: '5600%',
      icon: XCircle
    },
    { 
      title: 'Total Bids', 
      value: 15, 
      change: '1400%',
      icon: DollarSign
    },
    { 
      title: 'Appointments', 
      value: 12, 
      change: '100%',
      icon: Flame
    },
    { 
      title: 'Accepted', 
      value: 0, 
      change: '0%',
      icon: Clock
    },
    { 
        title: 'Expired', 
        value: 0, 
        change: '0%',
        icon: XCircle
      },
  ];

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
