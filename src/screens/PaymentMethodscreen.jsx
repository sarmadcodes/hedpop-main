import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

// Custom Global Core Framework Components
import ScreenWrapper from '../components/ScreenWrapper';
import BackBar from '../components/BackBar';
import MyButton from '../components/MyButton';
import { PAYMENT_METHODS } from '../data/user';

const { width } = Dimensions.get('window');

const PaymentMethodScreen = () => {
  const [selectedMethodId, setSelectedMethodId] = useState(null);
  const [activeCard, setActiveCard] = useState(null);

  const secondaryMethods = PAYMENT_METHODS;

  // BUTTON LOGIC
  const handleAddCard = () => {

    // IF NOTHING SELECTED
    if (!selectedMethodId) {
      Alert.alert('Select Method', 'Please select a payment method first.');
      return;
    }

    // FIND SELECTED METHOD
    const selectedMethod = secondaryMethods.find(
      item => item.id === selectedMethodId
    );

    // SET TOP CARD
    setActiveCard(selectedMethod);

    Alert.alert(
      'Payment Method Added',
      `${selectedMethod.title} has been activated successfully.`
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <ScreenWrapper
        imageSource={require('../assets/bookbg2.png')}
        backgroundColor="#000"
      >

        <BackBar title="Payment Method" />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollLayoutContent}
        >

          {/* TOP CARD */}
          <View style={styles.primaryActiveCardContainer}>

            {activeCard ? (
              <>
                <View style={styles.cardHeaderFlexRow}>
                  <View>
                    <Text style={styles.primaryCardTitleText}>
                      {activeCard.title}
                    </Text>

                    <Text style={styles.primaryCardMaskedPanText}>
                      {activeCard.cardNumber}
                    </Text>
                  </View>

                  <View style={styles.goldCheckmarkBadgeOuterCircle}>
                    <Ionicons
                      name="checkmark"
                      size={14}
                      color="#000"
                    />
                  </View>
                </View>

                <View style={styles.cardFooterFlexRow}>
                  <View>
                    <Text style={styles.primaryCardExpiryLabel}>
                      Expires
                    </Text>

                    <Text style={styles.primaryCardExpiryValue}>
                      {activeCard.expiry}
                    </Text>
                  </View>

                  <View style={styles.mastercardLogoVectorSimulationGroup}>
                    <View
                      style={[
                        styles.brandCircleUnit,
                        {
                          backgroundColor: '#EB001B',
                          marginRight: -8,
                        },
                      ]}
                    />

                    <View
                      style={[
                        styles.brandCircleUnit,
                        {
                          backgroundColor: '#F59E0B',
                          opacity: 0.9,
                        },
                      ]}
                    />
                  </View>
                </View>
              </>
            ) : (
              <View style={styles.emptyCardContainer}>
                <Ionicons
                  name="card-outline"
                  size={42}
                  color="#777"
                />

                <Text style={styles.emptyCardText}>
                  No payment method selected
                </Text>
              </View>
            )}

          </View>

          <Text style={styles.sectionDividerTitleHeaderText}>
            Add New Method
          </Text>

          <View style={styles.methodsListVerticalStackGroup}>

            {secondaryMethods.map((method) => {

              const isCurrentActiveTarget =
                selectedMethodId === method.id;

              return (
                <TouchableOpacity
                  key={method.id}
                  style={[
                    styles.methodSelectionPressableRowCard,
                    isCurrentActiveTarget &&
                    styles.methodSelectionPressableRowCardSelected,
                  ]}
                  activeOpacity={0.75}
                  onPress={() => setSelectedMethodId(method.id)}
                >

                  <View style={styles.methodCardLeftLayoutContentBlock}>

                    <View style={styles.brandedIconOuterFrameSquareBox}>
                      <Ionicons
                        name={method.iconName}
                        size={20}
                        color={method.iconColor}
                      />
                    </View>

                    <View style={styles.methodCardLabelsTextColumn}>
                      <Text style={styles.methodCardLabelTitleText}>
                        {method.title}
                      </Text>

                      <Text style={styles.methodCardLabelSubtitleMaskText}>
                        {method.subtitle}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.selectionStateRadioOuterRing}>
                    {isCurrentActiveTarget && (
                      <View style={styles.selectionStateRadioInnerDotActive} />
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.inScrollInlineButtonSpacerContainer}>
            <MyButton
              title="Add new card"
              bgColor="#F1BA0D"
              textColor="#000"
              onPress={handleAddCard}
            />
          </View>

        </ScrollView>
      </ScreenWrapper>
    </View>
  );
};

export default PaymentMethodScreen;

const styles = StyleSheet.create({

  scrollLayoutContent: {
    paddingBottom: 30,
    marginTop: 5,
  },

  primaryActiveCardContainer: {
    backgroundColor: '#222225',
    borderRadius: 12,
    padding: 20,
    height: 160,
    justifyContent: 'space-between',
    marginVertical: 15,
  },

  emptyCardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyCardText: {
    color: '#777',
    marginTop: 10,
    fontSize: 13,
  },

  cardHeaderFlexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  primaryCardTitleText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '500',
    opacity: 0.9,
    marginBottom: 4,
  },

  primaryCardMaskedPanText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  goldCheckmarkBadgeOuterCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#F1BA0D',
    justifyContent: 'center',
    alignItems: 'center',
  },

  cardFooterFlexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  primaryCardExpiryLabel: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '500',
    opacity: 0.6,
    marginBottom: 2,
  },

  primaryCardExpiryValue: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },

  mastercardLogoVectorSimulationGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  brandCircleUnit: {
    width: 18,
    height: 18,
    borderRadius: 9,
  },

  sectionDividerTitleHeaderText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'serif',
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 16,
    paddingLeft: 2,
  },

  methodsListVerticalStackGroup: {
    flexDirection: 'column',
    gap: 10,
  },

  methodSelectionPressableRowCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    borderRadius: 10,
    height: 60,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: 'transparent',
  },

  methodSelectionPressableRowCardSelected: {
    borderColor: '#F1BA0D',
  },

  methodCardLeftLayoutContentBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  brandedIconOuterFrameSquareBox: {
    width: 40,
    height: 28,
    backgroundColor: '#fff',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  methodCardLabelsTextColumn: {
    justifyContent: 'center',
  },

  methodCardLabelTitleText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },

  methodCardLabelSubtitleMaskText: {
    color: '#ffffff5e',
    fontSize: 10,
    fontWeight: '500',
  },

  selectionStateRadioOuterRing: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  selectionStateRadioInnerDotActive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F1BA0D',
  },

  inScrollInlineButtonSpacerContainer: {
    marginTop: 25,
    marginBottom: 10,
    width: '100%',
  },
});