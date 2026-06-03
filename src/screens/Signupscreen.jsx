import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import Ionicons from '@react-native-vector-icons/ionicons';
import MyButton from '../components/MyButton';
import { useAuth } from '../context/AuthContext'; // Importing Global State Engine

const Signupscreen = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { loginUser } = useAuth(); // Extract state trigger from Context pipeline

  const handleSignUp = () => {
    loginUser(); // Instantly elevate context verification state flag
    navigation.navigate('BottomBarTabs'); // Pass control cleanly onto dashboard routers
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <ScreenWrapper
        imageSource={require('../assets/searchbg.png')}
        backgroundColor="#000"
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Sign up to get started with HedPop</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Full Name */}
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="John Doe"
              placeholderTextColor="#ccc"
              keyboardAppearance="dark"
            />

            {/* Email */}
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="youremailhere@gmail.com"
              placeholderTextColor="#ccc"
              keyboardType="email-address"
              autoCapitalize="none"
              keyboardAppearance="dark"
            />

            {/* Address */}
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.input}
              placeholder="123 Street, City"
              placeholderTextColor="#ccc"
              keyboardAppearance="dark"
            />

            {/* Phone */}
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="+1 234 567 890"
              placeholderTextColor="#ccc"
              keyboardType="phone-pad"
              keyboardAppearance="dark"
            />

            {/* Password Creation */}
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              {/* Lock Icon */}
              <View style={styles.lockIconContainer}>
                <View style={styles.lockShackle} />
                <View style={styles.lockBody} />
              </View>

              <TextInput
                style={styles.passwordInput}
                placeholder="************"
                placeholderTextColor="#ccc"
                secureTextEntry={!passwordVisible}
                autoCapitalize="none"
                keyboardAppearance="dark"
              />

              <TouchableOpacity
                onPress={() => setPasswordVisible(!passwordVisible)}
              >
                <View style={styles.eyeIcon}>
                  <View style={styles.eyeOuter} />
                  <View style={styles.eyeInner} />
                </View>
              </TouchableOpacity>
            </View>

            {/* Spacing adjustments for button layout */}
            <View style={{ marginTop: 10 }}>
              <MyButton
                title="Sign Up"
                bgColor="#F1BA0D"
                textColor="#000"
                onPress={handleSignUp} // Sync registration pipeline directly with home view state shifts
              />
            </View>
          </View>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.line} />
            <Text style={styles.dividerText}>Or Continue with</Text>
            <View style={styles.line} />
          </View>

          {/* Social Buttons */}
          <View style={styles.socialRow}>
            <TouchableOpacity activeOpacity={0.66} style={styles.socialBox} onPress={handleSignUp}>
              <Ionicons name="logo-google" color="#ccc" size={25} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.66} style={styles.socialBox} onPress={handleSignUp}>
              <Ionicons name="logo-apple" color="#ccc" size={25} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.66} style={styles.socialBox} onPress={handleSignUp}>
              <Ionicons name="logo-facebook" color="#ccc" size={25} />
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity 
              activeOpacity={0.66}
              onPress={() => navigation.navigate('Loginscreen')}
            >
              <Text style={styles.signInText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScreenWrapper>
    </View>
  );
};

export default Signupscreen;

const styles = StyleSheet.create({
  content: { flex: 1, justifyContent: 'center' },
  header: { marginBottom: 15 },
  title: {
    fontFamily:'serif',
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: 0.4,
    color: '#fff',
  },
  subtitle: { fontSize: 14, marginTop: 6, color: '#ffffffde' },
  form: { marginVertical: 8 },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    marginTop: 10,
    color: '#fff',
  },
  input: {
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 20,
    fontSize: 14,
    backgroundColor: '#f2f2f2',
    color: '#000',
  },
  passwordContainer: {
    height: 40,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
    backgroundColor: '#f2f2f2',
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 10,
    color: '#000',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#777',
  },
  dividerText: {
    paddingHorizontal: 10,
    fontSize: 11,
    color: '#777',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
    marginTop: 10,
  },
  socialBox: {
    width: '30%',
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#ffffffde',
  },
  signInText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFA77F',
  },
  lockIconContainer: {
    width: 20,
    alignItems: 'center',
  },
  lockShackle: {
    width: 10,
    height: 10,
    borderWidth: 2,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginBottom: -2,
    borderColor: '#666',
  },
  lockBody: {
    width: 12,
    height: 8,
    borderRadius: 2,
    backgroundColor: '#666',
  },
  eyeIcon: {
    width: 20,
    height: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeOuter: {
    width: 20,
    height: 10,
    borderWidth: 2,
    borderRadius: 6,
    position: 'absolute',
    borderColor: '#666',
  },
  eyeInner: {
    width: 5,
    height: 5,
    borderRadius: 50,
    backgroundColor: '#666',
  },
});