import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';

import ScreenWrapper from '../components/ScreenWrapper';
import MyButton from '../components/MyButton';
import BackBar from '../components/BackBar';
import { ROUTES } from '../constants/routes';
import { useTheme, useThemedStyles } from '../theme';

const BookingDoneScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);
  const booking = route.params?.booking || {};
  const salonTitle = route.params?.salonTitle || booking.salonTitle || booking.salon?.title || 'Salon';

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScreenWrapper imageSource={require('../assets/bookbg4.png')} backgroundColor={colors.background}>
        <BackBar title="" />

        <View style={styles.hero}>
          <View style={styles.checkCircle}>
            <Ionicons name="checkmark" size={30} color="#000" />
          </View>
          <Text style={styles.heading}>Booking Confirmed</Text>
          <Text style={styles.subheading}>Your appointment has been booked successfully</Text>
        </View>

        <View style={styles.receipt}>
          <Row styles={styles} colors={colors} label="Reference" value={booking.reference || '—'} />
          <Row styles={styles} colors={colors} label="Business" value={salonTitle} />
          <Row styles={styles} colors={colors} label="Service" value={booking.serviceName || '—'} />
          <Row styles={styles} colors={colors} label="Date & Time" value={`${booking.date || ''}${booking.time ? `  ${booking.time}` : ''}`} />
          <View style={styles.divider} />
          <Row styles={styles} colors={colors} label="Paid" value={`£${booking.price ?? 0}`} bold />
        </View>

        <View style={styles.notice}>
          <Text style={styles.noticeText}>
            A confirmation has been sent to your email. You'll receive a reminder 1 hour before your appointment.
          </Text>
        </View>

        <View style={styles.footer}>
          <MyButton
            title="View My Bookings"
            bgColor={colors.primary}
            textColor={colors.textInverse}
            onPress={() => navigation.navigate(ROUTES.MY_BOOKINGS)}
          />
          <TouchableOpacity
            style={styles.outlineBtn}
            activeOpacity={0.7}
            onPress={() => navigation.navigate(ROUTES.TABS, { screen: ROUTES.TAB_HOME })}
          >
            <Text style={styles.outlineBtnText}>Back To Home</Text>
          </TouchableOpacity>
        </View>
      </ScreenWrapper>
    </View>
  );
};

const Row = ({ label, value, bold, styles, colors }) => (
  <View style={styles.row}>
    <Text style={[styles.label, bold && { color: colors.text, fontSize: 16, fontWeight: '600' }]}>{label}</Text>
    <Text style={[styles.value, bold && { color: colors.primary, fontSize: 16, fontWeight: '700' }]}>{value}</Text>
  </View>
);

export default BookingDoneScreen;

const makeStyles = (colors) => ({
  hero: { alignItems: 'center', justifyContent: 'center', marginTop: 15, marginBottom: 25 },
  checkCircle: {
    width: 60, height: 60, backgroundColor: '#fff', borderRadius: 30,
    justifyContent: 'center', alignItems: 'center', marginBottom: 16, elevation: 5,
  },
  heading: { color: colors.text, fontSize: 20, fontWeight: '600', fontFamily: 'serif', textAlign: 'center', marginBottom: 6 },
  subheading: { color: colors.textMuted, fontSize: 12, textAlign: 'center', paddingHorizontal: 20 },

  receipt: {
    backgroundColor: colors.surfaceTranslucent, borderRadius: 10, borderWidth: 1,
    borderColor: colors.border, padding: 16, marginBottom: 15,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 7 },
  label: { color: colors.textMuted, fontSize: 13, fontWeight: '500' },
  value: { color: colors.text, fontSize: 13, fontWeight: '500', textAlign: 'right', flex: 1, marginLeft: 20 },
  divider: { height: 1, backgroundColor: colors.borderFaint, marginVertical: 12 },

  notice: { backgroundColor: colors.surfaceAlt, borderRadius: 10, padding: 15, alignItems: 'center' },
  noticeText: { color: colors.border, fontSize: 11, lineHeight: 16, textAlign: 'center' },

  footer: { position: 'absolute', bottom: 30, left: 0, right: 0, paddingHorizontal: 20, gap: 12 },
  outlineBtn: {
    width: '100%', height: 48, borderRadius: 10, borderWidth: 1, borderColor: colors.border,
    justifyContent: 'center', alignItems: 'center',
  },
  outlineBtnText: { color: colors.text, fontSize: 14, fontWeight: '600' },
});
