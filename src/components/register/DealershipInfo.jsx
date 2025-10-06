import { motion } from 'framer-motion';
import { Building2, Globe, Users, Hash } from 'lucide-react';

const DealershipInfo = ({ formData, updateFormData, errors }) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.15,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 "
    >
      <div className="text-left mb-8">
        <div className="flex items-center justify-left gap-4">
        <motion.div
          variants={itemVariants}
          className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex  items-center justify-center mb-4 shadow-soft"
        >
          <Building2 className="w-8 h-8 text-primary-600" />
        </motion.div>
        <motion.h2 variants={itemVariants} className="text-2xl lg:text-3xl font-bold text-neutral-900 mb-2 text-left">
          Dealership Information
        </motion.h2>
        </div>
        <motion.p variants={itemVariants} className="text-neutral-600 text-sm lg:text-base text-left">
          Tell us about your dealership to get started
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Dealer Code */}
        <motion.div variants={itemVariants} className="space-y-2">
          <label className="block text-sm font-semibold text-neutral-700">
            Dealer Code *
          </label>
          <div className="relative">
            <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              value={formData.dealerCode}
              onChange={(e) => updateFormData('dealerCode', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                errors.dealerCode ? 'border-error focus:ring-error/20' : 'border-neutral-200 focus:ring-primary-200'
              } bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-4 focus:border-primary-500 transition-all duration-300 hover:border-neutral-300`}
              placeholder="Enter your dealer code"
            />
          </div>
          {errors.dealerCode && (
            <p className="text-sm text-error">{errors.dealerCode}</p>
          )}
        </motion.div>

        {/* Dealership Name */}
        <motion.div variants={itemVariants} className="space-y-2">
          <label className="block text-sm font-semibold text-neutral-700">
            Dealership Name *
          </label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              value={formData.dealershipName}
              onChange={(e) => updateFormData('dealershipName', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                errors.dealershipName ? 'border-error focus:ring-error/20' : 'border-neutral-200 focus:ring-primary-200'
              } bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-4 focus:border-primary-500 transition-all duration-300 hover:border-neutral-300`}
              placeholder="Enter dealership name"
            />
          </div>
          {errors.dealershipName && (
            <p className="text-sm text-error">{errors.dealershipName}</p>
          )}
        </motion.div>

        {/* Website */}
        <motion.div variants={itemVariants} className="space-y-2">
          <label className="block text-sm font-semibold text-neutral-700">
            Website *
          </label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="url"
              value={formData.website}
              onChange={(e) => updateFormData('website', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                errors.website ? 'border-error focus:ring-error/20' : 'border-neutral-200 focus:ring-primary-200'
              } bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-4 focus:border-primary-500 transition-all duration-300 hover:border-neutral-300`}
              placeholder="https://yourdealership.com"
            />
          </div>
          {errors.website && (
            <p className="text-sm text-error">{errors.website}</p>
          )}
        </motion.div>

        {/* Dealer Group */}
        <motion.div variants={itemVariants} className="space-y-2">
          <label className="block text-sm font-semibold text-neutral-700">
            Dealer Group *
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <select
              value={formData.dealerGroup}
              onChange={(e) => updateFormData('dealerGroup', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                errors.dealerGroup ? 'border-error focus:ring-error/20' : 'border-neutral-200 focus:ring-primary-200'
              } bg-white text-neutral-900 focus:outline-none focus:ring-4 focus:border-primary-500 transition-all duration-300 hover:border-neutral-300`}
            >
              <option value="">Select dealer group</option>
              <option value="independent">Independent Dealer</option>
              <option value="franchise">Franchise Dealer</option>
              <option value="group">Dealer Group</option>
              <option value="other">Other</option>
            </select>
          </div>
          {errors.dealerGroup && (
            <p className="text-sm text-error">{errors.dealerGroup}</p>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DealershipInfo;
