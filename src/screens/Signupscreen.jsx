import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import ScreenWrapper from '../components/ScreenWrapper';
import MyButton from '../components/MyButton';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../constants/routes';
import { useTheme, useThemedStyles, malePalette, femalePalette } from '../theme';

const initialForm = { name: '', email: '', address: '', phone: '', password: '' };

const Signupscreen = ({ navigation }) => {
  const { registerUser } = useAuth();
  const { gender: themeGender, setGender, colors } = useTheme();
  const styles = useThemedStyles(makeStyles);
  const [form, setForm] = useState(initialForm);
  const [gender, setGenderLocal] = useState(themeGender || 'male');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const set = (key) => (v) => setForm((f) => ({ ...f, [key]: v }));

  const handleSignUp = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.password) {
      setError('Name, email and password are required.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await registerUser({ ...form, email: form.email.trim(), gender });
      if (gender !== themeGender) await setGender(gender);
      navigation.replace(ROUTES.TABS);
    } catch (err) {
      setError(err?.message || 'Could not create your account. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScreenWrapper imageSource={require('../assets/searchbg.png')} backgroundColor={colors.background}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
          automaticallyAdjustKeyboardInsets
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Sign up to get started with HedPop</Text>
          </View>

          <View style={styles.form}>
            <Field styles={styles} colors={colors} label="Full Name" icon="person-outline" value={form.name} onChangeText={set('name')} placeholder="John Doe" />
            <Field styles={styles} colors={colors} label="Email" icon="mail-outline" value={form.email} onChangeText={set('email')} placeholder="you@example.com" keyboardType="email-address" autoCapitalize="none" />
            <Field styles={styles} colors={colors} label="Address" icon="location-outline" value={form.address} onChangeText={set('address')} placeholder="123 Street, City" />
            <Field styles={styles} colors={colors} label="Phone Number" icon="call-outline" value={form.phone} onChangeText={set('phone')} placeholder="+44 123 456 7890" keyboardType="phone-pad" />

            <Text style={styles.label}>Style</Text>
            <View style={styles.genderRow}>
              {[
                { key: 'male', label: 'Gentleman', hex: malePalette.primary },
                { key: 'female', label: 'Lady', hex: femalePalette.primary },
              ].map((g) => {
                const active = gender === g.key;
                return (
                  <TouchableOpacity
                    key={g.key}
                    activeOpacity={0.85}
                    onPress={() => setGenderLocal(g.key)}
                    style={[
                      styles.genderPill,
                      { borderColor: active ? g.hex : '#333', backgroundColor: active ? '#0d0d0d' : 'transparent' },
                    ]}
                  >
                    <View style={[styles.genderDot, { backgroundColor: g.hex }]} />
                    <Text style={[styles.genderLabel, active && { color: '#fff' }]}>{g.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={styles.label}>Password</Text>
            <View style={styles.inputRow}>
              <Ionicons name="lock-closed-outline" size={16} color={colors.textMuted} style={styles.leadingIcon} />
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor={colors.textFaint}
                keyboardAppearance={colors.statusBarStyle === 'light-content' ? 'dark' : 'light'}
                secureTextEntry={!passwordVisible}
                autoCapitalize="none"
                value={form.password}
                onChangeText={set('password')}
              />
              <TouchableOpacity onPress={() => setPasswordVisible(v => !v)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Ionicons name={passwordVisible ? 'eye-outline' : 'eye-off-outline'} size={18} color={colors.textMuted} />
              </TouchableOpacity>
            </View>

            {error && (
              <View style={styles.errorBox}>
                <Ionicons name="alert-circle-outline" size={14} color={colors.danger} style={{ marginRight: 6 }} />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            <View style={{ marginTop: 10 }}>
              <MyButton title="Sign Up" bgColor={colors.primary} textColor={colors.textInverse} onPress={handleSignUp} loading={submitting} />
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate(ROUTES.LOGIN)}>
              <Text style={styles.signInText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ScreenWrapper>
    </View>
  );
};

const Field = ({ label, icon, styles, colors, ...props }) => (
  <>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputRow}>
      <Ionicons name={icon} size={16} color={colors.textMuted} style={styles.leadingIcon} />
      <TextInput style={styles.input} placeholderTextColor={colors.textFaint}
                keyboardAppearance={colors.statusBarStyle === 'light-content' ? 'dark' : 'light'} {...props} />
    </View>
  </>
);

export default Signupscreen;

const makeStyles = (colors) => ({
  content: { flexGrow: 1, justifyContent: 'center', paddingBottom: 24 },
  header: { marginBottom: 15 },
  title: { fontFamily: 'serif', fontSize: 24, fontWeight: '600', letterSpacing: 0.4, color: colors.text },
  subtitle: { fontSize: 14, marginTop: 6, color: colors.textMuted },
  form: { marginVertical: 8 },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 6, marginTop: 10, color: colors.text },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    borderRadius: 10,
    paddingHorizontal: 14,
    backgroundColor: colors.inputBgLight,
  },
  leadingIcon: { marginRight: 10 },
  input: { flex: 1, fontSize: 14, color: colors.text, padding: 0, height: '100%' },
  errorBox: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#F6310015', borderWidth: 1, borderColor: '#F6310050',
    borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8, marginTop: 12,
  },
  errorText: { color: colors.danger, fontSize: 12, flex: 1 },
  footer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 24 },
  footerText: { fontSize: 12, color: colors.textMuted },
  signInText: { fontSize: 13, fontWeight: '700', color: colors.accent },
  genderRow: { flexDirection: 'row', gap: 10, marginTop: 4 },
  genderPill: {
    flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8,
    borderWidth: 1.5, borderRadius: 10, paddingHorizontal: 12, height: 44,
  },
  genderDot: { width: 12, height: 12, borderRadius: 6 },
  genderLabel: { color: colors.textMuted, fontSize: 13, fontWeight: '600' },
});
