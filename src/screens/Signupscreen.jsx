import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import ScreenWrapper from '../components/ScreenWrapper';
import MyButton from '../components/MyButton';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../constants/routes';
import { colors } from '../theme';

const initialForm = { name: '', email: '', address: '', phone: '', password: '' };

const Signupscreen = ({ navigation }) => {
  const { registerUser } = useAuth();
  const [form, setForm] = useState(initialForm);
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
      await registerUser({ ...form, email: form.email.trim() });
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
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Sign up to get started with HedPop</Text>
          </View>

          <View style={styles.form}>
            <Field label="Full Name" icon="person-outline" value={form.name} onChangeText={set('name')} placeholder="John Doe" />
            <Field label="Email" icon="mail-outline" value={form.email} onChangeText={set('email')} placeholder="you@example.com" keyboardType="email-address" autoCapitalize="none" />
            <Field label="Address" icon="location-outline" value={form.address} onChangeText={set('address')} placeholder="123 Street, City" />
            <Field label="Phone Number" icon="call-outline" value={form.phone} onChangeText={set('phone')} placeholder="+44 123 456 7890" keyboardType="phone-pad" />

            <Text style={styles.label}>Password</Text>
            <View style={styles.inputRow}>
              <Ionicons name="lock-closed-outline" size={16} color="#666" style={styles.leadingIcon} />
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#888"
                secureTextEntry={!passwordVisible}
                autoCapitalize="none"
                value={form.password}
                onChangeText={set('password')}
              />
              <TouchableOpacity onPress={() => setPasswordVisible(v => !v)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Ionicons name={passwordVisible ? 'eye-outline' : 'eye-off-outline'} size={18} color="#666" />
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

          <View style={styles.dividerContainer}>
            <View style={styles.line} />
            <Text style={styles.dividerText}>Or Continue with</Text>
            <View style={styles.line} />
          </View>

          <View style={styles.socialRow}>
            {['logo-google', 'logo-apple', 'logo-facebook'].map((icon) => (
              <View key={icon} style={[styles.socialBox, { opacity: 0.5 }]}>
                <Ionicons name={icon} color={colors.placeholder} size={22} />
              </View>
            ))}
          </View>
          <Text style={styles.socialHint}>Social sign-in coming soon</Text>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate(ROUTES.LOGIN)}>
              <Text style={styles.signInText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScreenWrapper>
    </View>
  );
};

const Field = ({ label, icon, ...props }) => (
  <>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputRow}>
      <Ionicons name={icon} size={16} color="#666" style={styles.leadingIcon} />
      <TextInput style={styles.input} placeholderTextColor="#888" {...props} />
    </View>
  </>
);

export default Signupscreen;

const styles = StyleSheet.create({
  content: { flex: 1, justifyContent: 'center' },
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
  input: { flex: 1, fontSize: 14, color: '#000' },
  dividerContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 12 },
  line: { flex: 1, height: 1, backgroundColor: '#777' },
  dividerText: { paddingHorizontal: 10, fontSize: 11, color: '#777' },
  socialRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25, marginTop: 10 },
  socialBox: {
    width: '30%',
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.border,
  },
  socialHint: { color: colors.textFaint, fontSize: 10, textAlign: 'center', marginTop: -15, marginBottom: 14 },
  errorBox: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#F6310015', borderWidth: 1, borderColor: '#F6310050',
    borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8, marginTop: 12,
  },
  errorText: { color: colors.danger, fontSize: 12, flex: 1 },
  footer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  footerText: { fontSize: 12, color: colors.textMuted },
  signInText: { fontSize: 13, fontWeight: '700', color: colors.accent },
});
