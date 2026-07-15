import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from './ThemeContext';

// Usage:
//   const makeStyles = (c) => ({ btn: { backgroundColor: c.primary } });
//   const styles = useThemedStyles(makeStyles);
// The styles rebuild whenever the active gender changes.
export const useThemedStyles = (factory) => {
  const { colors, gender } = useTheme();
  return useMemo(() => StyleSheet.create(factory(colors)), [factory, gender]);
};
