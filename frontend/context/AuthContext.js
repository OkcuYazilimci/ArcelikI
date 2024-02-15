'use client'

// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['userId']);

  useEffect(() => {
    const fetchUser = async (userId) => {
      try {
        const response = await fetch(`http://localhost:3000/api-user/${userId}`);
        const data = await response.json();
        console.log(data);
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    // Check if userId cookie exists
    if (cookies.userId) {
      fetchUser(cookies.userId);
    }
  }, [cookies.userId]);

  const login = async () => {
    const userIdFromCookie = cookies.userId;

    if (userIdFromCookie) {
      await fetchUser(userIdFromCookie);
    } else {
      console.error('No userId found in cookies');
    }
  };

  const logout = () => {
    // Remove userId from cookies
    removeCookie('userId', { path: '/' });

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
