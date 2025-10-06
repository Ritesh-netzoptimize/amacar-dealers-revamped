import { motion } from 'framer-motion';
import { MapPin, Building, Map } from 'lucide-react';

const LocationInfo = ({ formData, updateFormData, errors }) => {
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
      className="space-y-6"
    >
      <div className="text-left mb-6">
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            variants={itemVariants}
            className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center shadow-soft"
          >
            <MapPin className="w-6 h-6 text-primary-600" />
          </motion.div>
          <div>
            <motion.h2 variants={itemVariants} className="text-xl font-bold text-neutral-900">
              Business Location
            </motion.h2>
            <motion.p variants={itemVariants} className="text-neutral-600 text-sm">
              Where is your dealership located?
            </motion.p>
          </div>
        </div>
      </div>

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
    </motion.div>
  );
};

export default LocationInfo;
