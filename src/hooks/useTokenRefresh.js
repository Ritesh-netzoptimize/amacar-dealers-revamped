import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { refreshToken } from '@/redux/slices/userSlice';
import { getTimeUntilExpiry, isTokenExpired, needsTokenRefresh } from '@/utils/tokenUtils';
import Cookies from 'js-cookie';

/**
 * Hook for managing token refresh functionality
 * @returns {Object} Token refresh utilities and state
 */
export const useTokenRefresh = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [timeUntilExpiry, setTimeUntilExpiry] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Update time until expiry every second
  useEffect(() => {
    if (!user) {
      setTimeUntilExpiry(0);
      return;
    }

    const updateTime = () => {
      setTimeUntilExpiry(getTimeUntilExpiry());
    };

    // Update immediately
    updateTime();

    // Update every second
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [user]);

  // Manual refresh function
  const refreshTokenManually = async () => {
    if (isRefreshing) return;

    setIsRefreshing(true);
    try {
      await dispatch(refreshToken());
    } catch (error) {
      console.error('Manual token refresh failed:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Check if user has a valid token in cookies
  const hasValidToken = () => {
    const token = Cookies.get('authToken');
    const expiration = localStorage.getItem('authExpiration');
    
    if (!token || !expiration) return false;
    
    const expTime = parseInt(expiration, 10);
    return Date.now() < expTime;
  };

  // Check if token needs refresh
  const shouldRefresh = needsTokenRefresh();

  return {
    timeUntilExpiry,
    isExpired: isTokenExpired(),
    needsRefresh: shouldRefresh,
    isRefreshing,
    refreshToken: refreshTokenManually,
    hasValidToken: hasValidToken(),
    user
  };
};
