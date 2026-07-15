import React from 'react';
import { ActivityIndicator, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useTheme, useThemedStyles } from '../theme';

export const LoadingState = ({ label = 'Loading…' }) => {
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);
  return (
    <View style={styles.center}>
      <ActivityIndicator color={colors.primary} />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

export const ErrorState = ({ message = 'Could not load data.', onRetry }) => {
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);
  return (
    <View style={styles.center}>
      <Ionicons name="cloud-offline-outline" size={32} color={colors.textFaint} />
      <Text style={styles.error}>{message}</Text>
      {onRetry && (
        <TouchableOpacity onPress={onRetry} style={styles.retryBtn} activeOpacity={0.7}>
          <Ionicons name="refresh" size={14} color="#000" />
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export const EmptyState = ({ icon = 'file-tray-outline', title = 'Nothing here yet', hint }) => {
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);
  return (
    <View style={styles.center}>
      <View style={styles.emptyIcon}>
        <Ionicons name={icon} size={26} color={colors.textFaint} />
      </View>
      <Text style={styles.emptyTitle}>{title}</Text>
      {hint && <Text style={styles.hint}>{hint}</Text>}
    </View>
  );
};

const makeStyles = (colors) => ({
  center: { paddingVertical: 50, paddingHorizontal: 24, alignItems: 'center', justifyContent: 'center' },
  label: { color: colors.textMuted, fontSize: 12, marginTop: 12 },
  error: { color: colors.textMuted, fontSize: 13, textAlign: 'center', marginTop: 12 },
  retryBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 14,
    backgroundColor: colors.primary, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8,
  },
  retryText: { color: '#000', fontSize: 13, fontWeight: '700' },
  emptyIcon: {
    width: 56, height: 56, borderRadius: 28, backgroundColor: '#ffffff10',
    alignItems: 'center', justifyContent: 'center', marginBottom: 14,
  },
  emptyTitle: { color: colors.text, fontSize: 14, fontWeight: '600' },
  hint: { color: colors.textFaint, fontSize: 12, textAlign: 'center', marginTop: 6, lineHeight: 18 },
});

export default LoadingState;
