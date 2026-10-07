// Central place for environment-driven config.
//
// Release APK auto-uses production. Debug/Metro dev auto-uses development.
// Do NOT hardcode ACTIVE_ENV — __DEV__ picks the right one per build type.

const DEV_API_HOST = 'localhost';
const DEV_API_PORT = 5000;

const ENV = {
  development: {
    API_BASE_URL: `http://${DEV_API_HOST}:${DEV_API_PORT}/api/v1`,
    APP_ENV: 'development',
  },
  production: {
    API_BASE_URL: 'https://api.hedpop.threadique.live/api/v1',
    APP_ENV: 'production',
  },
};

const ACTIVE_ENV = __DEV__ ? 'development' : 'production';

export default ENV[ACTIVE_ENV];
