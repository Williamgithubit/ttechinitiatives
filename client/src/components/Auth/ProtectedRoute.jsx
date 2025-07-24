import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { selectIsAuthenticated, selectUser } from "../../store/Auth/authSlice";

const ProtectedRoute = ({ allowedRoles }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const location = useLocation();

  console.log('ProtectedRoute - Checking access:', {
    path: location.pathname,
    isAuthenticated,
    user: user ? { uid: user.uid, email: user.email, role: user.role } : null,
    allowedRoles,
  });

  if (!isAuthenticated) {
    console.log('ProtectedRoute - Not authenticated, redirecting to /login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const role = user?.role || 'user';
  if (allowedRoles && !allowedRoles.includes(role)) {
    console.log(`ProtectedRoute - Access denied: User role '${role}' not in allowed roles:`, allowedRoles);
    return <Navigate to="/" replace />;
  }

  console.log('ProtectedRoute - Access granted');
  return <Outlet />;
};

export default ProtectedRoute;