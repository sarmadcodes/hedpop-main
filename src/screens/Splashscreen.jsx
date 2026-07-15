import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Image, Animated, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../constants/routes';
import { useTheme, useThemedStyles } from '../theme';

const SPLASH_DURATION = 2200;

const SplashScreen = ({ navigation }) => {
  const progress = useRef(new Animated.Value(0)).current;
  const { initializing } = useAuth();
  const { ready: themeReady, hasChosen, colors } = useTheme();
  const styles = useThemedStyles(makeStyles);

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: SPLASH_DURATION,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  useEffect(() => {
    if (initializing || !themeReady) return;
    const t = setTimeout(() => {
      navigation.replace(hasChosen ? ROUTES.TABS : ROUTES.GENDER_SELECT);
    }, SPLASH_DURATION);
    return () => clearTimeout(t);
  }, [initializing, themeReady, hasChosen, navigation]);

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />
      <View style={styles.progressContainer}>
        <Animated.View style={[styles.progressBar, { width: progressWidth }]} />
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;

const makeStyles = (colors) => ({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
    paddingHorizontal: 40,
  },
  logo: { width: 160, height: 160, marginBottom: 80 },
  progressContainer: {
    width: '60%',
    height: 6,
    backgroundColor: '#333',
    borderRadius: 20,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: 20,
  },
});
