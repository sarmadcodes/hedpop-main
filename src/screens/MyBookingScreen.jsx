import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, RefreshControl, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';

import ScreenWrapper from '../components/ScreenWrapper';
import BackBar from '../components/BackBar';
import { LoadingState, ErrorState, EmptyState } from '../components/LoadingState';
import { useApi } from '../hooks/useApi';
import bookingService from '../services/bookingService';
import { colors } from '../theme';

const CANCEL_WINDOW_MS = 60 * 60 * 1000; // mirror of backend rule — 1 hour

const formatRemaining = (ms) => {
  const total = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}m ${String(s).padStart(2, '0')}s`;
};

const MyBookingScreen = () => {
  const { data, loading, error, refetch } = useApi(() => bookingService.list(), []);
  const [now, setNow] = useState(Date.now());
  const [cancellingId, setCancellingId] = useState(null);

  useFocusEffect(useCallback(() => { refetch(); }, [refetch]));

  // Tick once a second so the "cancel in 49m 32s" countdown stays current
  // and the button auto-hides when the window expires.
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const handleCancel = (item) => {
    Alert.alert(
      'Cancel booking?',
      `${item.salonTitle || item.salon?.title || 'This booking'} on ${item.date} at ${item.time}.\n\nThis cannot be undone.`,
      [
        { text: 'Keep booking', style: 'cancel' },
        {
          text: 'Cancel booking',
          style: 'destructive',
          onPress: async () => {
            setCancellingId(item._id);
            try {
              await bookingService.cancel(item._id);
              await refetch();
            } catch (err) {
              Alert.alert('Could not cancel', err?.message || 'Please try again.');
            } finally {
              setCancellingId(null);
            }
          },
        },
      ],
    );
  };

  const bookings = data || [];
  const upcoming = bookings.filter((b) => b.status === 'Confirmed');
  const past = bookings.filter((b) => b.status !== 'Confirmed');

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScreenWrapper imageSource={require('../assets/homebg.png')} backgroundColor={colors.background}>
        <BackBar title="My Bookings" />

        {loading && <LoadingState label="Loading bookings…" />}
        {!loading && error && <ErrorState onRetry={refetch} />}

        {!loading && !error && (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 30, paddingTop: 10 }}
            refreshControl={<RefreshControl refreshing={loading} onRefresh={refetch} tintColor={colors.primary} />}
          >
            {bookings.length === 0 ? (
              <EmptyState
                icon="calendar-outline"
                title="No bookings yet"
                hint="Book an appointment and it will show up here."
              />
            ) : (
              <>
                {upcoming.length > 0 && (
                  <>
                    <Text style={styles.sectionTitle}>Upcoming</Text>
                    {upcoming.map((item) => (
                      <BookingCard
                        key={item._id}
                        item={item}
                        now={now}
                        onCancel={handleCancel}
                        cancelling={cancellingId === item._id}
                      />
                    ))}
                  </>
                )}

                {past.length > 0 && (
                  <>
                    <Text style={[styles.sectionTitle, { marginTop: 22 }]}>Past</Text>
                    {past.map((item) => (
                      <BookingCard key={item._id} item={item} now={now} />
                    ))}
                  </>
                )}
              </>
            )}
          </ScrollView>
        )}
      </ScreenWrapper>
    </View>
  );
};

const BookingCard = ({ item, now, onCancel, cancelling }) => {
  const cancelled = item.status === 'Cancelled';
  const completed = item.status === 'Completed';
  const businessName = item.salonTitle || item.salon?.title || 'Salon';

  const createdAt = item.createdAt ? new Date(item.createdAt).getTime() : 0;
  const msLeft = createdAt + CANCEL_WINDOW_MS - now;
  const canCancel = item.status === 'Confirmed' && msLeft > 0 && !!onCancel;

  return (
    <View style={styles.card}>
      <View style={styles.cardHead}>
        <View style={{ flex: 1, paddingRight: 8 }}>
          <Text style={styles.businessName}>{businessName}</Text>
          <Text style={styles.service}>{item.serviceName}</Text>
        </View>
        <View style={[
          styles.statusBadge,
          cancelled && styles.statusBadgeCancelled,
          completed && styles.statusBadgeCompleted,
        ]}>
          <Text style={[styles.statusBadgeText, completed && { color: '#000' }]}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <Ionicons name="calendar-outline" size={12} color={colors.text} style={{ marginRight: 6 }} />
          <Text style={styles.metaText}>{item.date}</Text>
        </View>
        <View style={[styles.metaItem, { marginLeft: 16 }]}>
          <Ionicons name="time-outline" size={12} color={colors.text} style={{ marginRight: 6 }} />
          <Text style={styles.metaText}>{item.time}</Text>
        </View>
        <View style={{ flex: 1 }} />
        <Text style={styles.price}>£{item.price}</Text>
      </View>

      {item.reference && (
        <Text style={styles.reference}>Ref: {item.reference}</Text>
      )}

      {canCancel && (
        <TouchableOpacity
          activeOpacity={0.75}
          style={styles.cancelBtn}
          onPress={() => onCancel(item)}
          disabled={cancelling}
        >
          {cancelling ? (
            <ActivityIndicator size="small" color={colors.danger} />
          ) : (
            <>
              <Ionicons name="close-circle-outline" size={14} color={colors.danger} />
              <Text style={styles.cancelBtnText}>Cancel booking</Text>
              <Text style={styles.cancelBtnHint}>{formatRemaining(msLeft)} left</Text>
            </>
          )}
        </TouchableOpacity>
      )}

      {item.status === 'Confirmed' && msLeft <= 0 && (
        <View style={styles.lockedHint}>
          <Ionicons name="lock-closed-outline" size={11} color={colors.textFaint} />
          <Text style={styles.lockedHintText}>Cancellation window closed (1 hour after booking).</Text>
        </View>
      )}
    </View>
  );
};

export default MyBookingScreen;

const styles = StyleSheet.create({
  sectionTitle: { color: colors.text, fontSize: 15, fontWeight: '600', marginBottom: 10, paddingLeft: 2 },
  card: {
    backgroundColor: colors.surfaceTranslucent, borderRadius: 12,
    borderWidth: 1, borderColor: colors.border, padding: 14, marginBottom: 12,
  },
  cardHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 },
  businessName: { color: colors.text, fontSize: 15, fontWeight: '600', marginBottom: 2 },
  service: { color: colors.textFaint, fontSize: 11 },
  statusBadge: {
    backgroundColor: colors.success + '22',
    borderWidth: 1, borderColor: colors.success + '66',
    paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6,
  },
  statusBadgeCancelled: { backgroundColor: colors.danger + '22', borderColor: colors.danger + '66' },
  statusBadgeCompleted: { backgroundColor: colors.primary, borderColor: colors.primary },
  statusBadgeText: { color: colors.success, fontSize: 10, fontWeight: '700' },
  metaRow: { flexDirection: 'row', alignItems: 'center' },
  metaItem: { flexDirection: 'row', alignItems: 'center' },
  metaText: { color: colors.text, fontSize: 11 },
  price: { color: colors.text, fontSize: 14, fontWeight: '700' },
  reference: { color: colors.textFaint, fontSize: 10, marginTop: 8, fontFamily: 'monospace' },
  cancelBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: colors.danger + '15',
    borderWidth: 1, borderColor: colors.danger + '50',
    borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, marginTop: 12,
  },
  cancelBtnText: { color: colors.danger, fontSize: 12, fontWeight: '700' },
  cancelBtnHint: { color: colors.danger + '99', fontSize: 10, marginLeft: 'auto', fontWeight: '600' },
  lockedHint: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: colors.borderFaint,
  },
  lockedHintText: { color: colors.textFaint, fontSize: 10 },
});
