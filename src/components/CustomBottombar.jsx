import Ionicons from '@react-native-vector-icons/ionicons';
import React, { useEffect, useRef } from 'react';
import {
  View, TouchableOpacity, Text, StyleSheet, Animated, Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, useThemedStyles } from '../theme';

const icons = {
  Home: { active: 'home', inactive: 'home-outline' },
  Bookings: { active: 'calendar', inactive: 'calendar-outline' },
  Search: { active: 'search', inactive: 'search-outline' },
  Profile: { active: 'person', inactive: 'person-outline' },
};

const CustomBottomBar = ({ state, navigation }) => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);

  const animations = useRef(
    state.routes.map((_, i) => new Animated.Value(i === state.index ? 1 : 0))
  ).current;

  useEffect(() => {
    animations.forEach((anim, i) => {
      Animated.spring(anim, {
        toValue: i === state.index ? 1 : 0,
        useNativeDriver: true,
        friction: 6,
        tension: 90,
      }).start();
    });
  }, [state.index]);

  return (
    <View style={[styles.absoluteWrapper, { bottom: insets.bottom }]}>
      {/* accent hairline top border — theme-tinted */}
      <View style={styles.accentLine} />
      <View style={styles.bar}>
        {state.routes.map((route, index) => {
          const anim = animations[index];
          const isFocused = state.index === index;

          const translateY = anim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -18],
          });
          const scale = anim.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1.08],
          });
          const labelOpacity = anim.interpolate({
            inputRange: [0, 1],
            outputRange: [0.55, 1],
          });

          const iconName = isFocused
            ? icons[route.name].active
            : icons[route.name].inactive;

          return (
            <TouchableOpacity
              key={route.key}
              onPress={() => navigation.navigate(route.name)}
              activeOpacity={0.85}
              style={styles.tab}
            >
              <Animated.View
                style={[
                  styles.iconWrapper,
                  isFocused && styles.iconWrapperActive,
                  { transform: [{ translateY }, { scale }] },
                ]}
              >
                {isFocused && <View style={styles.glow} />}
                <Ionicons
                  name={iconName}
                  size={22}
                  color={isFocused ? '#000' : '#8a8a8a'}
                />
              </Animated.View>

              <Animated.Text
                style={[
                  styles.label,
                  isFocused && styles.activeLabel,
                  { opacity: labelOpacity },
                ]}
              >
                {route.name}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default CustomBottomBar;

const makeStyles = (colors) => ({
  absoluteWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  accentLine: {
    height: 2,
    backgroundColor: colors.primary,
    marginHorizontal: 40,
    borderRadius: 2,
    marginBottom: -1,
    shadowColor: colors.primary,
    shadowOpacity: 0.9,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    elevation: 6,
  },
  bar: {
    flexDirection: 'row',
    height: 78,
    backgroundColor: colors.surfaceDeep,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1,
    borderColor: colors.inputBorder,
    elevation: 12,
    alignItems: 'flex-end',
    paddingBottom: 10,
    paddingTop: 4,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.6,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: -4 },
      },
    }),
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  iconWrapper: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  iconWrapperActive: {
    backgroundColor: colors.primary,
    borderWidth: 3,
    borderColor: colors.surfaceDeep,
    shadowColor: colors.primary,
    shadowOpacity: 0.9,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 10,
  },
  glow: {
    position: 'absolute',
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primaryGlow,
    opacity: 0.9,
  },
  label: {
    fontSize: 10.5,
    color: '#8a8a8a',
    fontWeight: '600',
    marginTop: 6,
    letterSpacing: 0.3,
  },
  activeLabel: {
    color: colors.primary,
    fontWeight: '700',
  },
});
