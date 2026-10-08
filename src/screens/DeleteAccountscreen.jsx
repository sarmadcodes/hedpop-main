import React, { useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';

import BackBar from '../components/BackBar';
import MyButton from '../components/MyButton';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../constants/routes';
import { useTheme, useThemedStyles } from '../theme';

const WILL_BE_DELETED = [
  'Your profile and sign-in details',
  'Your bookings. Upcoming appointments are cancelled and their time slots released',
  'Your favourite salons, loyalty points and notifications',
];

const DeleteAccountscreen = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);
  const { deleteAccount } = useAuth();

  const [password, setPassword] = useState('');
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // The session is gone, so start over from the splash screen as a guest.
  const leave = () => navigation.reset({ index: 0, routes: [{ name: ROUTES.SPLASH }] });

  const performDelete = async () => {
    setSubmitting(true);
    setError(null);
    try {
      await deleteAccount(password);
      Alert.alert(
        'Account deleted',
        'Your account and its data have been permanently deleted.',
        [{ text: 'OK', onPress: leave }],
        { cancelable: false },
      );
    } catch (err) {
      let message;
      if (err?.status === 0) {
        message = 'No connection. Check your internet and try again.';
      } else if (err?.status === 404) {
        message = "Account deletion isn't available right now. Please try again later.";
      } else {
        message = err?.message || 'Could not delete your account. Please try again.';
      }
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = () => {
    if (!password) {
      setError('Enter your password to confirm.');
      return;
    }
    Alert.alert(
      'Delete account?',
      'This permanently deletes your account and cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: performDelete },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackBar title="Delete Account" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustKeyboardInsets
        contentContainerStyle={styles.content}
      >
        <View style={styles.iconCircle}>
          <Ionicons name="warning-outline" size={28} color={colors.danger} />
        </View>

        <Text style={styles.title}>Delete your account</Text>
        <Text style={styles.body}>
          This is permanent and cannot be undone. The following will be deleted:
        </Text>

        <View style={styles.card}>
          {WILL_BE_DELETED.map((line) => (
            <View key={line} style={styles.listRow}>
              <Ionicons name="close-circle-outline" size={16} color={colors.danger} style={styles.listIcon} />
              <Text style={styles.listText}>{line}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.label}>Enter your password to confirm</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={(v) => {
              setPassword(v);
              if (error) setError(null);
            }}
            placeholder="Your password"
            placeholderTextColor={colors.textFaint}
            secureTextEntry={passwordHidden}
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="password"
            editable={!submitting}
          />
          <TouchableOpacity
            onPress={() => setPasswordHidden((h) => !h)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name={passwordHidden ? 'eye-off-outline' : 'eye-outline'} size={18} color={colors.textFaint} />
          </TouchableOpacity>
        </View>

        {error && (
          <View style={styles.errorBox}>
            <Ionicons name="alert-circle-outline" size={14} color={colors.danger} style={styles.errorIcon} />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <View style={styles.actions}>
          <MyButton
            title="Delete my account"
            bgColor={colors.danger}
            textColor="#fff"
            onPress={handleDelete}
            loading={submitting}
          />
          <TouchableOpacity
            style={styles.cancelBtn}
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
            disabled={submitting}
          >
            <Text style={styles.cancelText}>Keep my account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DeleteAccountscreen;

const makeStyles = (colors) => ({
  container: { flex: 1, backgroundColor: colors.background, paddingHorizontal: 15 },
  content: { paddingBottom: 40, paddingTop: 10 },
  iconCircle: {
    width: 56, height: 56, borderRadius: 28, alignSelf: 'center', marginTop: 10,
    backgroundColor: colors.danger + '22', alignItems: 'center', justifyContent: 'center',
  },
  title: {
    color: colors.text, fontSize: 20, fontWeight: '700', textAlign: 'center', marginTop: 16,
  },
  body: {
    color: colors.textMuted, fontSize: 13, lineHeight: 19, textAlign: 'center',
    marginTop: 8, marginBottom: 18, paddingHorizontal: 8,
  },
  card: {
    backgroundColor: colors.surfaceAlt, borderRadius: 10, borderWidth: 1,
    borderColor: colors.borderDark, padding: 14, gap: 10,
  },
  listRow: { flexDirection: 'row', alignItems: 'flex-start' },
  listIcon: { marginTop: 1, marginRight: 10 },
  listText: { flex: 1, color: colors.text, fontSize: 13, lineHeight: 18 },
  label: {
    color: colors.textMuted, fontSize: 13, fontWeight: '600', marginTop: 24, marginBottom: 10,
  },
  inputRow: {
    flexDirection: 'row', alignItems: 'center', height: 46, borderRadius: 10,
    paddingHorizontal: 14, backgroundColor: colors.inputBg,
    borderWidth: 1, borderColor: colors.inputBorder,
  },
  input: { flex: 1, color: colors.text, fontSize: 14, padding: 0, height: '100%' },
  errorBox: {
    flexDirection: 'row', alignItems: 'center', marginTop: 12,
    backgroundColor: colors.danger + '15', borderWidth: 1, borderColor: colors.danger + '50',
    borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8,
  },
  errorIcon: { marginRight: 6 },
  errorText: { flex: 1, color: colors.danger, fontSize: 12 },
  actions: { marginTop: 22, gap: 12 },
  cancelBtn: {
    height: 48, borderRadius: 10, borderWidth: 1, borderColor: colors.borderDark,
    alignItems: 'center', justifyContent: 'center',
  },
  cancelText: { color: colors.text, fontSize: 14, fontWeight: '600' },
});
