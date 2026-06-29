import api from './apiClient';
import endpoints from './endpoints';

export const userService = {
  getProfile: () => api.get(endpoints.user.profile),
  updateProfile: (payload) => api.patch(endpoints.user.updateProfile, payload),
  registerDevice: (token) => api.post('/users/me/device', { token }),
  unregisterDevice: (token) => api.delete('/users/me/device', { body: { token } }),
  loyalty: () => api.get('/users/me/loyalty'),

  favorites: () => api.get(endpoints.favorites.list),
  addFavorite: (salonId) => api.post(endpoints.favorites.add, { salonId }),
  removeFavorite: (salonId) => api.delete(endpoints.favorites.remove(salonId)),

  notifications: () => api.get(endpoints.notifications.list),
  markNotificationRead: (id) => api.post(endpoints.notifications.markRead(id)),

  promotions: () => api.get(endpoints.promotions.list),

  paymentMethods: () => api.get(endpoints.payments.methods),
};

export default userService;
