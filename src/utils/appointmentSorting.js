// Appointment sorting utilities

/**
 * Sort appointments by date (ascending)
 * @param {Array} appointments - Array of appointments
 * @returns {Array} Sorted appointments
 */
export const sortByDateAsc = (appointments) => {
  return [...appointments].sort((a, b) => new Date(a.start_time) - new Date(b.start_time));
};

/**
 * Sort appointments by date (descending)
 * @param {Array} appointments - Array of appointments
 * @returns {Array} Sorted appointments
 */
export const sortByDateDesc = (appointments) => {
  return [...appointments].sort((a, b) => new Date(b.start_time) - new Date(a.start_time));
};

/**
 * Sort appointments by dealer name (ascending)
 * @param {Array} appointments - Array of appointments
 * @returns {Array} Sorted appointments
 */
export const sortByDealerAsc = (appointments) => {
  return [...appointments].sort((a, b) => a.dealer_name.localeCompare(b.dealer_name));
};

/**
 * Sort appointments by dealer name (descending)
 * @param {Array} appointments - Array of appointments
 * @returns {Array} Sorted appointments
 */
export const sortByDealerDesc = (appointments) => {
  return [...appointments].sort((a, b) => b.dealer_name.localeCompare(a.dealer_name));
};

/**
 * Sort appointments by status (ascending)
 * @param {Array} appointments - Array of appointments
 * @returns {Array} Sorted appointments
 */
export const sortByStatusAsc = (appointments) => {
  return [...appointments].sort((a, b) => a.formatted_status.localeCompare(b.formatted_status));
};

/**
 * Sort appointments by status (descending)
 * @param {Array} appointments - Array of appointments
 * @returns {Array} Sorted appointments
 */
export const sortByStatusDesc = (appointments) => {
  return [...appointments].sort((a, b) => b.formatted_status.localeCompare(a.formatted_status));
};

/**
 * Sort appointments by duration (ascending)
 * @param {Array} appointments - Array of appointments
 * @returns {Array} Sorted appointments
 */
export const sortByDurationAsc = (appointments) => {
  return [...appointments].sort((a, b) => a.duration - b.duration);
};

/**
 * Sort appointments by duration (descending)
 * @param {Array} appointments - Array of appointments
 * @returns {Array} Sorted appointments
 */
export const sortByDurationDesc = (appointments) => {
  return [...appointments].sort((a, b) => b.duration - a.duration);
};

/**
 * Main sorting function that handles all sort types
 * @param {Array} appointments - Array of appointments
 * @param {string} sortBy - Sort type
 * @returns {Array} Sorted appointments
 */
export const sortAppointments = (appointments, sortBy) => {
  if (!appointments || appointments.length === 0) return [];

  switch (sortBy) {
    case 'date-asc':
      return sortByDateAsc(appointments);
    case 'date-desc':
      return sortByDateDesc(appointments);
    case 'dealer-asc':
      return sortByDealerAsc(appointments);
    case 'dealer-desc':
      return sortByDealerDesc(appointments);
    case 'status-asc':
      return sortByStatusAsc(appointments);
    case 'status-desc':
      return sortByStatusDesc(appointments);
    case 'duration-asc':
      return sortByDurationAsc(appointments);
    case 'duration-desc':
      return sortByDurationDesc(appointments);
    default:
      return appointments;
  }
};

/**
 * Get sort options configuration
 * @returns {Array} Sort options
 */
export const getSortOptions = () => {
  return [
    { value: 'date-asc', label: 'Earliest First', icon: 'ArrowUp', description: 'Earliest appointments' },
    { value: 'date-desc', label: 'Latest First', icon: 'ArrowDown', description: 'Latest appointments' },
    { value: 'dealer-asc', label: 'Dealer A-Z', icon: 'ArrowUp', description: 'Alphabetical by dealer' },
    { value: 'dealer-desc', label: 'Dealer Z-A', icon: 'ArrowDown', description: 'Reverse alphabetical' },
    { value: 'status-asc', label: 'Status A-Z', icon: 'ArrowUp', description: 'Alphabetical by status' },
    { value: 'status-desc', label: 'Status Z-A', icon: 'ArrowDown', description: 'Reverse by status' },
    { value: 'duration-asc', label: 'Shortest First', icon: 'ArrowUp', description: 'Shortest duration first' },
    { value: 'duration-desc', label: 'Longest First', icon: 'ArrowDown', description: 'Longest duration first' },
  ];
};
