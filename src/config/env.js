// Central place for environment-driven config.
//
// API_BASE_URL on Android physical device (USB):
//   First run `adb reverse tcp:5000 tcp:5000` once after plugging in your phone.
//   That maps the phone's localhost:5000 -> your PC's localhost:5000.
//   Metro (port 8081) is reversed automatically by `react-native run-android`.
//
// API_BASE_URL on Android emulator:
//   localhost works after adb reverse, OR use 10.0.2.2 directly.
//
// API_BASE_URL over WiFi (no USB):
//   Set DEV_API_HOST below to your PC's LAN IP, e.g. '192.168.100.192'.

const DEV_API_HOST = 'localhost'; // keep local while debugging; use adb reverse on a physical device
const DEV_API_PORT = 5000;

// Google OAuth — Web Client ID from Google Cloud Console.
// This MUST match the backend's GOOGLE_CLIENT_ID so the JWT-issued audience
// matches what the backend verifies the ID token against.
const GOOGLE_WEB_CLIENT_ID = '806046720296-vmnqb58u4t21ih7fr50f4l75dtnmce3c.apps.googleusercontent.com';

const ENV = {
  development: {
    API_BASE_URL: `http://${DEV_API_HOST}:${DEV_API_PORT}/api/v1`,
    APP_ENV: 'development',
    GOOGLE_WEB_CLIENT_ID,
  },
  // staging: {
  //   API_BASE_URL: 'https://staging.api.hedpop.com/api/v1',
  //   APP_ENV: 'staging',
  //   GOOGLE_WEB_CLIENT_ID,
  // },
  // production: {
  //   API_BASE_URL: 'https://api.hedpop.threadique.live/api/v1',
  //   APP_ENV: 'production',
  //   GOOGLE_WEB_CLIENT_ID,
  // },
};

const ACTIVE_ENV = 'development';

export default ENV[ACTIVE_ENV];
