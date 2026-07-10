import api, { tokenStorage } from './apiClient';
import endpoints from './endpoints';

export const authService = {
  async login({ email, password }) {
    const data = await api.post(endpoints.auth.login, { email, password });
    if (data?.token) await tokenStorage.set(data.token);
    return data;
  },

  async register(payload) {
    const data = await api.post(endpoints.auth.register, payload);
    if (data?.token) await tokenStorage.set(data.token);
    return data;
  },

  async me() {
    return api.get(endpoints.auth.me);
  },

  async logout() {
    try { await api.post(endpoints.auth.logout); } catch {}
    await tokenStorage.clear();
  },

  async changePassword({ currentPassword, newPassword }) {
    return api.post(endpoints.auth.changePassword, { currentPassword, newPassword });
  },

  async setTwoFactor(enabled) {
    return api.post(endpoints.auth.toggleTwoFactor, { enabled });
  },

  async google(idToken) {
    const data = await api.post(endpoints.auth.google, { idToken });
    if (data?.token) await tokenStorage.set(data.token);
    return data;
  },

  async facebook(accessToken) {
    const data = await api.post(endpoints.auth.facebook, { accessToken });
    if (data?.token) await tokenStorage.set(data.token);
    return data;
  },
};

export default authService;
