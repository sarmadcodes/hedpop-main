import React, { createContext, useState, useEffect, useCallback, useContext, useMemo } from 'react';
import { tokenStorage } from '../services/apiClient';
import authService from '../services/authService';
import userService from '../services/userService';
import { registerForPushNotifications } from '../services/pushNotifications';
import { useTheme } from '../theme';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const { setGender, gender: themeGender } = useTheme();

  const syncGender = useCallback(
    (u) => {
      if (u?.gender && u.gender !== themeGender) setGender(u.gender);
    },
    [setGender, themeGender],
  );

  useEffect(() => {
    (async () => {
      const token = await tokenStorage.get();
      if (token) {
        try {
          const profile = await authService.me();
          setUser(profile);
          setIsLoggedIn(true);
          syncGender(profile);
          registerForPushNotifications().catch(() => {});
        } catch {
          await tokenStorage.clear();
        }
      }
      setInitializing(false);
    })();
  }, [syncGender]);

  const loginUser = useCallback(async (credentials) => {
    const data = await authService.login(credentials);
    setUser(data.user);
    setIsLoggedIn(true);
    syncGender(data.user);
    registerForPushNotifications().catch(() => {});
    return data;
  }, [syncGender]);

  const registerUser = useCallback(async (payload) => {
    const data = await authService.register(payload);
    setUser(data.user);
    setIsLoggedIn(true);
    syncGender(data.user);
    registerForPushNotifications().catch(() => {});
    return data;
  }, [syncGender]);

  const logoutUser = useCallback(async () => {
    await authService.logout();
    setUser(null);
    setIsLoggedIn(false);
  }, []);

  // Deletes the account on the server, then forgets the session locally. Unlike
  // logoutUser this doesn't call /auth/logout afterwards: the account is gone.
  const deleteAccount = useCallback(async (password) => {
    try {
      await userService.deleteAccount(password);
    } catch (err) {
      // 404 = the account was already deleted (e.g. from another device): the
      // goal is reached, so just fall through and clear the stale session.
      if (err?.status !== 404) throw err;
    }
    await tokenStorage.clear();
    setUser(null);
    setIsLoggedIn(false);
  }, []);

  const updateUser = useCallback((patch) => {
    setUser((u) => (u ? { ...u, ...patch } : u));
  }, []);

  const value = useMemo(
    () => ({ user, isLoggedIn, initializing, loginUser, registerUser, logoutUser, deleteAccount, updateUser }),
    [user, isLoggedIn, initializing, loginUser, registerUser, logoutUser, deleteAccount, updateUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
};
