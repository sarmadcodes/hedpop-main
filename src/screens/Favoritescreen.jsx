import React, { useCallback } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';

import ScreenWrapper from '../components/ScreenWrapper';
import BackBar from '../components/BackBar';
import { LoadingState, ErrorState, EmptyState } from '../components/LoadingState';
import { useApi } from '../hooks/useApi';
import userService from '../services/userService';
import { ROUTES } from '../constants/routes';
import { colors } from '../theme';

const initials = (n = '') => n.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase()).join('');

const FavoritesScreen = ({ navigation }) => {
  const { data, loading, error, refetch } = useApi(() => userService.favorites(), []);
  useFocusEffect(useCallback(() => { refetch(); }, [refetch]));

  const favorites = data || [];

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScreenWrapper imageSource={require('../assets/bookbg2.png')} backgroundColor={colors.background}>
        <BackBar title="Favorites" />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30, marginTop: 5 }}>
          <Text style={styles.subtitle}>Salons you've saved for quick booking.</Text>

          {loading && <LoadingState label="Loading favorites…" />}
          {!loading && error && <ErrorState onRetry={refetch} />}
          {!loading && !error && favorites.length === 0 && (
            <EmptyState
              icon="heart-outline"
              title="No favorites yet"
              hint="Tap the heart on any salon to save it here."
            />
          )}

          <View style={{ gap: 12 }}>
            {favorites.map((salon) => (
              <View key={salon._id} style={styles.card}>
                {salon.image ? (
                  <Image source={{ uri: salon.image }} style={styles.avatar} />
                ) : (
                  <View style={[styles.avatar, styles.avatarFallback]}>
                    <Text style={styles.avatarInitials}>{initials(salon.title)}</Text>
                  </View>
                )}
                <View style={styles.meta}>
                  <Text style={styles.name}>{salon.title}</Text>
                  <Text style={styles.role}>{salon.category}</Text>
                  <View style={styles.starsRow}>
                    <Ionicons name="star" size={10} color={colors.primary} style={{ marginRight: 3 }} />
                    <Text style={styles.rating}>
                      {typeof salon.rating === 'number' ? salon.rating.toFixed(1) : salon.rating} ({salon.reviewsCount ?? 0})
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.btn}
                  activeOpacity={0.75}
                  onPress={() => navigation.navigate(ROUTES.SALON_DETAIL, { salonData: { id: salon._id } })}
                >
                  <Text style={styles.btnText}>Book Now</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      </ScreenWrapper>
    </View>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  subtitle: { color: colors.textMuted, fontSize: 12, lineHeight: 18, marginVertical: 15, paddingHorizontal: 2 },
  card: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#222225', borderRadius: 12, padding: 12,
  },
  avatar: { width: 64, height: 64, borderRadius: 8, backgroundColor: '#111' },
  avatarFallback: { backgroundColor: colors.accent, justifyContent: 'center', alignItems: 'center' },
  avatarInitials: { color: '#000', fontSize: 20, fontWeight: '700' },
  meta: { flex: 1, paddingHorizontal: 12 },
  name: { color: colors.text, fontSize: 15, fontWeight: '700', marginBottom: 2 },
  role: { color: colors.textMuted, fontSize: 11, marginBottom: 6 },
  starsRow: { flexDirection: 'row', alignItems: 'center' },
  rating: { color: '#ffffff7e', fontSize: 9, fontWeight: '500' },
  btn: { backgroundColor: colors.accent, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 50 },
  btnText: { color: '#fff', fontSize: 10, fontWeight: '700' },
});
