import React from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

import ScreenWrapper from '../components/ScreenWrapper';
import BackBar from '../components/BackBar';
import { ROUTES } from '../constants/routes';
import { useTheme, useThemedStyles } from '../theme';

const PrivacySecurityScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScreenWrapper
        imageSource={require('../assets/bookbg2.png')}
        backgroundColor={colors.background}
      >
        <BackBar title="Privacy & Security" />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <Text style={styles.subtitle}>Manage how you sign in and what we keep.</Text>

          <View style={styles.sectionHeader}>
            <Ionicons name="shield-checkmark-outline" size={14} color={colors.primary} style={styles.sectionIcon} />
            <Text style={styles.sectionTitle}>ACCOUNT SECURITY</Text>
          </View>

          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.75}
            onPress={() => navigation.navigate(ROUTES.CHANGE_PASSWORD)}
          >
            <View style={styles.cardLeft}>
              <View style={styles.iconFrame}>
                <Ionicons name="lock-closed" size={12} color={colors.primary} />
              </View>
              <View style={styles.cardTextBlock}>
                <Text style={styles.cardTitle}>Change Password</Text>
                <Text style={styles.cardSubtitle}>Update the password you sign in with</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={16} color={colors.textFaint} />
          </TouchableOpacity>

          <View style={[styles.sectionHeader, styles.sectionGap]}>
            <Ionicons name="person-remove-outline" size={14} color={colors.primary} style={styles.sectionIcon} />
            <Text style={styles.sectionTitle}>ACCOUNT MANAGEMENT</Text>
          </View>

          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.75}
            onPress={() => navigation.navigate(ROUTES.DELETE_ACCOUNT)}
          >
            <View style={styles.cardLeft}>
              <View style={[styles.iconFrame, styles.dangerIconFrame]}>
                <Ionicons name="trash-outline" size={12} color={colors.danger} />
              </View>
              <View style={styles.cardTextBlock}>
                <Text style={[styles.cardTitle, styles.dangerText]}>Delete Account</Text>
                <Text style={styles.cardSubtitle}>Permanently delete your account and data</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={16} color={colors.textFaint} />
          </TouchableOpacity>
        </ScrollView>
      </ScreenWrapper>
    </View>
  );
};

export default PrivacySecurityScreen;

const makeStyles = (colors) => ({
  scrollContent: { paddingBottom: 40, marginTop: 5 },
  subtitle: {
    color: colors.textMuted, fontSize: 12, lineHeight: 18, marginTop: 10, marginBottom: 20,
    paddingHorizontal: 2,
  },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  sectionGap: { marginTop: 25 },
  sectionIcon: { marginRight: 8 },
  sectionTitle: { color: colors.primary, fontSize: 14, fontWeight: '700' },
  card: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: colors.surfaceAlt, borderRadius: 10, borderWidth: 1,
    borderColor: colors.borderDark, padding: 15, paddingVertical: 20,
  },
  cardLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  iconFrame: {
    width: 26, height: 26, borderRadius: 13, backgroundColor: colors.primaryTint,
    justifyContent: 'center', alignItems: 'center', marginRight: 12,
  },
  dangerIconFrame: { backgroundColor: colors.danger + '22' },
  cardTextBlock: { flex: 1, paddingRight: 8 },
  cardTitle: { color: colors.text, fontSize: 14, fontWeight: '600', marginBottom: 2 },
  dangerText: { color: colors.danger },
  cardSubtitle: { color: colors.textFaint, fontSize: 10, fontWeight: '400' },
});
