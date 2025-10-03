import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const StatsCard = ({ 
  title, 
  value, 
  change, 
  icon: Icon 
}) => {
  // Parse change value to determine trend
  const changeValue = typeof change === 'string' ? parseFloat(change.replace('%', '')) : change;
  const isPositive = changeValue > 0;
  const isNegative = changeValue < 0;
  const isNeutral = changeValue === 0;

  // Determine trend icon and colors
  const getTrendIcon = () => {
    if (isPositive) return TrendingUp;
    if (isNegative) return TrendingDown;
    return Minus;
  };

  const getTrendColor = () => {
    if (isPositive) return 'text-emerald-600';
    if (isNegative) return 'text-red-600';
    return 'text-neutral-500';
  };

  const getChangeBgColor = () => {
    if (isPositive) return 'bg-emerald-50';
    if (isNegative) return 'bg-red-50';
    return 'bg-neutral-50';
  };

  const TrendIcon = getTrendIcon();

  return (
    <motion.div 
      className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 hover:shadow-md transition-all duration-200 hover:border-neutral-300"
      whileHover={{ 
        y: -2,
        transition: { duration: 0.2 }
      }}
    >
      <div className="flex items-start justify-between">
        {/* Left side - Content */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          <motion.p 
            className="text-sm font-medium text-neutral-600 mb-2 truncate"
            initial={{ opacity: 0.7 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {title}
          </motion.p>
          
          {/* Value */}
          <motion.p 
            className="text-3xl font-bold text-neutral-900 mb-2"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {value}
          </motion.p>
          
          {/* Change percentage */}
          <motion.div 
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getChangeBgColor()} ${getTrendColor()}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ 
                rotate: isPositive ? [0, -5, 5, 0] : isNegative ? [0, 5, -5, 0] : 0
              }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <TrendIcon className="w-3 h-3 mr-1" />
            </motion.div>
            <span>{change}</span>
          </motion.div>
        </div>

        {/* Right side - Icon (optional) */}
        {Icon && (
          <motion.div 
            className="ml-4 flex-shrink-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
              <Icon className="w-6 h-6 text-primary-600" />
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default StatsCard;
