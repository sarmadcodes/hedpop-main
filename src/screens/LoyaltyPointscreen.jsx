import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

import ScreenWrapper from '../components/ScreenWrapper';
import BackBar from '../components/BackBar';
import { LoadingState, ErrorState, EmptyState } from '../components/LoadingState';
import { useApi } from '../hooks/useApi';
import userService from '../services/userService';
import { colors } from '../theme';

const LoyaltyPointsScreen = () => {
  const summary = useApi(() => userService.loyalty(), []);
  const rewards = useApi(async () => {
    try { return await import('../services/userService').then((m) => m.default.rewards?.() || []); }
    catch { return []; }
  }, []);

  // Reward catalog + transaction history aren't yet implemented in the backend —
  // they currently return empty arrays from /loyalty/rewards and /loyalty/history.
  // Show real empty states so users see exactly what's there (nothing) instead of fake data.
  const availableRewards = [];
  const pointHistory = [];

  const s = summary.data;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScreenWrapper imageSource={require('../assets/bookbg2.png')} backgroundColor={colors.background}>
        <BackBar title="Loyalty Points" />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40, marginTop: 5 }}>
          {summary.loading && <LoadingState label="Loading loyalty…" />}
          {!summary.loading && summary.error && <ErrorState onRetry={summary.refetch} />}

          {!summary.loading && !summary.error && s && (
            <View style={styles.balanceCard}>
              <View style={styles.balanceHeader}>
                <View>
                  <Text style={styles.balanceLabel}>Total Balance</Text>
                  <Text style={styles.points}>{s.points} Points</Text>
                </View>
                <View style={styles.tierBadge}>
                  <Text style={styles.tierBadgeText}>{s.tier}</Text>
                </View>
              </View>

              <View style={styles.progressWrap}>
                <View style={styles.progressLabelRow}>
                  <Text style={styles.progressLeft}>
                    {s.pointsToNextTier} points to {s.nextTier} status
                  </Text>
                  <Text style={styles.progressRight}>{s.progressPercent}%</Text>
                </View>
                <View style={styles.progressTrack}>
                  <View style={[styles.progressFill, { width: `${s.progressPercent}%` }]} />
                </View>
              </View>
            </View>
          )}

          <Text style={styles.sectionTitle}>Available Rewards</Text>
          {availableRewards.length === 0 ? (
            <EmptyState icon="gift-outline" title="No rewards available yet" hint="Earn more points to unlock rewards." />
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.carousel}>
              {availableRewards.map((reward) => (
                <View key={reward.id} style={styles.rewardCard}>
                  <Image source={require('../assets/salondp.png')} style={styles.rewardThumb} />
                  <View style={{ padding: 8 }}>
                    <View style={styles.pointsTag}>
                      <Text style={styles.pointsTagText}>{reward.points}</Text>
                    </View>
                    <Text style={styles.rewardTitle}>{reward.title}</Text>
                    <Text style={styles.rewardCategory}>{reward.category}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          )}

          <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Point History</Text>
          {pointHistory.length === 0 ? (
            <EmptyState
              icon="time-outline"
              title="No activity yet"
              hint="Your point earnings and redemptions will appear here."
            />
          ) : (
            <View style={{ gap: 12 }}>
              {pointHistory.map((log) => (
                <View key={log.id} style={styles.historyRow}>
                  <View style={styles.historyLeft}>
                    <View style={styles.historyIcon}>
                      <Ionicons name="cut-outline" size={14} color="#fff" />
                    </View>
                    <View>
                      <Text style={styles.historyAction}>{log.action}</Text>
                      <Text style={styles.historyMeta}>
                        {log.date} ·{' '}
                        <Text style={{ color: log.isEarned ? colors.primary : colors.accent, fontWeight: '600' }}>
                          {log.type}
                        </Text>
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.historyAmount}>{log.amount}</Text>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </ScreenWrapper>
    </View>
  );
};

export default LoyaltyPointsScreen;

const styles = StyleSheet.create({
  balanceCard: {
    backgroundColor: colors.surfaceAlt, borderRadius: 10, borderWidth: 1,
    borderColor: colors.border, padding: 15, marginVertical: 15,
  },
  balanceHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 25 },
  balanceLabel: { color: colors.text, fontSize: 13, fontWeight: '500', opacity: 0.9, marginBottom: 5 },
  points: { color: colors.primary, fontSize: 16, fontWeight: '700' },
  tierBadge: { backgroundColor: colors.primary, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 50 },
  tierBadgeText: { color: '#000', fontSize: 9, fontWeight: '700' },
  progressWrap: { marginVertical: 6 },
  progressLabelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  progressLeft: { color: colors.textMuted, fontSize: 9, fontWeight: '500' },
  progressRight: { color: colors.text, fontSize: 9, fontWeight: '500' },
  progressTrack: { height: 6, backgroundColor: colors.borderDark, borderRadius: 50, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: colors.primary, borderRadius: 50 },

  sectionTitle: { color: colors.text, fontFamily: 'serif', fontSize: 16, fontWeight: '600', marginTop: 10, marginBottom: 14 },

  carousel: { flexDirection: 'row', gap: 12, paddingRight: 20 },
  rewardCard: { width: 125, backgroundColor: '#000', borderRadius: 10, overflow: 'hidden', borderWidth: 1, borderColor: colors.borderDark },
  rewardThumb: { width: '100%', height: 80, backgroundColor: '#222' },
  pointsTag: { backgroundColor: colors.primary, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 50, alignSelf: 'flex-start', marginTop: -16, marginBottom: 8 },
  pointsTagText: { color: '#000', fontSize: 8, fontWeight: '700' },
  rewardTitle: { color: colors.text, fontSize: 11, fontWeight: '600', marginBottom: 4 },
  rewardCategory: { color: '#ffffff5e', fontSize: 8, fontWeight: '500' },

  historyRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 4 },
  historyLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  historyIcon: {
    width: 32, height: 32, backgroundColor: colors.surfaceAlt, borderRadius: 6,
    justifyContent: 'center', alignItems: 'center', marginRight: 12,
  },
  historyAction: { color: colors.text, fontSize: 12, fontWeight: '600', marginBottom: 2 },
  historyMeta: { color: '#ffffff5e', fontSize: 9 },
  historyAmount: { color: colors.primary, fontSize: 12, fontWeight: '700' },
});
