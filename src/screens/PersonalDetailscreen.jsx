import React, { useState } from 'react';
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Switch, Alert,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

import ScreenWrapper from '../components/ScreenWrapper';
import BackBar from '../components/BackBar';
import MyButton from '../components/MyButton';
import { useAuth } from '../context/AuthContext';
import userService from '../services/userService';
import { useTheme, useThemedStyles, malePalette, femalePalette } from '../theme';

const initials = (n = '') =>
  n.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase()).join('') || 'U';

const PersonalDetailsScreen = () => {
  const { colors, gender: themeGender, setGender } = useTheme();
  const styles = useThemedStyles(makeStyles);
  const { user, updateUser } = useAuth();
  const seed = user || {};

  const [fullName, setFullName] = useState(seed.name || '');
  const [email, setEmail] = useState(seed.email || '');
  const [phone, setPhone] = useState(seed.phone || '');
  const [address, setAddress] = useState(seed.address || '');
  const [gender, setGenderLocal] = useState(seed.gender || themeGender || 'male');
  const [remindersEnabled, setRemindersEnabled] = useState(seed.settings?.remindersEnabled ?? true);
  const [saving, setSaving] = useState(false);

  const pickGender = (g) => {
    if (g === gender) return;
    setGenderLocal(g);
    setGender(g); // instant theme swap
    userService.updateProfile({ gender: g }).then((u) => updateUser(u)).catch(() => {});
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updated = await userService.updateProfile({
        name: fullName, phone, address, gender,
        settings: { ...(seed.settings || {}), remindersEnabled },
      });
      updateUser(updated);
      Alert.alert('Saved', 'Your details have been updated.');
    } catch (err) {
      Alert.alert('Save failed', err?.message || 'Could not save changes.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScreenWrapper imageSource={require('../assets/bookbg2.png')} backgroundColor={colors.background}>
        <BackBar title="Personal Details" />

        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
          automaticallyAdjustKeyboardInsets
          contentContainerStyle={{ paddingBottom: 110, marginTop: 5 }}
        >
          <View style={styles.heroBlock}>
            <View style={styles.avatarWrap}>
              <View style={styles.avatar}>
                <Text style={styles.avatarInitials}>{initials(fullName)}</Text>
              </View>
              <TouchableOpacity style={styles.cameraBadge} activeOpacity={0.85}>
                <Ionicons name="camera" size={10} color="#000" />
              </TouchableOpacity>
            </View>
            <Text style={styles.name}>{fullName}</Text>
            <Text style={styles.tier}>{seed.tier || 'Member'}</Text>
          </View>

          <Field styles={styles} icon="person" label="Full Name" value={fullName} onChangeText={setFullName} />
          <Field styles={styles} icon="mail" label="Email Address" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
          <Field styles={styles} icon="call" label="Phone Number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
          <Field styles={styles} icon="location" label="Address" value={address} onChangeText={setAddress} multiline />

          <Text style={styles.fieldLabel}>Style Theme</Text>
          <View style={styles.genderRow}>
            {[
              { key: 'male', label: 'Gentleman · Dark', hex: malePalette.primary },
              { key: 'female', label: 'Lady · Rose Gold', hex: femalePalette.primary },
            ].map((g) => {
              const active = gender === g.key;
              return (
                <TouchableOpacity
                  key={g.key}
                  activeOpacity={0.85}
                  onPress={() => pickGender(g.key)}
                  style={[
                    styles.genderPill,
                    { borderColor: active ? g.hex : '#333', backgroundColor: active ? '#0d0d0d' : '#111' },
                  ]}
                >
                  <View style={[styles.genderDot, { backgroundColor: g.hex }]} />
                  <Text style={[styles.genderLabel, active && { color: '#fff' }]}>{g.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.toggleCard}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="notifications" size={18} color={colors.text} style={{ marginRight: 12 }} />
              <Text style={styles.toggleLabel}>Appointment Reminders</Text>
            </View>
            <Switch
              trackColor={{ false: '#444', true: colors.primary }}
              thumbColor={remindersEnabled ? '#fff' : '#aaa'}
              ios_backgroundColor="#444"
              onValueChange={setRemindersEnabled}
              value={remindersEnabled}
            />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <MyButton title="Save Changes" bgColor={colors.primary} textColor={colors.textInverse} onPress={handleSave} loading={saving} />
        </View>
      </ScreenWrapper>
    </View>
  );
};

const Field = ({ icon, label, multiline, styles, ...props }) => (
  <View style={{ marginBottom: 10 }}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <View style={[styles.fieldRow, multiline && styles.fieldRowMulti]}>
      <Ionicons name={icon} size={14} color="#aaa" style={[styles.leadingIcon, multiline && { marginTop: 2 }]} />
      <TextInput
        style={[styles.fieldInput, multiline && { height: '100%', textAlignVertical: 'top' }]}
        placeholderTextColor="#8a8a8a"
        multiline={multiline}
        numberOfLines={multiline ? 3 : 1}
        {...props}
      />
    </View>
  </View>
);

export default PersonalDetailsScreen;

const makeStyles = (colors) => ({
  heroBlock: { alignItems: 'center', marginTop: 10, marginBottom: 15 },
  avatarWrap: { position: 'relative', marginBottom: 8 },
  avatar: {
    width: 76, height: 76, borderRadius: 50, backgroundColor: colors.accent,
    borderWidth: 1.5, borderColor: '#fff', justifyContent: 'center', alignItems: 'center',
  },
  avatarInitials: { color: '#000', fontSize: 26, fontWeight: '700' },
  cameraBadge: {
    position: 'absolute', bottom: 0, right: 0, backgroundColor: '#fff',
    width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center',
    borderWidth: 1.5, borderColor: '#000',
  },
  name: { color: colors.text, fontSize: 16, fontWeight: '700', marginBottom: 2 },
  tier: { color: colors.primary, fontSize: 10, fontWeight: '600', letterSpacing: 0.3 },

  fieldLabel: { color: colors.textMuted, fontSize: 12, fontWeight: '600', marginBottom: 8, paddingLeft: 2 },
  fieldRow: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surfaceAlt,
    borderColor: colors.inputBorder, borderWidth: 1, borderRadius: 10, height: 44, paddingHorizontal: 12,
  },
  fieldRowMulti: { height: 100, alignItems: 'flex-start', paddingTop: 12 },
  leadingIcon: { marginRight: 10 },
  fieldInput: { flex: 1, color: colors.text, fontSize: 12, fontWeight: '500', padding: 0 },

  toggleCard: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: colors.surfaceAlt, borderRadius: 10, height: 52, paddingHorizontal: 14,
    marginTop: 10, marginBottom: 15,
  },
  toggleLabel: { color: colors.text, fontSize: 12, fontWeight: '600' },

  footer: { position: 'absolute', bottom: 30, left: 0, right: 0, paddingHorizontal: 20 },
  genderRow: { flexDirection: 'row', gap: 10, marginTop: 4, marginBottom: 10 },
  genderPill: {
    flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8,
    borderWidth: 1.5, borderRadius: 10, paddingHorizontal: 12, height: 44,
  },
  genderDot: { width: 12, height: 12, borderRadius: 6 },
  genderLabel: { color: colors.textMuted, fontSize: 12, fontWeight: '600' },
});
