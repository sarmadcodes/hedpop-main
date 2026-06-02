import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';

// Custom Global Core Framework Components
import ScreenWrapper from '../components/ScreenWrapper';
import MyButton from '../components/MyButton';
import BackBar from '../components/BackBar';

const { width } = Dimensions.get('window');

const BookingSuccessScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  // Extract precise contextual records coming upstream out of parent workflow state
  const { 
    salonData = {}, 
    selectedService = {}, 
    selectedDate = {}, 
    selectedTime = '' 
  } = route.params || {};

  // Formulate absolute dynamic text elements safely
  const businessName = salonData?.title || "The Gentleman's Cut";
  const serviceName = selectedService?.name || "Classic Haircut";
  const finalPrice = selectedService?.price || 25;
  const formattedDate = selectedDate?.date && selectedDate?.month
    ? `Tuesday, ${selectedDate.date} ${selectedDate.month} 2026`
    : "Tuesday, 24 March 2026";

  // Generate a mock unique reference system 
  const referenceCode = "HP-MMM6F5DF";

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <ScreenWrapper
        imageSource={require('../assets/bookbg4.png')} // Re-using consistent background asset pipeline
        backgroundColor="#000"
      >
        {/* Dynamic Back Bar Header Navigation */}
        <BackBar title="" />

        {/* Success Animated Badge Hero Sector Container */}
        <View style={styles.successBadgeHeroWrapper}>
          <View style={styles.checkmarkOuterCircleBadge}>
            <Ionicons name="checkmark" size={30} color="#000" />
          </View>
          <Text style={styles.bookingStatusMainHeader}>Book Appointment</Text>
          <Text style={styles.bookingStatusSubParagraph}>
            Your appointment has been booked successfully
          </Text>
        </View>

        {/* Dynamic Receipt Transaction Card Display Panel */}
        <View style={styles.receiptContainerOuterCard}>
          <View style={styles.receiptLineItemRow}>
            <Text style={styles.receiptFieldLabel}>Reference</Text>
            <Text style={styles.receiptFieldValueText}>{referenceCode}</Text>
          </View>

          <View style={styles.receiptLineItemRow}>
            <Text style={styles.receiptFieldLabel}>Business</Text>
            <Text style={styles.receiptFieldValueText}>{businessName}</Text>
          </View>

          <View style={styles.receiptLineItemRow}>
            <Text style={styles.receiptFieldLabel}>Service</Text>
            <Text style={styles.receiptFieldValueText}>{serviceName}</Text>
          </View>

          <View style={styles.receiptLineItemRow}>
            <Text style={styles.receiptFieldLabel}>Date & Time</Text>
            <Text style={styles.receiptFieldValueText}>
              {selectedTime ? `${formattedDate} ${selectedTime}` : formattedDate}
            </Text>
          </View>

          <View style={styles.horizontalDividerSplitLine} />

          <View style={styles.receiptLineItemRow}>
            <Text style={styles.totalLabelAccentText}>Paid</Text>
            <Text style={styles.totalPriceAccentValueText}>£{finalPrice}</Text>
          </View>
        </View>

        {/* Informational Notification Block */}
        <View style={styles.notificationNoticeBoxContainer}>
          <Text style={styles.notificationBodyParagraphText}>
            A confirmation has been sent to your email. You'll receive a reminder 1 hour before your appointment.
          </Text>
        </View>

        {/* STICKY FOOTER ACTION COMPONENT CONTAINER TRAY */}
        <View style={styles.globalActionFooterFixedTray}>
          <View style={styles.verticalActionGroupButtonStack}>
            <MyButton
              title="View My Bookings"
              bgColor="#F1BA0D"
              textColor="#000"
              onPress={() => {navigation.navigate('MyBookingScreen');
              }}
            />
            
            <TouchableOpacity
              style={styles.fullWidthOutlineBtnNative}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('BottomBarTabs', { screen: 'Bookings' })}
            >
              <Text style={styles.fullWidthOutlineBtnNativeText}>Back To Home</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScreenWrapper>
    </View>
  );
};

export default BookingSuccessScreen;

const styles = StyleSheet.create({
  successBadgeHeroWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 25,
  },
  checkmarkOuterCircleBadge: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    // Native Shadow drops
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  bookingStatusMainHeader: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'serif', 
    textAlign: 'center',
    marginBottom: 6,
  },
  bookingStatusSubParagraph: {
    color: '#ffffffde',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  receiptContainerOuterCard: {
    backgroundColor: '#000000de',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 16,
    marginBottom: 15,
  },
  receiptLineItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 7,
  },
  receiptFieldLabel: {
    color: '#ffffffde',
    fontSize: 13,
    fontWeight: '500',
  },
  receiptFieldValueText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'right',
    flex: 1,
    marginLeft: 20,
  },
  horizontalDividerSplitLine: {
    height: 1,
    backgroundColor: '#333',
    marginVertical: 12,
  },
  totalLabelAccentText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  totalPriceAccentValueText: {
    color: '#F1BA0D',
    fontSize: 16,
    fontWeight: '700',
  },
  notificationNoticeBoxContainer: {
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationBodyParagraphText: {
    color: '#ccc',
    fontSize: 11,
    lineHeight: 16,
    textAlign: 'center',
  },
  globalActionFooterFixedTray: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  verticalActionGroupButtonStack: {
    flexDirection: 'column',
    width: '100%',
    gap: 12,
  },
  fullWidthOutlineBtnNative: {
    width: '100%',
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  fullWidthOutlineBtnNativeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});