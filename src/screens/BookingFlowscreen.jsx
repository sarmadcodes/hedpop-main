import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';

import ScreenWrapper from '../components/ScreenWrapper';
import MyButton from '../components/MyButton';
import BackBar from '../components/BackBar';
import { EmptyState } from '../components/LoadingState';
import { buildUpcomingDates, TIME_SLOTS } from '../data/bookings';
import bookingService from '../services/bookingService';
import { subscribeToSlots } from '../services/socket';
import { ROUTES } from '../constants/routes';
import { useTheme, useThemedStyles } from '../theme';

const STEPS = [
  { key: 1, label: 'Services' },
  { key: 2, label: 'Date & Time' },
  { key: 3, label: 'Confirm' },
];

const BookingFlowScreen = () => {
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);
  const route = useRoute();
  const navigation = useNavigation();
  const salon = route.params?.salon || {};
  const preselectServiceId = route.params?.preselectServiceId || null;
  const services = salon.services || [];

  const calendarDates = useMemo(() => buildUpcomingDates(10), []);

  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(
    () => services.find((s) => String(s._id) === String(preselectServiceId)) || null,
  );
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [takenSlots, setTakenSlots] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  // Whenever the user picks a date, fetch the slots already booked for it,
  // then subscribe to live socket updates so new bookings dim the slot in real time.
  useEffect(() => {
    if (!selectedDate || !salon._id) return;
    const dateLabel = `${selectedDate.day}, ${selectedDate.date} ${selectedDate.month} ${selectedDate.year}`;
    let cancelled = false;

    bookingService.taken(salon._id, dateLabel)
      .then((list) => { if (!cancelled) setTakenSlots(list || []); })
      .catch(() => { if (!cancelled) setTakenSlots([]); });

    const unsubscribe = subscribeToSlots(salon._id, dateLabel, {
      onCreated: (evt) => {
        setTakenSlots((prev) => (prev.includes(evt.time) ? prev : [...prev, evt.time]));
        // If the slot the user has selected just got taken by someone else, clear it.
        setSelectedTime((cur) => (cur === evt.time ? null : cur));
      },
      onCancelled: (evt) => {
        // Someone freed up a slot — open it back up in the picker.
        setTakenSlots((prev) => prev.filter((t) => t !== evt.time));
      },
    });

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, [selectedDate, salon._id]);

  const next = () => {
    if (step === 1) {
      if (!selectedService) return Alert.alert('Pick a service', 'Please select a service to continue.');
      setStep(2);
    } else if (step === 2) {
      if (!selectedDate || !selectedTime) return Alert.alert('Pick date & time', 'Please choose both a date and a time slot.');
      setStep(3);
    }
  };

  const prev = () => {
    if (step === 1) navigation.goBack();
    else setStep((s) => s - 1);
  };

  const confirm = async () => {
    if (submitting) return;
    setSubmitting(true);
    const dateLabel = `${selectedDate.day}, ${selectedDate.date} ${selectedDate.month} ${selectedDate.year}`;
    try {
      const booking = await bookingService.create({
        salon: salon._id || salon.id,
        serviceId: String(selectedService._id),
        serviceName: selectedService.name,
        duration: selectedService.duration,
        price: selectedService.price,
        date: dateLabel,
        time: selectedTime,
      });
      navigation.replace(ROUTES.BOOKING_SUCCESS, {
        booking,
        salonTitle: salon.title,
      });
    } catch (err) {
      Alert.alert('Booking failed', err?.message || 'Could not create your booking. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScreenWrapper imageSource={require('../assets/bookbg2.png')} backgroundColor={colors.background}>
        <BackBar title="Book Appointment" />

        <View style={styles.stepperRow}>
          {STEPS.map((s) => {
            const active = step >= s.key;
            return (
              <View key={s.key} style={styles.stepUnit}>
                <Text style={[styles.stepLabel, active && styles.stepLabelActive]}>{s.label}</Text>
                <View style={[styles.stepBar, active && styles.stepBarActive]} />
              </View>
            );
          })}
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 140 }}>
          {step === 1 && (
            <View>
              <Text style={styles.heading}>Select Service</Text>
              {services.length === 0 ? (
                <EmptyState icon="cut-outline" title="No services available" />
              ) : (
                services.map((item) => {
                  const isSelected = String(selectedService?._id) === String(item._id);
                  return (
                    <TouchableOpacity
                      key={item._id}
                      activeOpacity={0.8}
                      onPress={() => setSelectedService(isSelected ? null : item)}
                      style={[styles.serviceCard, isSelected && styles.serviceCardSelected]}
                    >
                      <View style={{ flex: 1, paddingRight: 12 }}>
                        <Text style={styles.serviceTitle}>{item.name}</Text>
                        <Text style={styles.serviceSub}>{item.duration} • {item.desc}</Text>
                      </View>
                      <View style={styles.serviceRight}>
                        <Text style={styles.servicePrice}>£{item.price}</Text>
                        <View style={[styles.bookPill, isSelected && styles.bookPillSelected]}>
                          {isSelected
                            ? <Ionicons name="checkmark-circle" size={18} color="#000" />
                            : <Text style={styles.bookPillText}>Pick</Text>}
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })
              )}
            </View>
          )}

          {step === 2 && (
            <View>
              <Text style={styles.heading}>Pick a Date</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 5 }}>
                {calendarDates.map((d) => {
                  const active = selectedDate?.id === d.id;
                  return (
                    <TouchableOpacity
                      key={d.id}
                      activeOpacity={0.7}
                      onPress={() => setSelectedDate(d)}
                      style={[styles.dateBox, active && styles.dateBoxActive]}
                    >
                      <Text style={[styles.dateDay, active && styles.dateActive]}>{d.day}</Text>
                      <Text style={[styles.dateNum, active && styles.dateActive]}>{d.date}</Text>
                      <Text style={[styles.dateMonth, active && styles.dateActive]}>{d.month.slice(0, 3)}</Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              <View style={styles.timeHeader}>
                <Text style={styles.heading}>Pick a Time</Text>
                {takenSlots.length > 0 && (
                  <View style={styles.legendRow}>
                    <View style={styles.legendDot} />
                    <Text style={styles.legendText}>Taken</Text>
                  </View>
                )}
              </View>
              <View style={styles.timeGrid}>
                {TIME_SLOTS.map((t) => {
                  const active = selectedTime === t;
                  const taken = takenSlots.includes(t);
                  return (
                    <TouchableOpacity
                      key={t}
                      activeOpacity={taken ? 1 : 0.7}
                      disabled={taken}
                      onPress={() => !taken && setSelectedTime(t)}
                      style={[
                        styles.timeChip,
                        active && styles.timeChipActive,
                        taken && styles.timeChipTaken,
                      ]}
                    >
                      <Text
                        style={[
                          styles.timeChipText,
                          active && styles.timeChipTextActive,
                          taken && styles.timeChipTextTaken,
                        ]}
                      >
                        {t}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}

          {step === 3 && (
            <View>
              <View style={styles.receipt}>
                <Text style={styles.receiptHeading}>Booking Summary</Text>
                <Row styles={styles} colors={colors} label="Business" value={salon.title} />
                <Row styles={styles} colors={colors} label="Service" value={selectedService?.name} />
                <Row styles={styles} colors={colors} label="Date" value={selectedDate ? `${selectedDate.day}, ${selectedDate.date} ${selectedDate.month}` : '—'} />
                <Row styles={styles} colors={colors} label="Time" value={selectedTime || '—'} />
                <Row styles={styles} colors={colors} label="Duration" value={selectedService?.duration} />
                <View style={styles.divider} />
                <Row styles={styles} colors={colors} label="Total" value={`£${selectedService?.price || 0}`} bold />
              </View>

              <View style={styles.stripeCard}>
                <View style={styles.stripeIcon}>
                  <Ionicons name="card" size={17} color="#000" />
                </View>
                <View style={{ marginLeft: 12, flex: 1 }}>
                  <Text style={styles.stripeTitle}>Pay Securely with Stripe</Text>
                  <Text style={styles.stripeSub}>256-bit SSL encrypted payment</Text>
                </View>
              </View>

              <View style={styles.policy}>
                <Text style={styles.policyText}>
                  <Text style={{ fontWeight: '700', color: colors.text }}>Cancellation policy: </Text>
                  Free cancellation up to 4 hours before your appointment. Late cancellations are non-refundable.
                </Text>
              </View>
            </View>
          )}
        </ScrollView>

        <View style={styles.footer}>
          {step === 1 && (
            <MyButton title="Continue" bgColor={colors.primary} textColor={colors.textInverse} onPress={next} />
          )}
          {step === 2 && (
            <View style={styles.footerRow}>
              <TouchableOpacity style={styles.backBtn} activeOpacity={0.7} onPress={prev}>
                <Text style={styles.backBtnText}>Back</Text>
              </TouchableOpacity>
              <View style={{ width: '60%' }}>
                <MyButton title="Continue" bgColor={colors.primary} textColor={colors.textInverse} onPress={next} />
              </View>
            </View>
          )}
          {step === 3 && (
            <View style={styles.footerRow}>
              <TouchableOpacity style={styles.backBtn} activeOpacity={0.7} onPress={prev}>
                <Text style={styles.backBtnText}>Back</Text>
              </TouchableOpacity>
              <View style={{ width: '60%' }}>
                <MyButton
                  title={`Pay £${selectedService?.price || 0}`}
                  bgColor={colors.primary}
                  textColor={colors.textInverse}
                  onPress={confirm}
                  loading={submitting}
                />
              </View>
            </View>
          )}
        </View>
      </ScreenWrapper>
    </View>
  );
};

const Row = ({ label, value, bold, styles, colors }) => (
  <View style={styles.receiptRow}>
    <Text style={[styles.receiptLabel, bold && { color: colors.text, fontSize: 16, fontWeight: '600' }]}>{label}</Text>
    <Text style={[styles.receiptValue, bold && { color: colors.primary, fontSize: 16, fontWeight: '700' }]}>{value}</Text>
  </View>
);

export default BookingFlowScreen;

const makeStyles = (colors) => ({
  stepperRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 24 },
  stepUnit: { width: '30%' },
  stepLabel: { color: colors.textMuted, fontSize: 11, fontWeight: '600', marginBottom: 6 },
  stepLabelActive: { color: colors.text },
  stepBar: { height: 4, backgroundColor: colors.border, borderRadius: 50 },
  stepBarActive: { backgroundColor: colors.primary },

  heading: { color: colors.text, fontSize: 16, fontWeight: '600', marginBottom: 12 },

  serviceCard: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: colors.surfaceTranslucent, borderRadius: 10, padding: 12, marginBottom: 10,
    borderWidth: 1, borderColor: colors.border,
  },
  serviceCardSelected: { borderColor: colors.primary, backgroundColor: colors.surfaceAlt },
  serviceTitle: { color: colors.text, fontSize: 15, fontWeight: '600', marginBottom: 4 },
  serviceSub: { color: colors.textMuted, fontSize: 10, lineHeight: 14 },
  serviceRight: { flexDirection: 'row', alignItems: 'center' },
  servicePrice: { color: colors.text, fontSize: 16, fontWeight: '600', marginRight: 12 },
  bookPill: {
    backgroundColor: colors.accent, paddingHorizontal: 14, paddingVertical: 6,
    borderRadius: 50, alignItems: 'center', justifyContent: 'center', minWidth: 50,
  },
  bookPillSelected: { paddingHorizontal: 8 },
  bookPillText: { color: '#000', fontSize: 12, fontWeight: '700' },

  dateBox: {
    width: 80, height: 80, backgroundColor: colors.surfaceTranslucent, borderRadius: 10,
    borderWidth: 1, borderColor: colors.border, justifyContent: 'center', alignItems: 'center', marginRight: 10,
  },
  dateBoxActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  dateDay: { color: colors.textMuted, fontSize: 10, fontWeight: '500', marginBottom: 2 },
  dateNum: { color: colors.text, fontSize: 20, fontWeight: '600' },
  dateMonth: { color: colors.textMuted, fontSize: 10, fontWeight: '500' },
  dateActive: { color: '#000', fontWeight: '700' },

  timeHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  legendRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12 },
  legendDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#333' },
  legendText: { color: colors.textMuted, fontSize: 10 },
  timeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  timeChip: {
    width: '22%', height: 35, backgroundColor: colors.surfaceTranslucent, borderRadius: 10,
    borderWidth: 1, borderColor: colors.border, justifyContent: 'center', alignItems: 'center',
  },
  timeChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  timeChipTaken: { backgroundColor: colors.surfaceAlt, borderColor: colors.borderFaint, opacity: 0.5 },
  timeChipText: { color: colors.text, fontSize: 12, fontWeight: '600' },
  timeChipTextActive: { color: '#000', fontWeight: '700' },
  timeChipTextTaken: { color: colors.textFaint, textDecorationLine: 'line-through' },

  receipt: {
    backgroundColor: colors.surfaceTranslucent, borderRadius: 10, borderWidth: 1,
    borderColor: colors.border, padding: 15, marginBottom: 15,
  },
  receiptHeading: { color: colors.text, fontSize: 16, fontWeight: '600', marginBottom: 15 },
  receiptRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  receiptLabel: { color: colors.textMuted, fontSize: 13, fontWeight: '500' },
  receiptValue: { color: colors.text, fontSize: 13, fontWeight: '500' },
  divider: { height: 1, backgroundColor: colors.borderFaint, marginVertical: 8 },

  stripeCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surfaceAlt, borderRadius: 10, padding: 15, marginBottom: 15 },
  stripeIcon: { width: 30, height: 28, backgroundColor: colors.primary, borderRadius: 4, justifyContent: 'center', alignItems: 'center' },
  stripeTitle: { color: colors.text, fontSize: 14, fontWeight: '600' },
  stripeSub: { color: colors.textMuted, fontSize: 10, marginTop: 2 },

  policy: { backgroundColor: colors.surfaceAlt, borderRadius: 10, padding: 15 },
  policyText: { color: colors.border, fontSize: 11, lineHeight: 15 },

  footer: { position: 'absolute', bottom: 30, left: 0, right: 0, paddingHorizontal: 20 },
  footerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  backBtn: {
    width: '36%', height: 48, borderRadius: 10, borderWidth: 1, borderColor: colors.border,
    justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent',
  },
  backBtnText: { color: colors.text, fontSize: 14, fontWeight: '600' },
});
