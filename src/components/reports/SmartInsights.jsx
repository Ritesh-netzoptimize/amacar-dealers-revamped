import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Target, 
  Calendar, 
  AlertCircle, 
  Trophy,
  Lightbulb,
  DollarSign,
  Users,
  BarChart3
} from 'lucide-react';

const SmartInsights = () => {
  const insights = [
    {
      id: 1,
      type: 'range',
      icon: DollarSign,
      title: 'Offer Range Analysis',
      description: 'Most accepted offers are between $900 - $100,000,000.',
      value: '$900 - $100M',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      borderColor: 'border-blue-200'
    },
    {
      id: 2,
      type: 'achievement',
      icon: Target,
      title: 'Bidding Activity',
      description: 'You have placed a total of 56 bids. Keep up the bidding!',
      value: '56 bids',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      borderColor: 'border-green-200'
    },
    {
      id: 3,
      type: 'engagement',
      icon: Calendar,
      title: 'Customer Engagement',
      description: 'You\'ve set 11 appointments. This shows a strong engagement with customers.',
      value: '11 appointments',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      borderColor: 'border-purple-200'
    },
    {
      id: 4,
      type: 'improvement',
      icon: AlertCircle,
      title: 'Bid Analysis',
      description: 'You have lost 1 bids. Try analyzing the bids to find areas for improvement.',
      value: '1 lost bid',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
      borderColor: 'border-orange-200'
    },
    {
      id: 5,
      type: 'success',
      icon: Trophy,
      title: 'Purchase Success',
      description: 'Congratulations! You have purchased 32 vehicles.',
      value: '32 vehicles',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      borderColor: 'border-emerald-200'
    }
  ];

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

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const getInsightIcon = (type) => {
    switch (type) {
      case 'range':
        return <BarChart3 className="w-5 h-5" />;
      case 'achievement':
        return <Target className="w-5 h-5" />;
      case 'engagement':
        return <Users className="w-5 h-5" />;
      case 'improvement':
        return <AlertCircle className="w-5 h-5" />;
      case 'success':
        return <Trophy className="w-5 h-5" />;
      default:
        return <Lightbulb className="w-5 h-5" />;
    }
  };

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div 
        className="flex items-center gap-3 mb-6"
        variants={cardVariants}
      >
        <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl">
          <Lightbulb className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-neutral-900">Smart Insights</h3>
          <p className="text-sm text-neutral-600">AI-powered analysis of your auction performance</p>
        </div>
      </motion.div>

      {/* Insights Grid */}
      <div className="space-y-4">
        {insights.map((insight, index) => (
          <motion.div
            key={insight.id}
            variants={cardVariants}
            className={`
              px-4 py-2 rounded-xl border-2 transition-all duration-300 hover:shadow-md hover:scale-[1.02]
              ${insight.bgColor} ${insight.borderColor}
            `}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className={`
                p-2 rounded-lg ${insight.bgColor} ${insight.iconColor}
                flex-shrink-0 mt-0.5
              `}>
                {getInsightIcon(insight.type)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-neutral-900 text-sm">
                    {insight.title}
                  </h4>
                  <span className={`
                    px-2 py-1 rounded-full text-xs font-medium
                    ${insight.color} ${insight.bgColor}
                  `}>
                    {insight.value}
                  </span>
                </div>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  {insight.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

    </motion.div>
  );
};

export default SmartInsights;
