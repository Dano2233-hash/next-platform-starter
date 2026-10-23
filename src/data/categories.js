export const CATEGORIES = [
  { id: 'all', name: 'All Products', icon: 'Grid' },
  { id: 'games', name: 'Paid Games', icon: 'Gamepad2' },
  { id: 'mobile-topups', name: 'Mobile Top-Ups', icon: 'Smartphone' },
  { id: 'gift-cards', name: 'Gift Cards', icon: 'Gift' },
  { id: 'subscriptions', name: 'Subscriptions', icon: 'Zap' },
  { id: 'xbox', name: 'Xbox', icon: 'Box' },
  { id: 'playstation', name: 'PlayStation', icon: 'Tv' },
  { id: 'pc', name: 'PC Gaming', icon: 'Monitor' },
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
    description: 'Pay instantly using FastPay wallet in Iraq & Kurdistan',
    accountNumber: '0750 123 4567',
    badge: 'Popular',
    iconName: 'Zap'
  },
  {
    id: 'korek',
    name: 'Korek Cash',
    description: 'Pay via Korek Telecom mobile transfer or Korek Cash',
    accountNumber: '0750 987 6543',
    badge: 'Fast',
    iconName: 'Phone'
  },
  {
    id: 'mastercard',
    name: 'MasterCard / Visa',
    description: 'Direct transfer to Fib / First Iraqi Bank or Local MasterCard',
    accountNumber: 'FIBA-9921-0034-8812',
    badge: 'Secure',
    iconName: 'CreditCard'
  }
];
