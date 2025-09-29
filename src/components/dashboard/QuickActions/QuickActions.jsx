import { motion } from 'framer-motion';
import { Gavel, BarChart3, Trophy, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const QuickActions = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 'my-bids',
      title: 'My Bids',
      description: 'View and manage your active bids',
      icon: Gavel,
      route: '/my-bids',
      color: 'bg-[var(--brand-purple)]',
      hoverColor: 'hover:bg-[var(--brand-purple)]',
      iconBg: 'bg-blue-100',
      iconColor: 'text-[var(--brand-purple)]'
    },
    {
      id: 'reports',
      title: 'Reports',
      description: 'Access detailed analytics and insights',
      icon: BarChart3,
      route: '/reports',
      color: 'from-green-500 to-green-600',
      hoverColor: 'hover:green-600',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      id: 'won-auctions',
      title: 'Won Auctions',
      description: 'Track your successful auction wins',
      icon: Trophy,
      route: '/won-auctions',
      color: 'bg-[var(--brand-orange)]',
      hoverColor: 'hover:bg-[var(--brand-orange)]',
      iconBg: 'bg-orange-100',
      iconColor: 'text-[var(--brand-orange)]'
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const handleActionClick = (route) => {
    navigate(route);
  };

  return (
    <motion.div
      className="w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickActions.map((action, index) => {
          const IconComponent = action.icon;
          return (
            <motion.div
              key={action.id}
              variants={itemVariants}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group"
              
            >
              <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 hover:shadow-lg transition-all duration-300 h-full">
                {/* Icon and Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${action.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                    <IconComponent className={`w-6 h-6 ${action.iconColor}`} />
                  </div>
               
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-neutral-700 transition-colors duration-200">
                    {action.title}
                  </h3>
                  <p className="text-sm text-neutral-600 group-hover:text-neutral-500 transition-colors duration-200">
                    {action.description}
                  </p>
                </div>

                {/* Action Button */}
                <div className="mt-6">
                  <Button
                    onClick={() => handleActionClick(action.route)}
                    className={`w-full bg-gradient-to-r ${action.color} ${action.hoverColor} h-12 cursor-pointer text-white shadow-sm hover:shadow-md transition-all duration-200 font-medium`}
                    size="sm"
                  >
                    {action.title}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </Button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

    </motion.div>
  );
};

export default QuickActions;
