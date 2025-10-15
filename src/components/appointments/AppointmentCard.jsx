import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Phone, Video } from "lucide-react";

const AppointmentCard = ({
  appointment,
  onViewDetails,
  isToday = false,
  className = "",
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-emerald-100 text-emerald-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-blue-100 text-blue-800";
      case "confirmed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const getMeetingTypeIcon = (meetingType) => {
    switch (meetingType) {
      case "video":
        return Video;
      case "phone":
        return Phone;
      default:
        return MapPin;
    }
  };

  const MeetingIcon = getMeetingTypeIcon(appointment.meeting_type);

  return (
    <motion.div
      className={`card p-4 sm:p-6 hover:shadow-medium transition-all duration-300 ${
        isToday ? "border-l-4 border-primary-500" : ""
      } ${className}`}
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
          <div
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
              isToday ? "bg-primary-100" : "bg-neutral-100"
            }`}
          >
            <Calendar
              className={`w-5 h-5 sm:w-6 sm:h-6 ${
                isToday ? "text-primary-600" : "text-neutral-600"
              }`}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-neutral-800 text-sm sm:text-base truncate">
              Appointment with {appointment.dealer_name}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 truncate">
              {appointment.dealer_email}
            </p>
            {/* {appointment.user_metadata?.phone && (
              <p className="text-xs text-neutral-500 truncate">
                {appointment.user_metadata.phone}
              </p>
            )} */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2">
              <span className="flex items-center space-x-1 text-xs sm:text-sm text-neutral-500">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span>
                  {isToday
                    ? `${appointment.formatted_time} (${appointment.duration} min)`
                    : `${appointment.formatted_date} at ${appointment.formatted_time}`}
                </span>
              </span>
              <span className="flex items-center space-x-1">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                    appointment.status
                  )}`}
                >
                  {appointment.formatted_status}
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className="flex space-x-2 w-full sm:w-auto">
          <button
            onClick={() => onViewDetails(appointment)}
            className="cursor-pointer btn-primary flex items-center justify-center space-x-2 w-full sm:w-auto text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2.5"
          >
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">View Details</span>
            <span className="sm:hidden">Details</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AppointmentCard;
