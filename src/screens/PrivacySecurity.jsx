import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Switch,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

// Custom Global Core Framework Components
import ScreenWrapper from '../components/ScreenWrapper';
import BackBar from '../components/BackBar';
import { useTheme, useThemedStyles } from '../theme';

const { width } = Dimensions.get('window');

const PrivacySecurityScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);
  // Local active state engines for user permission toggles
  const [locationAccess, setLocationAccess] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <ScreenWrapper
        imageSource={require('../assets/bookbg2.png')} // Utilizing consistent premium background texture framework
        backgroundColor="#000"
      >
        {/* Navigation Core Header - Notification icon ignored per layout criteria */}
        <BackBar title="Privacy & Security" />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollLayoutContent}
        >
          {/* Subheading Sub-paragraph Tagline Intro text block */}
          <Text style={styles.subtitleTaglineText}>
            Protecting your grooming experience.
          </Text>

          {/* SECTION 1: ACCOUNT SECURITY */}
          <View style={styles.sectionHeaderFlexRowLine}>
            <Ionicons name="shield-checkmark-outline" size={14} color={colors.primary} style={{ marginRight: 8 }} />
            <Text style={styles.sectionHeadingGoldText}>ACCOUNT SECURITY</Text>
          </View>

          <View style={styles.cardsVerticalStackGroup}>
            {/* Change Password Navigation Card */}
            <TouchableOpacity
              style={styles.navigationClickableCard}
              activeOpacity={0.75}
              onPress={() => {navigation.navigate('ChangePasswordscreen');}}
            >
              <View style={styles.cardLeftContentBlock}>
                <View style={styles.iconMiniCircularBackingFrame}>
                  <Ionicons name="lock-closed" size={12} color={colors.primary} />
                </View>
                <View>
                  <Text style={styles.cardTitleText}>Change Password</Text>
                  <Text style={styles.cardSubtitleText}>Last updated 1 month ago</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#ffffff60" />
            </TouchableOpacity>

            {/* Two Factor Authentication Navigation Card */}
            <TouchableOpacity
              style={styles.navigationClickableCard}
              activeOpacity={0.75}
              onPress={() => {navigation.navigate('TwoFactorAuthScreen'); }}
            >
              <View style={styles.cardLeftContentBlock}>
                <View style={styles.iconMiniCircularBackingFrame}>
                  <Ionicons name="shield-half" size={12} color={colors.primary} />
                </View>
                <View>
                  <Text style={styles.cardTitleText}>Two Factor Authentication</Text>
                  <Text style={styles.cardSubtitleText}>Recommended for extra Security</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#ffffff60" />
            </TouchableOpacity>
          </View>

          {/* SECTION 2: PRIVACY & SECURITY DATA PREFERENCES */}
          <View style={[styles.sectionHeaderFlexRowLine, { marginTop: 25 }]}>
            <Ionicons name="eye-off-outline" size={14} color={colors.primary} style={{ marginRight: 8 }} />
            <Text style={styles.sectionHeadingGoldText}>PRIVACY & SECURITY</Text>
          </View>

          {/* Combined Preferences Dashboard Enclosure Card Plate */}
          <View style={styles.privacyGroupPlateContainer}>
            
            {/* Row Item: Location Access Settings Toggle */}
            <View style={styles.toggleRowItemContainer}>
              <View style={styles.toggleRowTextLabelsBlock}>
                <Text style={styles.preferenceMainRowTitleText}>Location access</Text>
                <Text style={styles.preferenceSubRowDescText}>
                  Used to find the nearest salons for your appointments
                </Text>
              </View>
              <Switch
                value={locationAccess}
                onValueChange={(val) => setLocationAccess(val)}
                trackColor={{ false: '#3A3A3C', true: colors.primary }}
                thumbColor="#fff"
                ios_backgroundColor="#3A3A3C"
              />
            </View>

            {/* Separator Border Divider Line Grid Layer */}
            <View style={styles.innerRowHorizontalDividerHorizontalLine} />

            {/* Row Item: Data Sharing Preferences Toggle */}
            <View style={styles.toggleRowItemContainer}>
              <View style={styles.toggleRowTextLabelsBlock}>
                <Text style={styles.preferenceMainRowTitleText}>Data Sharing</Text>
                <Text style={styles.preferenceSubRowDescText}>
                  Exclusive offers and seasonal trend updates
                </Text>
              </View>
              <Switch
                value={dataSharing}
                onValueChange={(val) => setDataSharing(val)}
                trackColor={{ false: '#3A3A3C', true: colors.primary }}
                thumbColor="#fff"
                ios_backgroundColor="#3A3A3C"
              />
            </View>

            {/* Separator Border Divider Line Grid Layer */}
            <View style={styles.innerRowHorizontalDividerHorizontalLine} />

            {/* Row Item: Account Management Data Trigger Flow Block */}
            <View style={styles.accountManagementRowContainer}>
              <Text style={styles.preferenceMainRowTitleText}>Account Management</Text>
              <Text style={styles.preferenceSubRowDescText}>
                Request a download of your personal data or permanently deactivate your account.
              </Text>
              
              {/* Dual Secondary Horizontal Trigger Action Group */}
              <View style={styles.managementActionButtonsFlexRowLine}>
                <TouchableOpacity
                  style={styles.softCoralRequestDataButtonCapsule}
                  activeOpacity={0.75}
                  onPress={() => Alert.alert('Data Package Pipeline', 'Preparing full client history profile backup index loop.')}
                >
                  <Text style={styles.softCoralRequestDataButtonText}>Request Data</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.greyDeactivateAccountButtonCapsule}
                  activeOpacity={0.75}
                  onPress={() => Alert.alert('Destructive Action Warn', 'Initializing safe deep-deactivation account process.')}
                >
                  <Text style={styles.greyDeactivateAccountButtonText}>Delete Account</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </ScrollView>
      </ScreenWrapper>
    </View>
  );
};

export default PrivacySecurityScreen;

const makeStyles = (colors) => ({
  scrollLayoutContent: {
    paddingBottom: 40,
    marginTop: 5,
  },
  subtitleTaglineText: {
    color: '#ffffffde',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    marginTop: 15,
    marginBottom: 20,
    paddingHorizontal: 2,
  },
  sectionHeaderFlexRowLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    paddingHorizontal: 2,
  },
  sectionHeadingGoldText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '700',
    // letterSpacing: 0.5,
  },
  cardsVerticalStackGroup: {
    flexDirection: 'column',
    gap: 10,
  },
  navigationClickableCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#222', 
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#444',
    padding: 15,
    paddingVertical: 20,
  },
  cardLeftContentBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconMiniCircularBackingFrame: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#ffffff10',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardTitleText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  cardSubtitleText: {
    color: '#ffffff60',
    fontSize: 10,
    fontWeight: '400',
  },
  privacyGroupPlateContainer: {
    backgroundColor: '#222',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#444',    
    paddingVertical: 4,
  },
  toggleRowItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  toggleRowTextLabelsBlock: {
    flex: 1,
    paddingRight: 16,
  },
  preferenceMainRowTitleText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  preferenceSubRowDescText: {
    color: '#ffffffde',
    fontSize: 10,
    lineHeight: 14,
    fontWeight: '400',
  },
  innerRowHorizontalDividerHorizontalLine: {
    height: 1,
    backgroundColor: '#444',
    marginHorizontal: 16,
  },
  accountManagementRowContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  managementActionButtonsFlexRowLine: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  softCoralRequestDataButtonCapsule: {
    backgroundColor: colors.accent, // Signature soft coral accents match core styles
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  softCoralRequestDataButtonText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
  greyDeactivateAccountButtonCapsule: {
    backgroundColor: '#444446',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  greyDeactivateAccountButtonText: {
    color: '#ffffffd0',
    fontSize: 10,
    fontWeight: '700',
  },
});