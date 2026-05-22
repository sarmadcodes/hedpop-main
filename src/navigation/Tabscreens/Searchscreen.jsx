import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import ScreenWrapper from '../../components/ScreenWrapper';
import Ionicons from '@react-native-vector-icons/ionicons';
import SalonCard from '../../components/SalonCard';

const Searchscreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
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
      title: 'The Cuts',
      category: 'Hair Studio',
      isOpen: false,
      distance: '2.5 km',
      time: '35 mins',
      rating: '4.7',
      reviews: '98',
      image: {
        uri: 'https://images.unsplash.com/photo-1517832606299-7ae9b720a186',
      },
    },

    {
      id: '3',
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
        imageSource={require('../../assets/searchbg.png')}
        backgroundColor="#000"
      >
        {/* Search Bar Section */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons
              name="search"
              size={20}
              color="#ccc"
              style={{ marginLeft: 15 }}
            />
            <TextInput
              placeholder="Search barbers, salons..."
              placeholderTextColor="#ccc"
              style={styles.input}
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus={true}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons
                  name="close-circle"
                  size={20}
                  color="#555"
                  style={{ marginRight: 15 }}
                />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            activeOpacity={0.66}
            onPress={() => navigation.navigate('Filterscreen')}
            style={{
              width: 40,
              height: 40,
              padding: 10,
              backgroundColor: '#F1BA0D',
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Ionicons name="filter" size={20} color={'#000'} />
          </TouchableOpacity>
        </View>

        <Text style={styles.filtertitle}>{DATA.length} Results found</Text>

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

export default Searchscreen;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    height: 40,
    width: '85%',
  },
  input: {
    flex: 1,
    color: '#222',
    fontSize: 16,
    paddingHorizontal: 10,
  },
  filtertitle: {
    color: '#F1BA0D',
    fontSize: 14,
    fontWeight: '600',
    marginVertical: 10,
  },
});
