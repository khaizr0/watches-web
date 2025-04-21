import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, isLoading, user } = useContext(AuthContext);
    const location = useLocation();

    if (isLoading) {
        return <div>Loading authentication status...</div>;
    }

    if (isAuthenticated && user) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
