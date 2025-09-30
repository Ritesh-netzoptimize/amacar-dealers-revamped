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
  // console.log('🔄 Starting ASCENDING date sort...');
  // console.log('📊 Total customers to sort:', customers.length);
  
  return [...customers].sort((a, b) => {
    const dateA = new Date(a.joinDate);
    const dateB = new Date(b.joinDate);
    
    // console.log(`📅 Comparing: ${a.name} (${a.joinDate}) vs ${b.name} (${b.joinDate})`);
    // console.log(`🕐 Parsed dates: ${dateA.toISOString()} vs ${dateB.toISOString()}`);
    
    // Handle invalid dates
    if (isNaN(dateA.getTime()) && isNaN(dateB.getTime())) {
      // console.log('❌ Both dates invalid, returning 0');
      return 0;
    }
    if (isNaN(dateA.getTime())) {
      // console.log('❌ Date A invalid, returning 1 (B comes first)');
      return 1;
    }
    if (isNaN(dateB.getTime())) {
      // console.log('❌ Date B invalid, returning -1 (A comes first)');
      return -1;
    }
    
    const result = dateA - dateB;
    // console.log(`✅ Result: ${result} (${result < 0 ? 'A comes first' : result > 0 ? 'B comes first' : 'Equal'})`);
    return result;
  });
};

/**
 * Sort customers by join date (descending)
 * @param {Array} customers - Array of customers
 * @returns {Array} Sorted customers
 */
export const sortByJoinDateDesc = (customers) => {
  // console.log('🔄 Starting DESCENDING date sort...');
  // console.log('📊 Total customers to sort:', customers.length);
  
  return [...customers].sort((a, b) => {
    const dateA = new Date(a.joinDate);
    const dateB = new Date(b.joinDate);
    
    // console.log(`📅 Comparing: ${a.name} (${a.joinDate}) vs ${b.name} (${b.joinDate})`);
    // console.log(`🕐 Parsed dates: ${dateA.toISOString()} vs ${dateB.toISOString()}`);
    
    // Handle invalid dates
    if (isNaN(dateA.getTime()) && isNaN(dateB.getTime())) {
      // console.log('❌ Both dates invalid, returning 0');
      return 0;
    }
    if (isNaN(dateA.getTime())) {
      // console.log('❌ Date A invalid, returning 1 (B comes first)');
      return 1;
    }
    if (isNaN(dateB.getTime())) {
      // console.log('❌ Date B invalid, returning -1 (A comes first)');
      return -1;
    }
    
    const result = dateB - dateA;
    // console.log(`✅ Result: ${result} (${result < 0 ? 'A comes first' : result > 0 ? 'B comes first' : 'Equal'})`);
    return result;
  });
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
  // console.log('🎯 Main sorting function called with:', sortBy);
  // console.log('📋 Input customers:', customers.length);
  
  if (!customers || customers.length === 0) {
    // console.log('⚠️ No customers to sort, returning empty array');
    return [];
  }

  switch (sortBy) {
    case 'name-asc':
      // console.log('📝 Sorting by name (ascending)');
      return sortByNameAsc(customers);
    case 'name-desc':
      // console.log('📝 Sorting by name (descending)');
      return sortByNameDesc(customers);
    case 'join-date-asc':
      // console.log('📅 Sorting by join date (ascending)');
      return sortByJoinDateAsc(customers);
    case 'join-date-desc':
      // console.log('📅 Sorting by join date (descending)');
      return sortByJoinDateDesc(customers);
    case 'offer-asc':
      // console.log('💰 Sorting by offer (ascending)');
      return sortByOfferAsc(customers);
    case 'offer-desc':
      // console.log('💰 Sorting by offer (descending)');
      return sortByOfferDesc(customers);
    case 'mileage-asc':
      // console.log('🛣️ Sorting by mileage (ascending)');
      return sortByMileageAsc(customers);
    case 'mileage-desc':
      // console.log('🛣️ Sorting by mileage (descending)');
      return sortByMileageDesc(customers);
    case 'vehicle-asc':
      // console.log('🚗 Sorting by vehicle (ascending)');
      return sortByVehicleAsc(customers);
    case 'vehicle-desc':
      // console.log('🚗 Sorting by vehicle (descending)');
      return sortByVehicleDesc(customers);
    default:
      // console.log('❓ Unknown sort type, returning original array');
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
  const result = `${field}-${direction}`;
  // console.log('🔧 Creating sort config:', { field, direction, result });
  return result;
};

/**
 * Parse sort value into field and direction
 * @param {string} sortValue - Combined sort value
 * @returns {Object} Parsed field and direction
 */
export const parseSortValue = (sortValue) => {
  // console.log('🔍 Parsing sort value:', sortValue);
  
  // Handle the case where we have field-direction format
  // e.g., "join-date-desc" should become field: "join-date", direction: "desc"
  const lastDashIndex = sortValue.lastIndexOf('-');
  if (lastDashIndex === -1) {
    // console.log('⚠️ No dash found, using default direction');
    return { field: sortValue, direction: 'desc' };
  }
  
  const field = sortValue.substring(0, lastDashIndex);
  const direction = sortValue.substring(lastDashIndex + 1);
  
  // console.log('✅ Parsed:', { field, direction });
  return { field, direction };
};
