import React, { createContext, useState, useContext } from 'react';

// Create Context
const UserContext = createContext();

// Create Provider Component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Retrieve user ID from localStorage if available
    const savedUserId = localStorage.getItem('userId');
    return savedUserId ? { id: savedUserId } : null;
  });

  const login = (userId) => {
    localStorage.setItem('userId', userId);
    setUser({ id: userId });
  };

  const logout = () => {
    localStorage.removeItem('userId');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use UserContext
export const useUser = () => useContext(UserContext);
