export const SALONS = [
  {
    id: '1',
    title: 'The Gentlemen Cuts',
    category: 'Barber',
    isOpen: true,
    distance: '1 km away',
    time: '9:00 AM - 8:00 PM',
    rating: '4.9',
    reviews: '250',
    image: { uri: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033' },
  },
  {
    id: '2',
    title: 'The Cuts',
    category: 'Salon',
    isOpen: false,
    distance: '3.2 km away',
    time: '10:00 AM - 9:00 PM',
    rating: '4.7',
    reviews: '180',
    image: { uri: 'https://images.unsplash.com/photo-1517832606299-7ae9b720a186' },
  },
  {
    id: '3',
    title: 'The Bearded Gent',
    category: 'Barber',
    isOpen: true,
    distance: '2 km away',
    time: '9:00 AM - 11:00 PM',
    rating: '4.8',
    reviews: '320',
    image: { uri: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f' },
  },
  {
    id: '4',
    title: 'The Royal Trim',
    category: 'Salon',
    isOpen: false,
    distance: '5 km away',
    time: '11:00 AM - 10:00 PM',
    rating: '4.9',
    reviews: '500',
    image: { uri: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f' },
  },
];

export const SALON_CATEGORIES = ['All', 'Barbers', 'Hair Salons'];

export const HOMEPAGE_CATEGORIES = [
  {
    id: 'barbers',
    title: 'Barbers',
    image: { uri: 'https://images.unsplash.com/photo-1622287162716-f311baa1a2b8' },
  },
  {
    id: 'hair-salons',
    title: 'Hair Salons',
    image: { uri: 'https://images.unsplash.com/photo-1560066984-138dadb4c035' },
  },
  {
    id: 'beauty',
    title: 'Beauty',
    image: { uri: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f' },
  },
];

export const SERVICES = [
  { id: '1', name: 'Classic Haircut', price: 25, duration: '30 Mins', desc: 'Traditional cut with hot towel finish' },
  { id: '2', name: 'Skin fade', price: 45, duration: '40 Mins', desc: 'Modern fade with precision detailing' },
  { id: '3', name: 'Beard Trim', price: 20, duration: '30 Mins', desc: 'Beard sculpting and shaping' },
  { id: '4', name: 'Hot Towel Shave', price: 25, duration: '30 Mins', desc: 'Traditional straight-razor shave' },
];

export const SALON_REVIEWS = [
  { id: '1', name: 'James M.', date: '1 day ago', stars: 5, text: 'Excellent service, friendly staff and great attention to detail.' },
  { id: '2', name: 'Sara', date: '2 days ago', stars: 5, text: 'Very professional, would highly recommend to anyone.' },
];

export const FILTER_OPTIONS = {
  category: [
    { id: 'barbers', name: 'Barbers' },
    { id: 'salons', name: 'Salons' },
  ],
  location: [
    { id: 'liverpool', name: 'Liverpool' },
    { id: 'manchester', name: 'Manchester' },
    { id: 'birmingham', name: 'Birmingham' },
    { id: 'poole', name: 'Poole' },
    { id: 'all', name: 'All' },
  ],
  price: [
    { id: 'p1', name: '£0 - £20' },
    { id: 'p2', name: '£20 - £50' },
    { id: 'p3', name: '£50 - £100' },
    { id: 'p4', name: '£100+' },
  ],
  rating: [
    { id: 'r3', name: '3+' },
    { id: 'r4', name: '4+' },
    { id: 'r5', name: '5+' },
  ],
};
