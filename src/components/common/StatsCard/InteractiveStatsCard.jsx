import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Loader2 } from 'lucide-react';

const InteractiveStatsCard = ({ 
  title, 
  value, 
  change, 
  icon: Icon,
  isActive = false,
  isLoading = false,
  onClick,
  disabled = false
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

  // Card styling based on state
  const getCardStyles = () => {
    if (isActive) {
      return 'bg-primary-50 border-primary-300 shadow-md ring-2 ring-primary-200';
    }
    if (disabled) {
      return 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-60';
    }
    return 'bg-white border-neutral-200 hover:border-primary-300 hover:shadow-md';
  };

  return (
    <motion.button
      className={`
        w-full rounded-xl shadow-sm border p-6 text-left transition-all duration-200
        ${getCardStyles()}
        ${!disabled ? 'hover:scale-[1.02] cursor-pointer' : ''}
        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
      `}
      onClick={onClick}
      disabled={disabled || isLoading}
      whileHover={!disabled && !isLoading ? { 
        y: -2,
        transition: { duration: 0.2 }
      } : {}}
      whileTap={!disabled && !isLoading ? { 
        scale: 0.98,
        transition: { duration: 0.1 }
      } : {}}
      animate={isActive ? {
        scale: [1, 1.02, 1],
        transition: { duration: 0.3 }
      } : {}}
    >
      <div className="flex items-start justify-between">
        {/* Left side - Content */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          <motion.p 
            className={`text-sm font-medium mb-2 truncate ${
              isActive ? 'text-primary-700' : 'text-neutral-600'
            }`}
            initial={{ opacity: 0.7 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {title}
          </motion.p>
          
          {/* Value */}
          <motion.p 
            className={`text-3xl font-bold mb-2 ${
              isActive ? 'text-primary-900' : 'text-neutral-900'
            }`}
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

        {/* Right side - Icon or Loading */}
        <div className="ml-4 flex-shrink-0">
          {isLoading ? (
            <motion.div 
              className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 className="w-6 h-6 text-primary-600" />
            </motion.div>
          ) : Icon ? (
            <motion.div 
              className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                isActive ? 'bg-primary-100' : 'bg-primary-50'
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Icon className={`w-6 h-6 ${
                isActive ? 'text-primary-700' : 'text-primary-600'
              }`} />
            </motion.div>
          ) : null}
        </div>
      </div>

      {/* Active indicator */}
      {isActive && (
        <motion.div
          className="absolute top-2 right-2 w-3 h-3 bg-primary-500 rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.button>
  );
};

export default InteractiveStatsCard;
