import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadUser, logout, logoutUser, clearLoginRedirect } from "@/redux/slices/userSlice";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import tokenRefreshService from "@/services/tokenRefreshService";

export function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, loginRedirect } = useSelector((state) => state.user);

  // Load user on mount
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  // Start token refresh service when user is loaded
  useEffect(() => {
    if (user) {
      console.log('Starting token refresh service for user:', user.username);
      tokenRefreshService.start();
    } else {
      console.log('Stopping token refresh service - no user');
      tokenRefreshService.stop();
    }

    // Cleanup on unmount
    return () => {
      tokenRefreshService.stop();
    };
  }, [user]);

  // Handle token expiration (fallback for when refresh fails)
  useEffect(() => {
    if (user) {
      const expiration = localStorage.getItem("authExpiration");
      if (expiration) {
        const expTime = parseInt(expiration, 10);
        const remainingTime = expTime - Date.now();

        // Only set a fallback timer if there's more than 2 minutes left
        // (refresh service handles the 1-minute refresh)
        if (remainingTime > (2 * 60 * 1000)) {
          const timer = setTimeout(() => {
            console.warn('Token expired, logging out user');
            dispatch(logoutUser());
            navigate("/");
          }, remainingTime);
          return () => clearTimeout(timer);
        } else if (remainingTime <= 0) {
          // Token already expired
          dispatch(logoutUser());
          navigate("/");
        }
      }
    }
  }, [user, dispatch, navigate]);

  // Handle redirect after login
  useEffect(() => {
    if (user) {
      if (loginRedirect === null) {
        // Stay on same page (e.g. condition assessment flow)
        dispatch(clearLoginRedirect());
      } else if (loginRedirect) {
        // Redirect to requested path (e.g. /dashboard from header)
        navigate(loginRedirect, { replace: true });
        dispatch(clearLoginRedirect());
      }
      // Removed default dashboard redirect - user stays on current page
    }
  }, [user, loginRedirect, dispatch, navigate]);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-200"
      >
        <div className="flex flex-col items-center gap-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="w-12 h-12 text-orange-500" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg font-medium text-slate-700"
          >
            Loading your experience...
          </motion.p>
        </div>
      </motion.div>
    );
  }

  return <>{children}</>;
}
