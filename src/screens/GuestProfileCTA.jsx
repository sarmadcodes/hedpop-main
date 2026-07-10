import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import ScreenWrapper from '../components/ScreenWrapper';
import MyButton from '../components/MyButton';
import { ROUTES } from '../constants/routes';
import { colors } from '../theme';

// Shown in the Profile tab when no user is signed in.
// Keep this lightweight; it's the user's gateway to authenticating.
const GuestProfileCTA = ({ navigation }) => (
  <View style={{ flex: 1, backgroundColor: colors.background }}>
    <ScreenWrapper imageSource={require('../assets/bookbg2.png')} backgroundColor={colors.background}>
      <View style={styles.content}>
        <Image source={require('../assets/iconlogo.png')} style={styles.logo} resizeMode="contain" />

        <Text style={styles.title}>Welcome to HedPop</Text>
        <Text style={styles.subtitle}>
          Sign in to book appointments, save favorite salons and track your loyalty points.
        </Text>

        <View style={styles.benefits}>
          {[
            ['calendar-outline', 'Book in seconds'],
            ['heart-outline', 'Save your favorite salons'],
            ['gift-outline', 'Earn loyalty points'],
            ['notifications-outline', 'Appointment reminders'],
          ].map(([icon, label]) => (
            <View key={label} style={styles.benefitRow}>
              <Ionicons name={icon} size={16} color={colors.primary} />
              <Text style={styles.benefitText}>{label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.actions}>
          <MyButton
            title="Sign In"
            bgColor={colors.primary}
            textColor={colors.textInverse}
            onPress={() => navigation.navigate(ROUTES.LOGIN)}
          />
          <TouchableOpacity
            style={styles.outlineBtn}
            activeOpacity={0.7}
            onPress={() => navigation.navigate(ROUTES.SIGNUP)}
          >
            <Text style={styles.outlineBtnText}>Create an account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  </View>
);

export default GuestProfileCTA;

const styles = StyleSheet.create({
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 },
  logo: { width: 80, height: 80, marginBottom: 20 },
  title: { fontFamily: 'serif', color: colors.text, fontSize: 26, fontWeight: '600', textAlign: 'center', marginBottom: 8 },
  subtitle: { color: colors.textMuted, fontSize: 13, textAlign: 'center', lineHeight: 19, marginBottom: 30, paddingHorizontal: 20 },
  benefits: { width: '100%', gap: 12, marginBottom: 30, paddingHorizontal: 20 },
  benefitRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: colors.surfaceTranslucent, borderRadius: 10, padding: 12,
    borderWidth: 1, borderColor: colors.border,
  },
  benefitText: { color: colors.text, fontSize: 13, fontWeight: '500' },
  actions: { width: '100%', gap: 10 },
  outlineBtn: {
    height: 48, borderRadius: 10, borderWidth: 1, borderColor: colors.border,
    justifyContent: 'center', alignItems: 'center',
  },
  outlineBtnText: { color: colors.text, fontSize: 14, fontWeight: '600' },
});
