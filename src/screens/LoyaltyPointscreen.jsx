import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

// Custom Global Core Framework Components
import ScreenWrapper from '../components/ScreenWrapper';
import BackBar from '../components/BackBar';

const { width } = Dimensions.get('window');

const LoyaltyPointsScreen = () => {
  // Hardcoded layout catalog matching image_f67dba.png specifications
  const availableRewards = [
    { id: '1', title: 'Signature Cut', points: '500 PTS', category: 'PREMIUM SERVICES' },
    { id: '2', title: 'Signature Cut', points: '500 PTS', category: 'PREMIUM SERVICES' },
    { id: '3', title: 'Signature Cut', points: '500 PTS', category: 'PREMIUM SERVICES' },
  ];

  const pointHistory = [
    { id: '1', action: 'Executive Haircut', date: 'Apr 09, 2026', type: 'Earned', amount: '+100Pts', isEarned: true },
    { id: '2', action: 'Premium Styling', date: 'Jan 11, 2026', type: 'Redeemed', amount: '+100Pts', isEarned: false },
    { id: '3', action: 'Corporate Shave', date: 'Jun 24, 2026', type: 'Earned', amount: '+200Pts', isEarned: true },
    { id: '4', action: 'Executive Haircut', date: 'Mar 30, 2026', type: 'Earned', amount: '+200Pts', isEarned: true },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <ScreenWrapper
        imageSource={require('../assets/bookbg2.png')} // Consistent luxury background asset pipeline
        backgroundColor="#000"
      >
        {/* Core Global Header Navigation - Notification icon ignored per layout criteria */}
        <BackBar title="Loyalty Points" />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollLayoutContent}
        >
          {/* TOTAL BALANCE STATUS DASHBOARD CONTAINER CARD */}
          <View style={styles.balanceSummaryMainCard}>
            <View style={styles.balanceHeaderFlexRow}>
              <View>
                <Text style={styles.balanceLabelText}>Total Balance</Text>
                <Text style={styles.pointsCounterHighlightValue}>7890 Points</Text>
              </View>
              <View style={styles.premiumTierBadgeCapsule}>
                <Text style={styles.premiumTierBadgeText}>Premium Member</Text>
              </View>
            </View>

            {/* Custom Progress Tracking Status Infrastructure */}
            <View style={styles.progressStatusWrapperIndicator}>
              <View style={styles.progressLabelFlexRowLine}>
                <Text style={styles.progressInlineLeftText}>250 points to diamond status</Text>
                <Text style={styles.progressInlineRightText}>80%</Text>
              </View>
              {/* Outer structural slider bar backing track layer */}
              <View style={styles.progressTrackSliderOuterBacking}>
                <View style={[styles.progressTrackFilledActiveFill, { width: '80%' }]} />
              </View>
            </View>
          </View>

          {/* AVAILABLE REWARDS HORIZONTAL CAROUSEL COMPONENT */}
          <Text style={styles.serifSectionTitleHeaderLabel}>Available Rewards</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalCarouselLayoutRow}
          >
            {availableRewards.map((reward) => (
              <View key={reward.id} style={styles.rewardShowcaseSquareItemCard}>
                <Image 
                  source={require('../assets/salondp.png')} // Using premium salon floor visual sample layout placeholder
                  style={styles.rewardThumbnailImageSquare} 
                />
                <View style={styles.rewardMetaDetailsContainerBox}>
                  <View style={styles.pointsCostTagCapsule}>
                    <Text style={styles.pointsCostTagText}>{reward.points}</Text>
                  </View>
                  <Text style={styles.rewardTitleHeadingText}>{reward.title}</Text>
                  <Text style={styles.rewardSubtitleCategoryLabel}>{reward.category}</Text>
                </View>
              </View>
            ))}
          </ScrollView>

          {/* CHRONOLOGICAL POINT HISTORY AUDIT LIST TRAIL SECTION */}
          <View style={styles.historySectionHeaderFlexRowLine}>
            <Text style={styles.serifSectionTitleHeaderLabel}>Point History</Text>
            {/* Minimalist interactive filtering setting configuration toggle vector option adjustment */}
            {/* <Ionicons name="options-outline" size={18} color="#fff" style={styles.filterMenuSettingsIconAdjustment} /> */}
          </View>

          <View style={styles.historyListVerticalStackGroup}>
            {pointHistory.map((log) => (
              <View key={log.id} style={styles.historyLineItemRow}>
                <View style={styles.historyLineItemLeftSplitLayout}>
                  {/* Decorative uniform framework indicator icon structural container box box layout */}
                  <View style={styles.historyActionSymbolBoxIconWrapper}>
                    <Ionicons name="cut-outline" size={14} color="#fff" />
                  </View>
                  
                  <View style={styles.historyMetaLabelsColumnText}>
                    <Text style={styles.historyActionHeadingTitleText}>{log.action}</Text>
                    <Text style={styles.historyActionSubMetaParagraphText}>
                      {log.date} .{' '}
                      <Text style={{ color: log.isEarned ? '#F1BA0D' : '#FFA77F', fontWeight: '600' }}>
                        {log.type}
                      </Text>
                    </Text>
                  </View>
                </View>

                {/* Right static incremental currency accent counter status tracker info node */}
                <Text style={styles.historyNumericCurrencyAmountLabelText}>{log.amount}</Text>
              </View>
            ))}
          </View>

        </ScrollView>
      </ScreenWrapper>
    </View>
  );
};

export default LoyaltyPointsScreen;

const styles = StyleSheet.create({
  scrollLayoutContent: {
    paddingBottom: 40,
    marginTop: 5,
  },
  balanceSummaryMainCard: {
    backgroundColor: '#222', // Premium high-contrast custom plate backing matching image_f67dba.png
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    marginVertical: 15,
  },
  balanceHeaderFlexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 25,
  },
  balanceLabelText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '500',
    opacity: 0.9,
    marginBottom: 5,
  },
  pointsCounterHighlightValue: {
    color: '#F1BA0D', // Premium gold accent tracking point output identifier
    fontSize: 15,
    fontWeight: '700',
  },
  premiumTierBadgeCapsule: {
    backgroundColor: '#F1BA0D',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 50,
  },
  premiumTierBadgeText: {
    color: '#000',
    fontSize: 9,
    fontWeight: '700',
  },
  progressStatusWrapperIndicator: {
    flexDirection: 'column',
    marginVertical: 6,
  },
  progressLabelFlexRowLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressInlineLeftText: {
    color: '#ffffffde',
    fontSize: 9,
    fontWeight: '500',
    opacity: 0.8,
  },
  progressInlineRightText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '500',
    opacity: 0.8,
  },
  progressTrackSliderOuterBacking: {
    height: 6,
    backgroundColor: '#444',
    borderRadius: 50,
    width: '100%',
    overflow: 'hidden',
  },
  progressTrackFilledActiveFill: {
    height: '100%',
    backgroundColor: '#F1BA0D',
    borderRadius: 50,
  },
  serifSectionTitleHeaderLabel: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'serif', // Elegant branding serif typography setup matches screenshot visual criteria 
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 14,
    paddingLeft: 2,
  },
  horizontalCarouselLayoutRow: {
    paddingLeft: 2,
    paddingRight: 20,
    flexDirection: 'row',
    gap: 12,
    marginBottom: 15,
  },
  rewardShowcaseSquareItemCard: {
    width: 125,
    backgroundColor: '#000',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#444',
  },
  rewardThumbnailImageSquare: {
    width: '100%',
    height: 80,
    backgroundColor: '#222',
  },
  rewardMetaDetailsContainerBox: {
    padding: 8,
    position: 'relative',
  },
  pointsCostTagCapsule: {
    backgroundColor: '#F1BA0D',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 50,
    alignSelf: 'flex-start',
    marginTop: -16, // Pulls the badge upward to overlay cleanly onto the thumbnail border frame block baseline
    marginBottom: 8,
  },
  pointsCostTagText: {
    color: '#000',
    fontSize: 8,
    fontWeight: '700',
  },
  rewardTitleHeadingText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 4,
  },
  rewardSubtitleCategoryLabel: {
    color: '#ffffff5e',
    fontSize: 8,
    fontWeight: '500',
  },
  historySectionHeaderFlexRowLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  filterMenuSettingsIconAdjustment: {
    marginTop: -4,
    paddingRight: 2,
  },
  historyListVerticalStackGroup: {
    flexDirection: 'column',
    gap: 12,
    marginTop: 4,
  },
  historyLineItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  historyLineItemLeftSplitLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  historyActionSymbolBoxIconWrapper: {
    width: 32,
    height: 32,
    backgroundColor: '#222225',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  historyMetaLabelsColumnText: {
    justifyContent: 'center',
  },
  historyActionHeadingTitleText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  historyActionSubMetaParagraphText: {
    color: '#ffffff5e',
    fontSize: 9,
    fontWeight: '400',
  },
  historyNumericCurrencyAmountLabelText: {
    color: '#F1BA0D',
    fontSize: 12,
    fontWeight: '700',
    paddingRight: 2,
  },
});