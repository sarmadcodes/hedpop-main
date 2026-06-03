import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRoute } from '@react-navigation/native';

// Custom Components
import ScreenWrapper from '../components/ScreenWrapper';
import BackBar from '../components/BackBar';
import MyButton from '../components/MyButton';

const SalonDetailScreen = ({ navigation }) => {
  const route = useRoute();
  const [selectedGender, setSelectedGender] = useState('Mens');

  // Destructuring parameters passed from the SalonCard payload
  const { image, category, isOpen, title, distance, time, rating, reviews } =
    route.params?.salonData || {};

  // Mock Data matching the UI items in your image
  const services = [
    {
      id: '1',
      name: 'Classic Haircut',
      price: '£25',
      duration: '30 Mins',
      desc: 'Traditional cut with hot towel finish',
    },
    {
      id: '2',
      name: 'Skin fade',
      price: '£45',
      duration: '40 Mins',
      desc: 'Traditional cut with hot towel finish',
    },
    {
      id: '3',
      name: 'Beard Trim',
      price: '£20',
      duration: '30 Mins',
      desc: 'Traditional cut with hot towel finish',
    },
    {
      id: '4',
      name: 'Hot Towel Shave',
      price: '£25',
      duration: '30 Mins',
      desc: 'Traditional cut with hot towel finish',
    },
  ];

  const userReviews = [
    {
      id: '1',
      name: 'James.M',
      date: '1 Day ago',
      stars: '⭐⭐⭐⭐⭐',
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.",
    },
    {
      id: '2',
      name: 'Sara',
      date: '2 Days ago',
      stars: '⭐⭐⭐⭐⭐',
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.",
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <ScreenWrapper
        imageSource={require('../assets/searchbg.png')}
        backgroundColor="#000"
      >
        <BackBar title="" />

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ paddingBottom: '30%' }}>
            <View style={styles.imageContainer}>
              <View style={styles.overlayCard}>
                <View style={styles.badgeRow}>
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryBadgeText}>
                      {category || 'Barber'}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.statusBadge,
                      { backgroundColor: isOpen ? '#FFA77F' : '#F63100' },
                    ]}
                  >
                    <Text style={styles.statusBadgeText}>
                      {isOpen ? 'Open' : 'Closed'}
                    </Text>
                  </View>
                </View>

                <Text style={styles.mainTitle}>{title}</Text>

                <Text style={styles.starsText}>
                  ⭐⭐⭐⭐⭐{' '}
                  <Text style={styles.reviewsCount}>
                    ({reviews || '180'} reviews)
                  </Text>
                </Text>

                <View style={styles.infoRow}>
                  <Text style={styles.infoText}>
                    📍 {distance || '120 Meters Away'}
                  </Text>
                  <Text style={styles.infoText}>
                    🕒 {time || '9:00 PM till 12:00 AM'}
                  </Text>
                </View>

                <Text style={styles.descriptionText}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text, Lorem Ipsum is simply dummy text of the
                  printing and typesetting industry. Lorem Ipsum has been the
                  industry's standard dummy text.
                </Text>
              </View>
            </View>

            {/* Services Structural Layout Section */}
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>Services</Text>
              <View style={styles.chipsContainer}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={[
                    styles.chip,
                    selectedGender === 'Men' && styles.chipActive,
                  ]}
                  onPress={() => setSelectedGender('Men')}
                >
                  <Text
                    style={[
                      styles.chipText,
                      selectedGender === 'Men' && styles.chipTextActive,
                    ]}
                  >
                    For Men
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.7}
                  style={[
                    styles.chip,
                    selectedGender === 'Women' && styles.chipActive,
                  ]}
                  onPress={() => setSelectedGender('Women')}
                >
                  <Text
                    style={[
                      styles.chipText,
                      selectedGender === 'Women' && styles.chipTextActive,
                    ]}
                  >
                    For Women
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* List generated mapping design elements */}
            {services.map(item => (
              <View key={item.id} style={styles.serviceItemRow}>
                <View style={styles.serviceLeftBlock}>
                  <Text style={styles.serviceTitleText}>{item.name}</Text>
                  <Text style={styles.serviceSubText}>
                    {item.duration} . {item.desc}
                  </Text>
                </View>

                <View style={styles.serviceRightBlock}>
                  <Text style={styles.servicePriceText}>{item.price}</Text>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.bookInlineBtn}
                    onPress={() => {
              navigation.navigate('BookingFlowscreen', {
                salonData: {
                  image,
                  category,
                  isOpen,
                  title, // This passes the exact real-time name dynamically!
                  distance,
                  time,
                  rating,
                  reviews,
                },
              });
            }}
                  >
                    <Text style={styles.bookInlineBtnText}>Book</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}

            {/* Reviews Structural Block Layout */}
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>Reviews</Text>
              <View style={styles.sortDropdownSelector}>
                <Text style={styles.sortDropdownText}>Newest ▾</Text>
              </View>
            </View>

            {/* Render User feedback list loops */}
            {userReviews.map(review => (
              <View key={review.id} style={styles.reviewBlockCard}>
                <View style={styles.reviewMetaHeaderLine}>
                  <Text style={styles.reviewerNameText}>{review.name}</Text>
                  <Text style={styles.reviewDateText}>{review.date}</Text>
                </View>
                <Text style={styles.reviewStarsRender}>{review.stars}</Text>
                <Text style={styles.reviewParagraphBody}>{review.text}</Text>
              </View>
            ))}
          </View>
        </ScrollView>

        <View style={styles.stickyFooterContainer}>
          <MyButton
            title={`Book an appointment from ${services[0]?.price || '£10'}`}
            bgColor="#F1BA0D"
            textColor="#000"
            onPress={() => {
              navigation.navigate('BookingFlowscreen', {
                salonData: {
                  image,
                  category,
                  isOpen,
                  title, // This passes the exact real-time name dynamically!
                  distance,
                  time,
                  rating,
                  reviews,
                },
              });
            }}
          />
        </View>
      </ScreenWrapper>
    </View>
  );
};

export default SalonDetailScreen;

const styles = StyleSheet.create({
  imageContainer: {
    marginTop: 10,
    position: 'relative',
    width: '100%',
    alignItems: 'center',
    paddingBottom: 20,
  },
  // salonBannerImage: {
  //   width: '100%',
  //   height: 250,
  //   resizeMode: 'cover',
  // },
  overlayCard: {
    // width: '90%',
    backgroundColor: '#000000de',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  categoryBadge: {
    backgroundColor: '#F1BA0D',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 50,
  },
  categoryBadgeText: {
    color: '#000',
    fontSize: 11,
    fontWeight: '700',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 50,
  },
  statusBadgeText: {
    color: '#000',
    fontSize: 11,
    fontWeight: '700',
  },
  mainTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 6,
  },
  starsText: {
    fontSize: 10,
    marginBottom: 8,
  },
  reviewsCount: {
    color: '#ccc',
    fontSize: 11,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  infoText: {
    color: '#ccc',
    fontSize: 11,
    marginRight: 15,
  },
  descriptionText: {
    color: '#ccc',
    fontSize: 11,
    lineHeight: 14,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 14,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  chipsContainer: {
    flexDirection: 'row',
  },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    marginLeft: 8,
  },
  chipActive: {
    backgroundColor: '#fff',
    borderColor: '#fff',
  },
  chipText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  chipTextActive: {
    color: '#000',
  },
  serviceItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000000de',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  serviceLeftBlock: {
    flex: 1,
    paddingRight: 8,
  },
  serviceTitleText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  serviceSubText: {
    color: '#ffffffde',
    fontSize: 10,
  },
  serviceRightBlock: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  servicePriceText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 12,
  },
  bookInlineBtn: {
    backgroundColor: '#FFA77F',
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderRadius: 50,
  },
  bookInlineBtnText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '700',
  },
  sortDropdownSelector: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 50,
  },
  sortDropdownText: {
    color: '#000',
    fontSize: 11,
    fontWeight: '600',
  },
  reviewBlockCard: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
    paddingBottom: 12,
  },
  reviewMetaHeaderLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  reviewerNameText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  reviewDateText: {
    color: '#ccc',
    fontSize: 11,
  },
  reviewStarsRender: {
    fontSize: 9,
    marginBottom: 5,
  },
  reviewParagraphBody: {
    color: '#888',
    fontSize: 11,
    lineHeight: 16,
  },
  stickyFooterContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
  },
});
