import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const ProgressStepper = ({ steps, currentStep }) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            {/* Step Circle */}
            <div className="flex flex-col items-center flex-1">
              <motion.div
                className={`relative w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center text-xs lg:text-sm font-semibold transition-all duration-300 ${
                  currentStep > step.id
                    ? 'bg-success text-white scale-110'
                    : currentStep === step.id
                    ? 'bg-primary-500 text-white scale-105'
                    : 'bg-neutral-200 text-neutral-500'
                }`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: currentStep > step.id ? 1.1 : currentStep === step.id ? 1.05 : 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {currentStep > step.id ? (
                  <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5" />
                ) : (
                  step.id
                )}
              </motion.div>
              
              {/* Step Label - Hidden on mobile, shown on desktop */}
              <div className="hidden lg:block mt-2 text-center">
                <div className={`text-xs font-medium transition-colors ${
                  currentStep >= step.id ? 'text-neutral-900' : 'text-neutral-500'
                }`}>
                  {step.title}
                </div>
                <div className={`text-xs transition-colors ${
                  currentStep >= step.id ? 'text-neutral-600' : 'text-neutral-400'
                }`}>
                  {step.description}
                </div>
              </div>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="flex-1 mx-2 lg:mx-4 h-0.5 bg-neutral-200 relative">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-primary-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ 
                    width: currentStep > step.id ? '100%' : '0%' 
                  }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressStepper;
