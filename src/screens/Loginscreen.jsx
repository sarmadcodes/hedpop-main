import {
  Image,
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

const Loginscreen = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { loginUser } = useAuth(); // Extract state trigger from Context pipeline

  const handleSignIn = () => {
    loginUser(); // Set auth token status to true globally
    navigation.navigate('BottomBarTabs'); // Route directly to tab dashboard flow
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
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to your HedPop account</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="youremailhere@gmail.com"
              placeholderTextColor="#ccc"
              keyboardAppearance="dark"
              autoCapitalize="none"
            />

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
                keyboardAppearance="dark"
                autoCapitalize="none"
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

            <MyButton
              title="Sign In"
              bgColor="#F1BA0D"
              textColor="#000"
              onPress={handleSignIn} // Unified auth redirect sequence
            />
          </View>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.line} />
            <Text style={styles.dividerText}>Or Continue with</Text>
            <View style={styles.line} />
          </View>

          {/* Social Buttons */}
          <View style={styles.socialRow}>
            <TouchableOpacity activeOpacity={0.66} style={styles.socialBox} onPress={handleSignIn}>
              <Ionicons name="logo-google" color="#ccc" size={25} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.66} style={styles.socialBox} onPress={handleSignIn}>
              <Ionicons name="logo-apple" color="#ccc" size={25} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.66} style={styles.socialBox} onPress={handleSignIn}>
              <Ionicons name="logo-facebook" color="#ccc" size={25} />
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity activeOpacity={0.66}
              onPress={() => navigation.navigate('Signupscreen')}
            >
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
  title: {
    fontFamily:'serif',
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: 0.4,
    color: '#fff',
  },
  subtitle: { fontSize: 14, marginTop: 6, color: '#ffffffde' },
  form: { marginVertical: 12 },
  label: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 10,
    marginTop: 12,
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
    marginBottom: 15,
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
    marginVertical: 15,
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
  signUpText: {
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