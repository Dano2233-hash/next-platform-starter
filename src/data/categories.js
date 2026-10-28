export const CATEGORIES = [
  { id: 'all', name: 'All Products', icon: 'Gamepad2' },
  { id: 'mobile', name: 'Mobile Top-Ups', icon: 'Smartphone' },
  { id: 'games', name: 'Paid Games', icon: 'Monitor' },
  { id: 'gift-cards', name: 'Gift Cards', icon: 'CreditCard' },
  { id: 'subscriptions', name: 'Subscriptions', icon: 'Sparkles' }
];

export const PLATFORMS = [
  { id: 'all', name: 'All Platforms' },
  { id: 'PC', name: 'PC' },
  { id: 'Xbox', name: 'Xbox' },
  { id: 'PlayStation', name: 'PlayStation' },
  { id: 'Mobile', name: 'Mobile' },
  { id: 'Gift Card', name: 'Gift Card' },
  { id: 'Subscription', name: 'Subscription' }
];

export const PAYMENT_METHODS = [
  {
    id: 'fastpay',
    name: 'FastPay',
    description: 'Instant mobile wallet transfer',
    accountNumber: '+964 750 XXX XXXX',
    badgeColor: 'from-amber-500 to-orange-600',
    accentColor: 'text-amber-400'
  },
  {
    id: 'korek',
    name: 'Korek',
    description: 'Korek Cash / Balance transfer',
    accountNumber: '+964 750 XXX XXXX',
    badgeColor: 'from-red-600 to-rose-700',
    accentColor: 'text-rose-400'
  },
  {
    id: 'mastercard',
    name: 'MasterCard',
    description: 'Direct card payment / FIB / Local bank transfer',
    accountNumber: '5399 **** **** 1234',
    badgeColor: 'from-blue-600 to-indigo-700',
    accentColor: 'text-blue-400'
  }
];
