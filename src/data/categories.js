export const CATEGORIES = [
  { id: 'all', name: 'All Products', icon: 'Sparkles' },
  { id: 'mobile', name: 'Mobile Top-Ups', icon: 'Smartphone' },
  { id: 'pc', name: 'PC Games', icon: 'Monitor' },
  { id: 'xbox', name: 'Xbox', icon: 'Gamepad2' },
  { id: 'playstation', name: 'PlayStation', icon: 'Tv' },
  { id: 'giftcards', name: 'Gift Cards', icon: 'CreditCard' },
  { id: 'subscriptions', name: 'Subscriptions', icon: 'Zap' },
];

export const PLATFORMS = [
  { id: 'all', name: 'All Platforms' },
  { id: 'Mobile', name: 'Mobile' },
  { id: 'PC', name: 'PC' },
  { id: 'Xbox', name: 'Xbox' },
  { id: 'PlayStation', name: 'PlayStation' },
  { id: 'Gift Card', name: 'Gift Card' },
];

export const PAYMENT_METHODS = [
  {
    id: 'fastpay',
    name: 'FastPay',
    type: 'Mobile Wallet',
    accountNumber: '0750 123 4567',
    accountName: 'Dano Store FastPay',
    color: 'from-blue-600 to-cyan-500',
    description: 'Instant Kurdistan & Iraq FastPay mobile transfer.'
  },
  {
    id: 'korek',
    name: 'Korek Cash / Top-Up',
    type: 'Telecom Direct',
    accountNumber: '0750 987 6543',
    accountName: 'Dano Store Korek',
    color: 'from-purple-600 to-indigo-600',
    description: 'Korek transfer or mobile card scratch refill.'
  },
  {
    id: 'mastercard',
    name: 'MasterCard / First Iraqi Bank',
    type: 'Card & Bank',
    accountNumber: 'FIB-9081234567',
    accountName: 'Dano Store FIB/MasterCard',
    color: 'from-cyan-600 to-blue-700',
    description: 'Manual FIB or MasterCard transfer.'
  }
];
