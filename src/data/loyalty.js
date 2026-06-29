export const LOYALTY_SUMMARY = {
  points: 7890,
  tier: 'Premium Member',
  pointsToNextTier: 250,
  nextTier: 'Diamond',
  progressPercent: 80,
};

export const AVAILABLE_REWARDS = [
  { id: '1', title: 'Signature Cut', points: '500 PTS', category: 'PREMIUM SERVICES' },
  { id: '2', title: 'Signature Shave', points: '500 PTS', category: 'PREMIUM SERVICES' },
  { id: '3', title: 'Beard Sculpt', points: '500 PTS', category: 'PREMIUM SERVICES' },
];

export const POINT_HISTORY = [
  { id: '1', action: 'Executive Haircut', date: 'Apr 09, 2026', type: 'Earned', amount: '+100Pts', isEarned: true },
  { id: '2', action: 'Premium Styling', date: 'Jan 11, 2026', type: 'Redeemed', amount: '-100Pts', isEarned: false },
  { id: '3', action: 'Corporate Shave', date: 'Jun 24, 2026', type: 'Earned', amount: '+200Pts', isEarned: true },
  { id: '4', action: 'Executive Haircut', date: 'Mar 30, 2026', type: 'Earned', amount: '+200Pts', isEarned: true },
];
