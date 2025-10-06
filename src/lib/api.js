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

export default api;