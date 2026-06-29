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

const DEV_API_HOST = 'localhost';  // change to your LAN IP for WiFi-only debugging
const DEV_API_PORT = 5000;

const ENV = {
  development: {
    API_BASE_URL: `http://${DEV_API_HOST}:${DEV_API_PORT}/api/v1`,
    APP_ENV: 'development',
  },
  staging: {
    API_BASE_URL: 'https://staging.api.hedpop.com/api/v1',
    APP_ENV: 'staging',
  },
  production: {
    API_BASE_URL: 'https://api.hedpop.com/api/v1',
    APP_ENV: 'production',
  },
};

const ACTIVE_ENV = __DEV__ ? 'development' : 'production';

export default ENV[ACTIVE_ENV];
