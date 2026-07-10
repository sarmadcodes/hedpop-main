import React, { createContext, useState, useEffect, useCallback, useContext, useMemo } from 'react';
import { tokenStorage } from '../services/apiClient';
import authService from '../services/authService';
import { registerForPushNotifications } from '../services/pushNotifications';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [initializing, setInitializing] = useState(true);

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
          await tokenStorage.clear();
        }
      }
      setInitializing(false);
    })();
  }, []);

  const loginUser = useCallback(async (credentials) => {
    const data = await authService.login(credentials);
    setUser(data.user);
    setIsLoggedIn(true);
    registerForPushNotifications().catch(() => {});
    return data;
  }, []);

  const registerUser = useCallback(async (payload) => {
    const data = await authService.register(payload);
    setUser(data.user);
    setIsLoggedIn(true);
    registerForPushNotifications().catch(() => {});
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
