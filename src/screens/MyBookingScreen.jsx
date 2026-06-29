import React, { useCallback } from 'react';
import { StyleSheet, Text, View, ScrollView, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';

import ScreenWrapper from '../components/ScreenWrapper';
import BackBar from '../components/BackBar';
import { LoadingState, ErrorState, EmptyState } from '../components/LoadingState';
import { useApi } from '../hooks/useApi';
import bookingService from '../services/bookingService';
import { colors } from '../theme';

const MyBookingScreen = () => {
  const { data, loading, error, refetch } = useApi(() => bookingService.list(), []);

  // Refetch whenever the screen regains focus (e.g. right after a new booking).
  useFocusEffect(useCallback(() => { refetch(); }, [refetch]));

  const bookings = data || [];

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScreenWrapper imageSource={require('../assets/homebg.png')} backgroundColor={colors.background}>
        <BackBar title="View My Bookings" />

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
                <Text style={styles.sectionTitle}>Your appointments</Text>
                {bookings.map((item) => {
                  const cancelled = item.status === 'Cancelled';
                  const businessName = item.salonTitle || item.salon?.title || 'Salon';
                  return (
                    <View key={item._id} style={styles.card}>
                      <View style={{ flex: 1, paddingRight: 8 }}>
                        <Text style={styles.businessName}>{businessName}</Text>
                        <Text style={styles.service}>{item.serviceName}</Text>
                        <View style={styles.metaRow}>
                          <View style={styles.metaItem}>
                            <Ionicons name="calendar-outline" size={12} color={colors.text} style={{ marginRight: 6 }} />
                            <Text style={styles.metaText}>{item.date}</Text>
                          </View>
                          <View style={[styles.metaItem, { marginLeft: 16 }]}>
                            <Ionicons name="time-outline" size={12} color={colors.text} style={{ marginRight: 6 }} />
                            <Text style={styles.metaText}>{item.time}</Text>
                          </View>
                        </View>
                      </View>

                      <View style={styles.rightSidebar}>
                        <View style={[styles.statusBadge, cancelled && styles.statusBadgeCancelled]}>
                          <Text style={styles.statusBadgeText}>{item.status}</Text>
                        </View>
                        <Text style={styles.price}>£{item.price}</Text>
                      </View>
                    </View>
                  );
                })}
              </>
            )}
          </ScrollView>
        )}
      </ScreenWrapper>
    </View>
  );
};

export default MyBookingScreen;

const styles = StyleSheet.create({
  sectionTitle: { color: colors.text, fontSize: 15, fontWeight: '600', marginBottom: 10, paddingLeft: 2 },
  card: {
    flexDirection: 'row', justifyContent: 'space-between',
    backgroundColor: colors.surfaceTranslucent, borderRadius: 12,
    borderWidth: 1, borderColor: colors.border, padding: 12, marginBottom: 12,
  },
  businessName: { color: colors.text, fontSize: 15, fontWeight: '600', marginBottom: 2 },
  service: { color: colors.textFaint, fontSize: 11, marginBottom: 12 },
  metaRow: { flexDirection: 'row', alignItems: 'center' },
  metaItem: { flexDirection: 'row', alignItems: 'center' },
  metaText: { color: colors.text, fontSize: 10 },
  rightSidebar: { justifyContent: 'space-between', alignItems: 'flex-end', minHeight: 65 },
  statusBadge: { backgroundColor: colors.accent, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 6 },
  statusBadgeCancelled: { backgroundColor: colors.danger },
  statusBadgeText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  price: { color: colors.text, fontSize: 15, fontWeight: '700', paddingRight: 4 },
});
