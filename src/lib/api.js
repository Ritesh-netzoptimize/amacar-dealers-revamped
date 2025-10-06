import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || 'https://dealer.amacar.ai',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
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
  (error) => {
    if (error.response?.status === 401) {
      // Don't auto-logout for 2FA toggle requests - let the component handle it
      const isTwoFAToggle = error.config?.url?.includes('/user/twofa');
      
      if (!isTwoFAToggle) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
        localStorage.removeItem('authExpiration');
        //   window.location.href = '/unauthorized';
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

export default api;