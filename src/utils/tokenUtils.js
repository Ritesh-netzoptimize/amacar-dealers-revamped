import tokenRefreshService from '@/services/tokenRefreshService';

/**
 * Check if the current token needs to be refreshed
 * @returns {boolean} True if token needs refresh
 */
export const needsTokenRefresh = () => {
  return tokenRefreshService.needsRefresh();
};

/**
 * Force refresh the current token
 * @returns {Promise} Promise that resolves when refresh is complete
 */
export const forceTokenRefresh = () => {
  return tokenRefreshService.forceRefresh();
};

/**
 * Get time until token expires in seconds
 * @returns {number} Seconds until expiration, or 0 if expired
 */
export const getTimeUntilExpiry = () => {
  const expiration = localStorage.getItem('authExpiration');
  if (!expiration) return 0;

  const expTime = parseInt(expiration, 10);
  const now = Date.now();
  const timeUntilExpiry = expTime - now;

  return Math.max(0, Math.round(timeUntilExpiry / 1000));
};

/**
 * Check if token is expired
 * @returns {boolean} True if token is expired
 */
export const isTokenExpired = () => {
  return getTimeUntilExpiry() === 0;
};

/**
 * Get formatted time until expiry
 * @returns {string} Formatted time string (e.g., "5 minutes", "30 seconds")
 */
export const getFormattedTimeUntilExpiry = () => {
  const seconds = getTimeUntilExpiry();
  
  if (seconds === 0) return 'Expired';
  
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''}${remainingSeconds > 0 ? ` ${remainingSeconds} second${remainingSeconds > 1 ? 's' : ''}` : ''}`;
  } else {
    return `${seconds} second${seconds > 1 ? 's' : ''}`;
  }
};
