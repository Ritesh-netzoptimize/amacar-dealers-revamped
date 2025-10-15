import { store } from '../redux/store';
import { refreshToken, logoutUser } from '../redux/slices/userSlice';
import Cookies from 'js-cookie';

class TokenRefreshService {
  constructor() {
    this.refreshTimer = null;
    this.isRefreshing = false;
    this.refreshPromise = null;
  }

  // Start the token refresh service
  start() {
    // Check if we have a valid session before starting
    const user = localStorage.getItem('authUser');
    const expiration = localStorage.getItem('authExpiration');
    const token = Cookies.get('authToken');
    
    if (!user || !expiration || !token) {
      console.warn('No valid session found, cannot start token refresh service');
      return;
    }
    
    // Check if token is already expired
    const expTime = parseInt(expiration, 10);
    const now = Date.now();
    const timeUntilExpiry = expTime - now;
    
    if (timeUntilExpiry <= 0) {
      console.warn('Token already expired, cannot start refresh service');
      localStorage.removeItem('authUser');
      localStorage.removeItem('authExpiration');
      Cookies.remove('authToken');
      return;
    }
    
    this.scheduleRefresh();
  }

  // Stop the token refresh service
  stop() {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
      this.refreshTimer = null;
    }
    this.isRefreshing = false;
    this.refreshPromise = null;
  }

  // Schedule the next token refresh
  scheduleRefresh() {
    const expiration = localStorage.getItem('authExpiration');
    if (!expiration) {
      console.warn('No token expiration found, cannot schedule refresh');
      return;
    }

    const expTime = parseInt(expiration, 10);
    const now = Date.now();
    const timeUntilExpiry = expTime - now;

    // If token is already expired, logout immediately
    if (timeUntilExpiry <= 0) {
      console.warn('Token has expired, logging out');
      store.dispatch(logoutUser());
      return;
    }

    // Schedule refresh 60 seconds before expiry
    const refreshTime = timeUntilExpiry - (60 * 1000);
    
    // If less than 60 seconds left, refresh immediately
    const actualRefreshTime = Math.max(refreshTime, 0);

    this.refreshTimer = setTimeout(() => {
      this.refreshToken();
    }, actualRefreshTime);
  }

  // Refresh the token
  async refreshToken() {
    // Prevent multiple simultaneous refresh attempts
    if (this.isRefreshing) {
      return this.refreshPromise;
    }

    this.isRefreshing = true;

    this.refreshPromise = store.dispatch(refreshToken())
      .then((result) => {
        if (result.type === 'user/refreshToken/fulfilled') {
          // Schedule the next refresh
          this.scheduleRefresh();
        } else {
          console.error('Token refresh failed:', result.payload);
          // If refresh fails, just clear local data and stop the service
          // Don't call logout API as it might also fail and cause loops
          localStorage.removeItem('authUser');
          localStorage.removeItem('authExpiration');
          Cookies.remove('authToken');
          this.stop();
        }
        return result;
      })
      .catch((error) => {
        console.error('Token refresh error:', error);
        // Just clear local data and stop the service
        localStorage.removeItem('authUser');
        localStorage.removeItem('authExpiration');
        Cookies.remove('authToken');
        this.stop();
        return error;
      })
      .finally(() => {
        this.isRefreshing = false;
        this.refreshPromise = null;
      });

    return this.refreshPromise;
  }

  // Force refresh the token (useful for manual refresh)
  async forceRefresh() {
    this.stop();
    return this.refreshToken();
  }

  // Check if token needs refresh
  needsRefresh() {
    const expiration = localStorage.getItem('authExpiration');
    if (!expiration) return false;

    const expTime = parseInt(expiration, 10);
    const now = Date.now();
    const timeUntilExpiry = expTime - now;

    // Return true if less than 60 seconds left
    return timeUntilExpiry <= (60 * 1000);
  }

  // Debug method to check current token status
  getTokenStatus() {
    const user = localStorage.getItem('authUser');
    const expiration = localStorage.getItem('authExpiration');
    const token = Cookies.get('authToken');
    
    if (!user || !expiration || !token) {
      return { valid: false, reason: 'Missing session data' };
    }
    
    const expTime = parseInt(expiration, 10);
    const now = Date.now();
    const timeUntilExpiry = expTime - now;
    
    return {
      valid: timeUntilExpiry > 0,
      timeUntilExpiry: Math.round(timeUntilExpiry / 1000),
      expiresAt: new Date(expTime).toLocaleString(),
      needsRefresh: this.needsRefresh(),
      isRefreshing: this.isRefreshing,
      isRunning: !!this.refreshTimer
    };
  }

  // Ensure the service is running (useful for fallback)
  ensureRunning() {
    const user = localStorage.getItem('authUser');
    const expiration = localStorage.getItem('authExpiration');
    const token = Cookies.get('authToken');
    
    if (user && expiration && token && !this.refreshTimer) {
      this.start();
    }
  }
}

// Create a singleton instance
const tokenRefreshService = new TokenRefreshService();

// Make service globally available for debugging
if (typeof window !== 'undefined') {
  window.tokenRefreshService = tokenRefreshService;
}

export default tokenRefreshService;
