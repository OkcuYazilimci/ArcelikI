'use client'

// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api-user/getById`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
        const data = await response.json();
        // data.user???
        // Credentials include - getbyId
        console.log(data);
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };


  }, []);

  const login = async () => {
      await fetchUser();
  };

  const logout = () => {
    // Remove userId from cookies
    removeCookie('userId', { path: '/' });
    removeCookie('jsonwebtoken', { path: '/' });

    // Remove user from context
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>  
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
