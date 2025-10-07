import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || 'https://dealer.amacar.ai',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Enable cookies for HTTP-only token storage
});

api.interceptors.request.use(
  (config) => {
    // No need to manually add token - HTTP-only cookies are sent automatically
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Don't auto-logout for 2FA toggle requests - let the component handle it
      const isTwoFAToggle = error.config?.url?.includes('/user/twofa');
      const isRefreshToken = error.config?.url?.includes('/auth/refresh-token');
      const isLogout = error.config?.url?.includes('/auth/logout');
      
      if (!isTwoFAToggle && !isRefreshToken && !isLogout) {
        // Mark this request as retried to prevent infinite loops
        originalRequest._retry = true;
        
        try {
          // Import the token refresh service dynamically to avoid circular imports
          const { default: tokenRefreshService } = await import('@/services/tokenRefreshService');
          
          // Attempt to refresh the token
          const refreshResult = await tokenRefreshService.forceRefresh();
          
          if (refreshResult.type === 'user/refreshToken/fulfilled') {
            // Token refreshed successfully, retry the original request
            return api(originalRequest);
          } else {
            // Refresh failed, clear data and let the app handle logout
            localStorage.removeItem('authUser');
            localStorage.removeItem('authExpiration');
          }
        } catch (refreshError) {
          console.error('Token refresh failed in interceptor:', refreshError);
          // Clear any remaining localStorage data (for backward compatibility)
          localStorage.removeItem('authToken');
          localStorage.removeItem('authUser');
          localStorage.removeItem('authExpiration');
        }
      }
    }
    return Promise.reject(error);
  }
);



// Dashboard Cards API
export const getDashboardCards = async () => {
  try {
    const response = await api.get('/dashboard/cards');
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard cards:', error);
    throw error;
  }
};

// Recent Vehicles API (using live auctions endpoint)
export const getRecentVehicles = async (limit = 6) => {
  try {
    const response = await api.get('/live-auctions', {
        params: {
          page: 1,
          per_page: limit
        }
      });
    return response.data;
  } catch (error) {
    console.error('Error fetching recent vehicles:', error);
    throw error;
  }
};

// Recent Customers API (using active customers endpoint)
export const getRecentCustomers = async (limit = 5) => {
  try {
    const response = await api.get('/active-customers', {
      params: {
        page: 1,
        per_page: limit
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching recent customers:', error);
    throw error;
  }
};

// Live Auctions API
export const getLiveAuctions = async (page = 1, perPage = 4, filters = {}) => {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      per_page: perPage.toString(),
      ...filters
    });
    
    const response = await api.get(`/wp-json/dealer-portal/v1/live-auctions?${params}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching live auctions:', error);
    throw error;
  }
};

// Dashboard Activity API
export const getDashboardActivity = async (limit = 6) => {
  try {
    const response = await api.get('/dealer-dashboard/activity', {
      params: {
        limit: limit
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard activity:', error);
    throw error;
  }
};

// Customer Details API
export const getCustomerDetails = async (customerId) => {
  try {
    const response = await api.get(`/customer/details/${customerId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching customer details:', error);
    throw error;
  }
};

// Pass Vehicle API
export const passVehicle = async (productId) => {
  try {
    const response = await api.post('/bids/pass-vehicle', {
      product_id: productId
    });
    return response.data;
  } catch (error) {
    console.error('Error passing vehicle:', error);
    throw error;
  }
};

// Unpass Vehicle API
export const unpassVehicle = async (productId) => {
  try {
    const response = await api.post('/bids/unpass-vehicle', {
      product_id: productId
    });
    return response.data;
  } catch (error) {
    console.error('Error unpassing vehicle:', error);
    throw error;
  }
};

export default api;