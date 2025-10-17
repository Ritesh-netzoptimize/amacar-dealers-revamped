import { motion } from 'framer-motion';
import { Gavel, DollarSign, Clock, Flame, Users, Target } from 'lucide-react';
import InteractiveStatsCard from '../common/StatsCard/InteractiveStatsCard';
import { useReportData } from '@/hooks/useReportData';

const ReportStats = ({ startDate, endDate, onKPIClick }) => {
  const { stats, isLoading, isChartLoading, activeKPI, handleKPIClick } = useReportData(startDate, endDate);

  // Icon mapping
  const iconMap = {
    'DollarSign': DollarSign,
    'Gavel': Gavel,
    'Clock': Clock,
    'Flame': Flame,
    'Target': Target,
    'Users': Users
  };

  const handleCardClick = async (stat) => {
    // Call the parent's onKPIClick if provided
    if (onKPIClick) {
      onKPIClick(stat);
    }
    
    // Handle the KPI click
    await handleKPIClick(stat.id, stat.title);
  };

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
          key={stat.id || index}
          variants={cardVariants}
          className="relative"
        >
          <InteractiveStatsCard
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={iconMap[stat.icon]}
            isActive={stat.isActive}
            isLoading={isChartLoading && stat.isActive}
            onClick={() => handleCardClick(stat)}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ReportStats;
