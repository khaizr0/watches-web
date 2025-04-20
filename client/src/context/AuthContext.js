// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const checkAuthStatus = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/auth/status', {
                withCredentials: true,
            });
            if (response.status === 200 && response.data.isAuthenticated) {
                setUser(response.data.user);
            } else {
                setUser(null);
            }
        } catch (error) {
            setUser(null);
            
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        checkAuthStatus();
    }, [checkAuthStatus]);

    const login = (userData) => {
        setUser(userData);
    };

    const logout = async () => {
        setIsLoading(true);
        try {
            await axios.post('http://localhost:5000/api/auth/logout', {}, {
                withCredentials: true,
            });
        } catch (error) {
        } finally {
            setUser(null);
            setIsLoading(false);
        }
    };

    const value = {
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        checkAuthStatus
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
