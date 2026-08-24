export const CATEGORIES = [
  { id: 'all', name: 'All Categories', slug: 'all' },
  { id: 'mobile', name: 'Mobile Top-Ups', slug: 'mobile' },
  { id: 'pc', name: 'PC Games', slug: 'pc' },
  { id: 'xbox', name: 'Xbox Games', slug: 'xbox' },
  { id: 'playstation', name: 'PlayStation Games', slug: 'playstation' },
  { id: 'gift-cards', name: 'Gift Cards', slug: 'gift-cards' },
  { id: 'subscriptions', name: 'Subscriptions', slug: 'subscriptions' },
];

export const PLATFORMS = [
  { id: 'all', name: 'All Platforms' },
  { id: 'PC', name: 'PC' },
  { id: 'Xbox', name: 'Xbox' },
  { id: 'PlayStation', name: 'PlayStation' },
  { id: 'Mobile', name: 'Mobile' },
  { id: 'Gift Card', name: 'Gift Card' },
];

export const PAYMENT_METHODS = [
  {
    id: 'fastpay',
    name: 'FastPay',
    accountNumber: '0750 123 4567',
    accountName: 'Dano Store FastPay',
    badgeColor: 'from-sky-500 to-blue-600',
    description: 'Instant transfer via FastPay App',
  },
  {
    id: 'korek',
    name: 'Korek Cash',
    accountNumber: '0750 987 6543',
    accountName: 'Dano Store Korek',
    badgeColor: 'from-red-500 to-orange-600',
    description: 'Pay directly via Korek Cash transfer',
  },
  {
    id: 'mastercard',
    name: 'MasterCard / FIB',
    accountNumber: '9876 5432 1098 7654',
    accountName: 'Dano Digital LLC',
    badgeColor: 'from-amber-500 to-yellow-600',
    description: 'Bank transfer or FIB Direct Card',
  },
];
