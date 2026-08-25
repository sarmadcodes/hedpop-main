import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';

// Custom Global Core Framework Components
import BackBar from '../components/BackBar';
import MyButton from '../components/MyButton';
import { useTheme, useThemedStyles } from '../theme';

const TwoFactorAuthScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);
  // Local active engine for managing SMS authentication toggle state
  const [smsEnabled, setSmsEnabled] = useState(false);

  const handleSaveChanges = () => {
    Alert.alert(
      'Security Engine', 
      `Two-factor verification settings saved. SMS tracking is currently turned ${smsEnabled ? 'ON' : 'OFF'}.`
    );
    if (navigation?.goBack) navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.screenMainContainerSafeArea}>
      {/* Navigation Header Core Bar matching image_f4a824.png layout criteria */}
      <BackBar title="Security Settings" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollLayoutContent}
      >
        {/* IDENTITY PROTECTION SHIELD BADGE LABEL TAG */}
        <View style={styles.identityProtectionBadgeRow}>
          <View style={styles.identityProtectionBadgeCapsule}>
            <Ionicons name="shield-checkmark" size={11} color={colors.primary} style={{ marginRight: 6 }} />
            <Text style={styles.identityProtectionBadgeText}>Identity Protection</Text>
          </View>
        </View>

        {/* SCREEN MAIN TITLE & DESCRIPTION RUNNING TEXT */}
        <Text style={styles.screenMainHeaderHeadingText}>Two-Factor{"\n"}Authentication</Text>
        <Text style={styles.subParagraphTaglineText}>
          Two-factor authentication protects your account by requiring an additional verification step during login, ensuring that only you can access your sensitive data.
        </Text>

        {/* SECTION HEADER BLOCK: SECURITY METHODS */}
        <Text style={styles.sectionHeadingGoldText}>SECURITY METHODS</Text>

        {/* INTERACTIVE TOGGLE CARD PLATE */}
        <View style={styles.securityMethodPreferenceCardBody}>
          <View style={styles.methodCardHeaderFlexLineRow}>
            <View style={styles.methodCardLeftComboBlock}>
              <View style={styles.iconMiniCircularBackingFrame}>
                <Ionicons name="chatbox-ellipses" size={12} color={colors.primary} />
              </View>
              <Text style={styles.preferenceCardTitleText}>SMS/Text Message</Text>
            </View>
            
            <Switch
              value={smsEnabled}
              onValueChange={(val) => setSmsEnabled(val)}
              trackColor={{ false: '#3A3A3C', true: colors.primary }}
              thumbColor="#fff"
              ios_backgroundColor="#3A3A3C"
            />
          </View>
          <Text style={styles.preferenceCardDescriptionBodyText}>
            Receive a 6-digit code via text message to verify your identity.
          </Text>
        </View>

        {/* INFORMATIONAL CONTEXT PACKET: SECURITY TIP BOX PLATE */}
        <View style={styles.securityTipInformationalCardBody}>
          <View style={styles.methodCardLeftComboBlock}>
            <View style={styles.iconMiniCircularBackingFrame}>
              <Ionicons name="bulb" size={12} color={colors.primary} />
            </View>
            <Text style={styles.preferenceCardTitleText}>Security Tip</Text>
          </View>
          <Text style={styles.securityTipCardDescriptionBodyText}>
            While SMS is convenient, it's vulnerable to SIM-swapping attacks. We strongly recommend using an Authenticator App or Hardware Security Keys for maximum protection of your digital assets.
          </Text>
        </View>

        {/* IN-SCROLL CONTROLS TRIGGER INTERACTION BUTTON FOOTER ACTION SYSTEM */}
        <View style={styles.inScrollInlineButtonSpacerContainer}>
          <MyButton
            title="Save Changes"
            bgColor={colors.primary}
            textColor="#000"
            onPress={handleSaveChanges}
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default TwoFactorAuthScreen;

const makeStyles = (colors) => ({
  screenMainContainerSafeArea: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 15,
  },
  scrollLayoutContent: {
    paddingBottom: 30,
    marginTop: 10,
  },
  identityProtectionBadgeRow: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 15,
  },
  identityProtectionBadgeCapsule: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.borderDark,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  identityProtectionBadgeText: {
    color: colors.text,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  screenMainHeaderHeadingText: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 28,
    marginBottom: 12,
    paddingHorizontal: 2,
  },
  subParagraphTaglineText: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '400',
    lineHeight: 16,
    marginBottom: 24,
    paddingHorizontal: 2,
  },
  sectionHeadingGoldText: {
    color: colors.primary, // Premium core signature layout gold branding color tone
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 16,
    paddingLeft: 2,
  },
  securityMethodPreferenceCardBody: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.borderDark,
    padding: 16,
    marginBottom: 16,
  },
  methodCardHeaderFlexLineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  methodCardLeftComboBlock: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconMiniCircularBackingFrame: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#ffffff18',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  preferenceCardTitleText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  preferenceCardDescriptionBodyText: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '400',
    lineHeight: 16,
    paddingLeft: 38, // Offsets details label cleanly past the bounds of circular prefix graphics row matrix
    paddingRight: 10,
  },
  securityTipInformationalCardBody: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.borderDark,
    padding: 16,
    marginBottom: 10,
  },
  securityTipCardDescriptionBodyText: {
    color: colors.textMuted, // Darker tone opacity to match secondary tip styling metrics of image_f4a824.png
    fontSize: 11,
    fontWeight: '400',
    lineHeight: 16,
    paddingLeft: 38,
    paddingRight: 6,
    marginTop: 4,
  },
  inScrollInlineButtonSpacerContainer: {
    marginTop: 25,
    marginBottom: 10,
    width: '100%',
  },
});