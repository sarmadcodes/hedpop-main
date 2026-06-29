export const MOCK_USER = {
  id: 'u_demo',
  name: 'Charles',
  email: 'charles22@gmail.com',
  phone: '+44 0987 654321',
  address: '123 Lorem Address, London, United Kingdom',
  avatar: null,
  loyaltyPoints: 50,
  tier: 'Premium Member',
};

export const FAVORITE_BARBERS = [
  { id: '1', name: 'Julian Rossi', role: 'Master of Fades', rating: '5.0' },
  { id: '2', name: 'Oliver', role: 'Master of Shave', rating: '5.0' },
  { id: '3', name: 'Robert', role: 'Master of Styling', rating: '5.0' },
  { id: '4', name: 'Alan', role: 'Master of Fades', rating: '5.0' },
  { id: '5', name: 'James', role: 'Master of Fades', rating: '5.0' },
];

export const PAYMENT_METHODS = [
  { id: 'cc', title: 'Credit Card', subtitle: '+44 7421 ****** 54', iconName: 'card', iconColor: '#EB001B', cardNumber: '**** 52 52', expiry: '12/26' },
  { id: 'paypal', title: 'PayPal', subtitle: '+44 7512 ****** 89', iconName: 'logo-paypal', iconColor: '#003087', cardNumber: '**** 89 45', expiry: '08/27' },
  { id: 'gpay', title: 'Google Pay', subtitle: '+44 7634 ****** 12', iconName: 'logo-google', iconColor: '#4285F4', cardNumber: '**** 33 21', expiry: '10/28' },
  { id: 'applepay', title: 'Apple Pay', subtitle: '+44 7788 ****** 67', iconName: 'logo-apple', iconColor: '#000', cardNumber: '**** 11 90', expiry: '03/29' },
];
