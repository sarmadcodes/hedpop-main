import { useCallback } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../constants/routes';

// Returns a function that runs an action only if the user is logged in.
// Otherwise prompts to sign in and routes to the login screen.
export function useAuthGate() {
  const { isLoggedIn } = useAuth();
  const navigation = useNavigation();

  return useCallback(
    (action, opts = {}) => {
      if (isLoggedIn) return action();
      Alert.alert(
        opts.title || 'Sign in required',
        opts.message || 'Please sign in to continue.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Sign In', onPress: () => navigation.navigate(ROUTES.LOGIN) },
        ],
      );
      return null;
    },
    [isLoggedIn, navigation],
  );
}

export default useAuthGate;
