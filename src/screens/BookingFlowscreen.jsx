import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Alert,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';

// Custom Global Core Framework Components
import ScreenWrapper from '../components/ScreenWrapper';
import MyButton from '../components/MyButton';
import BackBar from '../components/BackBar';

const { width } = Dimensions.get('window');

const BookingFlowScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  // Extract contextual payload from parent card route state
  const { salonData = {} } = route.params || {};
  const businessName = salonData?.title || "The Gentleman's Cut";

  // Global Workflow State Machineries
  const [currentStep, setCurrentStep] = useState(1); // Steps: 1 = Services, 2 = Date/Time, 3 = Confirm
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null); // format: { id: string, day: string, date: string, month: string }
  const [selectedTime, setSelectedTime] = useState(null); // format: string (e.g. "11:30")

  // Hardcoded UI Static Mock Databases matching mock images precisely
  const staticServices = [
    {
      id: '1',
      name: 'Classic Haircut',
      price: 25,
      duration: '30 Mins',
      desc: 'Traditional cut with hot towel finish',
    },
    {
      id: '2',
      name: 'Skin fade',
      price: 45,
      duration: '40 Mins',
      desc: 'Traditional cut with hot towel finish',
    },
    {
      id: '3',
      name: 'Beard Trim',
      price: 20,
      duration: '30 Mins',
      desc: 'Traditional cut with hot towel finish',
    },
    {
      id: '4',
      name: 'Hot Towel Shave',
      price: 25,
      duration: '30 Mins',
      desc: 'Traditional cut with hot towel finish',
    },
  ];

  const calendarDates = [
    { id: '1', day: 'Fri', date: '20', month: 'March' },
    { id: '2', day: 'Sat', date: '21', month: 'March' },
    { id: '3', day: 'Sun', date: '22', month: 'March' },
    { id: '4', day: 'Mon', date: '23', month: 'March' },
  ];

  const timeSlots = [
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:50',
    '14:00',
    '14:50',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
  ];

  // Global Core Navigation State Validation Handlers
  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!selectedService) {
        Alert.alert(
          'Required Action',
          'Please select a service item before moving to the next stage.',
        );
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!selectedDate || !selectedTime) {
        Alert.alert(
          'Required Action',
          'Please pick both an explicit date and time slot to proceed.',
        );
        return;
      }
      setCurrentStep(3);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep === 1) {
      navigation.goBack();
    } else {
      setCurrentStep(prev => prev - 1);
    }
  };

  // State Action Toggle Mutator: Toggles selection, prevents multi-service locking
  const handleServiceSelection = service => {
    if (selectedService?.id === service.id) {
      setSelectedService(null); // Deselects
    } else {
      setSelectedService(service); // Overwrites completely, enforcing a maximum selection of 1
    }
  };

  // Header Background Imagery Array selector depending on current page context index
  const getHeaderImage = () => {
    if (currentStep === 2) return require('../assets/bookbg2.png'); // Step 2 Asset
    return require('../assets/searchbg.png'); // Fallback/Step 1/Step 3 Assets
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <ScreenWrapper
        imageSource={require('../assets/bookbg2.png')}
        backgroundColor="#000"
      >

        <BackBar title="Book Appointment" />

        {/* Stepper Progress Visualizer Engine Indicator Bar */}
        <View style={styles.progressStepperTrack}>
          <View style={styles.stepUnit}>
            <Text
              style={[
                styles.stepLabelText,
                currentStep >= 1 && styles.stepLabelTextActive,
              ]}
            >
              Services
            </Text>
            <View
              style={[
                styles.stepBarIndicator,
                currentStep >= 1 && styles.stepBarIndicatorActive,
              ]}
            />
          </View>
          <View style={styles.stepUnit}>
            <Text
              style={[
                styles.stepLabelText,
                currentStep >= 2 && styles.stepLabelTextActive,
              ]}
            >
              Date & Time
            </Text>
            <View
              style={[
                styles.stepBarIndicator,
                currentStep >= 2 && styles.stepBarIndicatorActive,
              ]}
            />
          </View>
          <View style={styles.stepUnit}>
            <Text
              style={[
                styles.stepLabelText,
                currentStep >= 3 && styles.stepLabelTextActive,
              ]}
            >
              Confirm
            </Text>
            <View
              style={[
                styles.stepBarIndicator,
                currentStep >= 3 && styles.stepBarIndicatorActive,
              ]}
            />
          </View>
        </View>

          {/* STEP 1: SERVICE SELECT RENDERING */}
          {currentStep === 1 && (
            <View style={styles.innerLayoutWrapper}>
              <Text style={styles.componentLayoutHeading}>Select Services</Text>
              {staticServices.map(item => {
                const isSelected = selectedService?.id === item.id;
                return (
                  <View
                    key={item.id}
                    style={[
                      styles.cardItemRow,
                      isSelected && styles.cardItemRowSelected,
                    ]}
                  >
                    <View style={styles.cardLeftContent}>
                      <Text style={styles.cardItemTitleText}>{item.name}</Text>
                      <Text style={styles.cardItemSubText}>
                        {item.duration} . {item.desc}
                      </Text>
                    </View>
                    <View style={styles.cardRightContent}>
                      <Text style={styles.cardPriceText}>£{item.price}</Text>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        style={[
                          styles.actionInteractiveBtn,
                          isSelected && styles.actionInteractiveBtnSelected,
                        ]}
                        onPress={() => handleServiceSelection(item)}
                      >
                        {isSelected ? (
                          <Ionicons
                            name="checkmark-circle"
                            size={18}
                            color="#000"
                          />
                        ) : (
                          <Text style={styles.actionBtnText}>Book</Text>
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </View>
          )}

          {/* STEP 2: DATE AND TIME SELECTION RENDERING */}
          {currentStep === 2 && (
            <View style={styles.innerLayoutWrapper}>
              <Text style={styles.componentLayoutHeading}>Pick a Date</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalCalendarScroll}
              >
                {calendarDates.map(dateItem => {
                  const isDateSelected = selectedDate?.id === dateItem.id;
                  return (
                    <TouchableOpacity
                      key={dateItem.id}
                      activeOpacity={0.66}
                      style={[
                        styles.datePickerSquareBox,
                        isDateSelected && styles.datePickerSquareBoxActive,
                      ]}
                      onPress={() => setSelectedDate(dateItem)}
                    >
                      <Text
                        style={[
                          styles.dateDayLabel,
                          isDateSelected && styles.dateLabelActiveText,
                        ]}
                      >
                        {dateItem.day}
                      </Text>
                      <Text
                        style={[
                          styles.dateNumericText,
                          isDateSelected && styles.dateLabelActiveText,
                        ]}
                      >
                        {dateItem.date}
                      </Text>
                      <Text
                        style={[
                          styles.dateMonthLabel,
                          isDateSelected && styles.dateLabelActiveText,
                        ]}
                      >
                        {dateItem.month}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              <Text style={[styles.componentLayoutHeading, { marginTop: 20 }]}>
                Pick a Time
              </Text>
              <View style={styles.timeSlotsGridWrapLayout}>
                {timeSlots.map((timeString, idx) => {
                  const isTimeSelected = selectedTime === timeString;
                  return (
                    <TouchableOpacity
                      key={idx}
                      activeOpacity={0.7}
                      style={[
                        styles.timeChipUnitButton,
                        isTimeSelected && styles.timeChipUnitButtonActive,
                      ]}
                      onPress={() => setSelectedTime(timeString)}
                    >
                      <Text
                        style={[
                          styles.timeChipText,
                          isTimeSelected && styles.timeChipTextActive,
                        ]}
                      >
                        {timeString}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}

          {/* STEP 3: CONFIRM FINAL AUDIT APPOINTMENT OVERVIEW RENDERING */}
          {currentStep === 3 && (
            <View style={styles.innerLayoutWrapper}>
              <View style={styles.receiptContainerOuterCard}>
                <Text style={styles.receiptMainHeading}>
                  Booking Appointment
                </Text>

                <View style={styles.receiptLineItemRow}>
                  <Text style={styles.receiptFieldLabel}>Business</Text>
                  <Text style={styles.receiptFieldValueText}>
                    {businessName}
                  </Text>
                </View>

                <View style={styles.receiptLineItemRow}>
                  <Text style={styles.receiptFieldLabel}>Service</Text>
                  <Text style={styles.receiptFieldValueText}>
                    {selectedService?.name}
                  </Text>
                </View>

                <View style={styles.receiptLineItemRow}>
                  <Text style={styles.receiptFieldLabel}>Date</Text>
                  <Text style={styles.receiptFieldValueText}>
                    {selectedDate
                      ? `Tuesday, ${selectedDate.date} ${selectedDate.month} 2026`
                      : ''}
                  </Text>
                </View>

                <View style={styles.receiptLineItemRow}>
                  <Text style={styles.receiptFieldLabel}>Time</Text>
                  <Text style={styles.receiptFieldValueText}>
                    {selectedTime}
                  </Text>
                </View>

                <View style={styles.receiptLineItemRow}>
                  <Text style={styles.receiptFieldLabel}>Duration</Text>
                  <Text style={styles.receiptFieldValueText}>
                    {selectedService?.duration}
                  </Text>
                </View>

                <View style={styles.horizontalDividerSplitLine} />

                <View style={styles.receiptLineItemRow}>
                  <Text style={styles.totalLabelAccentText}>Total</Text>
                  <Text style={styles.totalPriceAccentValueText}>
                    £{selectedService?.price}
                  </Text>
                </View>
              </View>

              {/* Stripe Payment Method Visual Element */}
              <View style={styles.stripeInfoVisualCardContainer}>
                <View style={styles.stripeIconBoxMock}>
                  <Ionicons name="card" size={17} color="#000" />
                </View>
                <View style={{ marginLeft: 12 }}>
                  <Text style={styles.stripeMainTitle}>
                    Pay Securely with Stripe
                  </Text>
                  <Text style={styles.stripeSubTitle}>
                    256-bit SSL encrypted payment
                  </Text>
                </View>
              </View>

              {/* Legal/Operations Policy Card */}
              <View style={styles.policyNoticeBoxContainer}>
                <Text style={styles.policyBodyParagraphText}>
                  <Text style={{ fontWeight: '700', color: '#fff' }}>
                    Cancellation policy:{' '}
                  </Text>
                  Free cancellation up to 4 hours before your appointment. Late
                  cancellations are non-refundable. If the business cancels,
                  you'll receive a full refund.
                </Text>
              </View>
            </View>
          )}



        {/* GLOBAL DYNAMIC STICKY FOOTER NAVIGATION BUTTON CONTROLLER */}
        <View style={styles.globalActionFooterFixedTray}>
          {currentStep === 1 && (
            <MyButton
              title="Continue"
              bgColor="#F1BA0D"
              textColor="#000"
              onPress={handleNextStep}
            />
          )}

          {currentStep === 2 && (
            <View style={styles.dualSplitActionContainerRow}>
              <TouchableOpacity
                style={styles.splitOutlineBtnNative}
                activeOpacity={0.7}
                onPress={handlePreviousStep}
              >
                <Text style={styles.splitOutlineBtnNativeText}>Back</Text>
              </TouchableOpacity>
              <View style={{ width: '60%' }}>
                <MyButton
                  title="Continue"
                  bgColor="#F1BA0D"
                  textColor="#000"
                  onPress={handleNextStep}
                />
              </View>
            </View>
          )}

          {currentStep === 3 && (
            <View style={styles.dualSplitActionContainerRow}>
              <TouchableOpacity
                style={styles.splitOutlineBtnNative}
                activeOpacity={0.7}
                onPress={handlePreviousStep}
              >
                <Text style={styles.splitOutlineBtnNativeText}>Back</Text>
              </TouchableOpacity>
              <View style={{ width: '60%' }}>
                <MyButton
                  title={`Pay £${selectedService?.price || '0'}`}
                  bgColor="#F1BA0D"
                  textColor="#000"
                  onPress={() =>
                    Alert.alert(
                      'Success',
                      'Payment processed and booking secured!',
                    )
                  }
                />
              </View>
            </View>
          )}
        </View>
      </ScreenWrapper>
    </View>
  );
};

export default BookingFlowScreen;

const styles = StyleSheet.create({
//   topImageHeader: {
//     width: width,
//     height: 190,
//     justifyContent: 'space-between',
//     paddingBottom: 10,
//   },
//   headerBarTopContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingTop: 45,
//   },
//   circularBackButton: {
//     width: 36,
//     height: 36,
//     backgroundColor: '#fff',
//     borderRadius: 18,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   titleWrapperTextContainer: {
//     marginLeft: 16,
//   },
//   mainHeaderTitle: {
//     color: '#fff',
//     fontSize: 20,
//     fontWeight: '700',
//   },
//   mainHeaderSubtitle: {
//     color: '#ccc',
//     fontSize: 12,
//     marginTop: 2,
//   },


  progressStepperTrack: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 30,
  },
  stepUnit: {
    width: '30%',
  },
  stepLabelText: {
    color: '#ffffffde',
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 6,
    textAlign: 'left',
  },
  stepLabelTextActive: {
    color: '#fff',
  },
  stepBarIndicator: {
    height: 4,
    backgroundColor: '#ccc',
    borderRadius: 50,
  },
  stepBarIndicatorActive: {
    backgroundColor: '#F1BA0D',
  },
  
  innerLayoutWrapper: {
    width: '100%',
    marginTop: 10,
  },
  componentLayoutHeading: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  cardItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000000de',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  cardItemRowSelected: {
    borderColor: '#ccc',
    backgroundColor: '#111',
  },
  cardLeftContent: {
    flex: 1,
    paddingRight: 12,
  },
  cardItemTitleText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardItemSubText: {
    color: '#ffffffde',
    fontSize: 10,
    lineHeight: 14,
  },
  cardRightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardPriceText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 12,
  },
  actionInteractiveBtn: {
    backgroundColor: '#FFA77F',
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderRadius: 50,
    // minWidth: 65,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionInteractiveBtnSelected: {
    backgroundColor: '#FFA77F',
    paddingHorizontal: 7,
    paddingVertical: 7,
  },
  actionBtnText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '700',
  },
  horizontalCalendarScroll: {
    paddingBottom: 5,
  },
  datePickerSquareBox: {
    width: 80,
    height: 80,
    backgroundColor: '#000000de',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  datePickerSquareBoxActive: {
    backgroundColor: '#F1BA0D',
    borderColor: '#F1BA0D',
  },
  dateDayLabel: {
    color: '#ffffffde',
    fontSize: 10,
    fontWeight: '500',
    marginBottom: 2,
  },
  dateNumericText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 1,
  },
  dateMonthLabel: {
    color: '#ffffffde',
    fontSize: 10,
    fontWeight: '500',
  },
  dateLabelActiveText: {
    color: '#fff',
    fontWeight: '700',
  },
  timeSlotsGridWrapLayout: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: "2%",
  },
  timeChipUnitButton: {
    width: '23%',
    height: 35,
    backgroundColor: '#000',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#888',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  timeChipUnitButtonActive: {
    backgroundColor: '#F1BA0D',
    borderColor: '#F1BA0D',
  },
  timeChipText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  timeChipTextActive: {
    color: '#fff',
    fontWeight: '700',
  },
  receiptContainerOuterCard: {
    backgroundColor: '#000000de',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    marginBottom: 15,
  },
  receiptMainHeading: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
  },
  receiptLineItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  receiptFieldLabel: {
    color: '#ffffffde',
    fontSize: 13,
    fontWeight: '500',
  },
  receiptFieldValueText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '500',
  },
  horizontalDividerSplitLine: {
    height: 1,
    backgroundColor: '#333',
    marginVertical: 6,
    marginBottom: 12,
  },
  totalLabelAccentText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  totalPriceAccentValueText: {
    color: '#F1BA0D',
    fontSize: 16,
    fontWeight: '700',
  },
  stripeInfoVisualCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  stripeIconBoxMock: {
    width: 30,
    height: 28,
    backgroundColor: '#F1BA0D',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stripeMainTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  stripeSubTitle: {
    color: '#ffffffde',
    fontSize: 10,
    marginTop: 2,
  },
  policyNoticeBoxContainer: {
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 15,
  },
  policyBodyParagraphText: {
    color: '#ccc',
    fontSize: 11,
    lineHeight: 15,
  },
  globalActionFooterFixedTray: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingTop: 10,
    // paddingBottom: 30,
  },
  dualSplitActionContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  splitOutlineBtnNative: {
    width: '36%',
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  splitOutlineBtnNativeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
