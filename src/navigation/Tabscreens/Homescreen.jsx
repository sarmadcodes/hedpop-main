import React, { useState } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useAuth } from '../../context/AuthContext';

// Core Pre-built Layout UI Framework Components
import ScreenWrapper from '../../components/ScreenWrapper';
import FilterButton from '../../components/FilterButton';
import SalonCard from '../../components/SalonCard';
import CategoryCard from '../../components/CategoryCard';

const { width } = Dimensions.get('window');

// Data Matrix Array feeding the SalonCard components matching image_f498fa.png properties
const SALON_DATA = [
  {
    id: '1',
    title: 'The Gentlemen Cuts',
    category: 'Barber',
    isOpen: true,
    distance: '1 km away',
    time: '9:00 AM - 8:00 PM',
    rating: '4.9',
    reviews: '250',
    image: {
      uri: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033',
    },
  },
  {
    id: '2',
    title: 'The Cuts',
    category: 'Salon',
    isOpen: false,
    distance: '3.2 km away',
    time: '10:00 AM - 9:00 PM',
    rating: '4.7',
    reviews: '180',
    image: {
      uri: 'https://images.unsplash.com/photo-1517832606299-7ae9b720a186',
    },
  },
  {
    id: '3',
    title: 'The Bearded Gent',
    category: 'Barber',
    isOpen: true,
    distance: '2 km away',
    time: '9:00 AM - 11:00 PM',
    rating: '4.8',
    reviews: '320',
    image: {
      uri: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f',
    },
  },
  {
    id: '4',
    title: 'The Royal Trim',
    category: 'Salon',
    isOpen: false,
    distance: '5 km away',
    time: '11:00 AM - 10:00 PM',
    rating: '4.9',
    reviews: '500',
    image: {
      uri: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f',
    },
  },
];

const Homescreen = ({ navigation }) => {
  const { isLoggedIn, loginUser, logoutUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('All');

  // Trigger login for demonstration purposes within this screen flow structure
  const executeDemoLoginTrigger = () => {
    loginUser();
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <ScreenWrapper
        imageSource={require('../../assets/homebg.png')}
        backgroundColor="#000"
      >
        {/* =========================================================
            STATE FLOW 1: LOGGED IN DASHBOARD VIEW (image_f498fa.png)
            ========================================================= */}
        {isLoggedIn ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ paddingBottom: 100 }}>
              {/* TOP HEADER CONTROLS ROW ROW */}
              <View style={styles.loggedInHeaderFlexRow}>
                <View>
                  <Text style={styles.discoverNearbySerifTitleText}>
                    Discover Nearby
                  </Text>
                  <Text style={styles.subtextTimeGreetingLabel}>
                    Good Afternoon
                  </Text>
                </View>

                <View style={styles.headerRightActionLayoutComboRow}>
                  {/* Location Pills Component Marker */}
                  <View style={styles.manchesterLocationBadgeFrameRow}>
                    <Ionicons name="location-sharp" size={11} color="#000" />
                    <Text style={styles.manchesterLocationBadgeText}>
                      Manchester
                    </Text>
                  </View>
                  {/* Notification Gold Bubble Badge */}
                  <TouchableOpacity
                    activeOpacity={0.75}
                    style={styles.notificationBellGoldBackingFrame}
                    onPress={() => navigation.navigate('Notificationscreen')}
                  >
                    <Ionicons name="notifications" size={16} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* INTEGRATED LIVE WEATHER STATUS MODULE OVERLAY BAR */}
              <View style={styles.weatherHorizontalOverlayFrameRow}>
                <View style={styles.weatherStatusCircularBackingFrame}>
                  <Ionicons name="sunny" size={16} color="#F1BA0D" />
                </View>
                <View>
                  <Text style={styles.weatherSecondaryInfoLabelText}>
                    Today's Weather
                  </Text>
                  <Text style={styles.weatherMainDataTitleText}>
                    Sunny, 22°C
                  </Text>
                </View>
              </View>

              {/* FEATURED LOOKBOOK LOOK INSIGHT HERO PROMO PACKET */}
              <View style={styles.featuredHeroLookbookCardContainerPlate}>
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1517832606299-7ae9b720a186',
                  }}
                  style={StyleSheet.absoluteFillObject}
                  blurRadius={1}
                />
                <View style={styles.blackTintLayerMaskShadingOverlay} />
                <View style={styles.featuredCardTypographyContentBlock}>
                  <Text style={styles.featuredGoldMicroBadgeLabel}>
                    Featured
                  </Text>
                  <Text style={styles.featuredMainHeadingText}>
                    Book your next look
                  </Text>
                  <Text style={styles.featuredSubParagraphDescriptionText}>
                    Top-rated stylists near you
                  </Text>
                </View>
              </View>

              {/* INTEGRATIVE SEARCH BOX COMPONENT CONTAINER WITH EMBEDDED FILTER TRIGGER GRID */}
              <View style={styles.loggedInSearchBarFrameRowLayout}>
                <TextInput
                  placeholder="Search Barber, salons..."
                  placeholderTextColor="#ccc"
                  style={styles.loggedInInputComponentNativeTextInputField}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  keyboardAppearance="dark"
                />
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.searchSubmitGoldSquareButtonPlate}
                >
                  <Ionicons name="search" size={16} color="#000" />
                </TouchableOpacity>
              </View>

              {/* HORIZONTAL CATEGORY SELECTOR CARDS ROW BLOCK */}
              <View style={styles.horizontalFilterScrollContainerRowLayout}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[
                    styles.filterSelectorPillCapsule,
                    activeCategoryFilter === 'All' &&
                      styles.filterActivePillGoldCapsule,
                  ]}
                  onPress={() => setActiveCategoryFilter('All')}
                >
                  <Text
                    style={[
                      styles.filterSelectorPillTextLabel,
                      activeCategoryFilter === 'All' &&
                        styles.filterActivePillTextLabel,
                    ]}
                  >
                    All
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[
                    styles.filterSelectorPillCapsule,
                    activeCategoryFilter === 'Barbers' &&
                      styles.filterActivePillGoldCapsule,
                  ]}
                  onPress={() => setActiveCategoryFilter('Barbers')}
                >
                  <Text
                    style={[
                      styles.filterSelectorPillTextLabel,
                      activeCategoryFilter === 'Barbers' &&
                        styles.filterActivePillTextLabel,
                    ]}
                  >
                    Barbers
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[
                    styles.filterSelectorPillCapsule,
                    activeCategoryFilter === 'Hair Salons' &&
                      styles.filterActivePillGoldCapsule,
                  ]}
                  onPress={() => setActiveCategoryFilter('Hair Salons')}
                >
                  <Text
                    style={[
                      styles.filterSelectorPillTextLabel,
                      activeCategoryFilter === 'Hair Salons' &&
                        styles.filterActivePillTextLabel,
                    ]}
                  >
                    Hair Salons
                  </Text>
                </TouchableOpacity>
              </View>

              {/* NEAR YOU SECTION SUBTITLE HEADER TEXT */}
              <Text style={styles.nearYouSectionHeaderSerifTitleText}>
                Near You
              </Text>

              {/* CONTEXT MIGRATED GRID ELEMENT MATRIX FOR THE DETAILED CARDS VIEW */}
              {/* <View style={styles.salonCardsTwoColumnGridWrapperFlexLayer}>
                {SALON_DATA.map((item) => (
                  <View key={item.id} style={{ width: '48%' }}>
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
                  </View>
                ))}
              </View> */}

              <FlatList
                data={SALON_DATA}
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

                    onPress={() => navigation.navigate('SalonDetailscreen', item)} 
                  />
                )}
              />
            </View>
          </ScrollView>
        ) : (
          /* =========================================================
              STATE FLOW 2: PRE-LOGIN SIGNUP ONBOARDING OUTLET DASHBOARD
             ========================================================= */
          <>
            <View style={styles.preLoginHeaderLayoutRow}>
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
                <TouchableOpacity activeOpacity={0.66} style={styles.button}
                onPress={() => navigation.navigate('Signupscreen')}>
                  <Text style={{ color: '#FFA77F', fontSize: 12 }}>
                    Join free
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ paddingBottom: '30%' }}>
                <Text style={styles.preLoginHeadingText}>
                  Book Beauty {'\n'}Services Instantly
                </Text>
                <Text
                  style={{
                    color: '#ffffffde',
                    fontSize: 13,
                    marginVertical: 8,
                  }}
                >
                  Barbers, salons & mobile stylists find, book {'\n'}and pay all
                  in one place.
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

                <View style={styles.metricsHighlightsFlexLineRow}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <Ionicons name="star-outline" size={16} color="#F1BA0D" />
                    <Text style={{ color: '#ffffffde', fontSize: 11 }}>
                      4.8 rating
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <Ionicons name="time-outline" size={16} color="#F1BA0D" />
                    <Text style={{ color: '#ffffffde', fontSize: 11 }}>
                      Instant Booking
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
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
                  <View style={styles.howItWorksCardsFlexLineContainer}>
                    <View>
                      <TouchableOpacity style={styles.workcard}>
                        <Ionicons name="search" size={24} color="#000" />
                      </TouchableOpacity>
                      <Text style={styles.workcardFooterTextLabel}>Search</Text>
                    </View>
                    <View>
                      <TouchableOpacity style={styles.workcard}>
                        <Ionicons name="book" size={24} color="#000" />
                      </TouchableOpacity>
                      <Text style={styles.workcardFooterTextLabel}>Book</Text>
                    </View>
                    <View>
                      <TouchableOpacity style={styles.workcard}>
                        <Ionicons name="person" size={24} color="#000" />
                      </TouchableOpacity>
                      <Text style={styles.workcardFooterTextLabel}>Enjoy</Text>
                    </View>
                  </View>
                </View>

                <Text style={styles.sectionTitle}>Ready to Get Started?</Text>
                <Text
                  style={{
                    color: '#ffffffde',
                    fontSize: 11,
                    marginVertical: 5,
                  }}
                >
                  Join thousands of customers and beauty {'\n'}professionals on
                  HeadPop.
                </Text>

                <TouchableOpacity
                  style={{ marginVertical: 10 }}
                  onPress={executeDemoLoginTrigger}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '600',
                      color: '#F1BA0D',
                    }}
                  >
                    Book Now
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </>
        )}
      </ScreenWrapper>
    </View>
  );
};

export default Homescreen;

const styles = StyleSheet.create({
  // PRE-LOGIN STRUCTURAL STYLE DECLARATIONS
  preLoginHeaderLayoutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FFA77F',
    minWidth: 70,
    alignItems: 'center',
  },
  preLoginHeadingText: {
    fontFamily: 'serif',
    color: '#fff',
    fontSize: 26,
    fontWeight: '600',
    marginTop: 20,
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
  metricsHighlightsFlexLineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 7,
  },
  sectionTitle: {
    fontFamily: 'serif',
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
  },
  howItWorksCardsFlexLineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  workcard: {
    backgroundColor: '#F1BA0D',
    padding: 15,
    borderRadius: 10,
  },
  workcardFooterTextLabel: {
    color: '#ffffffde',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 5,
  },

  // POST-LOGIN AUTHENTICATED STYLES (image_f498fa.png Specifications)
  loggedInHeaderFlexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    marginTop: 5,
  },
  discoverNearbySerifTitleText: {
    fontFamily: 'serif',
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
  },
  subtextTimeGreetingLabel: {
    color: '#FFFFFFDE',
    fontSize: 12,
    marginTop: 2,
    fontWeight: '500',
  },
  headerRightActionLayoutComboRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  manchesterLocationBadgeFrameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    gap: 4,
  },
  manchesterLocationBadgeText: {
    color: '#000',
    fontSize: 10,
    fontWeight: '700',
  },
  notificationBellGoldBackingFrame: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1BA0D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  weatherHorizontalOverlayFrameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 8,
    marginBottom: 20,
  },
  weatherStatusCircularBackingFrame: {
    width: 32,
    height: 32,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#ffffff15',
    justifyContent: 'center',
    alignItems: 'center',
  },
  weatherSecondaryInfoLabelText: {
    color: '#ffffffde',
    fontSize: 10,
    fontWeight: '500',
  },
  weatherMainDataTitleText: {
    color: '#F1BA0D',
    fontSize: 11,
    fontWeight: '700',
    marginTop: 1,
  },
  featuredHeroLookbookCardContainerPlate: {
    width: '100%',
    height: 140,
    borderRadius: 14,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 22,
  },
  blackTintLayerMaskShadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  featuredCardTypographyContentBlock: {
    position: 'absolute',
    bottom: 16,
    left: 16,
  },
  featuredGoldMicroBadgeLabel: {
    color: '#F1BA0D',
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 4,
  },
  featuredMainHeadingText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'serif',
  },
  featuredSubParagraphDescriptionText: {
    color: '#ffffff95',
    fontSize: 10,
    marginTop: 2,
    fontWeight: '400',
  },
  loggedInSearchBarFrameRowLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    height: 44,
    overflow: 'hidden',
    marginBottom: 16,
  },
  loggedInInputComponentNativeTextInputField: {
    flex: 1,
    color: '#000',
    fontSize: 13,
    paddingHorizontal: 14,
    height: '100%',
  },
  searchSubmitGoldSquareButtonPlate: {
    backgroundColor: '#F1BA0D',
    height: '90%',
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 2,
    borderRadius: 50,
    transform: [{ scaleY: 0.9 }, { scaleX: 0.9 }],
  },
  horizontalFilterScrollContainerRowLayout: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 25,
  },
  filterSelectorPillCapsule: {
    backgroundColor: '#000000b2',
    borderWidth: 1,
    borderColor: '#444',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 65,
    alignItems: 'center',
  },
  filterActivePillGoldCapsule: {
    backgroundColor: '#F1BA0D',
    borderColor: '#F1BA0D',
  },
  filterSelectorPillTextLabel: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  filterActivePillTextLabel: {
    color: '#fff',
  },
  nearYouSectionHeaderSerifTitleText: {
    fontFamily: 'serif',
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  salonCardsTwoColumnGridWrapperFlexLayer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
  },
});
