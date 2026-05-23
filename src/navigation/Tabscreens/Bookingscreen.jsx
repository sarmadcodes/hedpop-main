import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ScreenWrapper from '../../components/ScreenWrapper';
import BackBar from '../../components/BackBar';
import SalonCard from '../../components/SalonCard';

const Bookingscreen = () => {
  const DATA = [
    {
      id: '1',
      title: 'The Royal Trim',
      category: 'Barber Shop',
      isOpen: true,
      distance: '1.2 km',
      time: '20 mins',
      rating: '4.9',
      reviews: '120',
      image: {
        uri: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033',
      },
    },

    {
      id: '2',
      title: 'Classic Salon',
      category: 'Salon',
      isOpen: true,
      distance: '800 m',
      time: '15 mins',
      rating: '4.8',
      reviews: '140',
      image: {
        uri: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f',
      },
    },
  ];
  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <ScreenWrapper
        imageSource={require('../../assets/bookbg2.png')}
        backgroundColor="#000"
      >
        <BackBar title="Booking" />

        <FlatList
          data={DATA}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            marginTop: 10,
          }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <SalonCard
              image={item.image}
              category={item.category}
              isOpen={item.isOpen}
              title={item.title}
              distance={item.distance}
              time={item.time}
              rating={item.rating}
              reviews={item.reviews}
            />
          )}
        />
      </ScreenWrapper>
    </View>
  );
};

export default Bookingscreen;

const styles = StyleSheet.create({});
