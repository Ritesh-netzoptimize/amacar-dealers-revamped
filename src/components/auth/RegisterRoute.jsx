import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Register from '../../pages/register/Register';

function RegisterRoute() {
  const { user } = useSelector((state) => state.user);
  const expiration = localStorage.getItem('authExpiration');
  const isExpired = expiration && Date.now() > parseInt(expiration);
  const isLoggedIn = user && !isExpired;

  // If user is logged in, redirect to home
  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  // If user is not logged in, show register page
  return <Register />;
}

export default RegisterRoute;
