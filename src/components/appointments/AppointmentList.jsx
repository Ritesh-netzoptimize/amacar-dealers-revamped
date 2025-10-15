import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import AppointmentCard from './AppointmentCard';

const AppointmentList = ({
  appointments=[],
  onViewDetails,
  className = ''
}) => {
  console.log("appointments in appointment list", appointments);

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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`space-y-6 ${className}`}
    >
      {/* Render appointments passed from parent */}
      {appointments.length > 0 && (
        <motion.div variants={itemVariants}>
          <div className="space-y-3 sm:space-y-4">
            {appointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                onViewDetails={onViewDetails}
                isToday={false}
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* Empty State - This should rarely show since parent handles empty states */}
      {appointments.length === 0 && (
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center py-8 px-4"
        >
          <div className="text-center max-w-sm sm:max-w-md mx-auto">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative mb-4"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto shadow-soft border border-primary-200">
                <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-primary-500" />
              </div>
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="space-y-3 sm:space-y-4"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-800 font-display">
                No Appointments
              </h3>
              <p className="text-neutral-600 text-sm sm:text-base lg:text-lg leading-relaxed">
                You don't have any appointments in this section.
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AppointmentList;
