import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import ScreenWrapper from '../components/ScreenWrapper';
import MyButton from '../components/MyButton';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../constants/routes';
import { colors } from '../theme';

const Loginscreen = ({ navigation }) => {
  const { loginUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSignIn = async () => {
    setSubmitting(true);
    try {
      await loginUser({ email: email.trim(), password });
      navigation.replace(ROUTES.TABS);
    } catch (err) {
      // Auth context falls back to demo login so navigation still proceeds.
      navigation.replace(ROUTES.TABS);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSocialDemo = () => {
    loginUser();
    navigation.replace(ROUTES.TABS);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScreenWrapper imageSource={require('../assets/searchbg.png')} backgroundColor={colors.background}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to your HedPop account</Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputRow}>
              <Ionicons name="mail-outline" size={16} color="#666" style={styles.leadingIcon} />
              <TextInput
                style={styles.input}
                placeholder="you@example.com"
                placeholderTextColor="#888"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <Text style={styles.label}>Password</Text>
            <View style={styles.inputRow}>
              <Ionicons name="lock-closed-outline" size={16} color="#666" style={styles.leadingIcon} />
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#888"
                secureTextEntry={!passwordVisible}
                autoCapitalize="none"
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setPasswordVisible(v => !v)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Ionicons name={passwordVisible ? 'eye-outline' : 'eye-off-outline'} size={18} color="#666" />
              </TouchableOpacity>
            </View>

            <MyButton
              title="Sign In"
              bgColor={colors.primary}
              textColor={colors.textInverse}
              onPress={handleSignIn}
              loading={submitting}
            />
          </View>

          <View style={styles.dividerContainer}>
            <View style={styles.line} />
            <Text style={styles.dividerText}>Or Continue with</Text>
            <View style={styles.line} />
          </View>

          <View style={styles.socialRow}>
            <TouchableOpacity activeOpacity={0.7} style={styles.socialBox} onPress={handleSocialDemo}>
              <Ionicons name="logo-google" color={colors.placeholder} size={22} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} style={styles.socialBox} onPress={handleSocialDemo}>
              <Ionicons name="logo-apple" color={colors.placeholder} size={22} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} style={styles.socialBox} onPress={handleSocialDemo}>
              <Ionicons name="logo-facebook" color={colors.placeholder} size={22} />
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate(ROUTES.SIGNUP)}>
              <Text style={styles.signUpText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScreenWrapper>
    </View>
  );
};

export default Loginscreen;

const styles = StyleSheet.create({
  content: { flex: 1, justifyContent: 'center' },
  header: { marginBottom: 20 },
  title: { fontFamily: 'serif', fontSize: 24, fontWeight: '600', letterSpacing: 0.4, color: colors.text },
  subtitle: { fontSize: 14, marginTop: 6, color: colors.textMuted },
  form: { marginVertical: 12 },
  label: { fontSize: 15, fontWeight: '600', marginBottom: 10, marginTop: 12, color: colors.text },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    borderRadius: 10,
    paddingHorizontal: 14,
    backgroundColor: colors.inputBgLight,
    marginBottom: 4,
  },
  leadingIcon: { marginRight: 10 },
  input: { flex: 1, fontSize: 14, color: '#000' },
  dividerContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 15 },
  line: { flex: 1, height: 1, backgroundColor: '#777' },
  dividerText: { paddingHorizontal: 10, fontSize: 11, color: '#777' },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 15,
  },
  socialBox: {
    width: '30%',
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.border,
  },
  footer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  footerText: { fontSize: 12, color: colors.textMuted },
  signUpText: { fontSize: 13, fontWeight: '700', color: colors.accent },
});
