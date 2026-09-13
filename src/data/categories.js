export const CATEGORIES = [
  { id: 'all', name: 'All Categories' },
  { id: 'mobile', name: 'Mobile Top-Ups', slug: 'mobile-top-ups' },
  { id: 'paid-games', name: 'Paid Games', slug: 'paid-games' },
  { id: 'gift-cards', name: 'Gift Cards', slug: 'gift-cards' },
  { id: 'subscriptions', name: 'Subscriptions', slug: 'subscriptions' }
];

export const PLATFORMS = [
  { id: 'all', name: 'All Platforms' },
  { id: 'PC', name: 'PC' },
  { id: 'Xbox', name: 'Xbox' },
  { id: 'PlayStation', name: 'PlayStation' },
  { id: 'Mobile', name: 'Mobile' },
  { id: 'Gift Card', name: 'Gift Cards' },
  { id: 'Subscription', name: 'Subscriptions' }
];

export const PAYMENT_METHODS = [
  {
    id: 'fastpay',
    name: 'FastPay',
    description: 'Pay via FastPay wallet (Instant Transfer)',
    accountNumber: '+964 750 000 1234',
    badge: 'Popular',
    icon: 'Smartphone'
  },
  {
    id: 'korek',
    name: 'Korek Cash',
    description: 'Pay via Korek mobile payment',
    accountNumber: '+964 770 000 5678',
    badge: 'Instant',
    icon: 'Phone'
  },
  {
    id: 'mastercard',
    name: 'MasterCard',
    description: 'Pay via local MasterCard / NassPay transfer',
    accountNumber: '5321 **** **** 8899',
    badge: 'Direct',
    icon: 'CreditCard'
  }
];
