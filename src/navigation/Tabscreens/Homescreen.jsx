import React, { useMemo, useState } from 'react';
import {
  FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

import { useAuth } from '../../context/AuthContext';
import ScreenWrapper from '../../components/ScreenWrapper';
import SalonCard from '../../components/SalonCard';
import { SALON_CATEGORIES } from '../../data/salons';
import { ROUTES } from '../../constants/routes';
import { colors } from '../../theme';
import salonService from '../../services/salonService';
import { useApi } from '../../hooks/useApi';
import { LoadingState, ErrorState } from '../../components/LoadingState';

const normalizeSalon = (s) => ({
  id: s.id || s._id,
  title: s.title,
  category: s.category,
  isOpen: s.isOpen,
  distance: s.distance,
  time: s.time,
  rating: typeof s.rating === 'number' ? s.rating.toFixed(1) : s.rating,
  reviews: s.reviewsCount ?? s.reviews,
  image: s.image && typeof s.image === 'string' ? { uri: s.image } : s.image,
});

const matchesCategory = (item, filter) => {
  if (filter === 'All') return true;
  if (filter === 'Barbers') return item.category.toLowerCase().includes('barber');
  if (filter === 'Hair Salons') return item.category.toLowerCase().includes('salon');
  return true;
};

const greeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Good Morning';
  if (h < 18) return 'Good Afternoon';
  return 'Good Evening';
};

const Homescreen = ({ navigation }) => {
  const { isLoggedIn } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const { data: salons, loading, error, refetch } = useApi(
    async () => {
      const list = await salonService.list();
      return Array.isArray(list) ? list.map(normalizeSalon) : [];
    },
    [],
  );

  const filteredSalons = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return (salons || []).filter((s) => matchesCategory(s, activeCategory))
      .filter((s) => !q || s.title.toLowerCase().includes(q) || (s.category || '').toLowerCase().includes(q));
  }, [searchQuery, activeCategory, salons]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScreenWrapper imageSource={require('../../assets/homebg.png')} backgroundColor={colors.background}>
        {(
          <FlatList
            data={filteredSalons}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.row}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 110 }}
            ListHeaderComponent={
              <LoggedInHeader
                navigation={navigation}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                isLoggedIn={isLoggedIn}
              />
            }
            ListEmptyComponent={
              loading ? (
                <LoadingState label="Loading salons…" />
              ) : error ? (
                <ErrorState onRetry={refetch} />
              ) : (
                <Text style={styles.empty}>No results — try a different filter.</Text>
              )
            }
            renderItem={({ item }) => (
              <SalonCard
                {...item}
                onPress={() => navigation.navigate(ROUTES.SALON_DETAIL, { salonData: item })}
              />
            )}
          />
        )}
      </ScreenWrapper>
    </View>
  );
};

const LoggedInHeader = ({ navigation, searchQuery, setSearchQuery, activeCategory, setActiveCategory, isLoggedIn }) => (
  <View>
    <View style={styles.headerRow}>
      <View>
        <Text style={styles.headerTitle}>Discover Nearby</Text>
        <Text style={styles.headerSubtitle}>{greeting()}</Text>
      </View>
      <View style={styles.headerRight}>
        <View style={styles.locationPill}>
          <Ionicons name="location-sharp" size={11} color="#000" />
          <Text style={styles.locationPillText}>Manchester</Text>
        </View>
        {isLoggedIn ? (
          <TouchableOpacity
            activeOpacity={0.75}
            style={styles.bellBtn}
            onPress={() => navigation.navigate(ROUTES.NOTIFICATIONS)}
          >
            <Ionicons name="notifications" size={16} color="#fff" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.75}
            style={styles.signInBtn}
            onPress={() => navigation.navigate(ROUTES.LOGIN)}
          >
            <Text style={styles.signInBtnText}>Sign in</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>

    <View style={styles.weatherRow}>
      <View style={styles.weatherCircle}>
        <Ionicons name="sunny" size={16} color={colors.primary} />
      </View>
      <View>
        <Text style={styles.weatherCaption}>Today's Weather</Text>
        <Text style={styles.weatherTitle}>Sunny, 22°C</Text>
      </View>
    </View>

    <View style={styles.featuredCard}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1517832606299-7ae9b720a186' }}
        style={StyleSheet.absoluteFillObject}
        blurRadius={1}
      />
      <View style={styles.featuredTint} />
      <View style={styles.featuredText}>
        <Text style={styles.featuredBadge}>Featured</Text>
        <Text style={styles.featuredHeading}>Book your next look</Text>
        <Text style={styles.featuredSub}>Top-rated stylists near you</Text>
      </View>
    </View>

    <View style={styles.searchBarRow}>
      <TextInput
        placeholder="Search barbers, salons..."
        placeholderTextColor="#999"
        style={styles.searchInput}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <View style={styles.searchSubmit}>
        <Ionicons name="search" size={16} color="#000" />
      </View>
    </View>

    <View style={styles.filterRow}>
      {SALON_CATEGORIES.map((c) => {
        const active = activeCategory === c;
        return (
          <TouchableOpacity
            key={c}
            activeOpacity={0.8}
            style={[styles.filterPill, active && styles.filterPillActive]}
            onPress={() => setActiveCategory(c)}
          >
            <Text style={[styles.filterPillText, active && styles.filterPillTextActive]}>{c}</Text>
          </TouchableOpacity>
        );
      })}
    </View>

    <Text style={styles.sectionTitle}>Near You</Text>
  </View>
);

export default Homescreen;

const styles = StyleSheet.create({
  row: { justifyContent: 'space-between', marginTop: 10 },
  empty: { color: colors.textMuted, textAlign: 'center', marginTop: 30, fontSize: 13 },

  headerRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, marginTop: 5,
  },
  headerTitle: { fontFamily: 'serif', color: colors.text, fontSize: 22, fontWeight: '600' },
  headerSubtitle: { color: colors.textMuted, fontSize: 12, marginTop: 2, fontWeight: '500' },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  locationPill: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff',
    paddingHorizontal: 10, paddingVertical: 5, borderRadius: 4, gap: 4,
  },
  locationPillText: { color: '#000', fontSize: 10, fontWeight: '700' },
  bellBtn: {
    width: 32, height: 32, borderRadius: 16, backgroundColor: colors.primary,
    justifyContent: 'center', alignItems: 'center',
  },
  signInBtn: {
    paddingHorizontal: 12, height: 32, borderRadius: 16, backgroundColor: colors.primary,
    justifyContent: 'center', alignItems: 'center',
  },
  signInBtnText: { color: '#000', fontSize: 12, fontWeight: '700' },

  weatherRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 8, marginBottom: 20 },
  weatherCircle: {
    width: 32, height: 32, borderRadius: 16, borderWidth: 1, borderColor: colors.border,
    backgroundColor: '#ffffff15', justifyContent: 'center', alignItems: 'center',
  },
  weatherCaption: { color: colors.textMuted, fontSize: 10, fontWeight: '500' },
  weatherTitle: { color: colors.primary, fontSize: 11, fontWeight: '700', marginTop: 1 },

  featuredCard: {
    width: '100%', height: 140, borderRadius: 14, overflow: 'hidden', marginBottom: 22,
  },
  featuredTint: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.45)' },
  featuredText: { position: 'absolute', bottom: 16, left: 16 },
  featuredBadge: { color: colors.primary, fontSize: 11, fontWeight: '600', marginBottom: 4 },
  featuredHeading: { color: colors.text, fontSize: 20, fontWeight: '600', fontFamily: 'serif' },
  featuredSub: { color: '#ffffff95', fontSize: 10, marginTop: 2 },

  searchBarRow: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff',
    borderRadius: 8, height: 44, overflow: 'hidden', marginBottom: 16, paddingRight: 4,
  },
  searchInput: { flex: 1, color: '#000', fontSize: 13, paddingHorizontal: 14, height: '100%' },
  searchSubmit: {
    backgroundColor: colors.primary, width: 38, height: 38, borderRadius: 19,
    justifyContent: 'center', alignItems: 'center',
  },

  filterRow: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  filterPill: {
    backgroundColor: '#000000b2', borderWidth: 1, borderColor: colors.borderDark,
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8, minWidth: 65, alignItems: 'center',
  },
  filterPillActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  filterPillText: { color: colors.text, fontSize: 11, fontWeight: '600' },
  filterPillTextActive: { color: '#000' },

  sectionTitle: { fontFamily: 'serif', color: colors.text, fontSize: 18, fontWeight: '600', marginTop: 20, marginBottom: 12 },

  preLoginHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 },
  preLoginBtn: {
    paddingVertical: 5, paddingHorizontal: 8, borderRadius: 6, borderWidth: 1,
    borderColor: colors.accent, minWidth: 70, alignItems: 'center',
  },
  preLoginHeading: { fontFamily: 'serif', color: colors.text, fontSize: 26, fontWeight: '600', marginTop: 20 },
  preLoginSubtext: { color: colors.textMuted, fontSize: 13, marginVertical: 8 },
  searchBar: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 10, height: 40, marginVertical: 15,
  },
  preLoginInput: { flex: 1, color: '#222', fontSize: 14, paddingHorizontal: 10 },
  metricsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 7 },
  metricItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metricText: { color: colors.textMuted, fontSize: 11 },
  howItWorksRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10, paddingHorizontal: 10 },
  workCard: { backgroundColor: colors.primary, padding: 15, borderRadius: 10 },
  workLabel: { color: colors.textMuted, fontSize: 12, fontWeight: '600', textAlign: 'center', marginTop: 5 },
});
