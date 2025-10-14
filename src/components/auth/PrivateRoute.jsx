import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { canAccessRoute, getRequiredRolesForRoute } from '@/utils/rolePermissions';

function PrivateRoute({ children }) {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const expiration = localStorage.getItem('authExpiration');
  const isExpired = expiration && Date.now() > parseInt(expiration);
  
  useEffect(() => {
    console.log("user", user);
  }, [user]);

  // Check if user is authenticated
  if (!user || isExpired) {
    return <Navigate to="/" replace />;
  }
  
  const userRole = user?.role;
  const currentPath = location.pathname;


  // Check if user has permission to access the current route
  if (!canAccessRoute(userRole, currentPath)) {
    const requiredRoles = getRequiredRolesForRoute(currentPath);
    return (
      <Navigate 
        to="/unauthorized" 
        replace 
        state={{ 
          requiredRole: requiredRoles.length > 0 ? requiredRoles.join(' or ') : 'Unknown',
          userRole: userRole,
          attemptedPath: currentPath
        }} 
      />
    );
  }

  return children;
}

export default PrivateRoute;