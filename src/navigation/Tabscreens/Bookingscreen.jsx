import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import BackBar from '../../components/BackBar';
import SalonCard from '../../components/SalonCard';
import MyButton from '../../components/MyButton';
import { LoadingState, ErrorState } from '../../components/LoadingState';
import salonService from '../../services/salonService';
import { useApi } from '../../hooks/useApi';
import { ROUTES } from '../../constants/routes';
import { colors } from '../../theme';

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

const Bookingscreen = ({ navigation }) => {
  const { data: salons, loading, error, refetch } = useApi(
    async () => {
      const list = await salonService.list();
      return Array.isArray(list) ? list.map(normalize) : [];
    },
    [],
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScreenWrapper imageSource={require('../../assets/bookbg2.png')} backgroundColor={colors.background}>
        <BackBar title="Bookings" />

        <MyButton
          title="View My Bookings"
          bgColor="#00000036"
          textColor={colors.text}
          borderColor={colors.border}
          borWidth={1}
          onPress={() => navigation.navigate(ROUTES.MY_BOOKINGS)}
        />

        <Text style={styles.heading}>Book a new appointment</Text>

        <FlatList
          data={salons || []}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between', marginTop: 10 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 110 }}
          ListEmptyComponent={
            loading ? <LoadingState label="Loading salons…" /> : error ? <ErrorState onRetry={refetch} /> : null
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

export default Bookingscreen;

const styles = StyleSheet.create({
  heading: { color: colors.text, fontSize: 15, fontWeight: '600', marginTop: 14, marginBottom: 2 },
});
