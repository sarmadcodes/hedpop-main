import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';

// Custom Global Core Framework Components
import ScreenWrapper from '../../components/ScreenWrapper';
import BackBar from '../../components/BackBar';
import MyButton from '../../components/MyButton';
import { useAuth } from '../../context/AuthContext'; // Importing Global State Engine

const { width } = Dimensions.get('window');

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { logoutUser } = useAuth(); // Extract logout trigger from Context pipeline

  // Mock User Data Profile Record
  const userProfile = {
    name: 'Charles',
    email: 'Charles22@gmail.com',
    loyaltyPoints: 50,
    // avatar: require('../../assets/searchbg.png'), 
  };

  // Structured Core Navigation Menu Map Configuration Matrix
  const menuOptions = [
    {
      id: 'personal_details',
      label: 'Personal Details',
      icon: 'person-outline',
      targetScreen: 'PersonalDetailscreen',
    },
    {
      id: 'payment_method',
      label: 'Payment Method',
      icon: 'card-outline',
      targetScreen: 'PaymentMethodscreen',
    },
    {
      id: 'favorites',
      label: 'Favorites',
      icon: 'heart-outline',
      targetScreen: 'Favoritescreen',
    },
    {
      id: 'loyalty_points',
      label: 'Loyalty Points',
      icon: 'gift-outline',
      targetScreen: 'LoyaltyPointscreen',
      hasBadge: true,
      badgeText: '5 Points Available',
    },
    {
      id: 'notification',
      label: 'Notifications',
      icon: 'notifications-outline',
      targetScreen: 'Notificationscreen',
    },
    {
      id: 'privacy_security',
      label: 'Privacy & Security',
      icon: 'lock-closed-outline',
      targetScreen: 'PrivacySecurity',
    },
  ];

  // Global Core Route Navigation State Handler
  const handleMenuPress = (targetScreen, label) => {
    if (targetScreen) {
      // Navigates downstream dynamically to specified route
      navigation.navigate(targetScreen);
    } else {
      Alert.alert('Navigation Context', `${label} screen routing will be integrated next.`);
    }
  };

  // Global Context Sign-Out Handler
  const handleSignOut = () => {
    logoutUser(); // Clears user session status to false globally
    navigation.navigate('Splashscreen'); // Cleanly routes control back to initial landing state
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <ScreenWrapper
        imageSource={require('../../assets/bookbg2.png')} // Consistent luxury blurred background banner asset
        backgroundColor="#000"
      >
        {/* Core Global Header Navigation (Notification icon ignored per instructions) */}
        <BackBar title="My Profile" />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollLayoutContent}
        >
          {/* USER ACCOUNT PROFILE HERO CARD OVERVIEW */}
          <View style={styles.profileHeroCardContainer}>
            <View style={styles.avatarOutlineWrapper}>
              <Image source={userProfile.avatar} style={styles.userAvatarImage} />
              <TouchableOpacity style={styles.avatarCameraBadgeFloating} activeOpacity={0.85}>
                <Ionicons name="camera" size={12} color="#000" />
              </TouchableOpacity>
            </View>

            <View style={styles.heroMetaDetailsTextColumn}>
              <Text style={styles.profileUserNameText}>{userProfile.name}</Text>
              <Text style={styles.profileUserEmailText}>{userProfile.email}</Text>
              
              <View style={styles.loyaltyInlineRowGroup}>
                <Ionicons name="gift-outline" size={13} color="#F1BA0D" style={{ marginRight: 6 }} />
                <Text style={styles.loyaltyPointsLabelText}>
                  {userProfile.loyaltyPoints} Loyalty Points
                </Text>
              </View>
            </View>
          </View>

          {/* INTERACTIVE NAVIGATION LINK LIST CORE FLOW */}
          <View style={styles.interactiveMenuLinkGroupWrap}>
            {menuOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={styles.menuPressableLineItemRow}
                activeOpacity={0.7}
                onPress={() => handleMenuPress(option.targetScreen, option.label)}
              >
                <View style={styles.menuLeftContentSplitBlock}>
                  <Ionicons 
                    name={option.icon} 
                    size={18} 
                    color="#fff" 
                    style={{ marginRight: 14, width: 20 }} 
                  />
                  <Text style={styles.menuItemLabelText}>{option.label}</Text>
                </View>

                <View style={styles.menuRightContentActionBlock}>
                  {option.hasBadge && (
                    <View style={styles.coralAlertStatusBadgeCapsule}>
                      <Text style={styles.coralAlertStatusBadgeText}>{option.badgeText}</Text>
                    </View>
                  )}
                  <Ionicons name="chevron-forward" size={16} color="#fff" />
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <MyButton
            title="Sign-Out"
            bgColor="#F1BA0D"
            textColor="#000"
            onPress={handleSignOut} // Hooked directly to auth synchronization system
          />
        </ScrollView>

      </ScreenWrapper>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  scrollLayoutContent: {
    paddingBottom: 110, // Safeguards against screen content clipping under the sticky footer tray
    marginTop: 10,
  },
  profileHeroCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000000c1',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 16,
    marginVertical: 15,
  },
  avatarOutlineWrapper: {
    position: 'relative',
    marginRight: 16,
  },
  userAvatarImage: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#222',
    borderWidth: 1.5,
    borderColor: '#ccc',
  },
  avatarCameraBadgeFloating: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#ffffffde',
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#000',
  },
  heroMetaDetailsTextColumn: {
    flex: 1,
    justifyContent: 'center',
  },
  profileUserNameText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
  },
  profileUserEmailText: {
    color: '#F1BA0D',
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 6,
  },
  loyaltyInlineRowGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loyaltyPointsLabelText: {
    color: '#ffffff9e',
    fontSize: 11,
    fontWeight: '500',
  },
  interactiveMenuLinkGroupWrap: {
    marginTop: 10,
    marginBottom: 20,
  },
  menuPressableLineItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 56,
    borderBottomWidth: 1,
    borderColor: '#222',
    paddingHorizontal: 4,
  },
  menuLeftContentSplitBlock: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemLabelText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  menuRightContentActionBlock: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coralAlertStatusBadgeCapsule: {
    backgroundColor: '#FFA77F', // Matches your exact premium signature soft-coral indicator tint
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    marginRight: 10,
  },
  coralAlertStatusBadgeText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '700',
  },
});