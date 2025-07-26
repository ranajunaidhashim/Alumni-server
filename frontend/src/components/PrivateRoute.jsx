import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const PrivateRoute = ({ children}) => {
  const { isLoggedIn, isAdmin } = useAuth();

  return (
        isLoggedIn && isAdmin
          ? children
          : <Navigate to="/login" replace />
  );
}

export default PrivateRoute;
