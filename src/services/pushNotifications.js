// Push notification helpers.
// Designed to be lazy and non-crashy so the app still runs before
// @react-native-firebase has been installed and configured.
//
// To enable real push:
//   1. npm install @react-native-firebase/app @react-native-firebase/messaging
//   2. Drop google-services.json into android/app/
//   3. For iOS, configure APNs in Firebase console
//   4. Rebuild the native app (npx react-native run-android / run-ios)

import userService from './userService';

let messagingLib = null;

function getMessaging() {
  if (messagingLib !== null) return messagingLib;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    messagingLib = require('@react-native-firebase/messaging').default;
  } catch {
    messagingLib = false;
  }
  return messagingLib;
}

export async function requestNotificationPermission() {
  const messaging = getMessaging();
  if (!messaging) return false;
  try {
    const status = await messaging().requestPermission();
    return status === 1 || status === 2;
  } catch {
    return false;
  }
}

export async function registerForPushNotifications() {
  const messaging = getMessaging();
  if (!messaging) {
    console.log('[push] @react-native-firebase/messaging not installed — skipping');
    return null;
  }
  try {
    const granted = await requestNotificationPermission();
    if (!granted) return null;
    const token = await messaging().getToken();
    if (token) {
      await userService.registerDevice(token).catch(() => {});
    }
    return token;
  } catch (err) {
    console.warn('[push] registration failed:', err.message);
    return null;
  }
}

export function onForegroundMessage(handler) {
  const messaging = getMessaging();
  if (!messaging) return () => {};
  return messaging().onMessage(handler);
}
