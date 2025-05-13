import React, { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('userId'); // בדיקה לפי userId

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
