export const CATEGORIES = [
  { id: 'all', name: 'All Products', icon: 'Grid' },
  { id: 'mobile-topups', name: 'Mobile Top-Ups', icon: 'Smartphone' },
  { id: 'paid-games', name: 'Paid Games', icon: 'Gamepad2' },
  { id: 'gift-cards', name: 'Gift Cards', icon: 'CreditCard' },
  { id: 'subscriptions', name: 'Subscriptions', icon: 'Crown' },
];

export const PLATFORMS = [
  { id: 'all', name: 'All Platforms' },
  { id: 'PC', name: 'PC' },
  { id: 'Xbox', name: 'Xbox' },
  { id: 'PlayStation', name: 'PlayStation' },
  { id: 'Mobile', name: 'Mobile' },
  { id: 'Gift Card', name: 'Gift Card' },
];

export const PRODUCT_TYPES = [
  { id: 'all', name: 'All Types' },
  { id: 'Game', name: 'Game' },
  { id: 'Top-Up', name: 'Top-Up' },
  { id: 'Gift Card', name: 'Gift Card' },
  { id: 'Subscription', name: 'Subscription' },
  { id: 'Account', name: 'Account' },
];

export const PAYMENT_METHODS = [
  {
    id: 'fastpay',
    name: 'FastPay',
    accountNumber: '0750 123 4567',
    accountHolder: 'Dano Store FastPay',
    color: 'from-pink-600 to-rose-600',
    description: 'Fast and direct mobile wallet payment in Kurdistan & Iraq.',
    badge: 'Popular in Kurdistan'
  },
  {
    id: 'korek',
    name: 'Korek Cash / Top-Up',
    accountNumber: '0750 987 6543',
    accountHolder: 'Dano Store Korek',
    color: 'from-yellow-500 to-amber-600',
    description: 'Instant transfer via Korek Telecom balance / Korek Cash.',
    badge: 'Instant Transfer'
  },
  {
    id: 'mastercard',
    name: 'MasterCard',
    accountNumber: '5399 **** **** 8821',
    accountHolder: 'Dano Digital Store',
    color: 'from-blue-600 to-indigo-700',
    description: 'Local and international MasterCard direct transfer.',
    badge: 'Bank Card'
  }
];
