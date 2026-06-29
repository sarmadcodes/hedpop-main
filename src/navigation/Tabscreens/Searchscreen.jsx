import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

import ScreenWrapper from '../../components/ScreenWrapper';
import SalonCard from '../../components/SalonCard';
import { ROUTES } from '../../constants/routes';
import { colors } from '../../theme';
import salonService from '../../services/salonService';
import { useApi } from '../../hooks/useApi';
import { LoadingState, ErrorState } from '../../components/LoadingState';

const normalize = (s) => ({
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

const Searchscreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: salons, loading, error, refetch } = useApi(
    async () => {
      const list = await salonService.list();
      return Array.isArray(list) ? list.map(normalize) : [];
    },
    [],
  );

  const results = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return salons || [];
    return (salons || []).filter(
      (s) => s.title.toLowerCase().includes(q) || (s.category || '').toLowerCase().includes(q),
    );
  }, [searchQuery, salons]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScreenWrapper imageSource={require('../../assets/searchbg.png')} backgroundColor={colors.background}>
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#ccc" style={{ marginLeft: 15 }} />
            <TextInput
              placeholder="Search barbers, salons..."
              placeholderTextColor="#999"
              style={styles.input}
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color="#555" style={{ marginRight: 15 }} />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate(ROUTES.FILTER)}
            style={styles.filterBtn}
          >
            <Ionicons name="options-outline" size={20} color="#000" />
          </TouchableOpacity>
        </View>

        <Text style={styles.resultsCount}>{results.length} Results found</Text>

        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between', marginTop: 10 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 110 }}
          ListEmptyComponent={
            loading ? (
              <LoadingState label="Searching…" />
            ) : error ? (
              <ErrorState onRetry={refetch} />
            ) : (
              <Text style={styles.empty}>No matches found.</Text>
            )
          }
          renderItem={({ item }) => (
            <SalonCard
              {...item}
              onPress={() => navigation.navigate(ROUTES.SALON_DETAIL, { salonData: item })}
            />
          )}
        />
      </ScreenWrapper>
    </View>
  );
};

export default Searchscreen;

const styles = StyleSheet.create({
  searchContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 10 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 10, height: 40, width: '85%' },
  input: { flex: 1, color: '#222', fontSize: 14, paddingHorizontal: 10 },
  filterBtn: {
    width: 40, height: 40, backgroundColor: colors.primary, borderRadius: 20,
    alignItems: 'center', justifyContent: 'center',
  },
  resultsCount: { color: colors.primary, fontSize: 14, fontWeight: '600', marginVertical: 10 },
  empty: { color: colors.textMuted, textAlign: 'center', marginTop: 30, fontSize: 13 },
});
