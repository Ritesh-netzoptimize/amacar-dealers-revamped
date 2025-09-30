// New Customers sorting utilities

/**
 * Sort customers by name (ascending)
 * @param {Array} customers - Array of customers
 * @returns {Array} Sorted customers
 */
export const sortByNameAsc = (customers) => {
  return [...customers].sort((a, b) => a.name.localeCompare(b.name));
};

/**
 * Sort customers by name (descending)
 * @param {Array} customers - Array of customers
 * @returns {Array} Sorted customers
 */
export const sortByNameDesc = (customers) => {
  return [...customers].sort((a, b) => b.name.localeCompare(a.name));
};

/**
 * Sort customers by join date (ascending)
 * @param {Array} customers - Array of customers
 * @returns {Array} Sorted customers
 */
export const sortByJoinDateAsc = (customers) => {
  return [...customers].sort((a, b) => new Date(a.joinDate) - new Date(b.joinDate));
};

/**
 * Sort customers by join date (descending)
 * @param {Array} customers - Array of customers
 * @returns {Array} Sorted customers
 */
export const sortByJoinDateDesc = (customers) => {
  return [...customers].sort((a, b) => new Date(b.joinDate) - new Date(a.joinDate));
};

/**
 * Sort customers by offer amount (ascending)
 * @param {Array} customers - Array of customers
 * @returns {Array} Sorted customers
 */
export const sortByOfferAsc = (customers) => {
  return [...customers].sort((a, b) => {
    const offerA = parseFloat(a.offer.replace(/[$,]/g, ''));
    const offerB = parseFloat(b.offer.replace(/[$,]/g, ''));
    return offerA - offerB;
  });
};

/**
 * Sort customers by offer amount (descending)
 * @param {Array} customers - Array of customers
 * @returns {Array} Sorted customers
 */
export const sortByOfferDesc = (customers) => {
  return [...customers].sort((a, b) => {
    const offerA = parseFloat(a.offer.replace(/[$,]/g, ''));
    const offerB = parseFloat(b.offer.replace(/[$,]/g, ''));
    return offerB - offerA;
  });
};

/**
 * Sort customers by mileage (ascending)
 * @param {Array} customers - Array of customers
 * @returns {Array} Sorted customers
 */
export const sortByMileageAsc = (customers) => {
  return [...customers].sort((a, b) => {
    const mileageA = parseInt(a.mileage.replace(/[,\s]/g, ''));
    const mileageB = parseInt(b.mileage.replace(/[,\s]/g, ''));
    return mileageA - mileageB;
  });
};

/**
 * Sort customers by mileage (descending)
 * @param {Array} customers - Array of customers
 * @returns {Array} Sorted customers
 */
export const sortByMileageDesc = (customers) => {
  return [...customers].sort((a, b) => {
    const mileageA = parseInt(a.mileage.replace(/[,\s]/g, ''));
    const mileageB = parseInt(b.mileage.replace(/[,\s]/g, ''));
    return mileageB - mileageA;
  });
};

/**
 * Sort customers by vehicle (ascending)
 * @param {Array} customers - Array of customers
 * @returns {Array} Sorted customers
 */
export const sortByVehicleAsc = (customers) => {
  return [...customers].sort((a, b) => a.vehicle.localeCompare(b.vehicle));
};

/**
 * Sort customers by vehicle (descending)
 * @param {Array} customers - Array of customers
 * @returns {Array} Sorted customers
 */
export const sortByVehicleDesc = (customers) => {
  return [...customers].sort((a, b) => b.vehicle.localeCompare(a.vehicle));
};

/**
 * Main sorting function that handles all sort types
 * @param {Array} customers - Array of customers
 * @param {string} sortBy - Sort type
 * @returns {Array} Sorted customers
 */
export const sortNewCustomers = (customers, sortBy) => {
  if (!customers || customers.length === 0) return [];

  switch (sortBy) {
    case 'name-asc':
      return sortByNameAsc(customers);
    case 'name-desc':
      return sortByNameDesc(customers);
    case 'join-date-asc':
      return sortByJoinDateAsc(customers);
    case 'join-date-desc':
      return sortByJoinDateDesc(customers);
    case 'offer-asc':
      return sortByOfferAsc(customers);
    case 'offer-desc':
      return sortByOfferDesc(customers);
    case 'mileage-asc':
      return sortByMileageAsc(customers);
    case 'mileage-desc':
      return sortByMileageDesc(customers);
    case 'vehicle-asc':
      return sortByVehicleAsc(customers);
    case 'vehicle-desc':
      return sortByVehicleDesc(customers);
    default:
      return customers;
  }
};

/**
 * Get sort field options configuration
 * @returns {Array} Sort field options
 */
export const getSortFieldOptions = () => {
  return [
    { value: 'join-date', label: 'Date', icon: 'Calendar' },
    { value: 'name', label: 'Name', icon: 'User' },
    { value: 'offer', label: 'Offer', icon: 'DollarSign' },
    { value: 'mileage', label: 'Mileage', icon: 'Gauge' },
    { value: 'vehicle', label: 'Vehicle', icon: 'Car' },
  ];
};

/**
 * Get sort direction options
 * @returns {Object} Sort direction options
 */
export const getSortDirectionOptions = () => {
  return {
    asc: { value: 'asc', label: 'Ascending', icon: 'ArrowUp' },
    desc: { value: 'desc', label: 'Descending', icon: 'ArrowDown' }
  };
};

/**
 * Parse sort configuration from field and direction
 * @param {string} field - Sort field
 * @param {string} direction - Sort direction
 * @returns {string} Combined sort value
 */
export const parseSortConfig = (field, direction) => {
  return `${field}-${direction}`;
};

/**
 * Parse sort value into field and direction
 * @param {string} sortValue - Combined sort value
 * @returns {Object} Parsed field and direction
 */
export const parseSortValue = (sortValue) => {
  const [field, direction] = sortValue.split('-');
  return { field, direction };
};
