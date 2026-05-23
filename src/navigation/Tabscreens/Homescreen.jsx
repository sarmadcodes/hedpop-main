import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import ScreenWrapper from '../../components/ScreenWrapper';
import MyButton from '../../components/MyButton';
import FilterButton from '../../components/FilterButton';
import SalonCard from '../../components/SalonCard';
import Ionicons from '@react-native-vector-icons/ionicons';
import CategoryCard from '../../components/CategoryCard';

// const DATA = [
//   {
//     id: '1',
//     title: 'The Royal Trim',
//     category: 'Barber Shop',
//     isOpen: true,
//     distance: '1.2 km',
//     time: '20 mins',
//     rating: '4.9',
//     reviews: '120',
//     image: {
//       uri: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033',
//     },
//   },

//   {
//     id: '2',
//     title: 'The Cuts',
//     category: 'Hair Studio',
//     isOpen: false,
//     distance: '2.5 km',
//     time: '35 mins',
//     rating: '4.7',
//     reviews: '98',
//     image: {
//       uri: 'https://images.unsplash.com/photo-1517832606299-7ae9b720a186',
//     },
//   },

//   {
//     id: '3',
//     title: 'Classic Salon',
//     category: 'Salon',
//     isOpen: true,
//     distance: '800 m',
//     time: '15 mins',
//     rating: '4.8',
//     reviews: '140',
//     image: {
//       uri: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f',
//     },
//   },
// ];

const Homescreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <ScreenWrapper
        imageSource={require('../../assets/homebg.png')}
        backgroundColor="#000"
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 10,
          }}
        >
          <Image
            source={require('../../assets/iconlogo.png')}
            style={{ width: 50, height: 50 }}
          />
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <TouchableOpacity
              activeOpacity={0.66}
              style={{ backgroundColor: '#FFA77F', ...styles.button }}
              onPress={() => navigation.navigate('Loginscreen')}
            >
              <Text style={{ color: '#fff', fontSize: 12 }}>Sign in</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.66} style={styles.button}>
              <Text style={{ color: '#FFA77F', fontSize: 12 }}>Join free</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingBottom: '30%' }}>

        <Text
          style={{
            fontFamily: 'serif',
            color: '#fff',
            fontSize: 26,
            fontWeight: '600',
            marginTop: 20,
          }}
        >
          Book Beauty {'\n'}Services Instantly
        </Text>
        <Text style={{ color: '#ffffffde', fontSize: 13, marginVertical: 8 }}>
          Barbers, salons & mobile stylists find, book {'\n'}and pay all in one
          place.
        </Text>

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
            // autoFocus={true}
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

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: 7,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Ionicons name="star-outline" size={16} color="#F1BA0D" />
            <Text style={{ color: '#ffffffde', fontSize: 11 }}>4.8 rating</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Ionicons name="time-outline" size={16} color="#F1BA0D" />
            <Text style={{ color: '#ffffffde', fontSize: 11 }}>
              Instant Booking
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Ionicons name="share" size={16} color="#F1BA0D" />
            <Text style={{ color: '#ffffffde', fontSize: 11 }}>
              Discounts & Offers
            </Text>
          </View>
        </View>

        <View>
          <Text style={styles.sectionTitle}>Popular Categories</Text>
          <CategoryCard />
        </View>
        <View>
          <Text style={styles.sectionTitle}>How It Works</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 10,
              paddingHorizontal: 10,
            }}
          >
            <View>
              <TouchableOpacity style={styles.workcard}>
                <Ionicons name="search" size={24} color="#000" />
              </TouchableOpacity>
              <Text
                style={{
                  color: '#ffffffde',
                  fontSize: 12,
                  fontWeight: '600',
                  textAlign: 'center',
                  marginTop: 5,
                }}
              >
                Search
              </Text>
            </View>
            <View>
              <TouchableOpacity style={styles.workcard}>
                <Ionicons name="book" size={24} color="#000" />
              </TouchableOpacity>
              <Text
                style={{
                  color: '#ffffffde',
                  fontSize: 12,
                  fontWeight: '600',
                  textAlign: 'center',
                  marginTop: 5,
                }}
              >
                Book
              </Text>
            </View>
            <View>
              <TouchableOpacity style={styles.workcard}>
                <Ionicons name="person" size={24} color="#000" />
              </TouchableOpacity>
              <Text
                style={{
                  color: '#ffffffde',
                  fontSize: 12,
                  fontWeight: '600',
                  textAlign: 'center',
                  marginTop: 5,
                }}
              >
                Enjoy
              </Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Ready to Get Started?</Text>
        <Text style={{ color: '#ffffffde', fontSize: 11, marginVertical: 5 }}>
          Join thousands of customers and beauty {'\n'}professionals on HeadPop.
        </Text>

        <TouchableOpacity style={{marginVertical: 10}}
        onPress={() => navigation.navigate('Loginscreen')}
        >
          <Text style={{fontSize: 12, fontWeight: '600', color: '#F1BA0D'}}>Book Now</Text>
        </TouchableOpacity>

        {/* <FlatList
          data={DATA}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: 'space-between', marginTop: 10,
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
        /> */}
        </View>
        </ScrollView>
      </ScreenWrapper>
    </View>
  );
};

export default Homescreen;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FFA77F',
    minWidth: 70,
    alignItems: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    height: 40,
    marginVertical: 15,
  },
  input: {
    flex: 1,
    color: '#222',
    fontSize: 16,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontFamily: 'serif',
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
  },
  workcard: {
    backgroundColor: '#F1BA0D',
    padding: 15,
    borderRadius: 10,
  },
});
