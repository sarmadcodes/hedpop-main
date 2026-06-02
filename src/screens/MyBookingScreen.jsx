import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

// Custom Global Core Framework Components
import ScreenWrapper from '../components/ScreenWrapper';
import BackBar from '../components/BackBar';

const { width } = Dimensions.get('window');

const MyBookingScreen = () => {
  // Hardcoded UI Static Mock Database matching your premium visual style exactly
  const bookingsMockData = [
    {
      id: '1',
      businessName: "The Gentleman's Cut",
      service: 'Skin Fade',
      date: 'Fri, 27 April 2026',
      time: '14:00-15:00',
      price: '25',
      status: 'Confirmed',
    },
    {
      id: '2',
      businessName: 'The London Barber Co.',
      service: 'Skin Fade',
      date: 'Sat, 28 April 2026',
      time: '14:00-15:00',
      price: '25',
      status: 'Confirmed',
    },
    {
      id: '3',
      businessName: 'Union Jack Barbers',
      service: 'Skin Fade',
      date: 'Sun, 29 April 2026',
      time: '14:00-15:00',
      price: '25',
      status: 'Confirmed',
    },
    {
      id: '4',
      businessName: 'The Barber Lounge Co.',
      service: 'Skin Fade',
      date: 'Sun, 29 April 2026',
      time: '14:00-15:00',
      price: '25',
      status: 'Confirmed',
    },
    {
      id: '5',
      businessName: 'The Barber Lounge Co.',
      service: 'Skin Fade',
      date: 'Sun, 29 April 2026',
      time: '14:00-15:00',
      price: '25',
      status: 'Cancelled',
    },
    {
      id: '6',
      businessName: 'The Barber Lounge Co.',
      service: 'Skin Fade',
      date: 'Sun, 29 April 2026',
      time: '14:00-15:00',
      price: '25',
      status: 'Confirmed',
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <ScreenWrapper
        imageSource={require('../assets/homebg.png')} 
        backgroundColor="#000"
      >
        {/* Navigation Core Header */}
        <BackBar title="View My Bookings" />

        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollLayoutContent}
        >
          {/* Timeline Context Header Group Divider */}
          <Text style={styles.timelineSectionHeadingText}>Upcoming</Text>

          {/* Dynamic Feed Renderer Engine */}
          {bookingsMockData.map((item) => {
            const isCancelled = item.status === 'Cancelled';

            return (
              <View key={item.id} style={styles.bookingContainerCardRow}>
                {/* Left Structural Content Splitter Block */}
                <View style={styles.cardLeftContentBody}>
                  <Text style={styles.businessTitleText}>{item.businessName}</Text>
                  <Text style={styles.serviceTypeText}>{item.service}</Text>

                  {/* Operational Data Details Footer */}
                  <View style={styles.metaDataInfoRowLine}>
                    <View style={styles.metaDataUnitGroup}>
                      <Ionicons name="calendar-outline" size={12} color="#fff" style={{ marginRight: 6 }} />
                      <Text style={styles.metaDataLabelInlineText}>{item.date}</Text>
                    </View>

                    <View style={[styles.metaDataUnitGroup, { marginLeft: 16 }]}>
                      <Ionicons name="time-outline" size={12} color="#fff" style={{ marginRight: 6 }} />
                      <Text style={styles.metaDataLabelInlineText}>{item.time}</Text>
                    </View>
                  </View>
                </View>

                {/* Right Structural Status/Price Block */}
                <View style={styles.cardRightActionSidebar}>
                  <View 
                    style={[
                      styles.statusBadgeCapsule, 
                      isCancelled && styles.statusBadgeCapsuleCancelled
                    ]}
                  >
                    <Text style={styles.statusBadgeText}>{item.status}</Text>
                  </View>
                  <Text style={styles.pricingValueAccentText}>£{item.price}</Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </ScreenWrapper>
    </View>
  );
};

export default MyBookingScreen;

const styles = StyleSheet.create({
  scrollLayoutContent: {
    paddingBottom: 30,
    marginTop: 10,
  },
  timelineSectionHeadingText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 10,
    paddingLeft: 2,
  },
  bookingContainerCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#000000de',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 12,
  },
  cardLeftContentBody: {
    flex: 1,
    paddingRight: 8,
  },
  businessTitleText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  serviceTypeText: {
    color: '#ffffff9e',
    fontSize: 11,
    fontWeight: '400',
    marginBottom: 12,
  },
  metaDataInfoRowLine: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaDataUnitGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaDataLabelInlineText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '400',
  },
  cardRightActionSidebar: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    minHeight: 65,
  },
  statusBadgeCapsule: {
    backgroundColor: '#FFA77F', // Clean premium coral badge matching image
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusBadgeCapsuleCancelled: {
    backgroundColor: '#FF3B30', // Alert Crimson layout fill for cancelled records
  },
  statusBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
  pricingValueAccentText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    paddingRight: 4,
  },
});