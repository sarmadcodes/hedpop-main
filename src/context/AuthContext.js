import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginUser = () => setIsLoggedIn(true);
  const logoutUser = () => setIsLoggedIn(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);