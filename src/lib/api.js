import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || 'https://dealer.amacar.ai/wp-json/dealer-portal/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false, // Enable cookies for HTTP-only token storage
});

api.interceptors.request.use(
  (config) => {
    // Get token from cookie and add to Authorization header for protected routes
    const token = Cookies.get('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
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
      // Don't auto-refresh for these endpoints to prevent infinite loops
      const isTwoFAToggle = error.config?.url?.includes('/user/twofa');
      const isRefreshToken = error.config?.url?.includes('/auth/refresh-token');
      const isLogout = error.config?.url?.includes('/auth/logout');
      const isLogin = error.config?.url?.includes('/auth/login');
      
      if (!isTwoFAToggle && !isRefreshToken && !isLogout && !isLogin) {
        // Mark this request as retried to prevent infinite loops
        originalRequest._retry = true;
        
        try {
          // Import the token refresh service dynamically to avoid circular imports
          const { default: tokenRefreshService } = await import('@/services/tokenRefreshService');
          
          // Check if we have a valid user session before attempting refresh
          const user = localStorage.getItem('authUser');
          const expiration = localStorage.getItem('authExpiration');
          
          if (!user || !expiration) {
            console.warn('No valid session found, skipping token refresh');
            return Promise.reject(error);
          }
          
          // Check if token is already expired
          const expTime = parseInt(expiration, 10);
          if (Date.now() >= expTime) {
            console.warn('Token already expired, skipping refresh');
            localStorage.removeItem('authUser');
            localStorage.removeItem('authExpiration');
            Cookies.remove('authToken');
            return Promise.reject(error);
          }
          
          // Attempt to refresh the token
          const refreshResult = await tokenRefreshService.forceRefresh();
          
          if (refreshResult.type === 'user/refreshToken/fulfilled') {
            // Token refreshed successfully, retry the original request
            return api(originalRequest);
          } else {
            // Refresh failed, clear data and let the app handle logout
            console.warn('Token refresh failed, clearing session');
            localStorage.removeItem('authUser');
            localStorage.removeItem('authExpiration');
            Cookies.remove('authToken');
          }
        } catch (refreshError) {
          console.error('Token refresh failed in interceptor:', refreshError);
          // Clear any remaining localStorage data (for backward compatibility)
          localStorage.removeItem('authToken');
          localStorage.removeItem('authUser');
          localStorage.removeItem('authExpiration');
          Cookies.remove('authToken');
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
    
    const response = await api.get(`/live-auctions?${params}`);
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

// Reports API functions
export const getBidsReport = async (dateFrom, dateTo, groupBy = 'day') => {
  try {
    const params = new URLSearchParams({
      date_from: dateFrom,
      date_to: dateTo,
      group_by: groupBy
    });
    
    const response = await api.get(`/reports/bids?${params}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching bids report:', error);
    throw error;
  }
};

export const getCustomersReport = async (dateFrom, dateTo, groupBy = 'day') => {
  try {
    const params = new URLSearchParams({
      date_from: dateFrom,
      date_to: dateTo,
      group_by: groupBy
    });
    
    const response = await api.get(`/reports/customers?${params}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching customers report:', error);
    throw error;
  }
};

export const getVehiclesReport = async (dateFrom, dateTo, groupBy = 'day') => {
  try {
    const params = new URLSearchParams({
      date_from: dateFrom,
      date_to: dateTo,
      group_by: groupBy
    });
    
    const response = await api.get(`/reports/vehicles?${params}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching vehicles report:', error);
    throw error;
  }
};

export const getSummaryReport = async (dateFrom, dateTo, groupBy = 'day') => {
  try {
    const params = new URLSearchParams({
      date_from: dateFrom,
      date_to: dateTo,
      group_by: groupBy
    });
    
    const response = await api.get(`/reports/summary?${params}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching summary report:', error);
    throw error;
  }
};

// Invitations API functions
export const getInvitations = async (page = 1, perPage = 20) => {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      per_page: perPage.toString()
    });
    
    const response = await api.get(`/dealers/invitations?${params}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching invitations:', error);
    throw error;
  }
};

export const resendInvitation = async (invitationId) => {
  try {
    const response = await api.post(`/dealers/invitations/${invitationId}/resend`);
    return response.data;
  } catch (error) {
    console.error('Error resending invitation:', error);
    throw error;
  }
};

export const cancelInvitation = async (invitationId) => {
  try {
    const response = await api.delete(`/dealers/invitations/${invitationId}`);
    return response.data;
  } catch (error) {
    console.error('Error canceling invitation:', error);
    throw error;
  }
};

export default api;