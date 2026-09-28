export const CATEGORIES = [
  { id: 'all', name: 'All Products', icon: 'Grid' },
  { id: 'mobile', name: 'Mobile Top-Ups', icon: 'Smartphone' },
  { id: 'pc', name: 'PC Gaming', icon: 'Monitor' },
  { id: 'xbox', name: 'Xbox', icon: 'Gamepad2' },
  { id: 'playstation', name: 'PlayStation', icon: 'Tv' },
  { id: 'giftcards', name: 'Gift Cards', icon: 'Gift' },
  { id: 'subscriptions', name: 'Subscriptions', icon: 'Sparkles' }
];

export const PLATFORMS = [
  { id: 'all', name: 'All Platforms' },
  { id: 'PC', name: 'PC' },
  { id: 'Xbox', name: 'Xbox' },
  { id: 'PlayStation', name: 'PlayStation' },
  { id: 'Mobile', name: 'Mobile' },
  { id: 'Gift Card', name: 'Gift Cards' }
];

export const PAYMENT_METHODS = [
  {
    id: 'fastpay',
    name: 'FastPay',
    type: 'Mobile Wallet',
    accountNumber: '0750 123 4567',
    color: 'from-blue-600 to-indigo-700',
    description: 'Fast and instant transfer via FastPay App'
  },
  {
    id: 'korek',
    name: 'Korek Cash / Transfer',
    type: 'Telecom',
    accountNumber: '0750 987 6543',
    color: 'from-red-600 to-amber-600',
    description: 'Direct mobile credit or Korek Cash transfer'
  },
  {
    id: 'mastercard',
    name: 'MasterCard',
    type: 'Card Payment',
    accountNumber: '5399 **** **** 8821',
    color: 'from-purple-600 to-cyan-600',
    description: 'Local MasterCard transfer / deposit'
  }
];
