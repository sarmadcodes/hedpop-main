import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';

import ScreenWrapper from '../components/ScreenWrapper';
import BackBar from '../components/BackBar';
import MyButton from '../components/MyButton';
import { LoadingState, ErrorState, EmptyState } from '../components/LoadingState';
import { useApi } from '../hooks/useApi';
import salonService from '../services/salonService';
import userService from '../services/userService';
import { useAuth } from '../context/AuthContext';
import { useAuthGate } from '../hooks/useAuthGate';
import { ROUTES } from '../constants/routes';
import { useTheme, useThemedStyles } from '../theme';

const Stars = ({ count = 5, size = 11 }) => {
  const { colors } = useTheme();
  return (
  <View style={{ flexDirection: 'row' }}>
    {Array.from({ length: count }).map((_, i) => (
      <Ionicons key={i} name="star" size={size} color={colors.primary} style={{ marginRight: 1 }} />
    ))}
  </View>
  );
};

const SalonDetailScreen = () => {
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);
  const route = useRoute();
  const navigation = useNavigation();
  const param = route.params?.salonData || {};
  const salonId = param.id || param._id;

  const { user, updateUser, isLoggedIn } = useAuth();
  const gate = useAuthGate();
  const [selectedGender, setSelectedGender] = useState('Men');
  const [favBusy, setFavBusy] = useState(false);

  const { data: salon, loading, error, refetch } = useApi(
    () => salonService.detail(salonId),
    [salonId],
  );

  const isFavorite = !!user?.favorites?.some((f) => String(f) === String(salonId));

  const toggleFavorite = () => gate(async () => {
    if (!salonId || favBusy) return;
    setFavBusy(true);
    const next = isFavorite
      ? (user.favorites || []).filter((f) => String(f) !== String(salonId))
      : [...(user?.favorites || []), salonId];
    updateUser({ favorites: next });
    try {
      if (isFavorite) await userService.removeFavorite(salonId);
      else await userService.addFavorite(salonId);
    } catch {
      updateUser({ favorites: user?.favorites || [] });
    } finally {
      setFavBusy(false);
    }
  }, { message: 'Sign in to save favorites and book appointments.' });

  const goToBooking = (preselectServiceId) =>
    gate(
      () => navigation.navigate(ROUTES.BOOKING_FLOW, { salon, preselectServiceId }),
      { message: 'Sign in to book an appointment.' },
    );

  const heart = (
    <TouchableOpacity onPress={toggleFavorite} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
      <Ionicons
        name={isLoggedIn && isFavorite ? 'heart' : 'heart-outline'}
        size={24}
        color={isLoggedIn && isFavorite ? colors.danger : '#fff'}
      />
    </TouchableOpacity>
  );

  const services = salon?.services || [];
  const reviews = salon?.reviews || [];

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScreenWrapper imageSource={require('../assets/searchbg.png')} backgroundColor={colors.background}>
        <BackBar title="" rightElement={salon ? heart : null} />

        {loading && <LoadingState label="Loading salon…" />}
        {!loading && error && <ErrorState onRetry={refetch} />}

        {!loading && !error && salon && (
          <>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 140 }}>
              <View style={styles.headerCard}>
                <View style={styles.badgeRow}>
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryBadgeText}>{salon.category || 'Barber'}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: salon.isOpen ? colors.accent : colors.danger }]}>
                    <Text style={styles.statusBadgeText}>{salon.isOpen ? 'Open' : 'Closed'}</Text>
                  </View>
                </View>

                <Text style={styles.mainTitle}>{salon.title}</Text>

                <View style={styles.starsRow}>
                  <Stars count={Math.round(salon.rating || 5)} />
                  <Text style={styles.reviewsCount}> ({salon.reviewsCount ?? reviews.length} reviews)</Text>
                </View>

                <View style={styles.infoRow}>
                  <View style={styles.infoItem}>
                    <Ionicons name="location-outline" size={12} color={colors.border} />
                    <Text style={styles.infoText}>{salon.distance || salon.location || '—'}</Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Ionicons name="time-outline" size={12} color={colors.border} />
                    <Text style={styles.infoText}>{salon.time || '—'}</Text>
                  </View>
                </View>

                <Text style={styles.descriptionText}>
                  Premium grooming experience with expert stylists, top-tier products and a focus on the
                  finer details. Booking ahead ensures your preferred slot.
                </Text>
              </View>

              <View style={styles.sectionHeaderRow}>
                <Text style={styles.sectionTitle}>Services</Text>
                <View style={styles.chipsRow}>
                  {['Men', 'Women'].map((g) => {
                    const active = selectedGender === g;
                    return (
                      <TouchableOpacity
                        key={g}
                        activeOpacity={0.7}
                        style={[styles.chip, active && styles.chipActive]}
                        onPress={() => setSelectedGender(g)}
                      >
                        <Text style={[styles.chipText, active && styles.chipTextActive]}>For {g}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              {services.length === 0 ? (
                <EmptyState icon="cut-outline" title="No services listed" hint="This salon hasn't added services yet." />
              ) : (
                services.map((item) => (
                  <View key={item._id} style={styles.serviceRow}>
                    <View style={styles.serviceLeft}>
                      <Text style={styles.serviceTitle}>{item.name}</Text>
                      <Text style={styles.serviceSub}>{item.duration} • {item.desc}</Text>
                    </View>
                    <View style={styles.serviceRight}>
                      <Text style={styles.servicePrice}>£{item.price}</Text>
                      <TouchableOpacity activeOpacity={0.8} style={styles.bookBtn} onPress={() => goToBooking(item._id)}>
                        <Text style={styles.bookBtnText}>Book</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))
              )}

              <View style={styles.sectionHeaderRow}>
                <Text style={styles.sectionTitle}>Reviews</Text>
              </View>

              {reviews.length === 0 ? (
                <EmptyState icon="chatbubble-ellipses-outline" title="No reviews yet" hint="Be the first to book and review." />
              ) : (
                reviews.map((review) => (
                  <View key={review._id} style={styles.reviewCard}>
                    <View style={styles.reviewHeader}>
                      <Text style={styles.reviewerName}>{review.name}</Text>
                      <Text style={styles.reviewDate}>
                        {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : ''}
                      </Text>
                    </View>
                    <View style={styles.reviewStars}>
                      <Stars count={review.stars || 5} size={9} />
                    </View>
                    <Text style={styles.reviewBody}>{review.text}</Text>
                  </View>
                ))
              )}
            </ScrollView>

            {services.length > 0 && (
              <View style={styles.stickyFooter}>
                <MyButton
                  title={`Book an appointment from £${Math.min(...services.map((s) => s.price))}`}
                  bgColor={colors.primary}
                  textColor={colors.textInverse}
                  onPress={() => goToBooking(null)}
                />
              </View>
            )}
          </>
        )}
      </ScreenWrapper>
    </View>
  );
};

export default SalonDetailScreen;

const makeStyles = (colors) => ({
  headerCard: {
    marginTop: 10,
    backgroundColor: colors.surfaceTranslucent,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
  },
  badgeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  categoryBadge: { backgroundColor: colors.primary, paddingHorizontal: 12, paddingVertical: 5, borderRadius: 50 },
  categoryBadgeText: { color: '#000', fontSize: 11, fontWeight: '700' },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 50 },
  statusBadgeText: { color: '#000', fontSize: 11, fontWeight: '700' },
  mainTitle: { color: colors.text, fontSize: 20, fontWeight: '600', marginBottom: 6 },
  starsRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  reviewsCount: { color: colors.border, fontSize: 11 },
  infoRow: { flexDirection: 'row', marginBottom: 12 },
  infoItem: { flexDirection: 'row', alignItems: 'center', marginRight: 15 },
  infoText: { color: colors.border, fontSize: 11, marginLeft: 4 },
  descriptionText: { color: colors.border, fontSize: 11, lineHeight: 16 },

  sectionHeaderRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginTop: 20, marginBottom: 14,
  },
  sectionTitle: { color: colors.text, fontSize: 18, fontWeight: '600' },
  chipsRow: { flexDirection: 'row' },
  chip: {
    paddingHorizontal: 10, paddingVertical: 5, borderRadius: 50,
    borderWidth: 1, borderColor: colors.border, marginLeft: 8,
  },
  chipActive: { backgroundColor: '#fff', borderColor: '#fff' },
  chipText: { color: colors.text, fontSize: 11, fontWeight: '600' },
  chipTextActive: { color: '#000' },

  serviceRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: colors.surfaceTranslucent, padding: 14, borderRadius: 10,
    marginBottom: 12, borderWidth: 1, borderColor: colors.border,
  },
  serviceLeft: { flex: 1, paddingRight: 8 },
  serviceTitle: { color: colors.text, fontSize: 16, fontWeight: '600', marginBottom: 4 },
  serviceSub: { color: colors.textMuted, fontSize: 10 },
  serviceRight: { flexDirection: 'row', alignItems: 'center' },
  servicePrice: { color: colors.text, fontSize: 16, fontWeight: '600', marginRight: 12 },
  bookBtn: { backgroundColor: colors.accent, paddingHorizontal: 16, paddingVertical: 5, borderRadius: 50 },
  bookBtnText: { color: '#000', fontSize: 12, fontWeight: '700' },

  reviewCard: { marginBottom: 16, borderBottomWidth: 1, borderBottomColor: colors.borderDark, paddingBottom: 12 },
  reviewHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
  reviewerName: { color: colors.text, fontSize: 14, fontWeight: '600' },
  reviewDate: { color: colors.border, fontSize: 11 },
  reviewStars: { marginBottom: 5 },
  reviewBody: { color: '#888', fontSize: 11, lineHeight: 16 },

  stickyFooter: { position: 'absolute', bottom: 30, left: 0, right: 0, paddingHorizontal: 20 },
});
