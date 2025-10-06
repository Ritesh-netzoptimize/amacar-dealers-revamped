import { motion } from 'framer-motion';
import { User, Mail, Phone, Briefcase } from 'lucide-react';

const ContactInfo = ({ formData, updateFormData, errors }) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <motion.div
          variants={itemVariants}
          className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-soft"
        >
          <User className="w-6 h-6 text-primary-600" />
        </motion.div>
        <motion.h2 variants={itemVariants} className="text-xl font-bold text-neutral-900 mb-2">
          Contact Information
        </motion.h2>
        <motion.p variants={itemVariants} className="text-neutral-600 text-sm">
          Tell us about yourself and your role
        </motion.p>
      </div>

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

        {/* First Name */}
        <motion.div variants={itemVariants} className="space-y-2">
          <label className="block text-sm font-semibold text-neutral-700">
            First Name *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => updateFormData('firstName', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                errors.firstName ? 'border-error' : 'border-neutral-200'
              } bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-4 focus:ring-primary-200 focus:border-primary-500 transition-all duration-200`}
              placeholder="Enter your first name"
            />
          </div>
          {errors.firstName && (
            <p className="text-sm text-error">{errors.firstName}</p>
          )}
        </motion.div>

        {/* Last Name */}
        <motion.div variants={itemVariants} className="space-y-2">
          <label className="block text-sm font-semibold text-neutral-700">
            Last Name *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => updateFormData('lastName', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                errors.lastName ? 'border-error' : 'border-neutral-200'
              } bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-4 focus:ring-primary-200 focus:border-primary-500 transition-all duration-200`}
              placeholder="Enter your last name"
            />
          </div>
          {errors.lastName && (
            <p className="text-sm text-error">{errors.lastName}</p>
          )}
        </motion.div>

        {/* Mobile Number */}
        <motion.div variants={itemVariants} className="space-y-2">
          <label className="block text-sm font-semibold text-neutral-700">
            Mobile Number *
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="tel"
              value={formData.mobileNumber}
              onChange={(e) => updateFormData('mobileNumber', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                errors.mobileNumber ? 'border-error' : 'border-neutral-200'
              } bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-4 focus:ring-primary-200 focus:border-primary-500 transition-all duration-200`}
              placeholder="(555) 123-4567"
            />
          </div>
          {errors.mobileNumber && (
            <p className="text-sm text-error">{errors.mobileNumber}</p>
          )}
        </motion.div>

        {/* Business Email */}
        <motion.div variants={itemVariants} className="md:col-span-2 space-y-2">
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

    </motion.div>
  );
};

export default ContactInfo;
