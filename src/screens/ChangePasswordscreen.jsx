import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';

// Custom Global Core Framework Components
import BackBar from '../components/BackBar';
import MyButton from '../components/MyButton';
import authService from '../services/authService';
import { useTheme, useThemedStyles } from '../theme';

const MIN_PASSWORD_LENGTH = 6; // matches the server's rule

const ChangePasswordscreen = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);
  // Light keyboard on the light theme, dark keyboard on the dark theme.
  const keyboardAppearance = colors.statusBarStyle === 'light-content' ? 'dark' : 'light';

  // Input tracking states
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Password visibility visibility state machine toggles
  const [hideCurrent, setHideCurrent] = useState(true);
  const [hideNew, setHideNew] = useState(true);
  const [hideConfirm, setHideConfirm] = useState(true);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleUpdatePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('Please fill in all three fields.');
      return;
    }
    if (newPassword.length < MIN_PASSWORD_LENGTH) {
      setError(`Your new password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('The new password and its confirmation do not match.');
      return;
    }
    if (newPassword === currentPassword) {
      setError('Choose a new password that is different from your current one.');
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      await authService.changePassword({ currentPassword, newPassword });
      Alert.alert('Password updated', 'Your password has been changed.');
      navigation?.goBack?.();
    } catch (err) {
      setError(
        err?.status === 0
          ? 'No connection. Check your internet and try again.'
          : err?.message || 'Could not update your password. Please try again.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.screenMainContainerSafeArea}>
      {/* Navigation Header Core Bar with custom header text matching layout criteria */}
      <BackBar title="Security Settings" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollLayoutContent}
      >
        {/* SECTION MAIN TITLE & RUNNING PARAGRAPH TEXT CAPTION */}
        <Text style={styles.screenMainHeaderHeadingText}>Change Password</Text>
        <Text style={styles.subParagraphTaglineText}>
          Use at least {MIN_PASSWORD_LENGTH} characters. A mix of letters, numbers and symbols is stronger.
        </Text>

        {/* INPUT FIELD CONTAINER 1: CURRENT PASSWORD */}
        <View style={styles.inputFieldVerticalStackGroup}>
          <Text style={styles.inputFieldFieldLabelText}>Current Password</Text>
          <View style={styles.inputInteractiveFieldPlateBaseRow}>
            <TextInput
              style={styles.inputComponentNativeTextInputField}
              value={currentPassword}
              onChangeText={setCurrentPassword}
              placeholder="****************"
              placeholderTextColor={colors.textDisabled}
              secureTextEntry={hideCurrent}
              keyboardAppearance={keyboardAppearance}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity
              style={styles.visibilityToggleIconHitbox}
              activeOpacity={0.7}
              onPress={() => setHideCurrent(!hideCurrent)}
            >
              <Ionicons
                name={hideCurrent ? 'eye-off-outline' : 'eye-outline'}
                size={14}
                color={colors.textFaint}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* INPUT FIELD CONTAINER 2: NEW PASSWORD */}
        <View style={styles.inputFieldVerticalStackGroup}>
          <Text style={styles.inputFieldFieldLabelText}>New Password</Text>
          <View style={styles.inputInteractiveFieldPlateBaseRow}>
            <TextInput
              style={styles.inputComponentNativeTextInputField}
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="****************"
              placeholderTextColor={colors.textDisabled}
              secureTextEntry={hideNew}
              keyboardAppearance={keyboardAppearance}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity
              style={styles.visibilityToggleIconHitbox}
              activeOpacity={0.7}
              onPress={() => setHideNew(!hideNew)}
            >
              <Ionicons
                name={hideNew ? 'eye-off-outline' : 'eye-outline'}
                size={14}
                color={colors.textFaint}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* INPUT FIELD CONTAINER 3: CONFIRM NEW PASSWORD */}
        <View style={styles.inputFieldVerticalStackGroup}>
          <Text style={styles.inputFieldFieldLabelText}>Confirm New Password</Text>
          <View style={styles.inputInteractiveFieldPlateBaseRow}>
            <TextInput
              style={styles.inputComponentNativeTextInputField}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="****************"
              placeholderTextColor={colors.textDisabled}
              secureTextEntry={hideConfirm}
              keyboardAppearance={keyboardAppearance}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity
              style={styles.visibilityToggleIconHitbox}
              activeOpacity={0.7}
              onPress={() => setHideConfirm(!hideConfirm)}
            >
              <Ionicons
                name={hideConfirm ? 'eye-off-outline' : 'eye-outline'}
                size={14}
                color={colors.textFaint}
              />
            </TouchableOpacity>
          </View>
        </View>

        {error && (
          <View style={styles.errorBox}>
            <Ionicons name="alert-circle-outline" size={14} color={colors.danger} style={styles.errorIcon} />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {/* INTERACTION ACTION BUTTON FOOTER TRACK GROUP ROW PILE */}
        <View style={styles.actionButtonsContainerVerticalGroupStack}>
          {/* PRIMARY UPDATE COMMIT TRIGGER ACTION MODULE */}
          <MyButton
            title="Update Password"
            bgColor={colors.primary}
            textColor={colors.textInverse}
            onPress={handleUpdatePassword}
            loading={submitting}
          />

          {/* SECONDARY EXIT BACKOUT GHOST CANCEL MODULE */}
          <TouchableOpacity
            style={styles.darkGreySecondaryCancelButtonPlateCapsule}
            activeOpacity={0.8}
            onPress={() => {
              if (navigation?.goBack) navigation.goBack();
            }}
          >
            <Text style={styles.darkGreySecondaryCancelButtonTextLabel}>Cancel</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangePasswordscreen;

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
  screenMainHeaderHeadingText: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 8,
    paddingHorizontal: 2,
  },
  subParagraphTaglineText: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '400',
    lineHeight: 16,
    marginBottom: 28,
    paddingHorizontal: 2,
  },
  inputFieldVerticalStackGroup: {
    flexDirection: 'column',
    marginBottom: 20,
  },
  inputFieldFieldLabelText: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 10,
    paddingHorizontal: 2,
  },
  inputInteractiveFieldPlateBaseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBg,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    height: 45,
    paddingHorizontal: 14,
  },
  inputComponentNativeTextInputField: {
    flex: 1,
    color: colors.text,
    fontSize: 13,
    fontWeight: '500',
    height: '100%',
    padding: 0, // Strips interior native framework metrics shifts overrides
  },
  visibilityToggleIconHitbox: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.danger + '15',
    borderWidth: 1,
    borderColor: colors.danger + '50',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 4,
  },
  errorIcon: { marginRight: 6 },
  errorText: { color: colors.danger, fontSize: 12, flex: 1 },
  actionButtonsContainerVerticalGroupStack: {
    flexDirection: 'column',
    gap: 12,
    marginTop: 15,
  },
  darkGreySecondaryCancelButtonPlateCapsule: {
    width: '100%',
    backgroundColor: colors.surfaceAlt,
    height: 48,
    borderWidth: 1,
    borderColor: colors.borderDark,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkGreySecondaryCancelButtonTextLabel: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
});