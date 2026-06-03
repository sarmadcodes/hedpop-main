import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

// Custom Global Core Framework Components
import ScreenWrapper from '../components/ScreenWrapper';
import BackBar from '../components/BackBar';
import MyButton from '../components/MyButton';

const { width } = Dimensions.get('window');

const FavoritesScreen = ({navigation}) => {
  // Hardcoded Static Data Model mimicking your master barbers list from image_f6e67a.png
  const favoriteBarbers = [
    {
      id: '1',
      name: 'Julian Rossi',
      role: 'Master of Fades',
      rating: '5.0',
      reviews: 'Reviews',
      avatar: require('../assets/salondp.png'), // Replace with your local asset paths
    },
    {
      id: '2',
      name: 'Oliver',
      role: 'Master of Shave',
      rating: '5.0',
      reviews: 'Reviews',
      avatar: require('../assets/salondp.png'),
    },
    {
      id: '3',
      name: 'Robert',
      role: 'Master of Styling',
      rating: '5.0',
      reviews: 'Reviews',
      avatar: require('../assets/salondp.png'),
    },
    {
      id: '4',
      name: 'Alan',
      role: 'Master of Fades',
      rating: '5.0',
      reviews: 'Reviews',
      avatar: require('../assets/salondp.png'),
    },
    {
      id: '5',
      name: 'James',
      role: 'Master of Fades',
      rating: '5.0',
      reviews: 'Reviews',
      avatar: require('../assets/salondp.png'),
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <ScreenWrapper
        imageSource={require('../assets/bookbg2.png')} // Reusing the consistent luxury banner matrix
        backgroundColor="#000"
      >
        {/* Core Global Header Navigation - Notification badge icon ignored per rule specs */}
        <BackBar title="Favorites" />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollLayoutContent}
        >
          {/* Subheading Sub-paragraph Tagline Intro text block */}
          <Text style={styles.favoritesSubtitleTaglineText}>
            Your curated selection of master barbers and premium services.
          </Text>

          {/* DYNAMIC CARD RENDER ENGINE LIST TRACK */}
          <View style={styles.cardsVerticalStackContainer}>
            {favoriteBarbers.map((barber) => (
              <View key={barber.id} style={styles.barberProfileCardRow}>
                
                {/* Left Structural Column Segment: Avatar Image */}
                <Image source={barber.avatar} style={styles.barberAvatarImageSquare} />

                {/* Middle Structural Text Info Content Block */}
                <View style={styles.barberMetaDetailsColumn}>
                  <Text style={styles.barberNameText}>{barber.name}</Text>
                  <Text style={styles.barberRoleText}>{barber.role}</Text>
                  
                  {/* Rating Stars Evaluation Row Indicator */}
                  <View style={styles.ratingStarsFlexRowLine}>
                    {[...Array(5)].map((_, index) => (
                      <Ionicons 
                        key={index} 
                        name="star" 
                        size={10} 
                        color="#F1BA0D" 
                        style={{ marginRight: 1 }} 
                      />
                    ))}
                    <Text style={styles.ratingNumericalValueLabel}>
                      {barber.rating} {barber.reviews}
                    </Text>
                  </View>
                </View>

                {/* Right Structural Action Component Block */}
                <TouchableOpacity
                  style={styles.softCoralBookNowButtonCapsule}
                  activeOpacity={0.75}
                  onPress={() => {navigation.navigate('SalonDetailscreen', { barberId: barber.id });}}
                >
                  <Text style={styles.softCoralBookNowButtonText}>Book Now</Text>
                </TouchableOpacity>

              </View>
            ))}
          </View>

          {/* IN-SCROLL PRIMARY FOOTER TRIGGER BUTTON ELEMENT (NOT FIXED BASE WRAPPER TRAY) */}
          {/* <View style={styles.inScrollInlineButtonSpacerContainer}>
            <MyButton
              title="View All"
              bgColor="#F1BA0D"
              textColor="#000"
              onPress={() => {
                Alert.alert('Directory Stack', 'Expanding dynamic view database matrix records feed.');
              }}
            />
          </View> */}

        </ScrollView>
      </ScreenWrapper>
    </View>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  scrollLayoutContent: {
    paddingBottom: 30, // Inline regular tracking spacing format flow
    marginTop: 5,
  },
  favoritesSubtitleTaglineText: {
    color: '#ffffffde',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    marginVertical: 15,
    paddingHorizontal: 2,
  },
  cardsVerticalStackContainer: {
    flexDirection: 'column',
    gap: 12,
  },
  barberProfileCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222225', // Premium high contrast inner background tray plate matching image_f6e67a.png
    borderRadius: 12,
    padding: 12,
  },
  barberAvatarImageSquare: {
    width: 64,
    height: 64,
    borderRadius: 8,
    backgroundColor: '#111',
  },
  barberMetaDetailsColumn: {
    flex: 1,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  barberNameText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 2,
  },
  barberRoleText: {
    color: '#ffffffde',
    fontSize: 11,
    fontWeight: '400',
    marginBottom: 6,
  },
  ratingStarsFlexRowLine: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingNumericalValueLabel: {
    color: '#ffffff7e',
    fontSize: 9,
    fontWeight: '500',
    marginLeft: 4,
  },
  softCoralBookNowButtonCapsule: {
    backgroundColor: '#FFA77F', // Signature soft coral tone matching your user interface style criteria
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  softCoralBookNowButtonText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
  inScrollInlineButtonSpacerContainer: {
    marginTop: 25,
    marginBottom: 10,
    width: '100%',
  },
});