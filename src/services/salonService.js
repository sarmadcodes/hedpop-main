import api from './apiClient';
import endpoints from './endpoints';

export const salonService = {
  list: (params) => api.get(`${endpoints.salons.list}${params ? buildQuery(params) : ''}`),
  detail: (id) => api.get(endpoints.salons.detail(id)),
  services: (id) => api.get(endpoints.salons.services(id)),
  reviews: (id) => api.get(endpoints.salons.reviews(id)),
  search: (q) => api.get(`${endpoints.salons.search}?q=${encodeURIComponent(q)}`),
};

function buildQuery(params) {
  const qs = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');
  return qs ? `?${qs}` : '';
}

export default salonService;
