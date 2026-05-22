import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import ScreenWrapper from '../../components/ScreenWrapper';
import MyButton from '../../components/MyButton';
import FilterButton from '../../components/FilterButton';
import SalonCard from '../../components/SalonCard';

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

const Homescreen = ({navigation}) => {
  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <ScreenWrapper
        imageSource={require('../../assets/homebg.png')}
        backgroundColor="#000"
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 }}>
          <Image source={require('../../assets/iconlogo.png')} style={{ width: 50, height: 50 }} />
          <View style={{ flexDirection: 'row', gap: 10 }}>
          <TouchableOpacity activeOpacity={0.66} style={{backgroundColor: '#FFA77F', ...styles.button}}
          onPress={() => navigation.navigate('Loginscreen')}>
            <Text style={{ color: '#fff', fontSize: 12}}>Sign in</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.66} style={styles.button}>
            <Text style={{ color: '#FFA77F', fontSize: 12}}>Join free</Text>
          </TouchableOpacity>
          </View>
        </View>

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
});
