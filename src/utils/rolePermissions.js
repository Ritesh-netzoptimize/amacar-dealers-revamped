/**
 * Role-based access control utilities
 * Centralized permission checks for different user roles
 *
 * Usage Examples:
 *
 * // Import individual functions
 * import { canAccessDealerships, canAccessSalesManagers } from '@/utils/rolePermissions';
 *
 * // Use in component
 * const userRole = user?.role;
 * if (canAccessDealerships(userRole)) {
 *   // Show dealership management UI
 * }
 *
 * // Import all permissions at once
 * import { getUserPermissions } from '@/utils/rolePermissions';
 *
 * // Use in component
 * const permissions = getUserPermissions(userRole, user);
 * if (permissions.canAccessDealerships) {
 *   // Show dealership management UI
 * }
 *
 * // Check multiple roles
 * import { hasAnyRole, USER_ROLES } from '@/utils/rolePermissions';
 *
 * if (hasAnyRole(userRole, [USER_ROLES.ADMINISTRATOR, USER_ROLES.SALES_MANAGER])) {
 *   // User has admin or sales manager access
 * }
 */

// Define user roles
export const USER_ROLES = {
  ADMINISTRATOR: "administrator",
  SALES_MANAGER: "sales_manager",
  DEALER: "dealer",
  DEALER_USER: "dealer_user",
};

/**
 * Check if user can create dealership users
 * @param {string} userRole - The user's role
 * @returns {boolean} - Whether user can create dealership users
 */
export const canCreateDealershipUsers = (userRole) => {
  return userRole === USER_ROLES.DEALER;
};

/**
 * Check if user can delete update dealership users
 * @param {string} userRole - The user's role
 * @returns {boolean} - Whether user can create dealership users
 */
export const canDeleteUpdateDealershipUsers = (userRole) => {
    return userRole === USER_ROLES.DEALER || USER_ROLES.ADMINISTRATOR || USER_ROLES.SALES_MANAGER;
  };

/**
 * Check if user can access dealership users management
 * @param {string} userRole - The user's role
 * @returns {boolean} - Whether user can access dealership users
 */
export const canAccessDealershipUsers = (userRole) => {
  return (
    userRole === USER_ROLES.ADMINISTRATOR ||
    userRole === USER_ROLES.SALES_MANAGER ||
    userRole === USER_ROLES.DEALER
  );
};

/**
 * Check if user can access dealerships management
 * @param {string} userRole - The user's role
 * @returns {boolean} - Whether user can access dealerships
 */
export const canAccessDealerships = (userRole) => {
  return (
    userRole === USER_ROLES.SALES_MANAGER ||
    userRole === USER_ROLES.ADMINISTRATOR
  );
};

/**
 * Check if user can access invited dealerships
 * @param {string} userRole - The user's role
 * @returns {boolean} - Whether user can access invited dealerships
 */
export const canAccessInvitedDealerships = (userRole) => {
  return (
    userRole === USER_ROLES.ADMINISTRATOR ||
    userRole === USER_ROLES.SALES_MANAGER
  );
};

/**
 * Check if user can access sales managers management
 * @param {string} userRole - The user's role
 * @returns {boolean} - Whether user can access sales managers
 */
export const canAccessSalesManagers = (userRole) => {
  return userRole === USER_ROLES.ADMINISTRATOR;
};

/**
 * Check if user can access partner dealers
 * @param {string} userRole - The user's role
 * @param {Object} user - The user object (for additional checks like card details)
 * @returns {boolean} - Whether user can access partner dealers
 */
export const canAccessPartnerDealers = (userRole, user = null) => {
  // Basic role check
  //   const hasRoleAccess = userRole === USER_ROLES.DEALER;

  //   // Additional check for card details if user object is provided
  //   if (user && hasRoleAccess) {
  //     // Add your card details check here
  //     // Example: return hasRoleAccess && user.hasValidCard;
  //     return hasRoleAccess;
  //   }

  //   return hasRoleAccess;
  return userRole === USER_ROLES.DEALER;
};

/**
 * Check if user can access subscription cancellation requests
 * @param {string} userRole - The user's role
 * @returns {boolean} - Whether user can access subscription cancellation requests
 */
export const canAccessSubscriptionCancellationRequest = (userRole) => {
  // Define which roles can access subscription cancellation requests
  return (
    userRole === USER_ROLES.ADMINISTRATOR ||
    userRole === USER_ROLES.SALES_MANAGER
  );
};

/**
 * Get all permissions for a user role
 * @param {string} userRole - The user's role
 * @param {Object} user - The user object (for additional checks)
 * @returns {Object} - Object containing all permission checks
 */
export const getUserPermissions = (userRole, user = null) => {
  return {
    canCreateDealershipUsers: canCreateDealershipUsers(userRole),
    canDeleteUpdateDealershipUsers: canDeleteUpdateDealershipUsers(userRole),
    canAccessDealershipUsers: canAccessDealershipUsers(userRole),
    canAccessDealerships: canAccessDealerships(userRole),
    canAccessInvitedDealerships: canAccessInvitedDealerships(userRole),
    canAccessSalesManagers: canAccessSalesManagers(userRole),
    canAccessPartnerDealers: canAccessPartnerDealers(userRole, user),
    canAccessSubscriptionCancellationRequest:
      canAccessSubscriptionCancellationRequest(userRole),
  };
};

/**
 * Check if user has any of the specified roles
 * @param {string} userRole - The user's role
 * @param {Array<string>} allowedRoles - Array of allowed roles
 * @returns {boolean} - Whether user has any of the allowed roles
 */
export const hasAnyRole = (userRole, allowedRoles) => {
  return allowedRoles.includes(userRole);
};

/**
 * Check if user has all of the specified roles (for users with multiple roles)
 * @param {Array<string>} userRoles - The user's roles array
 * @param {Array<string>} requiredRoles - Array of required roles
 * @returns {boolean} - Whether user has all required roles
 */
export const hasAllRoles = (userRoles, requiredRoles) => {
  return requiredRoles.every((role) => userRoles.includes(role));
};
