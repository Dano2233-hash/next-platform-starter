export const CATEGORIES = [
  { id: 'all', name: 'All Products', icon: 'Grid' },
  { id: 'mobile-topups', name: 'Mobile Top-Ups', icon: 'Smartphone' },
  { id: 'paid-games', name: 'Paid Games', icon: 'Gamepad2' },
  { id: 'gift-cards', name: 'Gift Cards', icon: 'CreditCard' },
  { id: 'subscriptions', name: 'Subscriptions', icon: 'Sparkles' }
];

export const PLATFORMS = [
  { id: 'all', name: 'All Platforms' },
  { id: 'PC', name: 'PC Gaming' },
  { id: 'PlayStation', name: 'PlayStation' },
  { id: 'Xbox', name: 'Xbox' },
  { id: 'Mobile', name: 'Mobile' },
  { id: 'Gift Card', name: 'Gift Card' }
];

export const PAYMENT_METHODS = [
  {
    id: 'fastpay',
    name: 'FastPay',
    icon: 'Zap',
    accountNumber: '0750 XXX XXXX',
    description: 'Instant transfer via FastPay Mobile Wallet in Kurdistan & Iraq',
    color: 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400'
  },
  {
    id: 'korek',
    name: 'Korek Telecom',
    icon: 'PhoneCall',
    accountNumber: '0750 XXX XXXX',
    description: 'Pay directly using Korek Telecom mobile balance transfer',
    color: 'from-sky-500/20 to-blue-500/10 border-sky-500/30 text-sky-400'
  },
  {
    id: 'mastercard',
    name: 'MasterCard / FIB',
    icon: 'CreditCard',
    accountNumber: 'First Iraqi Bank / FIB Transfer',
    description: 'Direct Iraqi Bank Card or FIB Account Payment',
    color: 'from-purple-500/20 to-pink-500/10 border-purple-500/30 text-purple-400'
  }
];
