import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

// Custom Global Core Framework Components
import ScreenWrapper from '../components/ScreenWrapper';
import BackBar from '../components/BackBar';
import { LoadingState, ErrorState, EmptyState } from '../components/LoadingState';
import userService from '../services/userService';
import { useApi } from '../hooks/useApi';
import { useTheme, useThemedStyles } from '../theme';

const { width } = Dimensions.get('window');

const adapt = (p) => ({
  id: p.id || p._id,
  title: p.title,
  description: p.description,
  code: p.code,
  expiry: p.expiry ? `Expires: ${new Date(p.expiry).toLocaleDateString()}` : '',
  image: require('../assets/searchbg.png'),
});

const Promotionscreen = () => {
  const { data, loading, error, refetch } = useApi(
    async () => {
      const list = await userService.promotions();
      return Array.isArray(list) ? list.map(adapt) : [];
    },
    [],
  );
  const activeRewards = data || [];

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <ScreenWrapper
        imageSource={require('../assets/bookbg2.png')} // Utilizing consistent premium background texture
        backgroundColor="#000"
      >
        {/* Navigation Core Header - Notification icon ignored per layout criteria */}
        <BackBar title="Offers & Promotion" />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollLayoutContent}
        >
          {/* HERO FEATURED MAIN HIGHLIGHT PANEL */}
          <View style={styles.heroFeaturedSection}>
            <View style={styles.featuredBadgeCapsule}>
              <Text style={styles.featuredBadgeText}>FEATURED</Text>
            </View>
            <Text style={styles.heroMainTitleText}>Summer Refresh</Text>
            <Text style={styles.heroSubTitleText}>15% Discount on all services</Text>
            
            <TouchableOpacity 
              style={styles.ghostClaimNowButton}
              activeOpacity={0.7}
              onPress={() => Alert.alert('Promotion Applied', '15% Summer Refresh discount code bound to your profile account.')}
            >
              <Text style={styles.ghostClaimNowButtonText}>Claim Now</Text>
            </TouchableOpacity>
          </View>

          {/* ACTIVE REWARDS TRACK SECTION HEADER */}
          <View style={styles.sectionHeaderFlexRowLine}>
            <Text style={styles.activeRewardsSectionTitle}>Active Rewards</Text>
            <Text style={styles.counterRightIndicatorText}>{activeRewards.length} Available</Text>
          </View>

          {loading && <LoadingState label="Loading offers…" />}
          {!loading && error && <ErrorState onRetry={refetch} />}
          {!loading && !error && activeRewards.length === 0 && (
            <EmptyState icon="pricetags-outline" title="No active offers" hint="Check back soon for new promotions." />
          )}

          {/* REWARDS CARD STACK ELEMENT VERTICAL LOOP */}
          <View style={styles.rewardsVerticalStackGroup}>
            {activeRewards.map((reward) => (
              <View key={reward.id} style={styles.rewardPromoCardBody}>
                {/* Upper Details Content Split Layout block */}
                <View style={styles.cardUpperSplitLayoutRow}>
                  <View style={styles.textDetailsLeftMainColumn}>
                    <Text style={styles.rewardCardTitleHeadingText}>{reward.title}</Text>
                    <View style={styles.expiryMetaFlexRowLine}>
                      <Ionicons name="calendar-outline" size={11} color={colors.primary} style={{ marginRight: 4 }} />
                      <Text style={styles.expiryMetaLabelDateText}>{reward.expiry}</Text>
                    </View>
                    <Text style={styles.rewardCardDescriptionBodyText}>{reward.description}</Text>
                  </View>
                  
                  {/* Right Thumbnail visual block frame */}
                  <Image source={reward.image} style={styles.rewardPromoThumbnailImageSquare} />
                </View>

                {/* Subtle Divider Line Separator Layout Section */}
                <View style={styles.cardHorizontalDividerHorizontalLine} />

                {/* Lower Action Row Panel Container Wrapper */}
                <View style={styles.cardLowerActionFlexRowLine}>
                  <View style={styles.promoCouponCodeLeftComboBlock}>
                    <View style={styles.couponTagMiniIconFrame}>
                      <Ionicons name="pricetag" size={9} color="#000" />
                    </View>
                    <Text style={styles.couponCodeTextLabel}>{reward.code}</Text>
                  </View>

                  <TouchableOpacity
                    style={styles.goldRedeemActionMiniCapsule}
                    activeOpacity={0.75}
                    onPress={() => Alert.alert('Redeem Secure Pipeline', `Activating digital token voucher matrix for ${reward.title}.`)}
                  >
                    <Text style={styles.goldRedeemActionMiniCapsuleText}>Redeem</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}

            {/* STAMPS LOYALTY STATUS COMPONENT FOOTER TRACKING CARD PANEL */}
            <View style={styles.loyaltyStatusSummaryCardPlate}>
              <View style={styles.loyaltyHeaderFlexRowLine}>
                <View>
                  <Text style={styles.loyaltyCardTitleHeadingText}>Loyalty Status</Text>
                  <Text style={styles.loyaltyCardSubtitleLabelText}>Silver Member Perks</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.stampsRatioHighlightValueText}>7/10</Text>
                  <Text style={styles.stampsLabelSubtitleText}>Stamps</Text>
                </View>
              </View>

              {/* Slider Progress Bar Matrix Line Layout Tracker system */}
              <View style={styles.progressTrackSliderOuterBacking}>
                <View style={[styles.progressTrackFilledActiveFill, { width: '70%' }]} />
              </View>
            </View>
          </View>

        </ScrollView>
      </ScreenWrapper>
    </View>
  );
};

export default Promotionscreen;

const makeStyles = (colors) => ({
  scrollLayoutContent: {
    paddingBottom: 40,
    marginTop: 5,
  },
  heroFeaturedSection: {
    marginTop: 10,
    marginBottom: 20,
  },
  featuredBadgeCapsule: {
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 50,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  featuredBadgeText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  heroMainTitleText: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 5,
  },
  heroSubTitleText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
    opacity: 0.9,
    marginBottom: 12,
  },
  ghostClaimNowButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
    alignSelf: 'flex-start',
    backgroundColor: '#000000de',
  },
  ghostClaimNowButtonText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  sectionHeaderFlexRowLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 2,
  },
  activeRewardsSectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  counterRightIndicatorText: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '600',
  },
  rewardsVerticalStackGroup: {
    flexDirection: 'column',
    gap: 14,
  },
  rewardPromoCardBody: {
    backgroundColor: '#222', 
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#444',
    padding: 14,
  },
  cardUpperSplitLayoutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  textDetailsLeftMainColumn: {
    flex: 1,
    paddingRight: 12,
  },
  rewardCardTitleHeadingText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  expiryMetaFlexRowLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  expiryMetaLabelDateText: {
    color: '#ffffff8a',
    fontSize: 10,
    fontWeight: '500',
  },
  rewardCardDescriptionBodyText: {
    color: '#ffffffbe',
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '400',
  },
  rewardPromoThumbnailImageSquare: {
    width: 72,
    height: 72,
    borderRadius: 10,
    backgroundColor: '#333',
  },
  cardHorizontalDividerHorizontalLine: {
    height: 1,
    backgroundColor: '#444',
    marginVertical: 14,
  },
  cardLowerActionFlexRowLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  promoCouponCodeLeftComboBlock: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  couponTagMiniIconFrame: {
    width: 16,
    height: 16,
    borderRadius: 4,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  couponCodeTextLabel: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  goldRedeemActionMiniCapsule: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderRadius: 12,
  },
  goldRedeemActionMiniCapsuleText: {
    color: '#000',
    fontSize: 10,
    fontWeight: '700',
  },
  loyaltyStatusSummaryCardPlate: {
    backgroundColor: '#222225',
    borderRadius: 12,
    padding: 18,
    marginTop: 4,
  },
  loyaltyHeaderFlexRowLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  loyaltyCardTitleHeadingText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  loyaltyCardSubtitleLabelText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '500',
    opacity: 0.9,
  },
  stampsRatioHighlightValueText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  stampsLabelSubtitleText: {
    color: '#ffffff7a',
    fontSize: 10,
    fontWeight: '500',
  },
  progressTrackSliderOuterBacking: {
    height: 5,
    backgroundColor: '#ffffff15',
    borderRadius: 3,
    width: '100%',
    overflow: 'hidden',
  },
  progressTrackFilledActiveFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
});