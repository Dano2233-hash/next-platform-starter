export const CATEGORIES = [
  { id: 'all', name: 'All Categories', slug: 'all', icon: 'Grid' },
  { id: 'mobile', name: 'Mobile Top-Ups', slug: 'mobile', icon: 'Smartphone' },
  { id: 'games', name: 'Paid Games', slug: 'games', icon: 'Gamepad2' },
  { id: 'gift-cards', name: 'Gift Cards', slug: 'gift-cards', icon: 'Gift' },
  { id: 'subscriptions', name: 'Subscriptions', slug: 'subscriptions', icon: 'Zap' },
];

export const PLATFORMS = [
  { id: 'all', name: 'All Platforms' },
  { id: 'PC', name: 'PC' },
  { id: 'Xbox', name: 'Xbox' },
  { id: 'PlayStation', name: 'PlayStation' },
  { id: 'Mobile', name: 'Mobile' },
  { id: 'Gift Card', name: 'Gift Card' },
  { id: 'Service', name: 'Service' },
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
    description: 'Instant local wallet transfer in Iraq',
    accountNumber: '0750 123 4567',
    badge: 'Popular Local Wallet',
    color: 'from-sky-500 to-blue-600'
  },
  {
    id: 'korek',
    name: 'Korek Cash / Balance',
    description: 'Transfer via Korek Mobile Telecom',
    accountNumber: '0750 987 6543',
    badge: 'Korek Direct',
    color: 'from-amber-500 to-orange-600'
  },
  {
    id: 'mastercard',
    name: 'MasterCard / FIB / Credit Card',
    description: 'Direct Iraqi Bank Card / FIB Payment',
    accountNumber: '5320 **** **** 8821',
    badge: 'Fast Card Transfer',
    color: 'from-cyan-500 to-blue-700'
  }
];
