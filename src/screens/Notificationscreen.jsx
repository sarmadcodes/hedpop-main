import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
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

const { width } = Dimensions.get('window');

const adapt = (n) => ({
  id: n.id || n._id,
  title: n.title,
  message: n.message,
  timestamp: n.createdAt ? new Date(n.createdAt).toLocaleString() : n.timestamp,
  icon: n.icon || 'notifications',
  iconColor: n.iconColor || '#F1BA0D',
});

const NotificationSettingsScreen = ({navigation}) => {
  const { data, loading, error, refetch } = useApi(
    async () => {
      const list = await userService.notifications();
      return Array.isArray(list) ? list.map(adapt) : [];
    },
    [],
  );
  const recentUpdates = data || [];

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <ScreenWrapper
        imageSource={require('../assets/bookbg2.png')} // Utilizing matching top banner asset
        backgroundColor="#000"
      >
        {/* Navigation Core Header - Notification icon ignored per layout criteria */}
        <BackBar title="Notification" />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollLayoutContent}
        >
          {/* Subheading Sub-paragraph Tagline Intro text block */}
          <Text style={styles.notificationSubtitleTaglineText}>
            Stay updated with your grooming schedule and exclusive perks.
          </Text>

          {/* SECTION HEADER: RECENT UPDATES */}
          <Text style={styles.sectionHeadingGoldText}>RECENT UPDATES</Text>

          {loading && <LoadingState label="Loading notifications…" />}
          {!loading && error && <ErrorState onRetry={refetch} />}
          {!loading && !error && recentUpdates.length === 0 && (
            <EmptyState icon="notifications-outline" title="No notifications yet" hint="Updates about your bookings and offers will appear here." />
          )}

          {/* DYNAMIC CARD FEED RENDER SYSTEM */}
          <View style={styles.updatesVerticalStackGroup}>
            {recentUpdates.map((item) => (
              <View key={item.id} style={styles.notificationCardBody}>
                <View style={styles.cardHeaderFlexLineRow}>
                  <View style={styles.titleWithIconLeftComboBlock}>
                    {/* Tiny interior circle icon layout wrapper frame */}
                    <View style={styles.iconMiniCircularBackingFrame}>
                      <Ionicons name={item.icon} size={10} color={item.iconColor} />
                    </View>
                    <Text style={styles.notificationCardTitleText}>{item.title}</Text>
                  </View>
                  <Text style={styles.timestampRightIndicatorText}>{item.timestamp}</Text>
                </View>
                <Text style={styles.notificationCardMessageText}>{item.message}</Text>
              </View>
            ))}
          </View>

          {/* SECTION HEADER: OFFERS & PROMOTIONS */}
          <Text style={[styles.sectionHeadingGoldText, { marginTop: 25 }]}>
            OFFERS & PROMOTIONS
          </Text>

          {/* IMAGE BACKGROUND PROMOTION BANNER PLACEMENT CARD */}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {navigation.navigate('Promotionscreen');}}
          >
            <ImageBackground
              source={require('../assets/filterbg.png')} // Reusing salon visual preview background texture framework
              style={styles.promotionImageBackgroundBannerFrame}
              imageStyle={{ borderRadius: 10, opacity: 0.4 }}
              backgroundColor="#1C1C1E"
            >
              <View style={styles.promoBannerContentInternalScrimSheet}>
                <Text style={styles.promoCardMainTitleText}>Special Offer Just For You</Text>
                <Text style={styles.promoCardSubParagraphBodyText}>
                  Enjoy 20% off all grooming products this weekend.
                </Text>
                
                {/* Horizontal dynamic sliding arrow forward indicator vector icon */}
                <View style={styles.promoRightArrowIconLayoutWrapper}>
                  <Ionicons name="arrow-forward" size={18} color="#fff" />
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>

        </ScrollView>
      </ScreenWrapper>
    </View>
  );
};

export default NotificationSettingsScreen;

const styles = StyleSheet.create({
  scrollLayoutContent: {
    paddingBottom: 40,
    marginTop: 10,
  },
  notificationSubtitleTaglineText: {
    color: '#ffffffde',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 2,
  },
  sectionHeadingGoldText: {
    color: '#F1BA0D', // Premium core signature layout gold branding color tone
    fontSize: 14,
    fontWeight: '700',
    // letterSpacing: 0.5,
    marginBottom: 15,
    marginTop: 10,
  },
  updatesVerticalStackGroup: {
    flexDirection: 'column',
    gap: 12,
  },
  notificationCardBody: {
    backgroundColor: '#222', // Premium dark-card high contrast field plate panel base
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#444',
    padding: 16,
  },
  cardHeaderFlexLineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  titleWithIconLeftComboBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 8,
  },
  iconMiniCircularBackingFrame: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#ffffff15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  notificationCardTitleText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  timestampRightIndicatorText: {
    color: '#F1BA0D',
    fontSize: 10,
    fontWeight: '500',
  },
  notificationCardMessageText: {
    color: '#ffffffde',
    fontSize: 11,
    fontWeight: '400',
    lineHeight: 16,
    paddingLeft: 2,
  },
  promotionImageBackgroundBannerFrame: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#444',
  },
  promoBannerContentInternalScrimSheet: {
    flex: 1,
    padding: 18,
    justifyContent: 'center',
    position: 'relative',
  },
  promoCardMainTitleText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 6,
  },
  promoCardSubParagraphBodyText: {
    color: '#ffffffbe',
    fontSize: 11,
    fontWeight: '400',
    lineHeight: 16,
    width: '80%',
  },
  promoRightArrowIconLayoutWrapper: {
    position: 'absolute',
    right: 18,
    bottom: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
});