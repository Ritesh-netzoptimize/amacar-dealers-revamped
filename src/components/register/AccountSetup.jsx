import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, Shield, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const AccountSetup = ({ formData, updateFormData, errors }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const passwordRequirements = [
    { text: 'At least 8 characters', met: formData.password.length >= 8 },
    { text: 'Contains uppercase letter', met: /[A-Z]/.test(formData.password) },
    { text: 'Contains lowercase letter', met: /[a-z]/.test(formData.password) },
    { text: 'Contains number', met: /\d/.test(formData.password) },
    { text: 'Contains special character', met: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password) }
  ];

  const isPasswordValid = passwordRequirements.every(req => req.met);

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
          <Shield className="w-6 h-6 text-primary-600" />
        </motion.div>
        <motion.h2 variants={itemVariants} className="text-xl font-bold text-neutral-900 mb-2">
          Account Setup
        </motion.h2>
        <motion.p variants={itemVariants} className="text-neutral-600 text-sm">
          Create a secure password and accept our terms
        </motion.p>
      </div>

      <div className="space-y-6">
        {/* Password */}
        <motion.div variants={itemVariants} className="space-y-2">
          <label className="block text-sm font-semibold text-neutral-700">
            Password *
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => updateFormData('password', e.target.value)}
              className={`w-full pl-10 pr-12 py-3 rounded-xl border ${
                errors.password ? 'border-error' : 'border-neutral-200'
              } bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-4 focus:ring-primary-200 focus:border-primary-500 transition-all duration-200`}
              placeholder="Create a strong password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-error">{errors.password}</p>
          )}
        </motion.div>

        {/* Password Requirements */}
        {formData.password && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-neutral-50 rounded-xl p-4 space-y-2"
          >
            <h4 className="text-sm font-semibold text-neutral-700 mb-2">Password Requirements:</h4>
            {passwordRequirements.map((req, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                  req.met ? 'bg-success' : 'bg-neutral-300'
                }`}>
                  {req.met && <CheckCircle className="w-3 h-3 text-white" />}
                </div>
                <span className={`text-sm ${
                  req.met ? 'text-success' : 'text-neutral-600'
                }`}>
                  {req.text}
                </span>
              </div>
            ))}
          </motion.div>
        )}

        {/* Confirm Password */}
        <motion.div variants={itemVariants} className="space-y-2">
          <label className="block text-sm font-semibold text-neutral-700">
            Confirm Password *
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={(e) => updateFormData('confirmPassword', e.target.value)}
              className={`w-full pl-10 pr-12 py-3 rounded-xl border ${
                errors.confirmPassword ? 'border-error' : 'border-neutral-200'
              } bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-4 focus:ring-primary-200 focus:border-primary-500 transition-all duration-200`}
              placeholder="Confirm your password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-sm text-error">{errors.confirmPassword}</p>
          )}
        </motion.div>

        {/* Password Match Indicator */}
        {formData.confirmPassword && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`flex items-center space-x-2 text-sm ${
              formData.password === formData.confirmPassword && formData.confirmPassword
                ? 'text-success'
                : 'text-error'
            }`}
          >
            <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
              formData.password === formData.confirmPassword && formData.confirmPassword
                ? 'bg-success'
                : 'bg-error'
            }`}>
              <CheckCircle className="w-3 h-3 text-white" />
            </div>
            <span>
              {formData.password === formData.confirmPassword && formData.confirmPassword
                ? 'Passwords match'
                : 'Passwords do not match'
              }
            </span>
          </motion.div>
        )}

        {/* Agreement Checkbox */}
        <motion.div variants={itemVariants} className="space-y-2">
          <div className="flex items-start space-x-3">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                id="agreement"
                checked={formData.agreementAccepted}
                onChange={(e) => updateFormData('agreementAccepted', e.target.checked)}
                className="w-4 h-4 text-primary-600 bg-neutral-100 border-neutral-300 rounded focus:ring-primary-500 focus:ring-2"
              />
            </div>
            <div className="text-sm">
              <label htmlFor="agreement" className="text-neutral-700 cursor-pointer">
                I agree to the{' '}
                <a href="#" className="text-primary-600 hover:text-primary-700 underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-primary-600 hover:text-primary-700 underline">
                  Privacy Policy
                </a>
                *
              </label>
              {errors.agreementAccepted && (
                <p className="text-sm text-error mt-1">{errors.agreementAccepted}</p>
              )}
            </div>
          </div>
        </motion.div>
      </div>

    </motion.div>
  );
};

export default AccountSetup;
