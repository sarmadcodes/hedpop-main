// Single source of truth for backend route paths.
// Keep these in sync with backend/src/routes/*.

export const endpoints = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    me: '/auth/me',
    forgotPassword: '/auth/forgot-password',
    changePassword: '/auth/change-password',
    toggleTwoFactor: '/auth/two-factor',
  },
  user: {
    profile: '/users/me',
    updateProfile: '/users/me',
    uploadAvatar: '/users/me/avatar',
  },
  salons: {
    list: '/salons',
    detail: (id) => `/salons/${id}`,
    services: (id) => `/salons/${id}/services`,
    reviews: (id) => `/salons/${id}/reviews`,
    search: '/salons/search',
  },
  bookings: {
    list: '/bookings',
    create: '/bookings',
    detail: (id) => `/bookings/${id}`,
    cancel: (id) => `/bookings/${id}/cancel`,
  },
  favorites: {
    list: '/favorites',
    add: '/favorites',
    remove: (id) => `/favorites/${id}`,
  },
  loyalty: {
    summary: '/loyalty',
    history: '/loyalty/history',
    rewards: '/loyalty/rewards',
    redeem: (id) => `/loyalty/rewards/${id}/redeem`,
  },
  notifications: {
    list: '/notifications',
    markRead: (id) => `/notifications/${id}/read`,
  },
  promotions: {
    list: '/promotions',
    claim: (id) => `/promotions/${id}/claim`,
  },
  payments: {
    methods: '/payments/methods',
    addMethod: '/payments/methods',
    removeMethod: (id) => `/payments/methods/${id}`,
    createIntent: '/payments/intents',
  },
};

export default endpoints;
