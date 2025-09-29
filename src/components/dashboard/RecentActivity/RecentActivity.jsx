import { motion } from 'framer-motion';
import { Bell, Clock, DollarSign, Gavel, Calendar, User } from 'lucide-react';

const RecentActivity = () => {
  // Static activity data - will replace with API later
  const activities = [
    {
      id: 1,
      type: 'bid',
      message: 'New bid placed on 2019 BMW X5',
      amount: '$42,500',
      time: '2 minutes ago',
      icon: DollarSign,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      id: 2,
      type: 'auction',
      message: 'Auction ending soon for 2017 Audi A4',
      time: '15 minutes ago',
      icon: Gavel,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      id: 3,
      type: 'appointment',
      message: 'Appointment scheduled with John Smith',
      time: '1 hour ago',
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      id: 4,
      type: 'notification',
      message: 'Vehicle inspection completed',
      time: '2 hours ago',
      icon: Bell,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 5,
      type: 'bid',
      message: 'Bid won for 2014 Jeep Grand Cherokee',
      amount: '$18,500',
      time: '3 hours ago',
      icon: DollarSign,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
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

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 h-fit"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-neutral-900">Recent Activity</h3>
        <div className="flex items-center text-sm text-neutral-500">
          <Clock className="w-4 h-4 mr-1" />
          <span>Live updates</span>
        </div>
      </div>

      {/* Activity List */}
      <div className="space-y-4">
        {activities.length > 0 ? (
          activities.map((activity, index) => {
            const IconComponent = activity.icon;
            return (
              <motion.div
                key={activity.id}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors duration-200"
                variants={itemVariants}
                whileHover={{ x: 4 }}
              >
                {/* Icon */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${activity.bgColor}`}>
                  <IconComponent className={`w-4 h-4 ${activity.color}`} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-neutral-800 leading-relaxed">
                    {activity.message}
                  </p>
                  {activity.amount && (
                    <p className="text-sm font-semibold text-emerald-600 mt-1">
                      {activity.amount}
                    </p>
                  )}
                  <p className="text-xs text-neutral-500 mt-1">
                    {activity.time}
                  </p>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-neutral-300" />
            </div>
            <p className="text-neutral-500 text-sm">No recent activity</p>
            <p className="text-neutral-400 text-xs mt-1">Activity will appear here</p>
          </div>
        )}
      </div>

      {/* View All Button */}
      {activities.length > 0 && (
        <motion.div 
          className="mt-6 pt-4 border-t border-neutral-100"
          variants={itemVariants}
        >
          <button className="w-full text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200">
            View All Activity
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default RecentActivity;
