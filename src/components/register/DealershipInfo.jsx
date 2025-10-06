import { motion } from 'framer-motion';
import { Building2, Globe, Users, Hash, Briefcase, Mail, MapPin, Building, Map } from 'lucide-react';

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

  const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
    'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
    'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
    'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
    'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma',
    'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
    'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 "
    >
      <div className="text-left mb-6">
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            variants={itemVariants}
            className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center shadow-soft"
          >
            <Building2 className="w-6 h-6 text-primary-600" />
          </motion.div>
          <div>
            <motion.h2 variants={itemVariants} className="text-xl font-bold text-neutral-900">
              Dealership Information
            </motion.h2>
            <motion.p variants={itemVariants} className="text-neutral-600 text-sm">
              Tell us about your dealership to get started
            </motion.p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Basic Dealership Information */}
        <div>
          <h3 className="text-lg font-semibold text-neutral-800 mb-4">Basic Information</h3>
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
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-lg font-semibold text-neutral-800 mb-4">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Job Position */}
            <motion.div variants={itemVariants} className="space-y-2">
              <label className="block text-sm font-semibold text-neutral-700">
                Job Position *
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <select
                  value={formData.jobPosition}
                  onChange={(e) => updateFormData('jobPosition', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                    errors.jobPosition ? 'border-error' : 'border-neutral-200'
                  } bg-white text-neutral-900 focus:outline-none focus:ring-4 focus:ring-primary-200 focus:border-primary-500 transition-all duration-200`}
                >
                  <option value="">Select your position</option>
                  <option value="owner">Owner</option>
                  <option value="general-manager">General Manager</option>
                  <option value="sales-manager">Sales Manager</option>
                  <option value="buyer">Buyer</option>
                  <option value="inventory-manager">Inventory Manager</option>
                  <option value="other">Other</option>
                </select>
              </div>
              {errors.jobPosition && (
                <p className="text-sm text-error">{errors.jobPosition}</p>
              )}
            </motion.div>

            {/* Business Email */}
            <motion.div variants={itemVariants} className="space-y-2">
              <label className="block text-sm font-semibold text-neutral-700">
                Business Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="email"
                  value={formData.businessEmail}
                  onChange={(e) => updateFormData('businessEmail', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                    errors.businessEmail ? 'border-error' : 'border-neutral-200'
                  } bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-4 focus:ring-primary-200 focus:border-primary-500 transition-all duration-200`}
                  placeholder="your.email@dealership.com"
                />
              </div>
              {errors.businessEmail && (
                <p className="text-sm text-error">{errors.businessEmail}</p>
              )}
            </motion.div>
          </div>
        </div>

        {/* Location Information */}
        <div>
          <h3 className="text-lg font-semibold text-neutral-800 mb-4">Business Location</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Zip Code */}
            <motion.div variants={itemVariants} className="space-y-2">
              <label className="block text-sm font-semibold text-neutral-700">
                Zip Code *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  value={formData.zipCode}
                  onChange={(e) => updateFormData('zipCode', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                    errors.zipCode ? 'border-error' : 'border-neutral-200'
                  } bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-4 focus:ring-primary-200 focus:border-primary-500 transition-all duration-200`}
                  placeholder="12345"
                  maxLength="5"
                />
              </div>
              {errors.zipCode && (
                <p className="text-sm text-error">{errors.zipCode}</p>
              )}
            </motion.div>

            {/* City */}
            <motion.div variants={itemVariants} className="space-y-2">
              <label className="block text-sm font-semibold text-neutral-700">
                City *
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => updateFormData('city', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                    errors.city ? 'border-error' : 'border-neutral-200'
                  } bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-4 focus:ring-primary-200 focus:border-primary-500 transition-all duration-200`}
                  placeholder="Enter city name"
                />
              </div>
              {errors.city && (
                <p className="text-sm text-error">{errors.city}</p>
              )}
            </motion.div>

            {/* State */}
            <motion.div variants={itemVariants} className="space-y-2">
              <label className="block text-sm font-semibold text-neutral-700">
                State *
              </label>
              <div className="relative">
                <Map className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <select
                  value={formData.state}
                  onChange={(e) => updateFormData('state', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                    errors.state ? 'border-error' : 'border-neutral-200'
                  } bg-white text-neutral-900 focus:outline-none focus:ring-4 focus:ring-primary-200 focus:border-primary-500 transition-all duration-200`}
                >
                  <option value="">Select state</option>
                  {states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
              {errors.state && (
                <p className="text-sm text-error">{errors.state}</p>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DealershipInfo;
