export const CATEGORIES = [
  { id: 'all', name: 'All Categories', slug: 'all' },
  { id: 'mobile-topups', name: 'Mobile Top-Ups', slug: 'mobile-topups' },
  { id: 'paid-games', name: 'Paid Games', slug: 'paid-games' },
  { id: 'gift-cards', name: 'Gift Cards', slug: 'gift-cards' },
  { id: 'subscriptions', name: 'Subscriptions', slug: 'subscriptions' }
];

export const PLATFORMS = [
  { id: 'all', name: 'All Platforms', slug: 'all' },
  { id: 'PC', name: 'PC', slug: 'pc' },
  { id: 'Xbox', name: 'Xbox', slug: 'xbox' },
  { id: 'PlayStation', name: 'PlayStation', slug: 'playstation' },
  { id: 'Mobile', name: 'Mobile', slug: 'mobile' },
  { id: 'Gift Card', name: 'Gift Card', slug: 'gift-card' }
];

export const PAYMENT_METHODS = [
  {
    id: 'fastpay',
    name: 'FastPay',
    number: '0750 123 4567',
    instructions: 'Send total amount to our FastPay account and save transaction ID.',
    badge: 'Instant Transfer',
    icon: 'Zap'
  },
  {
    id: 'korek',
    name: 'Korek Cash / Cash-in',
    number: '0750 987 6543',
    instructions: 'Transfer funds or send recharge balance to our Korek number.',
    badge: 'Mobile Transfer',
    icon: 'PhoneCall'
  },
  {
    id: 'mastercard',
    name: 'MasterCard / FIB / First Iraqi Bank',
    number: '0123 4567 8901 2345',
    instructions: 'Transfer directly to our FIB / MasterCard account number.',
    badge: 'Bank Transfer',
    icon: 'CreditCard'
  }
];
