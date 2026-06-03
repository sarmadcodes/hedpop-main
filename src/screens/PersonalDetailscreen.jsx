import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
  Dimensions,
  Alert,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

// Custom Global Core Framework Components
import ScreenWrapper from '../components/ScreenWrapper';
import BackBar from '../components/BackBar';
import MyButton from '../components/MyButton';

const { width } = Dimensions.get('window');

const PersonalDetailsScreen = () => {
  // Input Component Local State Engines
  const [fullName, setFullName] = useState('Charles');
  const [email, setEmail] = useState('charles22@gmail.com');
  const [phoneNumber, setPhoneNumber] = useState('+44 0987 654321');
  const [address, setAddress] = useState('123 lorem address united kingdom, London');
  const [remindersEnabled, setRemindersEnabled] = useState(true);

  const handleSaveChanges = () => {
    Alert.alert('Success', 'Your personal profile details have been securely updated.');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <ScreenWrapper
        imageSource={require('../assets/bookbg2.png')} // Utilizing consistent blurred background asset pipeline
        backgroundColor="#000"
      >
        {/* Core Global Header Navigation - Notification icon ignored per layout criteria */}
        <BackBar title="Personal Details" />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollLayoutContent}
        >
          {/* CENTERED HERO PROFILE AVATAR BLOCK */}
          <View style={styles.avatarCenteredHeroBlock}>
            <View style={styles.avatarOutlineWrapper}>
              <Image 
                source={require('../assets/searchbg.png')} // Consistent avatar asset path placement
                style={styles.heroAvatarImage} 
              />
              <TouchableOpacity style={styles.avatarCameraBadgeFloating} activeOpacity={0.85}>
                <Ionicons name="camera" size={10} color="#000" />
              </TouchableOpacity>
            </View>
            <Text style={styles.heroProfileNameText}>Charles</Text>
            <Text style={styles.heroProfileSubtitleText}>Premium Member</Text>
          </View>

          {/* DYNAMIC FORM DATA INPUT FIELDS */}
          
          {/* Full Name Input Box */}
          <View style={styles.inputFieldControlGroup}>
            <Text style={styles.inputFieldLabelText}>Full Name</Text>
            <View style={styles.inputIconTextComboContainer}>
              <Ionicons name="person" size={14} color="#aaa" style={styles.inputInlineLeadingIcon} />
              <TextInput
                style={styles.customBaseTextInput}
                value={fullName}
                onChangeText={setFullName}
                placeholderTextColor="#666"
                placeholder="Enter full name"
              />
            </View>
          </View>

          {/* Email Address Input Box */}
          <View style={styles.inputFieldControlGroup}>
            <Text style={styles.inputFieldLabelText}>Email Address</Text>
            <View style={styles.inputIconTextComboContainer}>
              <Ionicons name="call" size={14} color="#aaa" style={styles.inputInlineLeadingIcon} />
              <TextInput
                style={styles.customBaseTextInput}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#666"
                placeholder="Enter email address"
              />
            </View>
          </View>

          {/* Phone Number Input Box */}
          <View style={styles.inputFieldControlGroup}>
            <Text style={styles.inputFieldLabelText}>Phone Number</Text>
            <View style={styles.inputIconTextComboContainer}>
              <Ionicons name="mail" size={14} color="#aaa" style={styles.inputInlineLeadingIcon} />
              <TextInput
                style={styles.customBaseTextInput}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                placeholderTextColor="#666"
                placeholder="Enter phone number"
              />
            </View>
          </View>

          {/* Address Multiline Textarea Box */}
          <View style={styles.inputFieldControlGroup}>
            <Text style={styles.inputFieldLabelText}>Address</Text>
            <View style={[styles.inputIconTextComboContainer, styles.textareaCustomHeightBox]}>
              <Ionicons 
                name="pin" 
                size={14} 
                color="#aaa" 
                style={[styles.inputInlineLeadingIcon, styles.textareaIconTopAlignment]} 
              />
              <TextInput
                style={[styles.customBaseTextInput, styles.textareaInternalInputField]}
                value={address}
                onChangeText={setAddress}
                multiline={true}
                numberOfLines={3}
                textAlignVertical="top"
                placeholderTextColor="#666"
                placeholder="Enter address details"
              />
            </View>
          </View>

          {/* APPOINTMENT REMINDERS TOGGLE COMPONENT CONTAINER */}
          <View style={styles.appointmentReminderRowToggleCard}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="notifications" size={18} color="#fff" style={{ marginRight: 12 }} />
              <Text style={styles.reminderCardLabelText}>Appointment Reminders</Text>
            </View>
            <Switch
              trackColor={{ false: '#444', true: '#F1BA0D' }}
              thumbColor={remindersEnabled ? '#fff' : '#aaa'}
              ios_backgroundColor="#444"
              onValueChange={setRemindersEnabled}
              value={remindersEnabled}
            />
          </View>

        </ScrollView>

        {/* STICKY FOOTER ACTION CONTAINER TRAY */}
        <View style={styles.globalActionFooterFixedTray}>
          <MyButton
            title="Save Changes"
            bgColor="#F1BA0D"
            textColor="#000"
            onPress={handleSaveChanges}
          />
        </View>
      </ScreenWrapper>
    </View>
  );
};

export default PersonalDetailsScreen;

const styles = StyleSheet.create({
  scrollLayoutContent: {
    paddingBottom: 110, // Avoids screen components hiding underneath the fixed footer tray
    marginTop: 5,
  },
  avatarCenteredHeroBlock: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  avatarOutlineWrapper: {
    position: 'relative',
    marginBottom: 8,
  },
  heroAvatarImage: {
    width: 76,
    height: 76,
    borderRadius: 50,
    backgroundColor: '#222',
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  avatarCameraBadgeFloating: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#000',
  },
  heroProfileNameText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  heroProfileSubtitleText: {
    color: '#F1BA0D',
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  inputFieldControlGroup: {
    marginBottom: 10,
  },
  inputFieldLabelText: {
    color: '#ffffffde',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
    paddingLeft: 2,
  },
  inputIconTextComboContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222',
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 10,
    height: 44,
    paddingHorizontal: 12,
  },
  textareaCustomHeightBox: {
    height: 100,
    alignItems: 'flex-start',
    paddingTop: 12,
  },
  inputInlineLeadingIcon: {
    marginRight: 10,
  },
  textareaIconTopAlignment: {
    marginTop: 2,
  },
  customBaseTextInput: {
    flex: 1,
    color: '#ffffffde',
    fontSize: 12,
    fontWeight: '500',
    paddingVertical: 0,
    marginVertical: 0,
  },
  textareaInternalInputField: {
    height: '100%',
    textAlignVertical: 'top',
  },
  appointmentReminderRowToggleCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#222',
    borderRadius: 10,
    height: 52,
    paddingHorizontal: 14,
    marginTop: 10,
    marginBottom: 15,
  },
  reminderCardLabelText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  globalActionFooterFixedTray: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
});