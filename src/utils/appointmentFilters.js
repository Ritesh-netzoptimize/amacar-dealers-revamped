// Appointment filtering utilities

/**
 * Get status filter options with counts
 * @param {Array} appointments - Array of appointments
 * @returns {Array} Status filter options with counts
 */
export const getStatusFilterOptions = (appointments) => {
  return [
    { 
      value: 'all', 
      label: 'All', 
      count: appointments.length, 
      color: 'bg-slate-100 text-slate-700' 
    },
    { 
      value: 'pending', 
      label: 'Pending', 
      count: appointments.filter(apt => apt.status === 'pending').length, 
      color: 'bg-blue-100 text-blue-700' 
    },
    { 
      value: 'confirmed', 
      label: 'Confirmed', 
      count: appointments.filter(apt => apt.status === 'confirmed').length, 
      color: 'bg-green-100 text-green-700' 
    },
    { 
      value: 'cancelled', 
      label: 'Cancelled', 
      count: appointments.filter(apt => apt.status === 'cancelled').length, 
      color: 'bg-red-100 text-red-700' 
    },
  ];
};

/**
 * Filter appointments by status
 * @param {Array} appointments - Array of appointments
 * @param {string} statusFilter - Status filter value
 * @returns {Array} Filtered appointments
 */
export const filterAppointmentsByStatus = (appointments, statusFilter) => {
  if (!appointments || appointments.length === 0) return [];
  if (statusFilter === 'all') return appointments;
  
  return appointments.filter(apt => apt.status === statusFilter);
};

/**
 * Get today's appointments
 * @param {Array} appointments - Array of appointments
 * @returns {Array} Today's appointments
 */
export const getTodaysAppointments = (appointments) => {
  if (!appointments || appointments.length === 0) return [];
  
  const today = new Date();
  return appointments.filter(apt => {
    const appointmentDate = new Date(apt.start_time);
    return appointmentDate.toDateString() === today.toDateString();
  });
};

/**
 * Get upcoming appointments
 * @param {Array} appointments - Array of appointments
 * @returns {Array} Upcoming appointments
 */
export const getUpcomingAppointments = (appointments) => {
  if (!appointments || appointments.length === 0) return [];
  
  return appointments.filter(apt => new Date(apt.start_time) > new Date());
};

/**
 * Get appointments by date range
 * @param {Array} appointments - Array of appointments
 * @param {Date} startDate - Start date
 * @param {Date} endDate - End date
 * @returns {Array} Appointments within date range
 */
export const getAppointmentsByDateRange = (appointments, startDate, endDate) => {
  if (!appointments || appointments.length === 0) return [];
  
  return appointments.filter(apt => {
    const appointmentDate = new Date(apt.start_time);
    return appointmentDate >= startDate && appointmentDate <= endDate;
  });
};

/**
 * Get appointments by meeting type
 * @param {Array} appointments - Array of appointments
 * @param {string} meetingType - Meeting type ('in-person', 'video', 'phone')
 * @returns {Array} Filtered appointments
 */
export const getAppointmentsByMeetingType = (appointments, meetingType) => {
  if (!appointments || appointments.length === 0) return [];
  if (!meetingType) return appointments;
  
  return appointments.filter(apt => apt.meeting_type === meetingType);
};
