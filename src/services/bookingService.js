import api from './apiClient';
import endpoints from './endpoints';

export const bookingService = {
  list: () => api.get(endpoints.bookings.list),
  detail: (id) => api.get(endpoints.bookings.detail(id)),
  create: (payload) => api.post(endpoints.bookings.create, payload),
  cancel: (id) => api.post(endpoints.bookings.cancel(id)),
  taken: (salon, date) =>
    api.get(`/bookings/taken?salon=${encodeURIComponent(salon)}&date=${encodeURIComponent(date)}`),
};

export default bookingService;
