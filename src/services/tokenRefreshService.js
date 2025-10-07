import { store } from '../redux/store';
import { refreshToken, logoutUser } from '../redux/slices/userSlice';

class TokenRefreshService {
  constructor() {
    this.refreshTimer = null;
    this.isRefreshing = false;
    this.refreshPromise = null;
  }

  // Start the token refresh service
  start() {
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

    // Schedule refresh 1 minute before expiry (60 * 1000 ms)
    const refreshTime = timeUntilExpiry - (60 * 1000);
    
    // If less than 1 minute left, refresh immediately
    const actualRefreshTime = Math.max(refreshTime, 0);

    console.log(`Token refresh scheduled in ${Math.round(actualRefreshTime / 1000)} seconds`);

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
    console.log('Refreshing token...');

    this.refreshPromise = store.dispatch(refreshToken())
      .then((result) => {
        if (refreshToken.fulfilled.match(result)) {
          console.log('Token refreshed successfully');
          // Schedule the next refresh
          this.scheduleRefresh();
        } else {
          console.error('Token refresh failed:', result.payload);
          // If refresh fails, logout the user
          store.dispatch(logoutUser());
        }
        return result;
      })
      .catch((error) => {
        console.error('Token refresh error:', error);
        store.dispatch(logoutUser());
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

    // Return true if less than 1 minute left
    return timeUntilExpiry <= (60 * 1000);
  }
}

// Create a singleton instance
const tokenRefreshService = new TokenRefreshService();

export default tokenRefreshService;
