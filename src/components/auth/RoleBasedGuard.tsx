import { ReactNode } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router';

interface RoleBasedGuardProps {
  children: ReactNode;
  allowedRoles: string[];
  redirectTo?: string;
}

export const RoleBasedGuard = ({
  children,
  allowedRoles,
  redirectTo = '/'
}: RoleBasedGuardProps) => {
  const { user, hasRole } = useAuth();

  const hasRequiredRole = allowedRoles.some(role => hasRole(role));

  if (!hasRequiredRole) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

export default RoleBasedGuard; 