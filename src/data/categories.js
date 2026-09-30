export const CATEGORIES = [
  { id: 'all', name: 'All Categories', slug: 'all' },
  { id: 'mobile-topups', name: 'Mobile Top-Ups', slug: 'mobile-topups' },
  { id: 'paid-games', name: 'Paid Games', slug: 'paid-games' },
  { id: 'gift-cards', name: 'Gift Cards', slug: 'gift-cards' },
  { id: 'subscriptions', name: 'Subscriptions', slug: 'subscriptions' },
];

export const PLATFORMS = [
  { id: 'all', name: 'All Platforms', slug: 'all' },
  { id: 'pc', name: 'PC', slug: 'pc' },
  { id: 'xbox', name: 'Xbox', slug: 'xbox' },
  { id: 'playstation', name: 'PlayStation', slug: 'playstation' },
  { id: 'mobile', name: 'Mobile', slug: 'mobile' },
  { id: 'gift-cards', name: 'Gift Cards', slug: 'gift-cards' },
];

export const PAYMENT_METHODS = [
  {
    id: 'fastpay',
    name: 'FastPay',
    accountNumber: '0750 123 4567',
    accountName: 'Dano Store',
    description: 'Fast and secure instant mobile transfer via FastPay App.',
    badge: 'Popular',
    color: 'from-pink-600 to-rose-600'
  },
  {
    id: 'korek',
    name: 'Korek Cash / Top-Up',
    accountNumber: '0750 987 6543',
    accountName: 'Dano Store',
    description: 'Direct Korek credit transfer or Korek Cash wallet.',
    badge: 'Fast',
    color: 'from-amber-500 to-yellow-600'
  },
  {
    id: 'mastercard',
    name: 'MasterCard / FIB / First Iraqi Bank',
    accountNumber: '7000 8888 9999 1111',
    accountName: 'Dano Store Gaming LTD',
    description: 'Direct bank card transfer or FIB account payment.',
    badge: 'Direct',
    color: 'from-blue-600 to-indigo-600'
  }
];
