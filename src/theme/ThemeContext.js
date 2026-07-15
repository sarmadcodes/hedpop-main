import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { applyTheme, paletteFor, colors } from './colors';

const STORAGE_KEY = '@hedpop/theme-gender';
const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [gender, setGenderState] = useState(null); // null = not yet decided
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved === 'male' || saved === 'female') {
          applyTheme(saved);
          setGenderState(saved);
        }
      } catch {}
      setReady(true);
    })();
  }, []);

  const setGender = useCallback(async (next) => {
    if (next !== 'male' && next !== 'female') return;
    applyTheme(next);
    setGenderState(next);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, next);
    } catch {}
  }, []);

  const value = useMemo(
    () => ({
      gender,
      ready,
      hasChosen: gender === 'male' || gender === 'female',
      palette: paletteFor(gender || 'male'),
      colors,
      setGender,
    }),
    [gender, ready, setGender],
  );

  // No remount — useThemedStyles re-memoizes on `gender` change, so all themed
  // screens instantly rebuild their StyleSheets without unmounting navigation.
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
};
