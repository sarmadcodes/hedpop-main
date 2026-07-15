import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Animated, Image, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme, malePalette, femalePalette } from '../theme';
import { ROUTES } from '../constants/routes';

const OPTIONS = [
  {
    key: 'male',
    label: 'Gentleman',
    caption: 'White · Black · Gold',
    palette: malePalette,
  },
  {
    key: 'female',
    label: 'Lady',
    caption: 'White · Black · Copper',
    palette: femalePalette,
  },
];

const GenderSelectScreen = ({ navigation }) => {
  const { setGender } = useTheme();
  const [selected, setSelected] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fade, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, [fade]);

  const handleContinue = async () => {
    if (!selected || submitting) return;
    setSubmitting(true);
    await setGender(selected);
    // Root ThemeProvider will remount after setGender; navigate to Tabs.
    navigation.replace(ROUTES.TABS);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <Animated.View style={{ opacity: fade, flex: 1 }}>
        <View style={styles.header}>
          <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />
          <Text style={styles.title}>Welcome to HedPop</Text>
          <Text style={styles.subtitle}>Pick a style — you can change it anytime in Settings.</Text>
        </View>

        <View style={styles.cards}>
          {OPTIONS.map((opt) => {
            const isSelected = selected === opt.key;
            return (
              <TouchableOpacity
                key={opt.key}
                activeOpacity={0.85}
                onPress={() => setSelected(opt.key)}
                style={[
                  styles.card,
                  {
                    borderColor: isSelected ? opt.palette.primary : '#222',
                    shadowColor: isSelected ? opt.palette.primary : '#000',
                    shadowOpacity: isSelected ? 0.5 : 0,
                  },
                ]}
              >
                <View style={[styles.ring, { borderColor: opt.palette.primary }]}>
                  <View style={[styles.dot, { backgroundColor: opt.palette.primary }]} />
                </View>
                <Text style={styles.cardLabel}>{opt.label}</Text>
                <Text style={styles.cardCaption}>{opt.caption}</Text>
                <View style={styles.swatchRow}>
                  <View style={[styles.swatch, { backgroundColor: '#fff' }]} />
                  <View style={[styles.swatch, { backgroundColor: '#000', borderColor: '#333', borderWidth: 1 }]} />
                  <View style={[styles.swatch, { backgroundColor: opt.palette.primary }]} />
                </View>
                {isSelected && (
                  <View style={[styles.selectedBadge, { backgroundColor: opt.palette.primary }]}>
                    <Text style={styles.selectedBadgeText}>Selected</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            onPress={handleContinue}
            disabled={!selected || submitting}
            activeOpacity={0.85}
            style={[
              styles.continueBtn,
              {
                backgroundColor: selected
                  ? (selected === 'male' ? malePalette.primary : femalePalette.primary)
                  : '#333',
                opacity: selected ? 1 : 0.6,
              },
            ]}
          >
            <Text style={styles.continueText}>{submitting ? 'Setting up…' : 'Continue'}</Text>
          </TouchableOpacity>
          <Text style={styles.hint}>Booking a service requires a HedPop account.</Text>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default GenderSelectScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', paddingHorizontal: 24 },
  header: { alignItems: 'center', paddingTop: 24, paddingBottom: 16 },
  logo: { width: 80, height: 80, marginBottom: 12 },
  title: { color: '#fff', fontSize: 24, fontWeight: '700', letterSpacing: 0.3 },
  subtitle: {
    color: '#ffffffb0', fontSize: 13, marginTop: 6, textAlign: 'center', paddingHorizontal: 20,
  },
  cards: { flex: 1, justifyContent: 'center', gap: 16 },
  card: {
    backgroundColor: '#0d0d0d',
    borderRadius: 20,
    borderWidth: 1.5,
    paddingVertical: 22,
    paddingHorizontal: 20,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 20,
    elevation: 4,
  },
  ring: {
    width: 40, height: 40, borderRadius: 20, borderWidth: 1.5,
    justifyContent: 'center', alignItems: 'center', marginBottom: 12,
  },
  dot: { width: 18, height: 18, borderRadius: 9 },
  cardLabel: { color: '#fff', fontSize: 20, fontWeight: '700' },
  cardCaption: { color: '#ffffff9e', fontSize: 12, marginTop: 4, letterSpacing: 0.5 },
  swatchRow: { flexDirection: 'row', gap: 8, marginTop: 14 },
  swatch: { width: 24, height: 24, borderRadius: 12 },
  selectedBadge: {
    position: 'absolute', top: 16, right: 16,
    paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12,
  },
  selectedBadgeText: { color: '#000', fontSize: 11, fontWeight: '700', letterSpacing: 0.4 },
  footer: { paddingBottom: 20, gap: 10 },
  continueBtn: {
    height: 52, borderRadius: 26, justifyContent: 'center', alignItems: 'center',
  },
  continueText: { color: '#000', fontSize: 16, fontWeight: '700', letterSpacing: 0.3 },
  hint: { color: '#ffffff70', fontSize: 11, textAlign: 'center' },
});
