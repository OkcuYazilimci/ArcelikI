
// AuthContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api-user/getById`, {
          credentials: 'include'
        });
        const data = await response.json();
        setUser(data.users);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const login = async (user) => {
    setUser(user);
  };

  const logout = async () => {
    try {
      // You may need to send a logout request to your server
      await fetch('http://localhost:3000/api-user/logout', {
        method: 'POST',
        credentials: 'include'
      });

      // Set user state to null after successful logout
      setUser(null);
    } catch (error) {
      console.error("Error during logout:", error);
    }
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


