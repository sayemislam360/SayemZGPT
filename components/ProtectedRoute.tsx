
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  );

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If role is required, check if user has it OR if user is a Super Admin
  if (requiredRole) {
    const hasRole = user?.role === requiredRole;
    const isSuperAdmin = user?.role === UserRole.SUPER_ADMIN;
    
    // Super Admins bypass admin role checks
    if (!hasRole && !isSuperAdmin) {
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};
