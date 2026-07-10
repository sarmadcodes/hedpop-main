// Lazy social-auth bridge.
// These libraries require native module linking — until the user installs and
// configures them, the helpers return a clear error instead of crashing.
//
// Setup steps documented in README — TL;DR:
//   Google:
//     npm i @react-native-google-signin/google-signin
//     drop google-services.json into android/app/
//     set GoogleSignin.configure({ webClientId: '...' })
//   Facebook:
//     npm i react-native-fbsdk-next
//     add FB App ID + Client Token to strings.xml / Info.plist

import authService from './authService';

let googleLib = null;
function getGoogle() {
  if (googleLib !== null) return googleLib;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    googleLib = require('@react-native-google-signin/google-signin');
  } catch {
    googleLib = false;
  }
  return googleLib;
}

let fbLib = null;
function getFB() {
  if (fbLib !== null) return fbLib;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    fbLib = require('react-native-fbsdk-next');
  } catch {
    fbLib = false;
  }
  return fbLib;
}

let configuredGoogle = false;
function configureGoogle(webClientId) {
  if (configuredGoogle) return true;
  const g = getGoogle();
  if (!g) return false;
  try {
    g.GoogleSignin.configure({ webClientId, offlineAccess: false });
    configuredGoogle = true;
    return true;
  } catch {
    return false;
  }
}

export async function signInWithGoogle(webClientId) {
  if (!webClientId) throw new Error('GOOGLE_WEB_CLIENT_ID not set in your mobile config.');
  const g = getGoogle();
  if (!g || !configureGoogle(webClientId)) {
    throw new Error('Google sign-in is not installed yet. See README for setup.');
  }
  await g.GoogleSignin.hasPlayServices();
  const result = await g.GoogleSignin.signIn();
  const idToken = result?.idToken || result?.data?.idToken;
  if (!idToken) throw new Error('Google sign-in did not return a token.');
  return authService.google(idToken);
}

export async function signInWithFacebook() {
  const fb = getFB();
  if (!fb) throw new Error('Facebook sign-in is not installed yet. See README for setup.');
  const { LoginManager, AccessToken } = fb;
  const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
  if (result.isCancelled) throw new Error('Facebook sign-in was cancelled.');
  const tokenInfo = await AccessToken.getCurrentAccessToken();
  if (!tokenInfo?.accessToken) throw new Error('Facebook sign-in did not return a token.');
  return authService.facebook(tokenInfo.accessToken);
}

export function isSocialAuthAvailable() {
  return { google: !!getGoogle(), facebook: !!getFB() };
}
