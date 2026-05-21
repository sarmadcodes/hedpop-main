import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Animated,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SplashScreen = ({ navigation }) => {

  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {

    Animated.timing(progress, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start(() => {
      navigation.replace('BottomBarTabs');
    });

  }, []);

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='light-content' backgroundColor='#000' />

      {/* Logo */}
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <Animated.View
          style={[
            styles.progressBar,
            { width: progressWidth },
          ]}
        />
      </View>

    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    gap:30,
    paddingHorizontal: 40,
  },

  logo: {
    width: 160,
    height: 160,
    marginBottom: 80,
  },

  progressContainer: {
    width: '60%',
    height: 6,
    backgroundColor: '#333',
    borderRadius: 20,
    overflow: 'hidden',
  },

  progressBar: {
    height: '100%',
    backgroundColor: '#FFA77F',
    borderRadius: 20,
  },

});