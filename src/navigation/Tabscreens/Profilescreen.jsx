import React from 'react';
import {
  StyleSheet, Text, View, Image, TouchableOpacity, ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';

import ScreenWrapper from '../../components/ScreenWrapper';
import BackBar from '../../components/BackBar';
import MyButton from '../../components/MyButton';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../constants/routes';
import GuestProfileCTA from '../../screens/GuestProfileCTA';
import { useTheme, useThemedStyles } from '../../theme';

const MENU = [
  { id: 'personal', label: 'Personal Details', icon: 'person-outline', target: ROUTES.PERSONAL_DETAILS },
  { id: 'payment', label: 'Payment Method', icon: 'card-outline', target: ROUTES.PAYMENT_METHOD },
  { id: 'favorites', label: 'Favorites', icon: 'heart-outline', target: ROUTES.FAVORITES },
  { id: 'loyalty', label: 'Loyalty Points', icon: 'gift-outline', target: ROUTES.LOYALTY, hasBadge: true },
  { id: 'notifications', label: 'Notifications', icon: 'notifications-outline', target: ROUTES.NOTIFICATIONS },
  { id: 'privacy', label: 'Privacy & Security', icon: 'lock-closed-outline', target: ROUTES.PRIVACY },
];

const initials = (name = '') =>
  name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase()).join('') || 'U';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);
  const { user, logoutUser } = useAuth();
  const profile = user;
  if (!profile) {
    return <GuestProfileCTA navigation={navigation} />;
  }

  const handleSignOut = async () => {
    await logoutUser();
    navigation.reset({ index: 0, routes: [{ name: ROUTES.SPLASH }] });
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScreenWrapper imageSource={require('../../assets/bookbg2.png')} backgroundColor={colors.background}>
        <BackBar title="My Profile" />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
          <View style={styles.hero}>
            <View style={styles.avatarWrap}>
              {profile.avatar ? (
                <Image source={profile.avatar} style={styles.avatar} />
              ) : (
                <View style={[styles.avatar, styles.avatarFallback]}>
                  <Text style={styles.avatarInitials}>{initials(profile.name)}</Text>
                </View>
              )}
              <TouchableOpacity style={styles.cameraBadge} activeOpacity={0.85}>
                <Ionicons name="camera" size={12} color="#000" />
              </TouchableOpacity>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{profile.name}</Text>
              <Text style={styles.email}>{profile.email}</Text>
              <View style={styles.loyaltyRow}>
                <Ionicons name="gift-outline" size={13} color={colors.primary} style={{ marginRight: 6 }} />
                <Text style={styles.loyaltyText}>{profile.loyaltyPoints} Loyalty Points</Text>
              </View>
            </View>
          </View>

          <View style={styles.menu}>
            {MENU.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={styles.menuRow}
                activeOpacity={0.7}
                onPress={() => navigation.navigate(option.target)}
              >
                <View style={styles.menuLeft}>
                  <Ionicons name={option.icon} size={18} color={colors.text} style={{ marginRight: 14, width: 20 }} />
                  <Text style={styles.menuLabel}>{option.label}</Text>
                </View>
                <View style={styles.menuRight}>
                  {option.hasBadge && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{profile.loyaltyPoints} Points</Text>
                    </View>
                  )}
                  <Ionicons name="chevron-forward" size={16} color={colors.text} />
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <MyButton title="Sign Out" bgColor={colors.primary} textColor={colors.textInverse} onPress={handleSignOut} />
        </ScrollView>
      </ScreenWrapper>
    </View>
  );
};

export default ProfileScreen;

const makeStyles = (colors) => ({
  scroll: { paddingBottom: 110, marginTop: 10 },
  hero: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.surfaceTranslucent, borderRadius: 10,
    borderWidth: 1, borderColor: colors.border, padding: 16, marginVertical: 15,
  },
  avatarWrap: { position: 'relative', marginRight: 16 },
  avatar: { width: 68, height: 68, borderRadius: 34, backgroundColor: '#222', borderWidth: 1.5, borderColor: colors.border },
  avatarFallback: { justifyContent: 'center', alignItems: 'center', backgroundColor: colors.accent },
  avatarInitials: { color: colors.textInverse, fontSize: 22, fontWeight: '700' },
  cameraBadge: {
    position: 'absolute', bottom: -2, right: -2, backgroundColor: colors.textMuted,
    width: 22, height: 22, borderRadius: 11, justifyContent: 'center', alignItems: 'center',
    borderWidth: 1.5, borderColor: '#000',
  },
  name: { color: colors.text, fontSize: 18, fontWeight: '700', marginBottom: 2 },
  email: { color: colors.primary, fontSize: 11, fontWeight: '500', marginBottom: 6 },
  loyaltyRow: { flexDirection: 'row', alignItems: 'center' },
  loyaltyText: { color: colors.textFaint, fontSize: 11, fontWeight: '500' },
  menu: { marginTop: 10, marginBottom: 20 },
  menuRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    height: 56, borderBottomWidth: 1, borderColor: '#222', paddingHorizontal: 4,
  },
  menuLeft: { flexDirection: 'row', alignItems: 'center' },
  menuLabel: { color: colors.text, fontSize: 14, fontWeight: '600' },
  menuRight: { flexDirection: 'row', alignItems: 'center' },
  badge: {
    backgroundColor: colors.accent, paddingHorizontal: 8, paddingVertical: 3,
    borderRadius: 4, marginRight: 10,
  },
  badgeText: { color: '#1a1416', fontSize: 9, fontWeight: '700' },
});
