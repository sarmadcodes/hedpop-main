import React, { createContext, useState, useEffect, useCallback, useContext, useMemo } from 'react';
import { tokenStorage } from '../services/apiClient';
import authService from '../services/authService';
import { registerForPushNotifications } from '../services/pushNotifications';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [initializing, setInitializing] = useState(true);

  // On app start — if a token exists, verify it and restore session
  useEffect(() => {
    (async () => {
      const token = await tokenStorage.get();
      if (token) {
        try {
          const profile = await authService.me();
          setUser(profile);
          setIsLoggedIn(true);
          registerForPushNotifications().catch(() => {});
        } catch {
          // Token expired or invalid — clear and force re-login
          await tokenStorage.clear();
        }
      }
      setInitializing(false);
    })();
  }, []);

  const loginUser = useCallback(async (credentials) => {
    // authService.login calls the backend AND saves the token internally
    const data = await authService.login(credentials);
    setUser(data.user);
    setIsLoggedIn(true);
    registerForPushNotifications().catch(() => {});
    return data;
  }, []);

  const registerUser = useCallback(async (payload) => {
    // authService.register calls the backend AND saves the token internally
    const data = await authService.register(payload);
    setUser(data.user);
    setIsLoggedIn(true);
    return data;
  }, []);

  const logoutUser = useCallback(async () => {
    await authService.logout();
    setUser(null);
    setIsLoggedIn(false);
  }, []);

  const updateUser = useCallback((patch) => {
    setUser((u) => (u ? { ...u, ...patch } : u));
  }, []);

  const value = useMemo(
    () => ({ user, isLoggedIn, initializing, loginUser, registerUser, logoutUser, updateUser }),
    [user, isLoggedIn, initializing, loginUser, registerUser, logoutUser, updateUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
};